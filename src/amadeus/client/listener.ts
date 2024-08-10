import EventEmitter from "node:events";
import util from "node:util";
import Client from "../client";
import { IncomingMessage } from "http";
import Response from "./response";
import {
  AuthenticationError,
  ClientError,
  NetworkError,
  NotFoundError,
  ParserError,
  ResponseError,
  ServerError,
  UnknownError,
} from "./errors";
import Request from "./request";

/**
 * Listens to changes in the HTTP request and builds Response/ResponseError
 * objects accordingly.
 *
 * @param {Request} request the request object used to make the call. See {@link Request}
 * @param {EventEmitter} emitter a Node event emitter
 * @param {Client} client the client instance to log results to. See {@link Client}
 * @protected
 */

export default class Listener {
  private request: Request;
  private emitter: EventEmitter;
  private client: Client;

  constructor(request: Request, emitter: EventEmitter, client: Client) {
    this.request = request;
    this.emitter = emitter;
    this.client = client;
  }

  /**
   * Listens to various events on the http_response object, listening for data,
   * connections closing for bad reasons, and the end of the response.
   *
   * Used by the Client when making an API call.
   *
   * @param {IncomingMessage} httpResponse a Node http response object
   * @public
   */
  public onResponse(httpResponse: IncomingMessage) {
    const response = new Response(httpResponse, this.request);

    httpResponse.on("data", (data) => response.addChunk(data));
    httpResponse.on("end", () => this.onEnd(response));
    httpResponse.on("close", () => this.onNetworkError(response));
    httpResponse.on("error", () => this.onNetworkError(response));
  }

  /**
   * Listens to a network error when making an API call.
   *
   * Used by the Client when making an API call.
   *
   * @param  {IncomingMessage|Error} httpResponse a Node http response object
   * @public
   */

  public onError(error: Error) {
    const response = new Response(error, this.request);
    this.onNetworkError(response);
  }

  /**
   * When the connection ends, check if the response can be parsed or not and
   * act accordingly.
   *
   * @param  {Response} response
   * @private
   */
  private onEnd(response: Response): void {
    response.parse();
    if (response.success()) {
      this.onSuccess(response);
    } else {
      this.onFail(response);
    }
  }

  /**
   * When the response was successful, resolve the promise and return the
   * response object
   *
   * @param  {Response} response
   * @private
   */
  private onSuccess(response: Response): void {
    this.log(response);
    this.emitter.emit("resolve", response.returnResponse());
  }

  /**
   * When the connection was not successful, determine the reason and resolve
   * the promise accordingly.
   *
   * @param {Response} response
   * @private
   */
  private onFail(response: Response): void {
    const Error = this.errorFor({
      parsed: response.parsed,
      statusCode: response.statusCode,
    });
    const error = new Error(response);

    this.log(response, error);
    this.emitter.emit("reject", error);
  }

  /**
   * Find the right error for the given response.
   *
   * @param {Response} reponse
   * @returns {ResponseError}
   */
  private errorFor({
    statusCode,
    parsed,
  }: {
    statusCode: number | undefined;
    parsed: boolean;
  }): typeof ResponseError {
    if (statusCode === undefined) return NetworkError;
    if (statusCode >= 500) return ServerError;
    else if (statusCode === 401) return AuthenticationError;
    else if (statusCode === 404) return NotFoundError;
    else if (statusCode >= 400) return ClientError;
    else if (!parsed) return ParserError;
    else return UnknownError;
  }

  /**
   * When the connection ran into a network error, reject the promise with a
   * NetworkError.
   *
   * @param  {Response} response
   * @private
   */
  private onNetworkError(response: Response): void {
    response.parse();
    const error = new NetworkError(response);
    this.log(response, error);
    this.emitter.emit("reject", error);
  }

  /**
   * Logs the response, when in debug mode
   *
   * @param  {Response} response the response object to log
   * @private
   */
  private log(response: Response, error: ResponseError | null = null): void {
    if (this.client.debug()) {
      this.client.logger.log(util.inspect(response, false, null));
    }
    if (!this.client.debug() && this.client.warn() && error) {
      this.client.logger.log("Amadeus", error.code, error.description);
    }
  }
}
