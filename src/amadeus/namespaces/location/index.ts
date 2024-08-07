import Client from "../../client";
import Analytics from "../analytics";

/**
 * A namespaced client for the
 * `/v1/location` endpoints
 *
 * Access via the {@link Amadeus} object
 *
 * ```ts
 * const amadeus = new Amadeus();
 * amadeus.location;
 * ```
 *
 * @param {Client} client
 * @property {analytics} analytics
 */
export default class Location {
  private client: Client;
  public analytics: Analytics;

  constructor(client: Client) {
    this.client = client;
    this.analytics = new Analytics(client);
  }
}
