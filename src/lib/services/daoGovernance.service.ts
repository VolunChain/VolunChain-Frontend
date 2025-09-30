import { Client, networks } from '../contracts/dao_governance';
import type { u32, u64 } from '@stellar/stellar-sdk/contract';
import type { Keypair } from '@stellar/stellar-sdk';

type TimeInput = Date | number | string | bigint;

export interface ServiceOptions {
  rpcUrl?: string;
  networkPassphrase?: string;
  contractId?: string;
}

export interface WriteResult {
  txHash: string;
  success: boolean;
}

export interface CreateProposalResult extends WriteResult {
  id: u32;
}

export class DaoGovernanceService {
  private client: Client;
  private signer?: Keypair;

  constructor(options: ServiceOptions = {}) {
    const config = {
      rpcUrl: options.rpcUrl || 'https://soroban-testnet.stellar.org',
      networkPassphrase: options.networkPassphrase || networks.testnet.networkPassphrase,
      contractId: options.contractId || networks.testnet.contractId,
    };

    this.client = new Client(config);
  }

  setSigner(signer: Keypair): void {
    this.signer = signer;
  }

  private normalizeTimeToSecondsU64(time: TimeInput): u64 {
    if (typeof time === 'number') {
      // If looks like ms, convert; if seconds, floor it
      const seconds = time > 1e12 ? Math.floor(time / 1000) : Math.floor(time);
      return BigInt(seconds);
    }
    if (typeof time === 'string') {
      const parsed = new Date(time);
      if (isNaN(parsed.getTime())) {
        throw new Error(`Invalid time string: ${time}`);
      }
      return BigInt(Math.floor(parsed.getTime() / 1000));
    }
    if (time instanceof Date) {
      return BigInt(Math.floor(time.getTime() / 1000));
    }
    if (typeof time === 'bigint') {
      return time;
    }
    throw new Error(`Unsupported time type: ${typeof time}`);
  }

  private toU32(id: number | bigint): u32 {
    if (typeof id === 'bigint') return Number(id);
    return Number(id);
  }

  async initialize(admin: string, signer?: Keypair): Promise<WriteResult> {
    const signerToUse = signer || this.signer;
    if (!signerToUse) {
      throw new Error('Signer is required for write operations');
    }

    const tx = await this.client.initialize({ admin });
    const result = await tx.signAndSend(signerToUse);
    return { txHash: result.hash, success: true };
  }

  async createProposal(
    creator: string,
    title: string,
    description: string,
    options: string[],
    deadline: TimeInput,
    signer?: Keypair
  ): Promise<CreateProposalResult> {
    const signerToUse = signer || this.signer;
    if (!signerToUse) {
      throw new Error('Signer is required for write operations');
    }

    if (!title || title.trim().length === 0) {
      throw new Error('Title must not be empty');
    }
    if (!description || description.trim().length === 0) {
      throw new Error('Description must not be empty');
    }
    if (!Array.isArray(options) || options.length < 2) {
      throw new Error('At least two options are required');
    }

    const deadlineU64 = this.normalizeTimeToSecondsU64(deadline);

    const tx = await (this.client as any).create_proposal({
      creator,
      title,
      description,
      options,
      deadline: deadlineU64,
    });

    // The simulation result should contain the created proposal id (u32)
    const sim = await tx.simulate();
    const createdId = this.toU32((sim as any).result ?? 0);

    const sent = await tx.signAndSend(signerToUse);
    return { id: createdId, txHash: sent.hash, success: true };
  }

  async vote(
    user: string,
    proposalId: number | bigint,
    optionId: number | bigint,
    signer?: Keypair
  ): Promise<WriteResult> {
    const signerToUse = signer || this.signer;
    if (!signerToUse) {
      throw new Error('Signer is required for write operations');
    }

    const tx = await (this.client as any).vote({
      voter: user,
      proposal_id: this.toU32(proposalId),
      option_id: this.toU32(optionId),
    });
    const res = await tx.signAndSend(signerToUse);
    return { txHash: res.hash, success: true };
  }

  async closeProposal(
    caller: string,
    proposalId: number | bigint,
    signer?: Keypair
  ): Promise<WriteResult> {
    const signerToUse = signer || this.signer;
    if (!signerToUse) {
      throw new Error('Signer is required for write operations');
    }
    
    const tx = await (this.client as any).close_proposal({
      caller,
      proposal_id: this.toU32(proposalId),
    });
    const res = await tx.signAndSend(signerToUse);
    return { txHash: res.hash, success: true };
  }

  async getProposal(proposalId: number | bigint): Promise<any> {
    const tx = await (this.client as any).get_proposal({
      proposal_id: this.toU32(proposalId),
    });
    const res = await tx.simulate();
    return (res as any).result;
  }

  async getVotes(proposalId: number | bigint): Promise<any[]> {
    const tx = await (this.client as any).get_votes({
      proposal_id: this.toU32(proposalId),
    });
    const res = await tx.simulate();
    return ((res as any).result ?? []) as any[];
  }

  async getUserVotes(user: string): Promise<any[]> {
    const tx = await (this.client as any).get_user_votes({ user });
    const res = await tx.simulate();
    return ((res as any).result ?? []) as any[];
  }

  async getProposalStatus(proposalId: number | bigint): Promise<any> {
    const tx = await (this.client as any).get_proposal_status({
      proposal_id: this.toU32(proposalId),
    });
    const res = await tx.simulate();
    return (res as any).result;
  }
}

export const daoGovernanceService = new DaoGovernanceService();


