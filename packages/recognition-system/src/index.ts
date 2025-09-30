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
    contractId: "CDW42IZUE3VO42JYSKIQOUXOGZHKU2UBZJWA6HYFSN2RBGAQ23GNZUST",
  }
} as const

export const ContractError = {
  1: {message:"AlreadyInitialized"},
  2: {message:"NotAuthorized"},
  10: {message:"TaskNameTooLong"},
  11: {message:"MetadataTooLong"},
  12: {message:"InvalidPaginationArguments"},
  13: {message:"TaskIdTooLong"},
  14: {message:"TaskIdEmpty"},
  15: {message:"PaginationLimitExceeded"},
  16: {message:"InvalidTimestamp"},
  17: {message:"OrganizationNameTooLong"},
  18: {message:"OrganizationNameEmpty"},
  19: {message:"InvalidAddress"},
  101: {message:"OrganizationAlreadyRegistered"},
  102: {message:"OrganizationNotRegistered"},
  103: {message:"TooManyOrganizations"},
  201: {message:"ParticipationAlreadyRegistered"},
  202: {message:"ParticipationNotFound"}
}

export type DataKey = {tag: "Admin", values: void} | {tag: "Organization", values: readonly [string]} | {tag: "OrganizationList", values: void} | {tag: "ParticipationRecord", values: readonly [ParticipationKey]} | {tag: "VolunteerParticipations", values: readonly [string]} | {tag: "TaskVolunteers", values: readonly [string]} | {tag: "OrgParticipationList", values: readonly [string]};


export interface ParticipationKey {
  task_id: string;
  volunteer: string;
}


export interface Participation {
  metadata: Option<string>;
  organization: string;
  task_id: string;
  task_name: string;
  timestamp: u64;
  volunteer: string;
}

