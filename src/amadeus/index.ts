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
  CreditCardBrand,
  PaymentBrand,
  FlightOffer,
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

// reference-data-locations
import type {
  ReferenceDataLocationsParams,
  ReferenceDataLocationsResult,
} from "../types/amadeus/namespaces/reference-data/locations";

// reference-data-locations-airports
import type {
  ReferenceDataLocationsAirportsParams,
  ReferenceDataLocationsAirportsResult,
} from "../types/amadeus/namespaces/reference-data/locations/airports";

// airport-direct-destinations
import type {
  AirportDirectDestinationParams,
  AirportDirectDestinationResult,
} from "../types/amadeus/namespaces/airport/direct-destination";

// reference-data-urls-checkin-links
import type {
  ReferenceDataCheckinLinksParams,
  ReferenceDataCheckinLinksResult,
} from "../types/amadeus/namespaces/reference-data/urls/checkin-links";

// reference-data-airlines
import type {
  ReferenceDataAirlinesParams,
  ReferenceDataAirlinesResult,
} from "../types/amadeus/namespaces/reference-data/airlines";

// airline-destinations
import type {
  AirlineDestinationsParams,
  AirlineDestinationsResult,
} from "../types/amadeus/namespaces/airline/destinations";

// reference-data-locations-points-of-interest
import type {
  ReferenceDataLocationsPoisParams,
  ReferenceDataLocationsPoisResult,
} from "../types/amadeus/namespaces/reference-data/locations/points-of-interest";

// reference-data-locations-points-of-interest-by-square
import type {
  ReferenceDataLocationsPoisBySquareParams,
  ReferenceDataLocationsPoisBySquareResult,
} from "../types/amadeus/namespaces/reference-data/locations/points-of-interest/by-square";

// reference-data-locations-points-of-poi
import type { ReferenceDataLocationsPoisPoiResult } from "../types/amadeus/namespaces/reference-data/locations/points-of-interest/poi";

// shopping-activities
import type {
  ActivitiesParams,
  ActivitiesResult,
} from "../types/amadeus/namespaces/shopping/activities";

// shopping-activities-by-square
import type {
  ActivitiesBySquareParams,
  ActivitiesBySquareResult,
} from "../types/amadeus/namespaces/shopping/activities/by-square";

// shopping-activity
import type { ActivityResult } from "../types/amadeus/namespaces/shopping/activity";

// reference-data-locations-cities
import type {
  ReferenceDataLocationsCitiesParams,
  ReferenceDataLocationsCitiesResult,
} from "../types/amadeus/namespaces/reference-data/locations/cities";

// ordering-transfer-orders
import type {
  OrderingTransferOrdersParams,
  OrderingTransferOrdersResult,
} from "../types/amadeus/namespaces/ordering/transfer-orders";

// ordering-transfer-orders-transfers-cancellation
import type { OrderingTransferCancellationResult } from "../types/amadeus/namespaces/ordering/transfer-orders/transfers/cancellation";

// shopping-transfer-offers
import type {
  ShoppingTransferOffersParams,
  ShoppingTransferOffersResult,
} from "../types/amadeus/namespaces/shopping/transfer-offers";

// travel-analytics-air-traffic-traveled
import type {
  TravelAnalayticsAirTrafficTraveledParams,
  TravelAnalayticsAirTrafficTraveledResult,
} from "../types/amadeus/namespaces/travel/analytics/air-traffic/traveled";

// travel-analytics-air-traffic-booked
import type {
  TravelAnalayticsAirTrafficBookedParams,
  TravelAnalayticsAirTrafficBookedResult,
} from "../types/amadeus/namespaces/travel/analytics/air-traffic/booked";

// travel-analytics-air-traffic-busiest-period
import type {
  TravelAnalayticsAirTrafficBusiestPeriodParams,
  TravelAnalayticsAirTrafficBusiestPeriodResult,
} from "../types/amadeus/namespaces/travel/analytics/air-traffic/busiest-period";

// location-analytics-category-rated-areas
import type {
  CategoryRatedAreaParams,
  CategoryRatedAreaResult,
} from "../types/amadeus/namespaces/location/analytics/category-reted-areas";

// reference-data-locations-hotels-by-hotels
import type {
  ReferenceDataLocationsHotelsByHotelsParams,
  ReferenceDataLocationsHotelsByHotelsResult,
} from "../types/amadeus/namespaces/reference-data/locations/hotels/by-hotels";

