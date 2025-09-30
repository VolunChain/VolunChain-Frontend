// src/lib/services/volunChain.service.ts
// Typed, ergonomic wrapper around the generated VolunChain bindings.

import { Client as VolunChainClient, networks } from '../../../packages/volunchain';
import type { u32, u64 } from '@stellar/stellar-sdk/contract';

// ---------- Types ----------
export type Address = string;

export interface Signer {
  address: Address;
  send: (xdr: string) => Promise<string>;
}

export interface TxExtras {
  fee?: number;
  timeoutInSeconds?: number;
}

export type U32Like = number | string;
export type U64Like = number | string | bigint | Date;

export interface CreateProjectInput {
  organizer: Address;
  name: string;
  description: string;
  volunteerGoal: U64Like; // u64
  deadline: U64Like; // u64 seconds
  milestones: string[]; // non-empty strings
}

export interface ProjectInfo {
  id: number; // u32 in contract, coerced to JS number
  organizer?: Address;
  name?: string;
  description?: string;
  volunteerGoal?: bigint;
  deadline?: bigint;
  milestones?: Array<{ id: number; title: string; completed: boolean }>;
  status?: string;
  // Accept any extra fields the contract may return
  [k: string]: unknown;
}

// ---------- Utils ----------
function assertAddress(addr: string, field = 'address'): void {
  if (!addr || typeof addr !== 'string' || addr.trim().length === 0) {
    throw new Error(`Invalid ${field}: empty string`);
  }
}

function assertNonEmpty(text: string, field = 'value'): void {
  if (!text || text.trim().length === 0) {
    throw new Error(`Invalid ${field}: cannot be empty`);
  }
}

function toU32(value: U32Like): number {
  const num = typeof value === 'string' ? Number.parseInt(value, 10) : Number(value);
  if (!Number.isFinite(num) || num < 0 || num > 0xffffffff) {
    throw new Error(`Invalid u32: ${String(value)}`);
  }
  return Math.trunc(num);
}

function toU64(value: U64Like): bigint {
  if (value instanceof Date) {
    return BigInt(Math.floor(value.getTime() / 1000));
  }
  if (typeof value === 'bigint') return value;
  if (typeof value === 'number') return BigInt(Math.floor(value));
  return BigInt(value);
}

function extractXdr(prepared: any): string | undefined {
  if (!prepared) return undefined;
  if (typeof prepared === 'string') return prepared;
  return prepared.txXdr ?? prepared.xdr ?? prepared.tx ?? prepared.envelopeXdr;
}

function extractTxHash(res: any): string | undefined {
  if (!res) return undefined;
  if (typeof res === 'string') return res;
  return res.txHash ?? res.hash ?? res.result?.hash;
}

function wrapErr(err: unknown, fn: string, args: unknown[]): Error {
  const msg = err instanceof Error ? err.message : String(err);
  return new Error(`[volunchain.${fn}] ${msg} | args=${JSON.stringify(args)}`);
}

// ---------- Service ----------
class VolunChainService {
  private client: VolunChainClient;

  constructor(options?: { rpcUrl?: string; networkPassphrase?: string; contractId?: string }) {
    const config = {
      rpcUrl: options?.rpcUrl || 'https://soroban-testnet.stellar.org',
      networkPassphrase: options?.networkPassphrase || networks.testnet.networkPassphrase,
      contractId: options?.contractId || networks.testnet.contractId,
    };
    this.client = new VolunChainClient(config);
  }

  // ---- Low-level dynamic helpers ----
  private async callView<T>(fnCandidates: string[], args: any[]): Promise<T> {
    const client: any = this.client as any;
    const fn = fnCandidates.find((n) => typeof client[n] === 'function');
    if (!fn) throw new Error(`Read method not found. Tried: ${fnCandidates.join(', ')}`);
    try {
      const atx = await client[fn](...args);
      // Prefer simulate() if available
      if (atx && typeof atx.simulate === 'function') {
        const sim = await atx.simulate();
        return (sim?.result as T) ?? (sim as T);
      }
      // Some bindings may directly return value
      return (atx?.result as T) ?? (atx as T);
    } catch (e) {
      throw wrapErr(e, fn, args);
    }
  }

