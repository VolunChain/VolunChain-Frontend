import axios, { AxiosInstance } from "axios";

export class BaseApi {
  protected axios: AxiosInstance;

  constructor(baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL || "") {
    this.axios = axios.create({
      baseURL: baseUrl,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
