import { IncomingHttpHeaders } from "http";
import Response from "../../../amadeus/client/response";
import Request from "../../../amadeus/client/request";

export interface IResponse<T, K> {
  headers: IncomingHttpHeaders;
  statusCode: number | undefined;
  body: string;
  result: T | null;
  data: K | null;
  parsed: boolean;
  request: Request;
}

export type ReturnedResponseError<T = unknown, K = unknown> = Omit<
  Response<T, K>,
  | "addChunk"
  | "parse"
  | "success"
  | "returnResponseError"
  | "returnResponseSuccess"
  | "error"
>;

export type ReturnedResponseSuccess<T, K> = Omit<
  ReturnedResponseError<T, K>,
  "result" | "data" | "statusCode"
> & {
  statusCode: number;
  result: T;
  data: K;
};
