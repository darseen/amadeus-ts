import {
  Direction,
  Hostname,
  Location,
  LogLevel,
  Options,
} from "./types/amadeus";
import Client from "./amadeus/client";

/**
 * The Amadeus client library for accessing the travel APIs.
 *
 * Initialize using your credentials:
 *
 * ```ts
 * const Amadeus = require('amadeus');
 * const amadeus = new Amadeus({
 *     clientId:    'YOUR_CLIENT_ID',
 *     clientSecret: 'YOUR_CLIENT_SECRET'
 * });
 * ```
 *
 * Alternatively, initialize the library using
 * the environment variables `AMADEUS_CLIENT_ID`
 * and `AMADEUS_CLIENT_SECRET`
 *
 * ```ts
 * const amadeus = new Amadeus();
 * ```
 *
 * @param {Options} options
 * @param {string} options.clientId the API key used to authenticate the API
 * @param {string} options.clientSecret the API secret used to authenticate
 *  the API
 * @param {Console} [options.logger=console] a `console`-compatible logger that
 *  accepts `log`, `error` and `debug` calls.
 * @param {LogLevel} [options.logLevel='warn'] the log level for the client,
 *  available options are `debug`, `warn`, and `silent`
 * @param {Hostname} [options.hostname='production'] the name of the server API
 *  calls are made to (`production` or `test`)
 * @param {string} [options.host] the full domain or IP for a server to make the
 *  API call to. Only use this if you don't want to use the provided servers
 * @param {boolean} [options.ssl=true] wether to use SSL for this API call
 * @param {number} [options.port=443] the port to make the API call to
 * @param {string} [options.customAppId=null] a custom App ID to be passed in
 * the User Agent to the server.
 * @param {string} [options.customAppVersion=null] a custom App Version number to
 * be passed in the User Agent to the server.
 * @param {Object} [options.http=https] an optional Node/HTTP(S)-compatible client
 *  that accepts a 'request()' call with an array of options.
 *
 * @property {Client} client The client for making authenticated HTTP calls
 * @property {string} version The version of this API client
 * @property {Location} location A handy list of location types, to be used in the locations API.
 * @example
 *
 * ```ts
 * amadeus.referenceData.location.get({
 *   keyword: 'lon',
 *   subType: Amadeus.location.any
 * });
 * ```
 *
 * @property {Direction} direction A handy list of direction types, to be used in the Flight Busiest Period API.
 * @example
 *
 * ```ts
 * amadeus.travel.analytics.airTraffic.busiestPeriod.get({
 *   cityCode: 'par',
 *   period: 2015,
 *   direction: Amadeus.direction.arriving
 * });
 * ```
 *
 */
export default class Amadeus {
  private client: Client;
  private version: string;
  static location: Location = {
    airport: "AIRPORT",
    city: "CITY",
    any: "AIRPORT,CITY",
  };

  static direction: Direction = {
    arriving: "ARRIVING",
    departing: "DEPARTING",
  };

  constructor(options: Options = {}) {
    this.client = new Client(options);
    this.version = this.client.version;
  }
}
