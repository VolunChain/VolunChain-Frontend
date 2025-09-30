import { Client, networks } from '../contracts/recognition_system';
import type { Keypair } from '@stellar/stellar-sdk';
import type { u32 } from '@stellar/stellar-sdk/contract';
import { Address } from '@stellar/stellar-sdk';

export interface WriteTxResult {
  txHash: string;
}

export interface GiveRecognitionResult extends WriteTxResult {
  id: u32;
}

export interface RecognitionRecord {
  id: u32;
  sender: string;
  receiver: string;
  message: string;
  timestamp?: number;
}

export class RecognitionSystemService {
  private client: Client;
  private signer?: Keypair;

  constructor(options?: { rpcUrl?: string; networkPassphrase?: string; contractId?: string }) {
    const rpcUrl = options?.rpcUrl || 'https://soroban-testnet.stellar.org';
    const networkPassphrase = options?.networkPassphrase || networks.testnet.networkPassphrase;
    const contractId = options?.contractId || networks.testnet.contractId;
    this.client = new Client({ rpcUrl, networkPassphrase, contractId });
  }

  setSigner(signer: Keypair): void {
    this.signer = signer;
  }

  private requireSigner(explicit?: Keypair): Keypair {
    const signerToUse = explicit || this.signer;
    if (!signerToUse) throw new Error('Signer is required for write operations');
    return signerToUse;
  }

  private ensureValidAddress(addr: string, label: string): void {
    try {
      Address.fromString(addr);
    } catch {
      throw new Error(`${label} is not a valid Stellar address`);
    }
  }

  private ensureValidMessage(message: string): void {
    if (!message || message.trim().length === 0) {
      throw new Error('Message must be non-empty');
    }
  }

  private ensureValidU32(id: number): asserts id is u32 {
    if (!Number.isInteger(id) || id < 0 || id > 0xffffffff) {
      throw new Error('recognitionId must be a valid u32');
    }
  }

  private hash32(input: string): u32 {
    let h = 2166136261 >>> 0;
    for (let i = 0; i < input.length; i++) {
      h ^= input.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return (h >>> 0) as unknown as u32;
  }

  async initialize(admin: string, signer?: Keypair): Promise<WriteTxResult> {
    this.ensureValidAddress(admin, 'admin');
    const s = this.requireSigner(signer);
    const tx = await this.client.initialize({ admin });
    const res = await tx.signAndSend(s);
    return { txHash: res.hash };
  }

  async giveRecognition(sender: string, receiver: string, message: string, signer?: Keypair): Promise<GiveRecognitionResult> {
    this.ensureValidAddress(sender, 'sender');
    this.ensureValidAddress(receiver, 'receiver');
    this.ensureValidMessage(message);
    const s = this.requireSigner(signer);

    // Map to underlying contract: use register_participation as a stand-in
    const taskId = `${sender}:${receiver}:${Date.now()}:${this.hash32(sender + receiver + message)}`;
    const taskName = message.length > 60 ? message.slice(0, 60) : message;
    const metadata = { tag: 'some', values: message } as any; // Optional metadata; structure not enforced here

    const tx = await (this.client as any).register_participation({
      organization: sender,
      volunteer: receiver,
      task_id: taskId,
      task_name: taskName,
      metadata: { tag: 'some', values: message } as any,
    });
    const res = await tx.signAndSend(s);

    const id = this.hash32(taskId);
    return { id, txHash: res.hash };
  }

  async revokeRecognition(sender: string, recognitionId: u32, signer?: Keypair): Promise<WriteTxResult> {
    this.ensureValidAddress(sender, 'sender');
    this.ensureValidU32(recognitionId as unknown as number);
    // Not supported by current on-chain contract; expose explicit error for callers.
    throw new Error('revokeRecognition is not supported by the current Recognition contract');
  }

  async getRecognition(_recognitionId: u32): Promise<RecognitionRecord | undefined> {
    this.ensureValidU32(_recognitionId as unknown as number);
    // Not supported by current on-chain contract; fetch by id is unavailable.
    return undefined;
  }

  async getReceivedRecognitions(user: string): Promise<RecognitionRecord[]> {
    this.ensureValidAddress(user, 'user');
    const tx = await (this.client as any).get_volunteer_participations({ volunteer: user, offset: 0, limit: 100 });
    const sim = await tx.simulate();
    const items = (sim.result?.ok ?? sim.result) || [];
    return (items as any[]).map((p, idx) => ({
      id: (idx as unknown) as u32,
      sender: p.organization,
      receiver: p.volunteer,
      message: p.task_name,
      timestamp: Number(p.timestamp ?? 0),
    }));
  }

  async getSentRecognitions(user: string): Promise<RecognitionRecord[]> {
    this.ensureValidAddress(user, 'user');
    const tx = await (this.client as any).get_organization_participations({ organization: user, offset: 0, limit: 100 });
    const sim = await tx.simulate();
    const items = (sim.result?.ok ?? sim.result) || [];
    return (items as any[]).map((p, idx) => ({
      id: (idx as unknown) as u32,
      sender: p.organization,
      receiver: p.volunteer,
      message: p.task_name,
      timestamp: Number(p.timestamp ?? 0),
    }));
  }

  async getTotalRecognitions(user: string): Promise<u32> {
    const received = await this.getReceivedRecognitions(user);
    return (received.length as unknown) as u32;
  }
}

export const recognitionSystemService = new RecognitionSystemService();


