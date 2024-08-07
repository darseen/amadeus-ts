import Client from "../../client";
import Activities from "./activities";
import Activity from "./activity";
import Availability from "./availability";
import FlightDates from "./flight-dates";
import FlightDestinations from "./flight-destinations";
import FlightOffersSearch from "./flight-offers-search";
import FlightOffers from "./flight_offers";
import HotelOfferSearch from "./hotel-offer-search";
import HotelOffersSearch from "./hotel-offers-search";
import Seatmaps from "./seatmaps";
import TransferOffers from "./transfer-offers";

/**
 * A namespaced client for the
 * `/v1/shopping`, `/v2/shopping` and `/v3/shopping` endpoints
 *
 * Access via the {@link Amadeus} object
 *
 * ```ts
 * const amadeus = new Amadeus();
 * amadeus.shopping;
 * ```
 *
 * @param {Client} client
 * @property {FlightDestinations} flightDestinations
 * @property {FlightOffers} flightOffers
 * @property {FlightOffersSearch} flightOffersSearch
 * @property {FlightDates} flightDates
 * @property {Seatmaps} seatmaps
 * @property {HotelOfferSearch} hotelOffers
 * @property {HotelOffersSearch} hotelOffers
 * @property {Availability} availability
 * @property {TransferOffers} transferOffers
 */
export default class Shopping {
  private client: Client;
  public flightDestinations: FlightDestinations;
  public flightOffers: FlightOffers;
  public flightOffersSearch: FlightOffersSearch;
  public flightDates: FlightDates;
  public seatmaps: Seatmaps;
  public hotelOffersSearch: HotelOffersSearch;
  public activities: Activities;
  public availability: Availability;
  public transferOffers: TransferOffers;

  constructor(client: Client) {
    this.client = client;
    this.flightDestinations = new FlightDestinations(client);
    this.flightOffers = new FlightOffers(client);
    this.flightOffersSearch = new FlightOffersSearch(client);
    this.flightDates = new FlightDates(client);
    this.seatmaps = new Seatmaps(client);
    this.hotelOffersSearch = new HotelOffersSearch(client);
    this.activities = new Activities(client);
    this.availability = new Availability(client);
    this.transferOffers = new TransferOffers(client);
  }

  /**
   * Loads a namespaced path for a specific offer ID for Hotel Search V3
   *
   * @param {string} [offerId] The ID of the offer for a dedicated hotel
   * @return {HotelOfferSearch}
   **/
  public hotelOfferSearch(offerId: string) {
    return new HotelOfferSearch(this.client, offerId);
  }

  /**
   * Loads a namespaced path for a specific activity ID
   *
   * @param {string} [activityId] The ID of the activity for a dedicated tour or activity
   * @return {Activity}
   **/
  public activity(activityId: string) {
    return new Activity(this.client, activityId);
  }
}
