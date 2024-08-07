import Client from "../../../../client";

/**
 * A namespaced client for the
 * `/v1/reference-data/locations/pois/by-square` endpoints
 *
 * Access via the {@link Amadeus} object
 *
 * ```ts
 * const amadeus = new Amadeus();
 * amadeus.referenceData.locations.pointsOfInterest.bySquare;
 * ```
 *
 * @param {Client} client
 */
export default class BySquare {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  /**
   * Returns a list of relevant points of interest for a given area.
   *
   * @param {Object} params
   * @param {number} params.north latitude north of bounding box - required
   * @param {number} params.west  longitude west of bounding box - required
   * @param {number} params.south latitude south of bounding box - required
   * @param {number} params.east  longitude east of bounding box - required
   * @return {Promise<Response|ResponseError>} a Promise
   *
   * Find relevant points of interest within an area in Barcelona
   *
   * ```ts
   * amadeus.referenceData.locations.pointsOfInterest.bySquare.get({
   *   north: 41.397158,
   *   west: 2.160873,
   *   south: 41.394582,
   *   east: 2.177181
   * });
   * ```
   */
  public get(params: Object = {}) {
    return this.client.get(
      "/v1/reference-data/locations/pois/by-square",
      params
    );
  }
}