// reference-data-locations-hotels-by-city
import type {
  ReferenceDataLocationsHotelsByCityParams,
  ReferenceDataLocationsHotelsByCityResult,
} from "../types/amadeus/namespaces/reference-data/locations/hotels/by-city";

// reference-data-locations-hotels-by-geocode
import type {
  ReferenceDataLocationsHotelsByGeoCodeParams,
  ReferenceDataLocationsHotelsByGeoCodeResult,
} from "../types/amadeus/namespaces/reference-data/locations/hotels/by-geocode";

// shopping-hotel-offers-search
import type {
  HotelOffersSearchParams,
  HotelOffersSearchResult,
} from "../types/amadeus/namespaces/shopping/hotel-offers-search";

// shopping-hotel-offer-search
import type {
  HotelOfferSearchParams,
  HotelOfferSearchResult,
} from "../types/amadeus/namespaces/shopping/hotel-offer-search";

// booking-hotel-orders
import type {
  HotelOrdersParams,
  HotelOrdersResult,
} from "../types/amadeus/namespaces/booking/hotel-orders";

// reference-data-locations-hotel
import type {
  ReferenceDataLocationsHotelParams,
  ReferenceDataLocationsHotelResult,
} from "../types/amadeus/namespaces/reference-data/locations/hotel";

// trip-purpose
import type {
  TripPurposeParams,
  TripPurposeResult,
} from "../types/amadeus/namespaces/travel/predictions/trip-purpose";

// hotel-bookings
import type { HotelBookingParams } from "../types/amadeus/namespaces/booking/hotel-bookings";

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
  FlightOffer,
  TravelClass,
  DocumentType,
  CurrencyCode,
  TravelerType,
  DiscountType,
  DiscountTravelerType,
  CreditCardBrand,
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
  ReferenceDataLocationsParams,
  ReferenceDataLocationsResult,
  ReferenceDataLocationsAirportsParams,
  ReferenceDataLocationsAirportsResult,
  AirportDirectDestinationParams,
  AirportDirectDestinationResult,
  ReferenceDataCheckinLinksParams,
  ReferenceDataCheckinLinksResult,
  ReferenceDataAirlinesParams,
  ReferenceDataAirlinesResult,
  AirlineDestinationsParams,
  AirlineDestinationsResult,
  ReferenceDataLocationsPoisParams,
  ReferenceDataLocationsPoisResult,
  ReferenceDataLocationsPoisBySquareParams,
  ReferenceDataLocationsPoisBySquareResult,
  ReferenceDataLocationsPoisPoiResult,
  ActivitiesParams,
  ActivitiesResult,
  ActivitiesBySquareParams,
  ActivitiesBySquareResult,
  ActivityResult,
  ReferenceDataLocationsCitiesParams,
  ReferenceDataLocationsCitiesResult,
  OrderingTransferOrdersParams,
  OrderingTransferOrdersResult,
  OrderingTransferCancellationResult,
  ShoppingTransferOffersParams,
  ShoppingTransferOffersResult,
  TravelAnalayticsAirTrafficTraveledParams,
  TravelAnalayticsAirTrafficTraveledResult,
  TravelAnalayticsAirTrafficBookedParams,
  TravelAnalayticsAirTrafficBookedResult,
  TravelAnalayticsAirTrafficBusiestPeriodParams,
  TravelAnalayticsAirTrafficBusiestPeriodResult,
  CategoryRatedAreaParams,
  CategoryRatedAreaResult,
  ReferenceDataLocationsHotelsByHotelsParams,
  ReferenceDataLocationsHotelsByHotelsResult,
  ReferenceDataLocationsHotelsByCityParams,
  ReferenceDataLocationsHotelsByCityResult,
  ReferenceDataLocationsHotelsByGeoCodeParams,
  ReferenceDataLocationsHotelsByGeoCodeResult,
  HotelOffersSearchParams,
  HotelOffersSearchResult,
  HotelOfferSearchParams,
  HotelOfferSearchResult,
  HotelOrdersParams,
  HotelOrdersResult,
  ReferenceDataLocationsHotelParams,
  ReferenceDataLocationsHotelResult,
  TripPurposeParams,
  TripPurposeResult,
  HotelBookingParams,
};
