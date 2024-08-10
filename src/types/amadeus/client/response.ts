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

export type ReturnedResponse<T = unknown, K = unknown> = Omit<
  Response<T, K>,
  "addChunk" | "parse" | "success" | "returnResponse" | "error"
>;
