import Client from "../../../../client";

/**
 * A namespaced client for the
 * `/v1/reference-data/locations/hotels/by-geocode` endpoints
 *
 * Access via the {@link Amadeus} object
 *
 * ```ts
 * const amadeus = new Amadeus();
 * amadeus.referenceData.locations.hotels.byGeocode;
 * ```
 *
 * @param {Client} client
 */
export default class byGeocode {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  /**
   *  Returns a list of hotels for a given area.
   *
   * @param {Object} params
   * @param {number} params.latitude latitude location to be at the center of
   * the search circle - required
   * @param {number} params.longitude longitude location to be at the center of
   * the search circle - required
   * @return {Promise<Response|ResponseError>} a Promise
   *
   *  Returns a list of hotels within an area in Barcelona
   *
   * ```ts
   * amadeus.referenceData.locations.hotels.byGeocode.get({
      latitude: 48.83152,
      longitude: 2.24691
   * });
   * ```
   */
  public get(params: Object = {}) {
    return this.client.get(
      "/v1/reference-data/locations/hotels/by-geocode",
      params
    );
  }
}