export interface Client {
  /**
   * Construct and simulate a initialize transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  initialize: ({admin}: {admin: string}, options?: {
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
   * Construct and simulate a register_organization transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  register_organization: ({admin, organization, name}: {admin: string, organization: string, name: string}, options?: {
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
   * Construct and simulate a remove_organization transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  remove_organization: ({admin, organization}: {admin: string, organization: string}, options?: {
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
   * Construct and simulate a is_organization transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  is_organization: ({organization}: {organization: string}, options?: {
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
  }) => Promise<AssembledTransaction<boolean>>

  /**
   * Construct and simulate a get_all_organizations transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_all_organizations: (options?: {
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
  }) => Promise<AssembledTransaction<Array<string>>>

  /**
   * Construct and simulate a register_participation transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  register_participation: ({organization, volunteer, task_id, task_name, metadata}: {organization: string, volunteer: string, task_id: string, task_name: string, metadata: Option<string>}, options?: {
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
   * Construct and simulate a verify_participation transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  verify_participation: ({volunteer, task_id}: {volunteer: string, task_id: string}, options?: {
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
  }) => Promise<AssembledTransaction<boolean>>

  /**
   * Construct and simulate a get_participation_details transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_participation_details: ({volunteer, task_id}: {volunteer: string, task_id: string}, options?: {
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
  }) => Promise<AssembledTransaction<Result<Participation>>>

  /**
   * Construct and simulate a get_volunteer_participations transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_volunteer_participations: ({volunteer, offset, limit}: {volunteer: string, offset: u32, limit: u32}, options?: {
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
  }) => Promise<AssembledTransaction<Result<Array<Participation>>>>

  /**
   * Construct and simulate a get_task_volunteers transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_task_volunteers: ({task_id, offset, limit}: {task_id: string, offset: u32, limit: u32}, options?: {
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
  }) => Promise<AssembledTransaction<Result<Array<string>>>>

  /**
   * Construct and simulate a get_organization_participations transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_organization_participations: ({organization, offset, limit}: {organization: string, offset: u32, limit: u32}, options?: {
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
  }) => Promise<AssembledTransaction<Result<Array<Participation>>>>

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
      new ContractSpec([ "AAAABAAAAAAAAAAAAAAADUNvbnRyYWN0RXJyb3IAAAAAAAARAAAAAAAAABJBbHJlYWR5SW5pdGlhbGl6ZWQAAAAAAAEAAAAAAAAADU5vdEF1dGhvcml6ZWQAAAAAAAACAAAAAAAAAA9UYXNrTmFtZVRvb0xvbmcAAAAACgAAAAAAAAAPTWV0YWRhdGFUb29Mb25nAAAAAAsAAAAAAAAAGkludmFsaWRQYWdpbmF0aW9uQXJndW1lbnRzAAAAAAAMAAAAAAAAAA1UYXNrSWRUb29Mb25nAAAAAAAADQAAAAAAAAALVGFza0lkRW1wdHkAAAAADgAAAAAAAAAXUGFnaW5hdGlvbkxpbWl0RXhjZWVkZWQAAAAADwAAAAAAAAAQSW52YWxpZFRpbWVzdGFtcAAAABAAAAAAAAAAF09yZ2FuaXphdGlvbk5hbWVUb29Mb25nAAAAABEAAAAAAAAAFU9yZ2FuaXphdGlvbk5hbWVFbXB0eQAAAAAAABIAAAAAAAAADkludmFsaWRBZGRyZXNzAAAAAAATAAAAAAAAAB1Pcmdhbml6YXRpb25BbHJlYWR5UmVnaXN0ZXJlZAAAAAAAAGUAAAAAAAAAGU9yZ2FuaXphdGlvbk5vdFJlZ2lzdGVyZWQAAAAAAABmAAAAAAAAABRUb29NYW55T3JnYW5pemF0aW9ucwAAAGcAAAAAAAAAHlBhcnRpY2lwYXRpb25BbHJlYWR5UmVnaXN0ZXJlZAAAAAAAyQAAAAAAAAAVUGFydGljaXBhdGlvbk5vdEZvdW5kAAAAAAAAyg==",
        "AAAAAgAAAAAAAAAAAAAAB0RhdGFLZXkAAAAABwAAAAAAAAAAAAAABUFkbWluAAAAAAAAAQAAAAAAAAAMT3JnYW5pemF0aW9uAAAAAQAAABMAAAAAAAAAAAAAABBPcmdhbml6YXRpb25MaXN0AAAAAQAAAAAAAAATUGFydGljaXBhdGlvblJlY29yZAAAAAABAAAH0AAAABBQYXJ0aWNpcGF0aW9uS2V5AAAAAQAAAAAAAAAXVm9sdW50ZWVyUGFydGljaXBhdGlvbnMAAAAAAQAAABMAAAABAAAAAAAAAA5UYXNrVm9sdW50ZWVycwAAAAAAAQAAABAAAAABAAAAAAAAABRPcmdQYXJ0aWNpcGF0aW9uTGlzdAAAAAEAAAAT",
        "AAAAAQAAAAAAAAAAAAAAEFBhcnRpY2lwYXRpb25LZXkAAAACAAAAAAAAAAd0YXNrX2lkAAAAABAAAAAAAAAACXZvbHVudGVlcgAAAAAAABM=",
        "AAAAAQAAAAAAAAAAAAAADVBhcnRpY2lwYXRpb24AAAAAAAAGAAAAAAAAAAhtZXRhZGF0YQAAA+gAAAAQAAAAAAAAAAxvcmdhbml6YXRpb24AAAATAAAAAAAAAAd0YXNrX2lkAAAAABAAAAAAAAAACXRhc2tfbmFtZQAAAAAAABAAAAAAAAAACXRpbWVzdGFtcAAAAAAAAAYAAAAAAAAACXZvbHVudGVlcgAAAAAAABM=",
        "AAAAAAAAAAAAAAAKaW5pdGlhbGl6ZQAAAAAAAQAAAAAAAAAFYWRtaW4AAAAAAAATAAAAAQAAA+kAAAPtAAAAAAAAB9AAAAANQ29udHJhY3RFcnJvcgAAAA==",
        "AAAAAAAAAAAAAAAVcmVnaXN0ZXJfb3JnYW5pemF0aW9uAAAAAAAAAwAAAAAAAAAFYWRtaW4AAAAAAAATAAAAAAAAAAxvcmdhbml6YXRpb24AAAATAAAAAAAAAARuYW1lAAAAEAAAAAEAAAPpAAAD7QAAAAAAAAfQAAAADUNvbnRyYWN0RXJyb3IAAAA=",
        "AAAAAAAAAAAAAAATcmVtb3ZlX29yZ2FuaXphdGlvbgAAAAACAAAAAAAAAAVhZG1pbgAAAAAAABMAAAAAAAAADG9yZ2FuaXphdGlvbgAAABMAAAABAAAD6QAAA+0AAAAAAAAH0AAAAA1Db250cmFjdEVycm9yAAAA",
        "AAAAAAAAAAAAAAAPaXNfb3JnYW5pemF0aW9uAAAAAAEAAAAAAAAADG9yZ2FuaXphdGlvbgAAABMAAAABAAAAAQ==",
        "AAAAAAAAAAAAAAAVZ2V0X2FsbF9vcmdhbml6YXRpb25zAAAAAAAAAAAAAAEAAAPqAAAAEw==",
        "AAAAAAAAAAAAAAAWcmVnaXN0ZXJfcGFydGljaXBhdGlvbgAAAAAABQAAAAAAAAAMb3JnYW5pemF0aW9uAAAAEwAAAAAAAAAJdm9sdW50ZWVyAAAAAAAAEwAAAAAAAAAHdGFza19pZAAAAAAQAAAAAAAAAAl0YXNrX25hbWUAAAAAAAAQAAAAAAAAAAhtZXRhZGF0YQAAA+gAAAAQAAAAAQAAA+kAAAPtAAAAAAAAB9AAAAANQ29udHJhY3RFcnJvcgAAAA==",
        "AAAAAAAAAAAAAAAUdmVyaWZ5X3BhcnRpY2lwYXRpb24AAAACAAAAAAAAAAl2b2x1bnRlZXIAAAAAAAATAAAAAAAAAAd0YXNrX2lkAAAAABAAAAABAAAAAQ==",
        "AAAAAAAAAAAAAAAZZ2V0X3BhcnRpY2lwYXRpb25fZGV0YWlscwAAAAAAAAIAAAAAAAAACXZvbHVudGVlcgAAAAAAABMAAAAAAAAAB3Rhc2tfaWQAAAAAEAAAAAEAAAPpAAAH0AAAAA1QYXJ0aWNpcGF0aW9uAAAAAAAH0AAAAA1Db250cmFjdEVycm9yAAAA",
        "AAAAAAAAAAAAAAAcZ2V0X3ZvbHVudGVlcl9wYXJ0aWNpcGF0aW9ucwAAAAMAAAAAAAAACXZvbHVudGVlcgAAAAAAABMAAAAAAAAABm9mZnNldAAAAAAABAAAAAAAAAAFbGltaXQAAAAAAAAEAAAAAQAAA+kAAAPqAAAH0AAAAA1QYXJ0aWNpcGF0aW9uAAAAAAAH0AAAAA1Db250cmFjdEVycm9yAAAA",
        "AAAAAAAAAAAAAAATZ2V0X3Rhc2tfdm9sdW50ZWVycwAAAAADAAAAAAAAAAd0YXNrX2lkAAAAABAAAAAAAAAABm9mZnNldAAAAAAABAAAAAAAAAAFbGltaXQAAAAAAAAEAAAAAQAAA+kAAAPqAAAAEwAAB9AAAAANQ29udHJhY3RFcnJvcgAAAA==",
        "AAAAAAAAAAAAAAAfZ2V0X29yZ2FuaXphdGlvbl9wYXJ0aWNpcGF0aW9ucwAAAAADAAAAAAAAAAxvcmdhbml6YXRpb24AAAATAAAAAAAAAAZvZmZzZXQAAAAAAAQAAAAAAAAABWxpbWl0AAAAAAAABAAAAAEAAAPpAAAD6gAAB9AAAAANUGFydGljaXBhdGlvbgAAAAAAB9AAAAANQ29udHJhY3RFcnJvcgAAAA==" ]),
      options
    )
  }
  public readonly fromJSON = {
    initialize: this.txFromJSON<Result<void>>,
        register_organization: this.txFromJSON<Result<void>>,
        remove_organization: this.txFromJSON<Result<void>>,
        is_organization: this.txFromJSON<boolean>,
        get_all_organizations: this.txFromJSON<Array<string>>,
        register_participation: this.txFromJSON<Result<void>>,
        verify_participation: this.txFromJSON<boolean>,
        get_participation_details: this.txFromJSON<Result<Participation>>,
        get_volunteer_participations: this.txFromJSON<Result<Array<Participation>>>,
        get_task_volunteers: this.txFromJSON<Result<Array<string>>>,
        get_organization_participations: this.txFromJSON<Result<Array<Participation>>>
  }
}