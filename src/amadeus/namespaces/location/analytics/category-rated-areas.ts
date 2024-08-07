import Client from "../../../client";

/**
 * A namespaced client for the
 * `/v1/location/analytics/category-rated-areas` endpoints
 *
 * Access via the {@link Amadeus} object
 *
 * ```ts
 * const amadeus = new Amadeus();
 * amadeus.location.analytics.categoryRatedAreas;
 * ```
 *
 * @param {Client} client
 */
export default class CategoryRatedAreas {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  /**
   * Gets popularity score for location categories
   *
   * @param {Object} params
   * @param {number} params.latitude latitude location to be at the center of
   *   the search circle - required
   * @param {number} params.longitude longitude location to be at the center of
   *   the search circle - required
   * @param {number} params.radius radius of the search in Kilometer - optional
   * @return {Promise<Response|ResponseError>} a Promise
   *
   * Gets popularity score for location categories in Barcelona
   *
   * ```ts
   * amadeus.location.analytics.categoryRatedAreas.get({
   *   longitude: 2.160873,
   *   latitude: 41.397158
   * });
   * ```
   */
  public get(params: Object = {}) {
    return this.client.get(
      "/v1/location/analytics/category-rated-areas",
      params
    );
  }
}
