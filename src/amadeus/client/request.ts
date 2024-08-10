import qs from "qs";
import { Verb } from "../../types/amadeus/client";
import {
  IRequest,
  ListHTTPOverrideItem,
} from "../../types/amadeus/client/request";
import { RequestOptions } from "https";
import { OutgoingHttpHeaders } from "http2";
import { ListHTTPOverride } from "../../constants";

/**
 * A Request object containing all the compiled information about this request.
 *
 * @property {string} host the host used for this API call
 * @property {number} port the port for this API call. Standard set to 443.
 * @property {boolean} ssl wether this API call uses SSL
 * @property {string} scheme the scheme inferred from the SSL state
 * @property {Verb} verb the HTTP method, for example `GET` or `POST`
 * @property {string} path the full path of the API endpoint
 * @property {Object} params the parameters to pass in the query or body
 * @property {string} queryPath the path and query string used for the API call
 * @property {string} bearerToken the authentication token
 * @property {string} clientVersion the version of the Amadeus library
 * @property {string} languageVersion the version of Node used
 * @property {string} appId the custom ID of the application using this library
 * @property {string} appVersion the custom version of the application
 *  using this library
 * @property {Record<string, string>} headers the request headers
 *
 * @param {Object} options
 */
export default class Request implements IRequest {
  appId: string | null;
  appVersion: string | null;
  bearerToken: string | null;
  clientVersion: string;
  headers: OutgoingHttpHeaders;
  host: string;
  languageVersion: string;
  params: any;
  path: string;
  port: number;
  queryPath: string;
  scheme: string;
  ssl: boolean;
  verb: Verb;

  constructor(options: Omit<IRequest, "headers" | "scheme" | "queryPath">) {
    this.host = options.host;
    this.port = options.port;
    this.ssl = options.ssl;
    this.scheme = this.ssl ? "https" : "http";
    this.verb = options.verb;
    this.path = options.path;
    this.params = options.params;
    this.queryPath = this.fullQueryPath();
    this.bearerToken = options.bearerToken;
    this.clientVersion = options.clientVersion;
    this.languageVersion = options.languageVersion;
    this.appId = options.appId;
    this.appVersion = options.appVersion;
    this.headers = {
      "User-Agent": this.userAgent(),
      Accept: "application/json, application/vnd.amadeus+json",
    };

    this.addAuthorizationHeader();
    this.addContentTypeHeader();
    this.addHTTPOverrideHeader();
  }

  /**
   * Compiles the options for the HTTP request.
   *
   * Used by Client.execute when executing this request against the server.
   *
   * @return {RequestOptions} an associative object of options to be passed into the
   *  Client.execute function
   * @public
   */
  public options(): RequestOptions {
    return {
      host: this.host,
      port: this.port,
      protocol: `${this.scheme}:`,
      path: this.queryPath,
      method: this.verb,
      headers: this.headers,
    };
  }

  /**
   * Creats the body for the API call, serializing the params if the verb is POST.
   *
   * @return {any} the serialized params
   * @public
   */
  public body(): any {
    if (this.verb !== "POST") return "";
    if (!this.bearerToken) return qs.stringify(this.params);
    return this.params;
  }

  /**
   * Build up the custom User Agent
   *
   * @return {string} a user agent in the format "library/version language/version app/version"
   * @private
   */
  private userAgent(): string {
    const userAgent = `amadeus-ts/${this.clientVersion} node/${this.languageVersion}`;
    if (!this.appId) return userAgent;
    return `${userAgent} ${this.appId}/${this.appVersion}`;
  }

  /**
   * Build the full query path, combining the path with the query params if the
   * verb is 'GET'. For example: '/foo/bar?baz=qux'
   *
   * @return {string} the path and params combined into one string.
   * @private
   */

  private fullQueryPath(): string {
    if (this.verb === "POST") return this.path;
    return `${this.path}?${qs.stringify(this.params)}`;
  }

  /**
   * Adds an Authorization header if the BearerToken is present
   *
   * @private
   */
  private addAuthorizationHeader(): void {
    if (!this.bearerToken) return;
    this.headers["Authorization"] = `Bearer ${this.bearerToken}`;
  }

  /**
   * Adds a Content-Type header if the HTTP method equals POST
   *
   * @private
   */
  private addContentTypeHeader(): void {
    if (this.verb === "POST" && !this.bearerToken) {
      this.headers["Content-Type"] = "application/x-www-form-urlencoded";
    } else {
      this.headers["Content-Type"] = "application/vnd.amadeus+json";
    }
  }

  /**
   * Adds HTTPOverride method if it is required
   *
   *  @private
   */
  private addHTTPOverrideHeader(): void {
    if (
      this.verb === "POST" &&
      ListHTTPOverride.includes(this.path as ListHTTPOverrideItem)
    ) {
      this.headers["X-HTTP-Method-Override"] = "GET";
    }
  }
}
