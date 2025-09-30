import { Client, networks } from '../../../packages/proof-of-participation';
import type { u32, u64, Option } from '@stellar/stellar-sdk/contract';
import { Address, Keypair } from '@stellar/stellar-sdk';

export interface ServiceOptions {
  rpcUrl?: string;
  networkPassphrase?: string;
  contractId?: string;
}

export interface WriteResult {
  txHash: string;
  success: boolean;
}

export interface ParticipationCertificate {
  metadata: Option<string>;
  organization: string;
  task_id: string;
  task_name: string;
  timestamp: u64;
  volunteer: string;
}

/**
 * Proof of Participation Service
 * Wraps the generated client and exposes a typed, ergonomic API for StarShop.
 */
export class ProofOfParticipationService {
  private client: Client;
  private signer?: Keypair;
  private adminAddress?: string; // stored for operations requiring organization/admin

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

  private ensureSigner(signer?: Keypair): Keypair {
    const signerToUse = signer || this.signer;
    if (!signerToUse) {
      throw new Error('Signer is required for write operations');
    }
    return signerToUse;
  }

  private validateAddress(address: string, fieldName: string): void {
    if (!address || typeof address !== 'string') {
      throw new Error(`${fieldName} is required`);
    }
    // Throws if invalid
    Address.fromString(address);
  }

  private toTaskIdString(eventId: u64): string {
    return (typeof eventId === 'bigint') ? eventId.toString() : String(eventId);
  }

  async initialize(admin: string, signer?: Keypair): Promise<WriteResult> {
    this.validateAddress(admin, 'admin');
    const signerToUse = this.ensureSigner(signer);
    try {
      const tx = await this.client.initialize({ admin });
      const result = await tx.signAndSend(signerToUse);
      this.adminAddress = admin;
      return { txHash: result.hash, success: true };
    } catch (error) {
      console.error('Failed to initialize proof-of-participation:', error);
      return { txHash: '', success: false };
    }
  }

  async recordParticipation(user: string, eventId: u64, signer?: Keypair): Promise<WriteResult> {
    this.validateAddress(user, 'user');
    if (!this.adminAddress) {
      throw new Error('Service not initialized: admin is required to record participation');
    }
    const signerToUse = this.ensureSigner(signer);
    const task_id = this.toTaskIdString(eventId);
    try {
      const tx = await this.client.register_participation({
        organization: this.adminAddress,
        volunteer: user,
        task_id,
        task_name: `Event ${task_id}`,
        metadata: undefined as unknown as Option<string>,
      });
      const result = await tx.signAndSend(signerToUse);
      return { txHash: result.hash, success: true };
    } catch (error) {
      console.error('Failed to record participation:', error);
      return { txHash: '', success: false };
    }
  }

  async verifyParticipation(user: string, eventId: u64): Promise<boolean> {
    this.validateAddress(user, 'user');
    const task_id = this.toTaskIdString(eventId);
    try {
      const tx = await this.client.verify_participation({ volunteer: user, task_id });
      const result = await tx.simulate();
      return Boolean(result.result);
    } catch (error) {
      console.error('Failed to verify participation:', error);
      return false;
    }
  }

  async getParticipationCount(user: string): Promise<number> {
    this.validateAddress(user, 'user');
    try {
      let offset: u32 = 0;
      const limit: u32 = 100;
      let total = 0;
      // paginate until less than limit is returned
      // get_volunteer_participations returns Result<Array<Participation>> inside result
      // We loop to count without materializing all entries in memory at once
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const tx = await this.client.get_volunteer_participations({ volunteer: user, offset, limit });
        const sim = await tx.simulate();
        const page = sim.result?.ok ?? sim.result; // tolerate either shape
        const items = Array.isArray(page) ? page : (page?.val ?? []);
        const pageCount = items.length ?? 0;
        total += pageCount;
        if (pageCount < limit) break;
        offset = (offset as number + limit) as u32;
      }
      return total;
    } catch (error) {
      console.error('Failed to get participation count:', error);
      return 0;
    }
  }

  async getEventParticipants(eventId: u64): Promise<string[]> {
    const task_id = this.toTaskIdString(eventId);
    try {
      let offset: u32 = 0;
      const limit: u32 = 100;
      const participants: string[] = [];
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const tx = await this.client.get_task_volunteers({ task_id, offset, limit });
        const sim = await tx.simulate();
        const arr = sim.result?.ok ?? sim.result;
        const page = Array.isArray(arr) ? arr : (arr?.val ?? []);
        participants.push(...page);
        if (page.length < limit) break;
        offset = (offset as number + limit) as u32;
      }
      return participants;
    } catch (error) {
      console.error('Failed to get event participants:', error);
      return [];
    }
  }

  async issueCertificate(user: string, eventId: u64, signer?: Keypair): Promise<WriteResult> {
    // Alias for register_participation, modeled as issuing a certificate upon registration
    return this.recordParticipation(user, eventId, signer);
  }

  async getCertificate(user: string, eventId: u64): Promise<ParticipationCertificate | null> {
    this.validateAddress(user, 'user');
    const task_id = this.toTaskIdString(eventId);
    try {
      const tx = await this.client.get_participation_details({ volunteer: user, task_id });
      const sim = await tx.simulate();
      const result = sim.result?.ok ?? sim.result;
      if (!result) return null;
      // If wrapped, unwrap common shapes; otherwise assume object conforms
      const cert = (result as any).val ?? result;
      return cert as ParticipationCertificate;
    } catch (error) {
      console.error('Failed to get certificate:', error);
      return null;
    }
  }
}

export const proofOfParticipationService = new ProofOfParticipationService();


