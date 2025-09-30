// src/lib/services/nftCore.service.ts
// Wrapper around generated nft_core bindings with simple validation and pluggable signing.

import contractClient from "../contracts/nft_core";

// ---------- Types ----------
export type Address = string;
export type U64Like = number | string | bigint;

export interface Signer {
  /** Source address paying fees / tx source */
  address: Address;
  /** Sign + submit the prepared Soroban transaction XDR, return tx hash */
  send: (xdr: string) => Promise<string>;
}

export interface TxExtras {
  fee?: number;              // stroops
  timeoutInSeconds?: number; // tx timeout
}

export interface Token {
  id: bigint;           // u64
  owner: Address;
  metadata: string;
  // Add fields your contract returns, if any
}

// ---------- Utils ----------
function toU64(value: U64Like): bigint {
  if (typeof value === "bigint") return value;
  if (typeof value === "number") return BigInt(Math.floor(value));
  return BigInt(value);
}

function assertAddress(addr: string, field = "address"): void {
  if (!addr || typeof addr !== "string" || addr.trim().length === 0) {
    throw new Error(`Invalid ${field}: empty string`);
  }
}

function assertNonEmpty(text: string, field = "value"): void {
  if (!text || text.trim().length === 0) {
    throw new Error(`Invalid ${field}: cannot be empty`);
  }
}

function wrapErr(err: unknown, fn: string, args: unknown[]) {
  const msg = err instanceof Error ? err.message : String(err);
  return new Error(`[nft_core.${fn}] ${msg} | args=${JSON.stringify(args)}`);
}

function extractXdr(prepared: any): string | undefined {
  if (!prepared) return undefined;
  if (typeof prepared === "string") return prepared;
  return prepared.txXdr ?? prepared.xdr ?? prepared.tx ?? prepared.envelopeXdr;
}

function extractTxHash(res: any): string | undefined {
  if (!res) return undefined;
  if (typeof res === "string") return res;
  return res.txHash ?? res.hash ?? res.result?.hash;
}

// ---------- Core wrapper ----------
class NftCoreService {
  // ---- Low-level dynamic helpers (tolerant to binding shape differences) ----
  private async callView<T>(fn: string, args: any[]): Promise<T> {
    const client: any = contractClient as any;
    const method = client[fn];
    if (!method) throw new Error(`Method not found: ${fn}`);

    try {
      return await method(...args);
    } catch (e) {
      throw wrapErr(e, fn, args);
    }
  }

  /** Try to simulate and obtain the return value (e.g., tokenId for mint) */
  private async simulateReturn<T = unknown>(fn: string, args: any[]): Promise<T | undefined> {
    const client: any = contractClient as any;
    const method = client[fn];
    if (!method) return undefined;

    // Attempt common simulation shapes
    try {
      // shape A: method.simulate(...)
      if (typeof method.simulate === "function") {
        return await method.simulate(...args);
      }
    } catch {
      // continue
    }

    try {
      // shape B: method(...args, { simulate: true })
      return await method(...args, { simulate: true });
    } catch {
      // ignore: not all bindings expose simulate easily
    }

    try {
      // shape C: client.simulate(fn, args)
      if (typeof client.simulate === "function") {
        return await client.simulate(fn, ...args);
      }
    } catch {
      // ignore
    }

    return undefined;
  }

  /** Prepare tx (XDR) and submit via provided signer */
  private async submit(fn: string, args: any[], signer: Signer, extras?: TxExtras): Promise<string> {
    const client: any = contractClient as any;
    const method = client[fn];
    if (!method) throw new Error(`Method not found: ${fn}`);

    // Try builder pattern with signAndSend
    try {
      const builder = await method(...args);
      if (builder && typeof builder.signAndSend === "function") {
        const res = await builder.signAndSend(signer, {
          fee: extras?.fee,
          timeoutInSeconds: extras?.timeoutInSeconds,
        });
        const hash = extractTxHash(res);
        if (hash) return hash;
      }
    } catch {
      // fall through to manual XDR path
    }

    // Manual XDR path
    try {
      const prepared = await method(...args, {
        signAndSend: false,
        simulate: false,
        fee: extras?.fee,
        timeoutInSeconds: extras?.timeoutInSeconds,
      });
      const xdr = extractXdr(prepared);
      if (!xdr) throw new Error("Could not extract XDR from prepared tx");
      const hash = await signer.send(xdr);
      return hash;
    } catch (e) {
      throw wrapErr(e, fn, args);
    }
  }

  // ----------------- Public API (writes) -----------------
  async initialize(admin: Address, signer: Signer, extras?: TxExtras): Promise<string> {
    assertAddress(admin, "admin");
    return this.submit("initialize", [admin], signer, extras);
  }

  async mint(
    owner: Address,
    metadata: string,
    signer: Signer,
    extras?: TxExtras
  ): Promise<{ id: bigint; tx: string }> {
    assertAddress(owner, "owner");
    assertNonEmpty(metadata, "metadata");

    // Best-effort simulate to fetch tokenId before submit
    let id: bigint = BigInt(-1);
    const sim = (await this.simulateReturn<bigint>("mint", [owner, metadata])) as any;
    if (typeof sim === "bigint") id = sim;

    const tx = await this.submit("mint", [owner, metadata], signer, extras);
    return { id, tx };
  }

  async transfer(from: Address, to: Address, tokenId: U64Like, signer: Signer, extras?: TxExtras): Promise<string> {
    assertAddress(from, "from");
    assertAddress(to, "to");
    const id = toU64(tokenId);
    return this.submit("transfer", [from, to, id], signer, extras);
  }

  async burn(owner: Address, tokenId: U64Like, signer: Signer, extras?: TxExtras): Promise<string> {
    assertAddress(owner, "owner");
    const id = toU64(tokenId);
    return this.submit("burn", [owner, id], signer, extras);
  }

  async approve(owner: Address, spender: Address, tokenId: U64Like, signer: Signer, extras?: TxExtras): Promise<string> {
    assertAddress(owner, "owner");
    assertAddress(spender, "spender");
    const id = toU64(tokenId);
    return this.submit("approve", [owner, spender, id], signer, extras);
  }

  // ----------------- Public API (reads) -----------------
  async getToken(tokenId: U64Like): Promise<Token> {
    const id = toU64(tokenId);
    // Contract likely returns its own Token shape; adapt to your exact fields if needed
    // @ts-expect-error Binding shapes vary; we normalize minimally here
    const t = await this.callView<any>("get_token", [id]);
    return {
      id,
      owner: (t?.owner ?? t?.address ?? "") as Address,
      metadata: (t?.metadata ?? t?.uri ?? "") as string,
    };
  }

  async getOwner(tokenId: U64Like): Promise<Address> {
    const id = toU64(tokenId);
    return this.callView<Address>("get_owner", [id]);
  }

  async getApproved(tokenId: U64Like): Promise<Address> {
    const id = toU64(tokenId);
    return this.callView<Address>("get_approved", [id]);
  }

  async totalSupply(): Promise<bigint> {
    return this.callView<bigint>("total_supply", []);
  }

  async tokensOfOwner(owner: Address): Promise<bigint[]> {
    assertAddress(owner, "owner");
    return this.callView<bigint[]>("tokens_of_owner", [owner]);
  }
}

const nftCoreService = new NftCoreService();
export default nftCoreService;
