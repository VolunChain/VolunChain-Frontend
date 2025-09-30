import { Buffer } from "buffer";
import { Address } from '@stellar/stellar-sdk';
import {
  AssembledTransaction,
  Client as ContractClient,
  ClientOptions as ContractClientOptions,
  MethodOptions,
  Result,
  Spec as ContractSpec,
} from '@stellar/stellar-sdk/contract';
import type {
  u32,
  i32,
  u64,
  i64,
  u128,
  i128,
  u256,
  i256,
  Option,
  Typepoint,
  Duration,
} from '@stellar/stellar-sdk/contract';
export * from '@stellar/stellar-sdk'
export * as contract from '@stellar/stellar-sdk/contract'
export * as rpc from '@stellar/stellar-sdk/rpc'

if (typeof window !== 'undefined') {
  //@ts-ignore Buffer exists
  window.Buffer = window.Buffer || Buffer;
}


export const networks = {
  testnet: {
    networkPassphrase: "Test SDF Network ; September 2015",
    contractId: "CCGUJ3DU2GBYL5DDXN2V7LHA2FZOZDY5HGY7MC5P7RBVFXYOJ47GYNQA",
  }
} as const

export const ContractError = {
  1: {message:"AlreadyInitialized"},
  2: {message:"NotInitialized"},
  3: {message:"Unauthorized"},
  4: {message:"NotOwner"},
  5: {message:"NotUpdater"},
  6: {message:"GoalNotFound"},
  7: {message:"TargetMustBePositive"},
  8: {message:"AmountToAddMustBePositive"},
  9: {message:"GoalAlreadyCompleted"},
  10: {message:"InvalidUpdaterAddress"},
  11: {message:"InvalidOwnerAddress"},
  12: {message:"NotAuthorized"}
}

export enum GoalType {
  TasksCompleted = 0,
  HoursVolunteered = 1,
  CertificationsEarned = 2,
}


export interface Goal {
  current_amount: u64;
  goal_type: GoalType;
  id: u64;
  is_completed: boolean;
  target_amount: u64;
  volunteer: string;
}

export type DataKey = {tag: "Admin", values: void} | {tag: "Updater", values: void} | {tag: "NextId", values: void} | {tag: "Goals", values: void} | {tag: "UserGoals", values: readonly [string]};

