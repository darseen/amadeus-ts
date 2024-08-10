import { IncomingHttpHeaders, IncomingMessage } from "http";
import Request from "./request";
import { ReturnedResponse } from "../../types/amadeus/client/response";

const JSON_CONTENT_TYPES = ["application/json", "application/vnd.amadeus+json"];

/**
 * The response object returned for every API call.
 *
 * @param {Object} http_response the response object returned from the Node/HTTP
 *  request
 * @param {Request} request the request object used to make this API call
 *
 * @property {number} statusCode the HTTP status code for the response, if any
 * @property {string} body the raw body received from the API
 * @property {Object} result the parsed JSON received from the API
 * @property {Object} data the data attribute taken from the result
 * @property {boolean} parsed wether the raw body has been parsed into JSON
 * @property {Request} request the request object used to make this API call
 * @property {Error} error the error that could have been thrown by the onError method in the listener class
 *
 */
export default class Response<T = unknown, K = unknown> {
  public headers: IncomingHttpHeaders;
  public statusCode: number | undefined;
  public body: string;
  public result: T | null;
  public data: K | null;
  public parsed: boolean;
  public request: Request;
  private error: Error | null;

  constructor(http_response: IncomingMessage | Error, request: Request) {
    // check if the incoming response is an error passed from the onError method in the listener class
    if (http_response instanceof Error) {
      this.headers = {};
      this.statusCode = undefined;
      this.error = http_response;
    }
    // if it's not an instance of error, then it's an http response that could be a success or an error response form the server
    else {
      this.headers = http_response.headers || {};
      this.statusCode = http_response.statusCode;
      this.error = null;
    }

    this.request = request;
    this.body = "";
    this.result = null;
    this.data = null;
    this.parsed = false;
  }

  /**
   * Add a chunk received from the API to the body
   *
   * @param {string} chunk a chunk of data
   * @public
   */
  public addChunk(chunk: string): void {
    if (!this.error) this.body += chunk;
  }

  /**
   * Tries to parse the raw data
   * @public
   */
  public parse(): void {
    if (this.error) return;

    try {
      if (this.statusCode === 204) return;

      if (this.isJson()) {
        this.result = JSON.parse(this.body);
        this.data = (this.result as T & { data: K }).data;
        this.parsed = true;
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.error = error;
      }
    }
  }

  /**
   * Whether this API call can be considered a success. Used to wrap the response
   * into a ResponseError
   *
   * @return {boolean}
   * @public
   */
  public success(): boolean {
    if (this.error) return false;

    if (
      this.statusCode === 204 ||
      (this.parsed && this.statusCode && this.statusCode < 300)
    ) {
      return true;
    }

    return false;
  }

  /**
   * Tests if the content is seemingly JSON
   *
   * @return {boolean}
   * @private
   */
  private isJson(): boolean {
    return JSON_CONTENT_TYPES.indexOf(this.headers["content-type"]!) !== -1;
  }

  /**
   * This method return only the data that the user need,
   * and removes the ablility to use any of the public methods that can be used to manipulate the response.
   *
   * @return {ReturnedResponse}
   * @public
   */
  public returnResponse(): ReturnedResponse {
    return {
      headers: this.headers,
      statusCode: this.statusCode,
      body: this.body,
      result: this.result,
      data: this.data,
      parsed: this.parsed,
      request: this.request,
    } as ReturnedResponse;
  }
}
