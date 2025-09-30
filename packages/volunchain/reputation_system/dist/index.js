import { Buffer } from "buffer";
import { Client as ContractClient, Spec as ContractSpec, } from '@stellar/stellar-sdk/contract';
export * from '@stellar/stellar-sdk';
export * as contract from '@stellar/stellar-sdk/contract';
export * as rpc from '@stellar/stellar-sdk/rpc';
if (typeof window !== 'undefined') {
    //@ts-ignore Buffer exists
    window.Buffer = window.Buffer || Buffer;
}
export const networks = {
    testnet: {
        networkPassphrase: "Test SDF Network ; September 2015",
        contractId: "CDJE7LPU4PKK2FG57OVUYPTXTJ2LOIFA6LWVVHYSEUG4EJEY2W4FIDLW",
    }
};
export class Client extends ContractClient {
    options;
    static async deploy(
    /** Options for initializing a Client as well as for calling a method, with extras specific to deploying. */
    options) {
        return ContractClient.deploy(null, options);
    }
    constructor(options) {
        super(new ContractSpec(["AAAAAgAAAAAAAAAAAAAAB0RhdGFLZXkAAAAABAAAAAEAAAAAAAAAClJlcHV0YXRpb24AAAAAAAEAAAATAAAAAQAAAAAAAAAMRW5kb3JzZW1lbnRzAAAAAQAAABMAAAAAAAAAAAAAAA1Pcmdhbml6YXRpb25zAAAAAAAAAQAAAAAAAAAGQmFkZ2VzAAAAAAABAAAAEw==",
            "AAAAAAAAAAAAAAAKaW5pdGlhbGl6ZQAAAAAAAQAAAAAAAAAFYWRtaW4AAAAAAAATAAAAAA==",
            "AAAAAAAAAAAAAAAQYWRkX29yZ2FuaXphdGlvbgAAAAIAAAAAAAAABWFkbWluAAAAAAAAEwAAAAAAAAADb3JnAAAAABMAAAAA",
            "AAAAAAAAAAAAAAARZW5kb3JzZV92b2x1bnRlZXIAAAAAAAAEAAAAAAAAAANvcmcAAAAAEwAAAAAAAAAJdm9sdW50ZWVyAAAAAAAAEwAAAAAAAAAFc2NvcmUAAAAAAAAEAAAAAAAAAAlfY2F0ZWdvcnkAAAAAAAARAAAAAA==",
            "AAAAAAAAAAAAAAAOZ2V0X3JlcHV0YXRpb24AAAAAAAEAAAAAAAAACXZvbHVudGVlcgAAAAAAABMAAAABAAAABA==",
            "AAAAAAAAAAAAAAARZ2V0X29yZ2FuaXphdGlvbnMAAAAAAAAAAAAAAQAAA+oAAAAT"]), options);
        this.options = options;
    }
    fromJSON = {
        initialize: (this.txFromJSON),
        add_organization: (this.txFromJSON),
        endorse_volunteer: (this.txFromJSON),
        get_reputation: (this.txFromJSON),
        get_organizations: (this.txFromJSON)
    };
}