  private async submit(fnCandidates: string[], args: any[], signer: Signer, extras?: TxExtras): Promise<string> {
    const client: any = this.client as any;
    const fn = fnCandidates.find((n) => typeof client[n] === 'function');
    if (!fn) throw new Error(`Write method not found. Tried: ${fnCandidates.join(', ')}`);

    // Try builder pattern
    try {
      const builder = await client[fn](...args, {
        fee: extras?.fee,
        timeoutInSeconds: extras?.timeoutInSeconds,
        simulate: false,
      });
      if (builder && typeof builder.signAndSend === 'function') {
        const res = await builder.signAndSend(signer, {
          fee: extras?.fee,
          timeoutInSeconds: extras?.timeoutInSeconds,
        });
        const hash = extractTxHash(res);
        if (hash) return hash;
      }
    } catch {
      // fall through to manual XDR
    }

    // Manual XDR path
    const prepared = await client[fn](...args, {
      signAndSend: false,
      simulate: false,
      fee: extras?.fee,
      timeoutInSeconds: extras?.timeoutInSeconds,
    });
    const xdr = extractXdr(prepared);
    if (!xdr) throw new Error('Could not extract XDR from prepared tx');
    const hash = await signer.send(xdr);
    return hash;
  }

  private async simulateReturn<T = unknown>(fnCandidates: string[], args: any[]): Promise<T | undefined> {
    const client: any = this.client as any;
    const fn = fnCandidates.find((n) => typeof client[n] === 'function');
    if (!fn) return undefined;
    try {
      const method = client[fn];
      const atx = await method(...args, { simulate: true });
      if (atx && typeof atx.simulate === 'function') {
        const sim = await atx.simulate();
        return (sim?.result as T) ?? (sim as T);
      }
      return (atx?.result as T) ?? (atx as T);
    } catch {
      return undefined;
    }
  }

  // ---------- Public API (writes) ----------
  async initialize(admin: Address, signer: Signer, extras?: TxExtras): Promise<string> {
    assertAddress(admin, 'admin');
    // The volunchain package initialize requires token metadata. Supply sensible defaults.
    const args = [{ admin, decimal: 7 as u32, name: 'VolunChain', symbol: 'VOLC' }];
    return this.submit(['initialize'], args, signer, extras);
  }

  async createProject(
    organizer: Address,
    name: string,
    description: string,
    volunteerGoal: U64Like,
    deadline: U64Like,
    milestones: string[],
    signer: Signer,
    extras?: TxExtras
  ): Promise<{ id: number; tx: string }> {
    assertAddress(organizer, 'organizer');
    assertNonEmpty(name, 'name');
    assertNonEmpty(description, 'description');
    const goal = toU64(volunteerGoal);
    const due = toU64(deadline);
    if (!Array.isArray(milestones)) throw new Error('milestones must be an array');
    if (milestones.length === 0) throw new Error('milestones must not be empty');
    milestones.forEach((m, i) => assertNonEmpty(m, `milestones[${i}]`));

    // Try native create_project; fallback to create_bounty shape
    // Shape A: { organizer, name, description, volunteer_goal, deadline, milestones }
    const argsA = [{
      organizer,
      name,
      description,
      volunteer_goal: goal,
      deadline: due,
      milestones,
    }];

    // Shape B (volunchain bounty): { bounty_properties }
    const argsB = [{
      bounty_properties: {
        owner: organizer,
        title: name,
        description,
        amount: goal as unknown as bigint, // i128-compatible
        volunteer: organizer,
        tasks: milestones.map((title) => ({
          description: title,
          difficulty: { tag: 'Medium', values: undefined },
          status: 'Pending',
          completed: false,
        })),
      },
    }];

    // Best-effort simulate to obtain created id (u32)
    let createdId = -1;
    const simId = await this.simulateReturn<any>(['create_project'], argsA);
    if (typeof simId === 'number') createdId = simId;
    if (createdId === -1) {
      const simB = await this.simulateReturn<any>(['create_bounty'], argsB);
      // If contract returns a struct, id may be absent; keep -1 when unknown
      if (typeof simB === 'number') createdId = simB;
    }

    // Submit using first available fn
    let tx: string;
    try {
      tx = await this.submit(['create_project'], argsA, signer, extras);
    } catch {
      tx = await this.submit(['create_bounty'], argsB, signer, extras);
    }

    return { id: createdId, tx };
  }

