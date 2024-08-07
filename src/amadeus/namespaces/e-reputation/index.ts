import Client from "../../client";
import HotelSentiments from "./hotel-sentiments";

/**
 * A namespaced client for the
 * `/v2/e-reputation` endpoints
 *
 * Access via the {@link Amadeus} object
 *
 * ```ts
 * const amadeus = new Amadeus();
 * amadeus.eReputation;
 * ```
 *
 * @param {Client} client
 * @property {hotelSentiments} hotel_sentiments
 */
export default class EReputation {
  private client: Client;
  public hotelSentiments: HotelSentiments;

  constructor(client: Client) {
    this.client = client;
    this.hotelSentiments = new HotelSentiments(client);
  }
}
