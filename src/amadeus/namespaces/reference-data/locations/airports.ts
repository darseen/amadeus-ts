import Client from "../../../client";

/**
 * A namespaced client for the
 * `/v2/reference-data/locations/airports` endpoints
 *
 * Access via the {@link Amadeus} object
 *
 * ```ts
 * const amadeus = new Amadeus();
 * amadeus.referenceData.locations.airports;
 * ```
 *
 * @param {Client} client
 */
export default class Airports {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  /**
   * Returns a list of relevant airports near to a given point.
   *
   * @param {Object} params
   * @param {number} params.latitude latitude location to be at the center of
   *   the search circle - required
   * @param {number} params.longitude longitude location to be at the center of
   *   the search circle - required
   * @return {Promise<Response|ResponseError>} a Promise
   *
   * Find the nearest airport to the 49.0000,2.55 lat/long
   *
   * ```ts
   * amadeus.referenceData.locations.airports.get({
   *   longitude: 49.0000,
   *   latitude: 2.55
   * });
   * ```
   */
  public get(params: Object = {}) {
    return this.client.get("/v1/reference-data/locations/airports", params);
  }
}
