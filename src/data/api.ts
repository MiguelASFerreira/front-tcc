import { env } from "@/env";
import axios, { AxiosError } from "axios";

export const api = axios.create({
    baseURL: env.NEXT_PUBLIC_API_BASE_URL
}) 

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
    return axios.isAxiosError(error);
  }
  