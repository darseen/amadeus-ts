import Client from "../../../client";
import AirTraffic from "./air_traffic";

/**
 * A namespaced client for the
 * `/v2/travel/analytics` endpoints
 *
 * Access via the {Amadeus} object
 *
 * ```ts
 * const amadeus = new Amadeus();
 * amadeus.travel.analytics;
 * ```
 *
 * @param {Client} client
 * @property {Urls} urls
 * @protected
 */
export default class Analytics {
  private client: Client;
  public airTraffic: AirTraffic;

  constructor(client: Client) {
    this.client = client;
    this.airTraffic = new AirTraffic(client);
  }
}
