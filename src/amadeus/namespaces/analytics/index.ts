import Client from "../../client";
import ItineraryPriceMetrics from "./itenrary-price-metrics";

/**
 * A namespaced client for the
 * `/v1/analytics` endpoints
 *
 * Access via the {Amadeus} object
 *
 * ```ts
 * const amadeus = new Amadeus();
 * amadeus.analytics;
 * ```
 *
 * @param {Client} client
 * @property {Flights} flights
 */
export default class Analytics {
  private client: Client;
  public itineraryPriceMetrics: ItineraryPriceMetrics;

  constructor(client: Client) {
    this.client = client;
    this.itineraryPriceMetrics = new ItineraryPriceMetrics(client);
  }
}
