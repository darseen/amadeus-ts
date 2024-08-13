import util from "node:util";
import { Hostname, LogLevel, Network, Options } from "../../types/amadeus";
import Validator from "./validator";
import Request from "./request";
import pkg from "../../../package.json";
import AccessToken from "./access-token";
import { Verb } from "../../types/amadeus/client";
import EventEmitter from "node:events";
import Listener from "./listener";
import { ReturnedResponseSuccess } from "../../types/amadeus/client/response";
import { ResponseError } from "./errors";

/**
 * A convenient wrapper around the API, allowing for generic, authenticated and
 * unauthenticated API calls without having to manage the serialization,
 * desrialization, and authentication.
 *
 * Generally you do not need to use this object directly. Instead it is used
 * indirectly by the various namespaced methods for every API call.
 *
 * For example, the following are the semantically the same.
 *
 * ```ts
 * amadeus.client.get('/v1/reference-data/urls/checkin-links', options);
 * amadeus.amadeus.reference_data.urls.checkin_links.get(options);
 * ```
 *
 * @param {Options} options a list of options. See {@link Amadeus} .
 * @property {string} clientId the API key used to authenticate the API
 * @property {string} clientSecret the API secret used to authenticate
 *  the API
 * @property {Console} logger the `console`-compatible logger used to debug calls
 * @property {LogLevel} logLevel the log level for the client, available options
 *  are `debug`, `warn`, and `silent`. Defaults to 'silent'
 * @property {string} host the hostname of the server API calls are made to
 * @property {number} port the port the server API calls are made to
 * @property {boolean} ssl wether an SSL request is made to the server
 * @property {string} customAppId the custom App ID to be passed in the User
 *  Agent to the server
 * @property {string} customAppVersion the custom App Version number to be
 *  passed in the User Agent to the server
 * @property {Object} http the Node/HTTP(S)-compatible client used to make
 *  requests
 * @property {string} version The version of this API client
 */
export default class Client implements Options {
  private accessToken: AccessToken;
  public version: string;

  // These properties will be initialized in the Validator class
  public clientId!: string;
  public clientSecret!: string;
  public logger!: Console;
  public logLevel!: LogLevel;
  public hostname!: Hostname;
  public host!: string;
  public ssl!: boolean;
  public port!: number;
  public http!: Network;
  public customAppId?: string;
  public customAppVersion?: string;

  constructor(options: Options = {}) {
    new Validator().validateAndInitialize(this, options);
    this.accessToken = new AccessToken();
    this.version = pkg.version;
  }

  /**
   * Make an authenticated GET API call.
   *
   * ```ts
   * amadeus.client.get('/v2/foo/bar', { some: 'data' });
   * ```
   * @param {string} path the full path of the API endpoint
   * @param {Object} [params={}] the query string parameters
   * @return {Promise<Response|ResponseError>} a Promise
   */
  public get<T, K = unknown>(
    path: string,
    params: object = {}
  ): Promise<ReturnedResponseSuccess<T, K>> {
    return this.request<T, K>("GET", path, params);
  }

  /**
   * Make an authenticated POST API call.
   *
   * ```ts
   * amadeus.client.post('/v2/foo/bar', { some: 'data' });
   * ```
   * @param {string} path the full path of the API endpoint
   * @param {Object} [params={}] the POST parameters
   * @return {Promise<Response|ResponseError>} a Promise
   */
  public post<T, K = unknown>(
    path: string,
    params: object | string = {}
  ): Promise<ReturnedResponseSuccess<T, K>> {
    return this.request<T, K>("POST", path, params);
  }

  /**
   * Make an authenticated DELETE API call.
   *
   * ```ts
   * amadeus.client.delete('/v2/foo/bar', { some: 'data' });
   * ```
   * @param {string} path the full path of the API endpoint
   * @param {Object} [params={}] the query string parameters
   * @return {Promise<Response|ResponseError>} a Promise
   */
  public delete<T, K>(
    path: string,
    params: object = {}
  ): Promise<ReturnedResponseSuccess<T, K>> {
    return this.request<T, K>("DELETE", path, params);
  }

