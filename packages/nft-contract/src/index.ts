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
    contractId: "CBYWHELZVM3Z4QRJKTDHUYMYDQT6LM6A6OLTXBWF6N6OW2IO3QO5KN7V",
  }
} as const

export type DataKey = {tag: "NFT", values: readonly [u128]} | {tag: "OwnerTokens", values: readonly [string]} | {tag: "TokenCount", values: void} | {tag: "Admin", values: void} | {tag: "AuthorizedMinters", values: void} | {tag: "ContractVersion", values: void} | {tag: "URIBase", values: void} | {tag: "Paused", values: void};


export interface NFT {
  id: u128;
  metadata: NFTMetadata;
  minted_at: u64;
  owner: string;
  transferable: boolean;
}


export interface NFTMetadata {
  attributes: Map<string, string>;
  creation_date: u64;
  description: string;
  issuer: string;
  title: string;
}


export interface NFTMintBatch {
  attributes: Array<Array<readonly [string, string]>>;
  descriptions: Array<string>;
  recipients: Array<string>;
  titles: Array<string>;
  transferable: Array<boolean>;
}


export interface ExternalURIMetadata {
  base_uri: string;
  token_uri_suffix: string;
}

export const NFTError = {
  1: {message:"TokenNotFound"},
  2: {message:"UnauthorizedMinter"},
  3: {message:"NotTokenOwner"},
  4: {message:"AdminRequired"},
  5: {message:"TokenAlreadyExists"},
  6: {message:"InvalidMetadata"},
  7: {message:"TokenNotTransferable"},
  8: {message:"ContractAlreadyInitialized"},
  9: {message:"InvalidAddress"},
  10: {message:"BatchDataMismatch"},
  11: {message:"MetadataTooLarge"},
  12: {message:"UpgradeNotAuthorized"},
  13: {message:"ContractPaused"},
  14: {message:"Unauthorized"},
  15: {message:"InitializationError"},
  16: {message:"InvalidInput"},
  17: {message:"InvalidBatchData"},
  18: {message:"InvalidRecipient"},
  19: {message:"BatchTooLarge"},
  20: {message:"ContractError"}
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
   * Construct and simulate a mint_nft transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  mint_nft: ({minter, recipient, title, description, attributes, transferable}: {minter: string, recipient: string, title: string, description: string, attributes: Array<readonly [string, string]>, transferable: boolean}, options?: {
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
  }) => Promise<AssembledTransaction<Result<u128>>>

  /**
   * Construct and simulate a batch_mint_nfts transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  batch_mint_nfts: ({minter, batch}: {minter: string, batch: NFTMintBatch}, options?: {
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
  }) => Promise<AssembledTransaction<Result<Array<u128>>>>

  /**
   * Construct and simulate a burn_nft transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  burn_nft: ({owner, token_id}: {owner: string, token_id: u128}, options?: {
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
   * Construct and simulate a add_authorized_minter transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  add_authorized_minter: ({admin, minter}: {admin: string, minter: string}, options?: {
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
   * Construct and simulate a remove_authorized_minter transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  remove_authorized_minter: ({admin, minter}: {admin: string, minter: string}, options?: {
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
   * Construct and simulate a set_uri_base transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  set_uri_base: ({admin, base_uri, suffix}: {admin: string, base_uri: string, suffix: string}, options?: {
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
   * Construct and simulate a pause_contract transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  pause_contract: ({admin}: {admin: string}, options?: {
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
   * Construct and simulate a unpause_contract transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  unpause_contract: ({admin}: {admin: string}, options?: {
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
   * Construct and simulate a upgrade_contract transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  upgrade_contract: ({admin, new_version}: {admin: string, new_version: u32}, options?: {
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
   * Construct and simulate a get_nft transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_nft: ({token_id}: {token_id: u128}, options?: {
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
  }) => Promise<AssembledTransaction<Result<NFT>>>

  /**
   * Construct and simulate a get_nfts_by_owner transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_nfts_by_owner: ({owner}: {owner: string}, options?: {
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
  }) => Promise<AssembledTransaction<Array<NFT>>>

  /**
   * Construct and simulate a get_nfts_by_owner_paginated transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_nfts_by_owner_paginated: ({owner, start_pos, limit}: {owner: string, start_pos: u32, limit: u32}, options?: {
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
  }) => Promise<AssembledTransaction<Array<NFT>>>

  /**
   * Construct and simulate a is_authorized_minter transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  is_authorized_minter: ({minter}: {minter: string}, options?: {
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
   * Construct and simulate a get_token_metadata transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_token_metadata: ({token_id}: {token_id: u128}, options?: {
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
  }) => Promise<AssembledTransaction<Result<NFTMetadata>>>

  /**
   * Construct and simulate a get_token_uri transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_token_uri: ({token_id}: {token_id: u128}, options?: {
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
  }) => Promise<AssembledTransaction<Option<string>>>

  /**
   * Construct and simulate a get_contract_version transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_contract_version: (options?: {
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
  }) => Promise<AssembledTransaction<u32>>

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
      new ContractSpec([ "AAAAAgAAAAAAAAAAAAAAB0RhdGFLZXkAAAAACAAAAAEAAAAAAAAAA05GVAAAAAABAAAACgAAAAEAAAAAAAAAC093bmVyVG9rZW5zAAAAAAEAAAATAAAAAAAAAAAAAAAKVG9rZW5Db3VudAAAAAAAAAAAAAAAAAAFQWRtaW4AAAAAAAAAAAAAAAAAABFBdXRob3JpemVkTWludGVycwAAAAAAAAAAAAAAAAAAD0NvbnRyYWN0VmVyc2lvbgAAAAAAAAAAAAAAAAdVUklCYXNlAAAAAAAAAAAAAAAABlBhdXNlZAAA",
        "AAAAAQAAAAAAAAAAAAAAA05GVAAAAAAFAAAAAAAAAAJpZAAAAAAACgAAAAAAAAAIbWV0YWRhdGEAAAfQAAAAC05GVE1ldGFkYXRhAAAAAAAAAAAJbWludGVkX2F0AAAAAAAABgAAAAAAAAAFb3duZXIAAAAAAAATAAAAAAAAAAx0cmFuc2ZlcmFibGUAAAAB",
        "AAAAAQAAAAAAAAAAAAAAC05GVE1ldGFkYXRhAAAAAAUAAAAAAAAACmF0dHJpYnV0ZXMAAAAAA+wAAAAQAAAAEAAAAAAAAAANY3JlYXRpb25fZGF0ZQAAAAAAAAYAAAAAAAAAC2Rlc2NyaXB0aW9uAAAAABAAAAAAAAAABmlzc3VlcgAAAAAAEwAAAAAAAAAFdGl0bGUAAAAAAAAQ",
        "AAAAAQAAAAAAAAAAAAAADE5GVE1pbnRCYXRjaAAAAAUAAAAAAAAACmF0dHJpYnV0ZXMAAAAAA+oAAAPqAAAD7QAAAAIAAAAQAAAAEAAAAAAAAAAMZGVzY3JpcHRpb25zAAAD6gAAABAAAAAAAAAACnJlY2lwaWVudHMAAAAAA+oAAAATAAAAAAAAAAZ0aXRsZXMAAAAAA+oAAAAQAAAAAAAAAAx0cmFuc2ZlcmFibGUAAAPqAAAAAQ==",
        "AAAAAQAAAAAAAAAAAAAAE0V4dGVybmFsVVJJTWV0YWRhdGEAAAAAAgAAAAAAAAAIYmFzZV91cmkAAAAQAAAAAAAAABB0b2tlbl91cmlfc3VmZml4AAAAEA==",
        "AAAABAAAAAAAAAAAAAAACE5GVEVycm9yAAAAFAAAAAAAAAANVG9rZW5Ob3RGb3VuZAAAAAAAAAEAAAAAAAAAElVuYXV0aG9yaXplZE1pbnRlcgAAAAAAAgAAAAAAAAANTm90VG9rZW5Pd25lcgAAAAAAAAMAAAAAAAAADUFkbWluUmVxdWlyZWQAAAAAAAAEAAAAAAAAABJUb2tlbkFscmVhZHlFeGlzdHMAAAAAAAUAAAAAAAAAD0ludmFsaWRNZXRhZGF0YQAAAAAGAAAAAAAAABRUb2tlbk5vdFRyYW5zZmVyYWJsZQAAAAcAAAAAAAAAGkNvbnRyYWN0QWxyZWFkeUluaXRpYWxpemVkAAAAAAAIAAAAAAAAAA5JbnZhbGlkQWRkcmVzcwAAAAAACQAAAAAAAAARQmF0Y2hEYXRhTWlzbWF0Y2gAAAAAAAAKAAAAAAAAABBNZXRhZGF0YVRvb0xhcmdlAAAACwAAAAAAAAAUVXBncmFkZU5vdEF1dGhvcml6ZWQAAAAMAAAAAAAAAA5Db250cmFjdFBhdXNlZAAAAAAADQAAAAAAAAAMVW5hdXRob3JpemVkAAAADgAAAAAAAAATSW5pdGlhbGl6YXRpb25FcnJvcgAAAAAPAAAAAAAAAAxJbnZhbGlkSW5wdXQAAAAQAAAAAAAAABBJbnZhbGlkQmF0Y2hEYXRhAAAAEQAAAAAAAAAQSW52YWxpZFJlY2lwaWVudAAAABIAAAAAAAAADUJhdGNoVG9vTGFyZ2UAAAAAAAATAAAAAAAAAA1Db250cmFjdEVycm9yAAAAAAAAFA==",
        "AAAAAAAAAAAAAAAKaW5pdGlhbGl6ZQAAAAAAAQAAAAAAAAAFYWRtaW4AAAAAAAATAAAAAQAAA+kAAAPtAAAAAAAAB9AAAAAITkZURXJyb3I=",
        "AAAAAAAAAAAAAAAIbWludF9uZnQAAAAGAAAAAAAAAAZtaW50ZXIAAAAAABMAAAAAAAAACXJlY2lwaWVudAAAAAAAABMAAAAAAAAABXRpdGxlAAAAAAAAEAAAAAAAAAALZGVzY3JpcHRpb24AAAAAEAAAAAAAAAAKYXR0cmlidXRlcwAAAAAD6gAAA+0AAAACAAAAEAAAABAAAAAAAAAADHRyYW5zZmVyYWJsZQAAAAEAAAABAAAD6QAAAAoAAAfQAAAACE5GVEVycm9y",
        "AAAAAAAAAAAAAAAPYmF0Y2hfbWludF9uZnRzAAAAAAIAAAAAAAAABm1pbnRlcgAAAAAAEwAAAAAAAAAFYmF0Y2gAAAAAAAfQAAAADE5GVE1pbnRCYXRjaAAAAAEAAAPpAAAD6gAAAAoAAAfQAAAACE5GVEVycm9y",
        "AAAAAAAAAAAAAAAIYnVybl9uZnQAAAACAAAAAAAAAAVvd25lcgAAAAAAABMAAAAAAAAACHRva2VuX2lkAAAACgAAAAEAAAPpAAAD7QAAAAAAAAfQAAAACE5GVEVycm9y",
        "AAAAAAAAAAAAAAAVYWRkX2F1dGhvcml6ZWRfbWludGVyAAAAAAAAAgAAAAAAAAAFYWRtaW4AAAAAAAATAAAAAAAAAAZtaW50ZXIAAAAAABMAAAABAAAD6QAAA+0AAAAAAAAH0AAAAAhORlRFcnJvcg==",
        "AAAAAAAAAAAAAAAYcmVtb3ZlX2F1dGhvcml6ZWRfbWludGVyAAAAAgAAAAAAAAAFYWRtaW4AAAAAAAATAAAAAAAAAAZtaW50ZXIAAAAAABMAAAABAAAD6QAAA+0AAAAAAAAH0AAAAAhORlRFcnJvcg==",
        "AAAAAAAAAAAAAAAMc2V0X3VyaV9iYXNlAAAAAwAAAAAAAAAFYWRtaW4AAAAAAAATAAAAAAAAAAhiYXNlX3VyaQAAABAAAAAAAAAABnN1ZmZpeAAAAAAAEAAAAAEAAAPpAAAD7QAAAAAAAAfQAAAACE5GVEVycm9y",
        "AAAAAAAAAAAAAAAOcGF1c2VfY29udHJhY3QAAAAAAAEAAAAAAAAABWFkbWluAAAAAAAAEwAAAAEAAAPpAAAD7QAAAAAAAAfQAAAACE5GVEVycm9y",
        "AAAAAAAAAAAAAAAQdW5wYXVzZV9jb250cmFjdAAAAAEAAAAAAAAABWFkbWluAAAAAAAAEwAAAAEAAAPpAAAD7QAAAAAAAAfQAAAACE5GVEVycm9y",
        "AAAAAAAAAAAAAAAQdXBncmFkZV9jb250cmFjdAAAAAIAAAAAAAAABWFkbWluAAAAAAAAEwAAAAAAAAALbmV3X3ZlcnNpb24AAAAABAAAAAEAAAPpAAAD7QAAAAAAAAfQAAAACE5GVEVycm9y",
        "AAAAAAAAAAAAAAAHZ2V0X25mdAAAAAABAAAAAAAAAAh0b2tlbl9pZAAAAAoAAAABAAAD6QAAB9AAAAADTkZUAAAAB9AAAAAITkZURXJyb3I=",
        "AAAAAAAAAAAAAAARZ2V0X25mdHNfYnlfb3duZXIAAAAAAAABAAAAAAAAAAVvd25lcgAAAAAAABMAAAABAAAD6gAAB9AAAAADTkZUAA==",
        "AAAAAAAAAAAAAAAbZ2V0X25mdHNfYnlfb3duZXJfcGFnaW5hdGVkAAAAAAMAAAAAAAAABW93bmVyAAAAAAAAEwAAAAAAAAAJc3RhcnRfcG9zAAAAAAAABAAAAAAAAAAFbGltaXQAAAAAAAAEAAAAAQAAA+oAAAfQAAAAA05GVAA=",
        "AAAAAAAAAAAAAAAUaXNfYXV0aG9yaXplZF9taW50ZXIAAAABAAAAAAAAAAZtaW50ZXIAAAAAABMAAAABAAAAAQ==",
        "AAAAAAAAAAAAAAASZ2V0X3Rva2VuX21ldGFkYXRhAAAAAAABAAAAAAAAAAh0b2tlbl9pZAAAAAoAAAABAAAD6QAAB9AAAAALTkZUTWV0YWRhdGEAAAAH0AAAAAhORlRFcnJvcg==",
        "AAAAAAAAAAAAAAANZ2V0X3Rva2VuX3VyaQAAAAAAAAEAAAAAAAAACHRva2VuX2lkAAAACgAAAAEAAAPoAAAAEA==",
        "AAAAAAAAAAAAAAAUZ2V0X2NvbnRyYWN0X3ZlcnNpb24AAAAAAAAAAQAAAAQ=" ]),
      options
    )
  }
  public readonly fromJSON = {
    initialize: this.txFromJSON<Result<void>>,
        mint_nft: this.txFromJSON<Result<u128>>,
        batch_mint_nfts: this.txFromJSON<Result<Array<u128>>>,
        burn_nft: this.txFromJSON<Result<void>>,
        add_authorized_minter: this.txFromJSON<Result<void>>,
        remove_authorized_minter: this.txFromJSON<Result<void>>,
        set_uri_base: this.txFromJSON<Result<void>>,
        pause_contract: this.txFromJSON<Result<void>>,
        unpause_contract: this.txFromJSON<Result<void>>,
        upgrade_contract: this.txFromJSON<Result<void>>,
        get_nft: this.txFromJSON<Result<NFT>>,
        get_nfts_by_owner: this.txFromJSON<Array<NFT>>,
        get_nfts_by_owner_paginated: this.txFromJSON<Array<NFT>>,
        is_authorized_minter: this.txFromJSON<boolean>,
        get_token_metadata: this.txFromJSON<Result<NFTMetadata>>,
        get_token_uri: this.txFromJSON<Option<string>>,
        get_contract_version: this.txFromJSON<u32>
  }
}