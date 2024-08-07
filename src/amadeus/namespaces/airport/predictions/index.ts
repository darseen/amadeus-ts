import Client from "../../../client";
import OnTime from "./on-time";

/**
 * A namespaced client for the
 * `/v1/airport/predictions` endpoints
 *
 * Access via the {@link Amadeus} object
 *
 * ```ts
 * const amadeus = new Amadeus();
 * amadeus.airport;
 * ```
 *
 * @param {Client} client
 * @property {predictions} OnTime
 */
export default class Predictions {
  private client: Client;
  public onTime: OnTime;

  constructor(client: Client) {
    this.client = client;
    this.onTime = new OnTime(client);
  }
}