export interface Client {
  /**
   * Construct and simulate a initialize transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Initializes the contract, setting the admin and the initial progress updater.
   */
  initialize: ({admin, updater}: {admin: string, updater: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<void>>>

  /**
   * Construct and simulate a set_updater transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Allows the current admin to set a new progress updater address.
   * Requires authorization from the current admin.
   */
  set_updater: ({new_updater}: {new_updater: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<boolean>>>

  /**
   * Construct and simulate a set_admin transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  set_admin: ({new_admin}: {new_admin: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<boolean>>>

  /**
   * Construct and simulate a remove_updater transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  remove_updater: (options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<boolean>>>

  /**
   * Construct and simulate a create_goal transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  create_goal: ({volunteer, goal_type, target_amount}: {volunteer: string, goal_type: GoalType, target_amount: u64}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<u64>>>

  /**
   * Construct and simulate a update_progress transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  update_progress: ({goal_id, amount_to_add}: {goal_id: u64, amount_to_add: u64}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<boolean>>>

  /**
   * Construct and simulate a get_goal transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_goal: ({goal_id}: {goal_id: u64}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<Goal>>>

  /**
   * Construct and simulate a get_goals_by_user transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_goals_by_user: ({volunteer}: {volunteer: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<Array<u64>>>>

  /**
   * Construct and simulate a get_updater transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Retrieves the address of the current progress updater.
   */
  get_updater: (options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<string>>>

  /**
   * Construct and simulate a get_admin transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Retrieves the address of the current admin.
   */
  get_admin: (options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<string>>>

  /**
   * Construct and simulate a get_next_id transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Retrieves the next ID that will be assigned to a goal.
   */
  get_next_id: (options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<u64>>>

}
export class Client extends ContractClient {
  static async deploy<T = Client>(
    /** Options for initializing a Client as well as for calling a method, with extras specific to deploying. */
    options: MethodOptions &
      Omit<ContractClientOptions, "contractId"> & {
        /** The hash of the Wasm blob, which must already be installed on-chain. */
        wasmHash: Buffer | string;
        /** Salt used to generate the contract's ID. Passed through to {@link Operation.createCustomContract}. Default: random. */
        salt?: Buffer | Uint8Array;
        /** The format used to decode `wasmHash`, if it's provided as a string. */
        format?: "hex" | "base64";
      }
  ): Promise<AssembledTransaction<T>> {
    return ContractClient.deploy(null, options)
  }
  constructor(public readonly options: ContractClientOptions) {
    super(
      new ContractSpec([ "AAAABAAAAAAAAAAAAAAADUNvbnRyYWN0RXJyb3IAAAAAAAAMAAAAAAAAABJBbHJlYWR5SW5pdGlhbGl6ZWQAAAAAAAEAAAAAAAAADk5vdEluaXRpYWxpemVkAAAAAAACAAAAAAAAAAxVbmF1dGhvcml6ZWQAAAADAAAAAAAAAAhOb3RPd25lcgAAAAQAAAAAAAAACk5vdFVwZGF0ZXIAAAAAAAUAAAAAAAAADEdvYWxOb3RGb3VuZAAAAAYAAAAAAAAAFFRhcmdldE11c3RCZVBvc2l0aXZlAAAABwAAAAAAAAAZQW1vdW50VG9BZGRNdXN0QmVQb3NpdGl2ZQAAAAAAAAgAAAAAAAAAFEdvYWxBbHJlYWR5Q29tcGxldGVkAAAACQAAAAAAAAAVSW52YWxpZFVwZGF0ZXJBZGRyZXNzAAAAAAAACgAAAAAAAAATSW52YWxpZE93bmVyQWRkcmVzcwAAAAALAAAAAAAAAA1Ob3RBdXRob3JpemVkAAAAAAAADA==",
        "AAAAAwAAAAAAAAAAAAAACEdvYWxUeXBlAAAAAwAAAAAAAAAOVGFza3NDb21wbGV0ZWQAAAAAAAAAAAAAAAAAEEhvdXJzVm9sdW50ZWVyZWQAAAABAAAAAAAAABRDZXJ0aWZpY2F0aW9uc0Vhcm5lZAAAAAI=",
        "AAAAAQAAAAAAAAAAAAAABEdvYWwAAAAGAAAAAAAAAA5jdXJyZW50X2Ftb3VudAAAAAAABgAAAAAAAAAJZ29hbF90eXBlAAAAAAAH0AAAAAhHb2FsVHlwZQAAAAAAAAACaWQAAAAAAAYAAAAAAAAADGlzX2NvbXBsZXRlZAAAAAEAAAAAAAAADXRhcmdldF9hbW91bnQAAAAAAAAGAAAAAAAAAAl2b2x1bnRlZXIAAAAAAAAT",
        "AAAAAgAAAAAAAAAAAAAAB0RhdGFLZXkAAAAABQAAAAAAAAAAAAAABUFkbWluAAAAAAAAAAAAAAAAAAAHVXBkYXRlcgAAAAAAAAAAAAAAAAZOZXh0SWQAAAAAAAAAAAAAAAAABUdvYWxzAAAAAAAAAQAAAAAAAAAJVXNlckdvYWxzAAAAAAAAAQAAABM=",
        "AAAAAAAAAE1Jbml0aWFsaXplcyB0aGUgY29udHJhY3QsIHNldHRpbmcgdGhlIGFkbWluIGFuZCB0aGUgaW5pdGlhbCBwcm9ncmVzcyB1cGRhdGVyLgAAAAAAAAppbml0aWFsaXplAAAAAAACAAAAAAAAAAVhZG1pbgAAAAAAABMAAAAAAAAAB3VwZGF0ZXIAAAAAEwAAAAEAAAPpAAAD7QAAAAAAAAfQAAAADUNvbnRyYWN0RXJyb3IAAAA=",
        "AAAAAAAAAG5BbGxvd3MgdGhlIGN1cnJlbnQgYWRtaW4gdG8gc2V0IGEgbmV3IHByb2dyZXNzIHVwZGF0ZXIgYWRkcmVzcy4KUmVxdWlyZXMgYXV0aG9yaXphdGlvbiBmcm9tIHRoZSBjdXJyZW50IGFkbWluLgAAAAAAC3NldF91cGRhdGVyAAAAAAEAAAAAAAAAC25ld191cGRhdGVyAAAAABMAAAABAAAD6QAAAAEAAAfQAAAADUNvbnRyYWN0RXJyb3IAAAA=",
        "AAAAAAAAAAAAAAAJc2V0X2FkbWluAAAAAAAAAQAAAAAAAAAJbmV3X2FkbWluAAAAAAAAEwAAAAEAAAPpAAAAAQAAB9AAAAANQ29udHJhY3RFcnJvcgAAAA==",
        "AAAAAAAAAAAAAAAOcmVtb3ZlX3VwZGF0ZXIAAAAAAAAAAAABAAAD6QAAAAEAAAfQAAAADUNvbnRyYWN0RXJyb3IAAAA=",
        "AAAAAAAAAAAAAAALY3JlYXRlX2dvYWwAAAAAAwAAAAAAAAAJdm9sdW50ZWVyAAAAAAAAEwAAAAAAAAAJZ29hbF90eXBlAAAAAAAH0AAAAAhHb2FsVHlwZQAAAAAAAAANdGFyZ2V0X2Ftb3VudAAAAAAAAAYAAAABAAAD6QAAAAYAAAfQAAAADUNvbnRyYWN0RXJyb3IAAAA=",
        "AAAAAAAAAAAAAAAPdXBkYXRlX3Byb2dyZXNzAAAAAAIAAAAAAAAAB2dvYWxfaWQAAAAABgAAAAAAAAANYW1vdW50X3RvX2FkZAAAAAAAAAYAAAABAAAD6QAAAAEAAAfQAAAADUNvbnRyYWN0RXJyb3IAAAA=",
        "AAAAAAAAAAAAAAAIZ2V0X2dvYWwAAAABAAAAAAAAAAdnb2FsX2lkAAAAAAYAAAABAAAD6QAAB9AAAAAER29hbAAAB9AAAAANQ29udHJhY3RFcnJvcgAAAA==",
        "AAAAAAAAAAAAAAARZ2V0X2dvYWxzX2J5X3VzZXIAAAAAAAABAAAAAAAAAAl2b2x1bnRlZXIAAAAAAAATAAAAAQAAA+kAAAPqAAAABgAAB9AAAAANQ29udHJhY3RFcnJvcgAAAA==",
        "AAAAAAAAADZSZXRyaWV2ZXMgdGhlIGFkZHJlc3Mgb2YgdGhlIGN1cnJlbnQgcHJvZ3Jlc3MgdXBkYXRlci4AAAAAAAtnZXRfdXBkYXRlcgAAAAAAAAAAAQAAA+kAAAATAAAH0AAAAA1Db250cmFjdEVycm9yAAAA",
        "AAAAAAAAACtSZXRyaWV2ZXMgdGhlIGFkZHJlc3Mgb2YgdGhlIGN1cnJlbnQgYWRtaW4uAAAAAAlnZXRfYWRtaW4AAAAAAAAAAAAAAQAAA+kAAAATAAAH0AAAAA1Db250cmFjdEVycm9yAAAA",
        "AAAAAAAAADZSZXRyaWV2ZXMgdGhlIG5leHQgSUQgdGhhdCB3aWxsIGJlIGFzc2lnbmVkIHRvIGEgZ29hbC4AAAAAAAtnZXRfbmV4dF9pZAAAAAAAAAAAAQAAA+kAAAAGAAAH0AAAAA1Db250cmFjdEVycm9yAAAA" ]),
      options
    )
  }
  public readonly fromJSON = {
    initialize: this.txFromJSON<Result<void>>,
        set_updater: this.txFromJSON<Result<boolean>>,
        set_admin: this.txFromJSON<Result<boolean>>,
        remove_updater: this.txFromJSON<Result<boolean>>,
        create_goal: this.txFromJSON<Result<u64>>,
        update_progress: this.txFromJSON<Result<boolean>>,
        get_goal: this.txFromJSON<Result<Goal>>,
        get_goals_by_user: this.txFromJSON<Result<Array<u64>>>,
        get_updater: this.txFromJSON<Result<string>>,
        get_admin: this.txFromJSON<Result<string>>,
        get_next_id: this.txFromJSON<Result<u64>>
  }
}