import Traveled from "./traveled.js";
import Booked from "./booked.js";
import Client from "../../../../client/index.js";
import BusiestPeriod from "./busiest-period.js";

/**
 * A namespaced client for the
 * `/v1/travel/analytics/air-traffic` endpoints
 *
 * Access via the {@link Amadeus} object
 *
 * ```ts
 * const amadeus = new Amadeus();
 * amadeus.travel.analytics.airTraffic;
 * ```
 *
 * @param {Client} client
 */
export default class AirTraffic {
  private client: Client;
  public traveled: Traveled;
  public booked: Booked;
  public busiestPeriod: BusiestPeriod;

  constructor(client: Client) {
    this.client = client;
    this.traveled = new Traveled(client);
    this.booked = new Booked(client);
    this.busiestPeriod = new BusiestPeriod(client);
  }
}
