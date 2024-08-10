import {
  DirectionType,
  Hostname,
  IAmadeus,
  LocationType,
  LogLevel,
  Options,
} from "./types/amadeus";
import { ReturnedResponse } from "./types/amadeus/client/response";

import Client from "./amadeus/client";
import ReferenceData from "./amadeus/namespaces/reference-data";
import Shopping from "./amadeus/namespaces/shopping";
import Booking from "./amadeus/namespaces/booking";
import Travel from "./amadeus/namespaces/travel";
import EReputation from "./amadeus/namespaces/e-reputation";
import Media from "./amadeus/namespaces/media";
import Ordering from "./amadeus/namespaces/ordering";
import Airport from "./amadeus/namespaces/airport";
import Pagination from "./amadeus/client/pagination";
import Schedule from "./amadeus/namespaces/schedule";
import Analytics from "./amadeus/namespaces/analytics";
import Airline from "./amadeus/namespaces/airline";
import Location from "./amadeus/namespaces/location";

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
export default class Amadeus implements IAmadeus {
  private client: Client;
  private version: string;

  public referenceData: ReferenceData;
  public shopping: Shopping;
  public booking: Booking;
  public travel: Travel;
  public eReputation: EReputation;
  public media: Media;
  public ordering: Ordering;
  public airport: Airport;
  public pagination: Pagination;
  public schedule: Schedule;
  public analytics: Analytics;
  public location: Location;
  public airline: Airline;

  static location: LocationType = {
    airport: "AIRPORT",
    city: "CITY",
    any: "AIRPORT,CITY",
  };

  static direction: DirectionType = {
    arriving: "ARRIVING",
    departing: "DEPARTING",
  };

  constructor(options: Options = {}) {
    this.client = new Client(options);
    this.version = this.client.version;

    this.referenceData = new ReferenceData(this.client);
    this.shopping = new Shopping(this.client);
    this.booking = new Booking(this.client);
    this.travel = new Travel(this.client);
    this.eReputation = new EReputation(this.client);
    this.media = new Media(this.client);
    this.ordering = new Ordering(this.client);
    this.airport = new Airport(this.client);
    this.pagination = new Pagination(this.client);
    this.schedule = new Schedule(this.client);
    this.analytics = new Analytics(this.client);
    this.location = new Location(this.client);
    this.airline = new Airline(this.client);
  }

  /**
   * The previous page for the given response. Resolves to null if the page
   * could not be found.
   *
   * ```ts
   * amadeus.referenceData.locations.get({
   *   keyword: 'LON',
   *   subType: 'AIRPORT,CITY',
   *   page: { offset: 2 }
   * }).then(function(response){
   *   console.log(response);
   *   return amadeus.previous(response);
   * }).then(function(previousPage){
   *   console.log(previousPage);
   * });
   * ```
   *
   * @param response the previous response for an API call
   * @return {Promise<Response|ResponseError>} a Promise
   */
  public previous(response: ReturnedResponse<any, any>): Promise<unknown> {
    return this.pagination.page("previous", response);
  }

  /**
   * The next page for the given response. Resolves to null if the page could
   * not be found.
   *
   * ```ts
   * amadeus.referenceData.locations.get({
   *   keyword: 'LON',
   *   subType: 'AIRPORT,CITY'
   * }).then(function(response){
   *   console.log(response);
   *   return amadeus.next(response);
   * }).then(function(nextPage){
   *   console.log(nextPage);
   * });
   * ```
   *
   * @param response the previous response for an API call
   * @return {Promise<Response|ResponseError>} a Promise
   */
  public next(response: ReturnedResponse<any, any>): Promise<unknown> {
    return this.pagination.page("next", response);
  }

  /**
   * The first page for the given response. Resolves to null if the page
   * could not be found.
   *
   * ```ts
   * amadeus.referenceData.locations.get({
   *   keyword: 'LON',
   *   subType: 'AIRPORT,CITY',
   *   page: { offset: 2 }
   * }).then(function(response){
   *   console.log(response);
   *   return amadeus.first(response);
   * }).then(function(firstPage){
   *   console.log(firstPage);
   * });
   * ```
   *
   * @param response the previous response for an API call
   * @return {Promise<Response|ResponseError>} a Promise
   */
  public first(response: ReturnedResponse<any, any>): Promise<unknown> {
    return this.pagination.page("first", response);
  }

  /**
   * The last page for the given response. Resolves to null if the page
   * could not be found.
   *
   * ```ts
   * amadeus.referenceData.locations.get({
   *   keyword: 'LON',
   *   subType: 'AIRPORT,CITY'
   * }).then(function(response){
   *   console.log(response);
   *   return amadeus.last(response);
   * }).then(function(lastPage){
   *   console.log(lastPage);
   * });
   * ```
   *
   * @param response the previous response for an API call
   * @return {Promise<Response|ResponseError>} a Promise
   */
  public last(response: ReturnedResponse<any, any>): Promise<unknown> {
    return this.pagination.page("last", response);
  }
}
