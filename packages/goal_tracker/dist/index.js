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
        contractId: "CCGUJ3DU2GBYL5DDXN2V7LHA2FZOZDY5HGY7MC5P7RBVFXYOJ47GYNQA",
    }
};
export const ContractError = {
    1: { message: "AlreadyInitialized" },
    2: { message: "NotInitialized" },
    3: { message: "Unauthorized" },
    4: { message: "NotOwner" },
    5: { message: "NotUpdater" },
    6: { message: "GoalNotFound" },
    7: { message: "TargetMustBePositive" },
    8: { message: "AmountToAddMustBePositive" },
    9: { message: "GoalAlreadyCompleted" },
    10: { message: "InvalidUpdaterAddress" },
    11: { message: "InvalidOwnerAddress" },
    12: { message: "NotAuthorized" }
};
export var GoalType;
(function (GoalType) {
    GoalType[GoalType["TasksCompleted"] = 0] = "TasksCompleted";
    GoalType[GoalType["HoursVolunteered"] = 1] = "HoursVolunteered";
    GoalType[GoalType["CertificationsEarned"] = 2] = "CertificationsEarned";
})(GoalType || (GoalType = {}));
export class Client extends ContractClient {
    options;
    static async deploy(
    /** Options for initializing a Client as well as for calling a method, with extras specific to deploying. */
    options) {
        return ContractClient.deploy(null, options);
    }
    constructor(options) {
        super(new ContractSpec(["AAAABAAAAAAAAAAAAAAADUNvbnRyYWN0RXJyb3IAAAAAAAAMAAAAAAAAABJBbHJlYWR5SW5pdGlhbGl6ZWQAAAAAAAEAAAAAAAAADk5vdEluaXRpYWxpemVkAAAAAAACAAAAAAAAAAxVbmF1dGhvcml6ZWQAAAADAAAAAAAAAAhOb3RPd25lcgAAAAQAAAAAAAAACk5vdFVwZGF0ZXIAAAAAAAUAAAAAAAAADEdvYWxOb3RGb3VuZAAAAAYAAAAAAAAAFFRhcmdldE11c3RCZVBvc2l0aXZlAAAABwAAAAAAAAAZQW1vdW50VG9BZGRNdXN0QmVQb3NpdGl2ZQAAAAAAAAgAAAAAAAAAFEdvYWxBbHJlYWR5Q29tcGxldGVkAAAACQAAAAAAAAAVSW52YWxpZFVwZGF0ZXJBZGRyZXNzAAAAAAAACgAAAAAAAAATSW52YWxpZE93bmVyQWRkcmVzcwAAAAALAAAAAAAAAA1Ob3RBdXRob3JpemVkAAAAAAAADA==",
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
            "AAAAAAAAADZSZXRyaWV2ZXMgdGhlIG5leHQgSUQgdGhhdCB3aWxsIGJlIGFzc2lnbmVkIHRvIGEgZ29hbC4AAAAAAAtnZXRfbmV4dF9pZAAAAAAAAAAAAQAAA+kAAAAGAAAH0AAAAA1Db250cmFjdEVycm9yAAAA"]), options);
        this.options = options;
    }
    fromJSON = {
        initialize: (this.txFromJSON),
        set_updater: (this.txFromJSON),
        set_admin: (this.txFromJSON),
        remove_updater: (this.txFromJSON),
        create_goal: (this.txFromJSON),
        update_progress: (this.txFromJSON),
        get_goal: (this.txFromJSON),
        get_goals_by_user: (this.txFromJSON),
        get_updater: (this.txFromJSON),
        get_admin: (this.txFromJSON),
        get_next_id: (this.txFromJSON)
    };
}