  /**
   * Make an authenticated API call.
   *
   * ```ts
   * amadeus.client.call('GET', '/v2/foo/bar', { some: 'data' });
   * ```
   * @param {Verb} verb the HTTP method, for example `GET` or `POST`
   * @param {string} path the full path of the API endpoint
   * @param {Object} [params={}] the POST parameters
   * @return {Promise<Response|ResponseError>} a Promise
   * @public
   */
  public async request<T, K>(
    verb: Verb,
    path: string,
    params: object | string = {}
  ): Promise<ReturnedResponseSuccess<T, K>> {
    const bearerToken = (await this.accessToken.bearerToken(this)) as string;
    return this.unauthenticatedRequest<T, K>(verb, path, params, bearerToken);
  }

  /**
   * Make any kind of API call, authenticated or not
   *
   * Used by the .get, .post methods to make API calls.
   *
   * Sets up a new Promise and then excutes the API call, triggering the Promise
   * to be called when the API call fails or succeeds.
   *
   * @param {Verb} verb the HTTP method, for example `GET` or `POST`
   * @param {string} path the full path of the API endpoint
   * @param {Object} params the parameters to pass in the query or body
   * @param {string} [bearerToken=null] the BearerToken as generated by the
   *  AccessToken class
   * @return {Promise<Response|ResponseError>} a Promise
   * @public
   */
  public unauthenticatedRequest<T, K>(
    verb: Verb,
    path: string,
    params: object | string = {},
    bearerToken: string | null = null
  ): Promise<ReturnedResponseSuccess<T, K>> {
    const request = this.buildRequest(verb, path, params, bearerToken);
    this.log(request);
    const emitter = new EventEmitter();
    const promise = this.buildPromise<T, K>(emitter);

    this.execute(request, emitter);
    return promise;
  }

  /**
   * Actually executes the API call.
   *
   * @param {Request} request the request to execute
   * @param {EventEmitter} emitter the event emitter to notify of changes
   * @private
   */
  private execute(request: Request, emitter: EventEmitter): void {
    const http_request = this.http.request(request.options());
    const listener = new Listener(request, emitter, this);

    http_request.on("response", (response) => listener.onResponse(response));
    http_request.on("error", (error) => listener.onError(error));

    http_request.write(request.body());
    http_request.end();
  }

  /**
   * Builds a Request object to be used in the API call
   *
   * @param {Verb} verb the HTTP method, for example `GET` or `POST`
   * @param {string} path the full path of the API endpoint
   * @param {Object} params the parameters to pass in the query or body
   * @param {string} [bearerToken=null] the BearerToken as generated by the
   *  AccessToken class
   * @return {Request}
   * @private
   */
  private buildRequest(
    verb: Verb,
    path: string,
    params: Object,
    bearerToken: string | null = null
  ): Request {
    return new Request({
      host: this.host,
      verb: verb,
      path: path,
      params: params,
      bearerToken: bearerToken,
      clientVersion: this.version,
      languageVersion: process.versions.node,
      appId: this.customAppId || null,
      appVersion: this.customAppVersion || null,
      port: this.port,
      ssl: this.ssl,
    });
  }

  /**
   * Builds a Promise to be returned to the API user
   *
   * @param  {EventEmitter} emitter the event emitter to notify of changes
   * @return {Promise} a promise
   * @private
   */
  private buildPromise<T, K>(
    emitter: EventEmitter
  ): Promise<ReturnedResponseSuccess<T, K>> {
    return new Promise((resolve, reject) => {
      emitter.on("resolve", (response) =>
        resolve(response as ReturnedResponseSuccess<T, K>)
      );
      emitter.on("reject", (error) => reject(error));
    });
  }

  /**
   * Logs the request, when in debug mode
   *
   * @param {Request} request the request object to log
   * @public
   */
  public log(request: Request): void {
    if (this.debug()) {
      this.logger.log(util.inspect(request, false, null));
    }
  }

  /**
   * Determines if this client is in debug mode
   *
   * @return {boolean}
   */
  public debug(): boolean {
    return this.logLevel === "debug";
  }

  /**
   * Determines if this client is in warn or debug mode
   *
   * @return {boolean}
   */
  public warn(): boolean {
    return this.logLevel === "warn" || this.debug();
  }
}
