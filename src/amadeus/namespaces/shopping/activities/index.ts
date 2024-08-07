import Client from "../../../client";
import BySquare from "./by-square";

/**
 * A namespaced client for the
 * `/v1/shopping/activities` endpoints
 *
 * Access via the {@link Amadeus} object
 *
 * ```ts
 * const amadeus = new Amadeus();
 * amadeus.shopping.activities
 * ```
 *
 * @param {Client} client
 */
export default class Activities {
  private client: Client;
  public bySquare: BySquare;

  constructor(client: Client) {
    this.client = client;
    this.bySquare = new BySquare(client);
  }

  /**
   * /shopping/activities
   *
   * @param {Object} params
   * @param {number} params.latitude latitude location to be at the center of
   *   the search circle - required
   * @param {number} params.longitude longitude location to be at the center of
   *   the search circle - required
   * @param {number} params.radius radius of the search in Kilometer - optional
   * @return {Promise<Response|ResponseError>} a Promise
   *
   * What are the best tours and activities in Barcelona? (based a geo location and a radius)
   *
   * ```ts
   * amadeus.shopping.activities.get({
   *   longitude: 2.160873,
   *   latitude: 41.397158
   * });
   * ```
   */
  public get(params: Object = {}) {
    return this.client.get("/v1/shopping/activities", params);
  }
}
