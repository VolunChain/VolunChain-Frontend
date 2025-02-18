import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig } from "axios";
 
export class BaseApi {
  protected httpClient: AxiosInstance;

  constructor(baseUrl?: string) {
    const config: AxiosRequestConfig = {
      baseURL: baseUrl ?? process.env.NEXT_PUBLIC_BASE_URL ?? "",
      timeout: 10000,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    this.httpClient = axios.create(config)
  }
}