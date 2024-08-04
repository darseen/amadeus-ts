import util from "node:util";
import { Hostname, LogLevel, Network, Options } from "../types/amadeus";
import Validator from "./client/validator";
import pkg from "../../package.json";

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
 * ```js
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
  // public accessToken: AccessToken;
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
  public customAppId?: string;
  public customAppVersion?: string;
  public http!: Network;

  constructor(options: Options = {}) {
    new Validator().validateAndInitialize(this, options);
    this.version = pkg.version;
  }

  /**
   * Logs the request, when in debug mode
   *
   * @param  {Request} request the request object to log
   * @private
   */
  public log(request: Request) {
    /* istanbul ignore next */
    if (this.debug()) {
      this.logger.log(util.inspect(request, false, null));
    }
  }

  /**
   * Determines if this client is in debug mode
   *
   * @return {boolean}
   */
  public debug() {
    return this.logLevel == "debug";
  }

  /**
   * Determines if this client is in warn or debug mode
   *
   * @return {boolean}
   */
  public warn() {
    return this.logLevel == "warn" || this.debug();
  }
}
