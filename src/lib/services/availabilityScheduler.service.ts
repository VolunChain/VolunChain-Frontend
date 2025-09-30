import { Client, networks } from '../../../packages/availability-scheduler';
import type { u32, u64 } from '@stellar/stellar-sdk/contract';
import type { Keypair } from '@stellar/stellar-sdk';

/**
 * Time input types that can be normalized to u64
 */
type TimeInput = Date | number | string | bigint;

/**
 * Availability time slot
 */
export interface AvailabilitySlot {
  start: u32;
  end: u32;
}

/**
 * Availability data for a specific day
 */
export interface DayAvailability {
  day: u32;
  timeSlots: AvailabilitySlot[];
}

/**
 * Service options for the Availability Scheduler
 */
export interface ServiceOptions {
  rpcUrl?: string;
  networkPassphrase?: string;
  contractId?: string;
}

/**
 * Write operation result
 */
export interface WriteResult {
  txHash: string;
  success: boolean;
}

/**
 * Availability Scheduler Service
 * 
 * A service that wraps the generated Availability Scheduler bindings and exposes
 * typed, easy-to-use methods for the frontend.
 */
export class AvailabilitySchedulerService {
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

  /**
   * Set the signer for write operations
   */
  setSigner(signer: Keypair): void {
    this.signer = signer;
  }

  /**
   * Normalize time input to u64 timestamp
   */
  private normalizeTime(time: TimeInput): u64 {
    if (typeof time === 'number') {
      // If it's already a timestamp, use it directly
      return BigInt(Math.floor(time));
    }
    
    if (typeof time === 'string') {
      // Parse string as timestamp or date
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

  /**
   * Validate that end time is greater than start time
   */
  private validateTimeRange(start: TimeInput, end: TimeInput): void {
    const startTime = this.normalizeTime(start);
    const endTime = this.normalizeTime(end);
    
    if (endTime <= startTime) {
      throw new Error('End time must be greater than start time');
    }
  }

  /**
   * Convert time inputs to u32 (seconds since epoch)
   */
  private timeToU32(time: TimeInput): u32 {
    const normalized = this.normalizeTime(time);
    return Number(normalized);
  }

  /**
   * Initialize the contract with an admin
   */
  async initialize(admin: string, signer?: Keypair): Promise<WriteResult> {
    const signerToUse = signer || this.signer;
    if (!signerToUse) {
      throw new Error('Signer is required for write operations');
    }

    try {
      const tx = await this.client.initialize({ admin });
      const result = await tx.signAndSend(signerToUse);
      
      return {
        txHash: result.hash,
        success: true,
      };
    } catch (error) {
      console.error('Failed to initialize contract:', error);
      return {
        txHash: '',
        success: false,
      };
    }
  }

  /**
   * Set availability for a user on a specific day
   */
  async setAvailability(
    user: string,
    day: u32,
    timeSlots: Array<{ start: TimeInput; end: TimeInput }>,
    signer?: Keypair
  ): Promise<WriteResult> {
    const signerToUse = signer || this.signer;
    if (!signerToUse) {
      throw new Error('Signer is required for write operations');
    }

    // Validate all time slots
    for (const slot of timeSlots) {
      this.validateTimeRange(slot.start, slot.end);
    }

    try {
      const normalizedSlots: Array<readonly [u32, u32]> = timeSlots.map(slot => [
        this.timeToU32(slot.start),
        this.timeToU32(slot.end)
      ]);

      const tx = await this.client.set_availability({
        volunteer: user,
        day,
        time_slots: normalizedSlots
      });
      
      const result = await tx.signAndSend(signerToUse);
      
      return {
        txHash: result.hash,
        success: true,
      };
    } catch (error) {
      console.error('Failed to set availability:', error);
      return {
        txHash: '',
        success: false,
      };
    }
  }

  /**
   * Update availability for a user (alias for setAvailability)
   */
  async updateAvailability(
    user: string,
    day: u32,
    timeSlots: Array<{ start: TimeInput; end: TimeInput }>,
    signer?: Keypair
  ): Promise<WriteResult> {
    return this.setAvailability(user, day, timeSlots, signer);
  }

  /**
   * Remove availability for a user on a specific day
   */
  async removeAvailability(
    user: string,
    day: u32,
    signer?: Keypair
  ): Promise<WriteResult> {
    // Remove availability by setting empty time slots
    return this.setAvailability(user, day, [], signer);
  }

  /**
   * Get availability for a user on a specific day
   */
  async getAvailability(user: string, day: u32): Promise<AvailabilitySlot[]> {
    try {
      const tx = await this.client.get_availability({ volunteer: user, day });
      const result = await tx.simulate();
      
      if (result.result) {
        return result.result.map((slot: readonly [u32, u32]) => ({
          start: slot[0],
          end: slot[1]
        }));
      }
      
      return [];
    } catch (error) {
      console.error('Failed to get availability:', error);
      return [];
    }
  }

  /**
   * Get availability by ID (alias for getAvailability)
   */
  async getAvailabilityById(user: string, day: u32): Promise<AvailabilitySlot[]> {
    return this.getAvailability(user, day);
  }

  /**
   * Get all availability for a user
   */
  async getAllAvailability(user: string): Promise<DayAvailability[]> {
    try {
      const tx = await this.client.get_all_availability({ volunteer: user });
      const result = await tx.simulate();
      
      if (result.result) {
        const availabilityMap = result.result;
        const entries = Array.from(availabilityMap.entries());
        return entries.map((entry) => {
          const [day, timeSlots] = entry as [u32, Array<readonly [u32, u32]>];
          return {
            day,
            timeSlots: timeSlots.map((slot: readonly [u32, u32]) => ({
              start: slot[0],
              end: slot[1]
            }))
          };
        });
      }
      
      return [];
    } catch (error) {
      console.error('Failed to get all availability:', error);
      return [];
    }
  }

  /**
   * Check for time conflicts with existing availability
   */
  async checkConflict(
    user: string,
    start: TimeInput,
    end: TimeInput
  ): Promise<boolean> {
    this.validateTimeRange(start, end);
    
    const startTime = this.timeToU32(start);
    const endTime = this.timeToU32(end);
    
    // Get all availability for the user
    const allAvailability = await this.getAllAvailability(user);
    
    // Check for conflicts across all days
    for (const dayAvailability of allAvailability) {
      for (const slot of dayAvailability.timeSlots) {
        // Check if the new time range overlaps with existing slots
        if (
          (startTime >= slot.start && startTime < slot.end) ||
          (endTime > slot.start && endTime <= slot.end) ||
          (startTime <= slot.start && endTime >= slot.end)
        ) {
          return true; // Conflict found
        }
      }
    }
    
    return false; // No conflicts
  }
}

// Export a default instance
export const availabilitySchedulerService = new AvailabilitySchedulerService();