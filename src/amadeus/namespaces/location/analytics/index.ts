import Client from "../../../client";
import CategoryRatedAreas from "./category-rated-areas";

/**
 * A namespaced client for the
 * `/v1/location/analytics` endpoints
 *
 * Access via the {@link Amadeus} object
 *
 * ```ts
 * const amadeus = new Amadeus();
 * amadeus.location;
 * ```
 *
 * @param {Client} client
 * @property {analytics} CategoryRatedAreas
 */
export default class Analytics {
  private client: Client;
  public categoryRatedAreas: CategoryRatedAreas;

  constructor(client: Client) {
    this.client = client;
    this.categoryRatedAreas = new CategoryRatedAreas(client);
  }
}
