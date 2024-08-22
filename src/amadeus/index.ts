import {
  DirectionType,
  Hostname,
  IAmadeus,
  LocationType,
  LogLevel,
  Options,
} from "../types/amadeus";
import { ReturnedResponseSuccess } from "../types/amadeus/client/response";
import { ResponseError } from "./client/errors";

// Client And Namespaces
import Client from "./client";
import ReferenceData from "./namespaces/reference-data";
import Shopping from "./namespaces/shopping";
import Booking from "./namespaces/booking";
import Travel from "./namespaces/travel";
import EReputation from "./namespaces/e-reputation";
import Media from "./namespaces/media";
import Ordering from "./namespaces/ordering";
import Airport from "./namespaces/airport";
import Pagination from "./client/pagination";
import Schedule from "./namespaces/schedule";
import Analytics from "./namespaces/analytics";
import Airline from "./namespaces/airline";
import Location from "./namespaces/location";

// Shared Types
import type {
  TravelClass,
  DocumentType,
  CurrencyCode,
  TravelerType,
  DiscountType,
  DiscountTravelerType,
  Traveler,
  Contact,
  Address,
  Phone,
  CreditCardBrand,
  OtherPaymentMethod,
  PaymentBrand,
} from "../types/amadeus/namespaces/shared";

// Namespaces Types

// flight-offers-search
import type {
  FlightOffersSearchPostParams,
  FlightOffersSearchGetParams,
  FlightOffersSearchPostResult,
  FlightOffersSearchGetResult,
} from "../types/amadeus/namespaces/shopping/flight-offers-search";

// flight-offers-pricing
import type {
  FlightOffersPricingAdditionalParams,
  FlightOffersPricingParams,
  FlightOffersPricingResult,
} from "../types/amadeus/namespaces/shopping/flight-offers/pricing";

// flight-offers-prediction
import type {
  FlightOffersPredictionParams,
  FlightOffersPredictionResult,
} from "../types/amadeus/namespaces/shopping/flight-offers/flight-choice-prediction";

// flight-offers-upselling
import type {
  FlightOffersUpsellingParams,
  FlightOffersUpsellingResult,
} from "../types/amadeus/namespaces/shopping/flight-offers/upselling";

// flight-dates
import type {
  FlightDatesParams,
  FlightDatesResult,
} from "../types/amadeus/namespaces/shopping/flight-dates";

// flight-destinations
import type {
  FlightDestinationsParams,
  FlightDestinationsResult,
} from "../types/amadeus/namespaces/shopping/flight-destinations";

// seatmaps
import type {
  SeatmapsGetParams,
  SeatmapsGetResult,
  SeatmapsPostParams,
  SeatmapsPostResult,
} from "../types/amadeus/namespaces/shopping/seatmaps";

// flight-availabilities
import type {
  FlightAvailabilitiesParams,
  FlightAvailabilitiesResult,
} from "../types/amadeus/namespaces/shopping/availability/flight-availabilities";

// itinerary-price-metrics
import type {
  ItineraryPriceMetricsParams,
  ItineraryPriceMetricsResult,
} from "../types/amadeus/namespaces/analytics/itinerary-price-metrics";

// flight-order
import type { FlightOrderGetResult } from "../types/amadeus/namespaces/booking/flight-order";

// flight-orders
import type {
  FlightOrdersParams,
  FlightOrdersResult,
} from "../types/amadeus/namespaces/booking/flight-orders";

// flight-delay-prediction
import type {
  FlightDelayPredictionParams,
  FlightDelayPredictionResult,
} from "../types/amadeus/namespaces/travel/predictions/flight-delay";

// recommended-locations
import type {
  RecommendedLocationsParams,
  RecommendedLocationsResult,
} from "../types/amadeus/namespaces/reference-data/recommended-locations";

// schedule-flights
import type {
  ScheduleFlightsParams,
  ScheduleFlightsResult,
} from "../types/amadeus/namespaces/schedule/flights";

// airport-predictions-on-time
import type {
  AirpoerPredictionsOnTimeParams,
  AirpoerPredictionsOnTimeResult,
} from "../types/amadeus/namespaces/airport/predictions/on-time";

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
  public previous(
    response: ReturnedResponseSuccess<any, any>
  ): Promise<unknown> {
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
  public next(response: ReturnedResponseSuccess<any, any>): Promise<unknown> {
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
  public first(response: ReturnedResponseSuccess<any, any>): Promise<unknown> {
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
  public last(response: ReturnedResponseSuccess<any, any>): Promise<unknown> {
    return this.pagination.page("last", response);
  }
}

export { ResponseError };

export type {
  TravelClass,
  DocumentType,
  CurrencyCode,
  TravelerType,
  DiscountType,
  DiscountTravelerType,
  Traveler,
  Contact,
  Address,
  Phone,
  CreditCardBrand,
  OtherPaymentMethod,
  PaymentBrand,
  FlightOffersSearchGetParams,
  FlightOffersSearchPostParams,
  FlightOffersSearchGetResult,
  FlightOffersSearchPostResult,
  FlightOffersPricingParams,
  FlightOffersPricingResult,
  FlightOffersPricingAdditionalParams,
  FlightOffersPredictionParams,
  FlightOffersPredictionResult,
  FlightOffersUpsellingParams,
  FlightOffersUpsellingResult,
  FlightDatesParams,
  FlightDatesResult,
  FlightDestinationsParams,
  FlightDestinationsResult,
  SeatmapsGetParams,
  SeatmapsGetResult,
  SeatmapsPostParams,
  SeatmapsPostResult,
  FlightAvailabilitiesParams,
  FlightAvailabilitiesResult,
  ItineraryPriceMetricsParams,
  ItineraryPriceMetricsResult,
  FlightOrderGetResult,
  FlightOrdersParams,
  FlightOrdersResult,
  FlightDelayPredictionParams,
  FlightDelayPredictionResult,
  RecommendedLocationsParams,
  RecommendedLocationsResult,
  ScheduleFlightsParams,
  ScheduleFlightsResult,
  AirpoerPredictionsOnTimeParams,
  AirpoerPredictionsOnTimeResult,
};
