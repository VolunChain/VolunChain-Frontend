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
        contractId: "CA6PFGLU5J3GGWV2CWLKOWS65CQPKDLHXTGW654AO3VXCGCGOJKSW6WJ",
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
        super(new ContractSpec(["AAAAAAAAAAAAAAAKaW5pdGlhbGl6ZQAAAAAAAQAAAAAAAAAFYWRtaW4AAAAAAAATAAAAAA==",
            "AAAAAAAAAAAAAAAQc2V0X2F2YWlsYWJpbGl0eQAAAAMAAAAAAAAACXZvbHVudGVlcgAAAAAAABMAAAAAAAAAA2RheQAAAAAEAAAAAAAAAAp0aW1lX3Nsb3RzAAAAAAPqAAAD7QAAAAIAAAAEAAAABAAAAAEAAAPpAAAD7QAAAAAAAAAD",
            "AAAAAAAAAAAAAAAQZ2V0X2F2YWlsYWJpbGl0eQAAAAIAAAAAAAAACXZvbHVudGVlcgAAAAAAABMAAAAAAAAAA2RheQAAAAAEAAAAAQAAA+oAAAPtAAAAAgAAAAQAAAAE",
            "AAAAAAAAAAAAAAAUZ2V0X2FsbF9hdmFpbGFiaWxpdHkAAAABAAAAAAAAAAl2b2x1bnRlZXIAAAAAAAATAAAAAQAAA+wAAAAEAAAD6gAAA+0AAAACAAAABAAAAAQ="]), options);
        this.options = options;
    }
    fromJSON = {
        initialize: (this.txFromJSON),
        set_availability: (this.txFromJSON),
        get_availability: (this.txFromJSON),
        get_all_availability: (this.txFromJSON)
    };
}
