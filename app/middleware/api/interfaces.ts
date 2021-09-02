import { AxiosRequestConfig } from "axios";

export type RequestMethod = "get" | "put" | "post" | "delete";

interface StrIndexObject<Value = any> {
  [key: string]: Value;
}

export interface CallAPIOptionsParams extends StrIndexObject {
  include?: string;
  limit?: number;
  offset?: number;
  order?: string;
  where?: Record<string, unknown>;
  attributes?: string;
}

export interface CallAPIOptions extends AxiosRequestConfig {
  params?: CallAPIOptionsParams;
  data?: StrIndexObject;
}
