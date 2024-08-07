import Client from "../../../client";
import Airports from "./airports";
import Cities from "./cities";
import Hotel from "./hotel";
import Hotels from "./hotels";
import PointsOfInterest from "./points-of-interest";
import PointOfInterest from "./points-of-interest/poi";

/**
 * A namespaced client for the
 * `/v2/reference-data/locations` endpoints
 *
 * Access via the {@link Amadeus} object
 *
 * ```ts
 * const amadeus = new Amadeus();
 * amadeus.referenceData.locations;
 * ```
 *
 * @param {Client} client
 * @property {Airports} airports
 */
export default class Locations {
  private client: Client;
  public airports: Airports;
  public cities: Cities;
  public hotel: Hotel;
  public hotels: Hotels;
  public pointsOfInterest: PointsOfInterest;

  constructor(client: Client) {
    this.client = client;
    this.airports = new Airports(client);
    this.cities = new Cities(client);
    this.hotel = new Hotel(client);
    this.hotels = new Hotels(client);
    this.pointsOfInterest = new PointsOfInterest(client);
  }

  /**
   * Returns a list of airports and cities matching a given keyword.
   *
   * @param {Object} params
   * @param {string} params.keyword keyword that should represent the start of
   *   a word in a city or airport name or code
   * @param {string} params.subType the type of location to search for
   * @return {Promise<Response|ResponseError>} a Promise
   *
   * Find any location starting with 'lon'
   *
   * ```ts
   * amadeus.referenceData.locations.get({
   *   keyword: 'lon',
   *   subType: Amadeus.location.any
   * });
   * ```
   */
  public get(params: Object = {}) {
    return this.client.get("/v1/reference-data/locations", params);
  }

  public pointOfInterest(poiId: string) {
    return new PointOfInterest(this.client, poiId);
  }
}
