import Client from "../../../../client/index.js";
import byCity from "./by-city.js";
import byGeocode from "./by-geocode.js";
import byHotels from "./by-hotels.js";

/**
 * A namespaced client for the
 * `/v1/reference-data/locations/hotels` endpoints
 *
 * Access via the {@link Amadeus} object
 *
 * ```ts
 * const amadeus = new Amadeus();
 * amadeus.referenceData.locations.hotels;
 * ```
 *
 * @param {Client} client
 */
export default class Hotels {
  private client: Client;
  public byCity: byCity;
  public byGeocode: byGeocode;
  public byHotels: byHotels;

  constructor(client: Client) {
    this.client = client;
    this.byCity = new byCity(client);
    this.byGeocode = new byGeocode(client);
    this.byHotels = new byHotels(client);
  }
}