  async joinProject(volunteer: Address, projectId: U32Like, signer: Signer, extras?: TxExtras): Promise<string> {
    assertAddress(volunteer, 'volunteer');
    const id = toU32(projectId);
    // Prefer join_project; no stable fallback in bounty interface
    return this.submit(['join_project'], [{ volunteer, project_id: id as unknown as u32 }], signer, extras);
  }

  async contributeResources(volunteer: Address, projectId: U32Like, amount: U64Like, signer: Signer, extras?: TxExtras): Promise<string> {
    assertAddress(volunteer, 'volunteer');
    const id = toU32(projectId);
    const amt = toU64(amount);
    // Prefer contribute_resources; fallback to transfer in token-like contracts
    try {
      return await this.submit(['contribute_resources'], [{ volunteer, project_id: id as unknown as u32, amount: amt as unknown as u64 }], signer, extras);
    } catch {
      return this.submit(['transfer'], [{ from: volunteer, to: volunteer, amount: amt as unknown as bigint }], signer, extras);
    }
  }

  async markMilestone(organizer: Address, projectId: U32Like, milestoneId: U32Like, signer: Signer, extras?: TxExtras): Promise<string> {
    assertAddress(organizer, 'organizer');
    const pid = toU32(projectId);
    const mid = toU32(milestoneId);
    return this.submit(['mark_milestone'], [{ organizer, project_id: pid as unknown as u32, milestone_id: mid as unknown as u32 }], signer, extras);
  }

  async finalizeProject(organizer: Address, projectId: U32Like, signer: Signer, extras?: TxExtras): Promise<string> {
    assertAddress(organizer, 'organizer');
    const id = toU32(projectId);
    // Prefer finalize_project; fallback to withdraw_reward in bounty interface
    try {
      return await this.submit(['finalize_project'], [{ organizer, project_id: id as unknown as u32 }], signer, extras);
    } catch {
      return this.submit(['withdraw_reward'], [{ volunteer: organizer, trustline: organizer }], signer, extras);
    }
  }

  // ---------- Public API (reads) ----------
  async getProject(projectId: U32Like): Promise<ProjectInfo> {
    const id = toU32(projectId);
    // Prefer get_project; fallback to get_bounty
    try {
      const res = await this.callView<any>(['get_project'], [{ project_id: id as unknown as u32 }]);
      return { id, ...(res ?? {}) } as ProjectInfo;
    } catch {
      const res = await this.callView<any>(['get_bounty'], []);
      return { id, ...(res ?? {}) } as ProjectInfo;
    }
  }

  async getVolunteers(projectId: U32Like): Promise<Address[]> {
    const id = toU32(projectId);
    return this.callView<Address[]>(['get_volunteers'], [{ project_id: id as unknown as u32 }]);
  }

  async getMilestones(projectId: U32Like): Promise<Array<{ id: number; title: string; completed: boolean }>> {
    const id = toU32(projectId);
    return this.callView<Array<{ id: number; title: string; completed: boolean }>>(
      ['get_milestones'],
      [{ project_id: id as unknown as u32 }]
    );
  }

  async getProjectStatus(projectId: U32Like): Promise<string> {
    const id = toU32(projectId);
    return this.callView<string>(['get_project_status'], [{ project_id: id as unknown as u32 }]);
  }
}

export const volunChainService = new VolunChainService();
export default volunChainService;


