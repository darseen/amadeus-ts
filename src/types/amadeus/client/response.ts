import Response from "../../../amadeus/client/response";

export type ReturnedResponse<T = unknown, K = unknown> = Omit<
  Response<T, K>,
  "addChunk" | "parse" | "success" | "returnResponse" | "error"
>;
