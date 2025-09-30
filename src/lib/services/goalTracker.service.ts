import { Client, networks, GoalType } from '../../../packages/goal_tracker';
import type { u32, u64 } from '@stellar/stellar-sdk/contract';
import type { Keypair } from '@stellar/stellar-sdk';

type U64Input = number | string | bigint;

export interface CreateGoalResult {
  id: number;
  txHash: string;
}

export interface WriteTxResult {
  txHash: string;
}

export interface Goal {
  id: number;
  volunteer: string;
  goal_type: GoalType;
  target_amount: bigint;
  current_amount: bigint;
  is_completed: boolean;
  title?: string;
  description?: string;
  deadline?: bigint;
}

function toU64(value: U64Input, field: string): u64 {
  if (typeof value === 'bigint') return value;
  if (typeof value === 'number') {
    if (!Number.isFinite(value) || value < 0) throw new Error(`${field} must be a non-negative number`);
    return BigInt(Math.floor(value));
  }
  if (typeof value === 'string') {
    if (!/^[0-9]+$/.test(value)) throw new Error(`${field} must be a base-10 unsigned integer string`);
    return BigInt(value);
  }
  throw new Error(`${field} must be u64 compatible`);
}

function toU32(value: number | string | bigint, field: string): u32 {
  const u = toU64(value, field);
  const n = Number(u);
  if (!Number.isInteger(n) || n < 0 || n > 0xffffffff) {
    throw new Error(`${field} must fit in u32`);
  }
  return n as unknown as u32;
}

function requireNonEmpty(v: string, field: string): string {
  const s = (v ?? '').trim();
  if (!s) throw new Error(`${field} is required`);
  return s;
}

function requireSigner(signer?: Keypair): Keypair {
  if (!signer) throw new Error('Signer is required for write operations');
  return signer;
}

export class GoalTrackerService {
  private client: Client;

  constructor() {
    this.client = new Client({
      rpcUrl: 'https://soroban-testnet.stellar.org',
      networkPassphrase: networks.testnet.networkPassphrase,
      contractId: networks.testnet.contractId,
    });
  }

  // initialize(admin, signer) -> tx
  async initialize(admin: string, signer: Keypair): Promise<WriteTxResult> {
    requireSigner(signer);
    const adminAddress = requireNonEmpty(admin, 'admin');
    const tx = await this.client.initialize({ admin: adminAddress, updater: adminAddress });
    const res = await tx.signAndSend(signer);
    return { txHash: res.hash };
  }

  // createGoal(user, title, description, target, deadline, signer) -> { id, tx }
  async createGoal(
    user: string,
    title: string,
    description: string,
    target: U64Input,
    deadline: U64Input,
    signer: Keypair
  ): Promise<CreateGoalResult> {
    requireSigner(signer);
    const volunteer = requireNonEmpty(user, 'user');
    requireNonEmpty(title, 'title');
    requireNonEmpty(description, 'description');
    const targetAmount = toU64(target, 'target');
    // deadline provided in seconds -> u64
    toU64(deadline, 'deadline');

    // The contract bindings expose create_goal(volunteer, goal_type, target_amount)
    // Title/description/deadline are not supported in the current contract, so we validate but do not send.
    const tx = await this.client.create_goal({
      volunteer,
      goal_type: GoalType.TasksCompleted,
      target_amount: targetAmount,
    });
    const res = await tx.signAndSend(signer);

    // We need the created id; result is u64 in simulation on the assembled tx
    const sim = await tx.simulate();
    const idBig = (sim.result ?? 0n) as u64;
    const id = Number(idBig);
    if (!Number.isInteger(id) || id < 0 || id > 0xffffffff) {
      throw new Error('Created goal id does not fit in u32');
    }

    return { id, txHash: res.hash };
  }

  // updateGoal(user, goalId, progress, signer) -> tx
  async updateGoal(user: string, goalId: number | string | bigint, progress: U64Input, signer: Keypair): Promise<WriteTxResult> {
    requireSigner(signer);
    requireNonEmpty(user, 'user');
    const goal_id = toU64(goalId, 'goalId');
    const amount_to_add = toU64(progress, 'progress');
    const tx = await this.client.update_progress({ goal_id, amount_to_add });
    const res = await tx.signAndSend(signer);
    return { txHash: res.hash };
  }

  // completeGoal(user, goalId, signer) -> tx
  async completeGoal(user: string, goalId: number | string | bigint, signer: Keypair): Promise<WriteTxResult> {
    // Not directly supported by contract; emulate by adding remaining amount to reach target.
    requireSigner(signer);
    requireNonEmpty(user, 'user');
    const g = await this.getGoal(goalId);
    if (g.is_completed) return { txHash: '' };
    const remaining = g.target_amount - g.current_amount;
    if (remaining <= 0n) return { txHash: '' };
    const tx = await this.client.update_progress({ goal_id: toU64(goalId, 'goalId'), amount_to_add: remaining });
    const res = await tx.signAndSend(signer);
    return { txHash: res.hash };
  }

  // deleteGoal(user, goalId, signer) -> tx
  async deleteGoal(_user: string, _goalId: number | string | bigint, _signer: Keypair): Promise<WriteTxResult> {
    // Contract has no delete; throw to make behavior explicit.
    throw new Error('deleteGoal is not supported by the current goal_tracker contract');
  }

  // getGoal(goalId)
  async getGoal(goalId: number | string | bigint): Promise<Goal> {
    const goal_id = toU64(goalId, 'goalId');
    const tx = await this.client.get_goal({ goal_id });
    const sim = await tx.simulate();
    const r = sim.result as unknown as {
      id: u64; volunteer: string; goal_type: GoalType; target_amount: u64; current_amount: u64; is_completed: boolean;
    };
    return {
      id: Number(r.id),
      volunteer: r.volunteer,
      goal_type: r.goal_type,
      target_amount: r.target_amount,
      current_amount: r.current_amount,
      is_completed: r.is_completed,
    };
  }

  // getUserGoals(user)
  async getUserGoals(user: string): Promise<number[]> {
    const volunteer = requireNonEmpty(user, 'user');
    const tx = await this.client.get_goals_by_user({ volunteer });
    const sim = await tx.simulate();
    const ids = (sim.result ?? []) as u64[];
    return ids.map((id) => Number(id));
  }

  // getGoalStatus(goalId)
  async getGoalStatus(goalId: number | string | bigint): Promise<'pending' | 'completed'> {
    const g = await this.getGoal(goalId);
    return g.is_completed ? 'completed' : 'pending';
  }
}

export const goalTrackerService = new GoalTrackerService();


