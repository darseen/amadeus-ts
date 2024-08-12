import { ReturnedResponseError } from "../../types/amadeus/client/response";
import { Issue } from "../../types/amadeus/namespaces/shared";
import Response from "./response";

/**
 * The error that is passed to the Promise when the API call fails.
 *
 * @param {Response} response the {@link Response} object containing the raw
 *  http response and the {@link Request} instance that made the API call.
 * @property {Response} response the {@link Response} object containing the raw
 *  http response and the {@link Request} instance that made the API call.
 * @property {string} code a unique code for this type of error. Options include
 *  `NetworkError`, `ParserError`, `ResponseError`, `ServerError`,
 *  `AuthenticationError`, `NotFoundError` and `UnknownError`
 *  from the  {@link Response}'s parsed data
 */
export class ResponseError {
  public response: ReturnedResponseError;
  public code!: string;
  public description!: Issue[] | Object | null;

  constructor(response: Response) {
    this.response = response.returnResponseError();
    this.determineDescription();
  }

  private determineDescription(): void {
    if (!this.response || !this.response.parsed) {
      this.description = null;
      return;
    }
    const result = this.response.result;
    if (
      result &&
      typeof result === "object" &&
      "errors" in result &&
      result.errors
    ) {
      this.description = result.errors as Issue[];
    } else if (result) {
      this.description = result as {};
    }
  }
}

export class NetworkError extends ResponseError {
  constructor(...args: [any]) {
    super(...args);
    this.code = "NetworkError";
  }
}

export class ParserError extends ResponseError {
  constructor(...args: [any]) {
    super(...args);
    this.code = "ParserError";
  }
}

export class ServerError extends ResponseError {
  constructor(...args: [any]) {
    super(...args);
    this.code = "ServerError";
  }
}

export class ClientError extends ResponseError {
  constructor(...args: [any]) {
    super(...args);
    this.code = "ClientError";
  }
}

export class AuthenticationError extends ResponseError {
  constructor(...args: [any]) {
    super(...args);
    this.code = "AuthenticationError";
  }
}

export class NotFoundError extends ResponseError {
  constructor(...args: [any]) {
    super(...args);
    this.code = "NotFoundError";
  }
}

export class UnknownError extends ResponseError {
  constructor(...args: [any]) {
    super(...args);
    this.code = "UnknownError";
  }
}
