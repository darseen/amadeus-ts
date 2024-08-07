import Client from "../../../../client";
import BySquare from "./by-square";

/**
 * A namespaced client for the
 * `/v1/reference-data/locations/pois` endpoints
 *
 * Access via the {@link Amadeus} object
 *
 * ```ts
 * const amadeus = new Amadeus();
 * amadeus.referenceData.locations.pointsOfInterest;
 * ```
 *
 * @param {Client} client
 */
export default class PointsOfInterest {
  private client: Client;
  public bySquare: BySquare;

  constructor(client: Client) {
    this.client = client;
    this.bySquare = new BySquare(client);
  }

  /**
   * Returns a list of relevant points of interest near to a given point
   *
   * @param {Object} params
   * @param {number} params.latitude latitude location to be at the center of
   *   the search circle - required
   * @param {number} params.longitude longitude location to be at the center of
   *   the search circle - required
   * @param {number} params.radius radius of the search in Kilometer - optional
   * @return {Promise<Response|ResponseError>} a Promise
   *
   * Find relevant points of interest close to Barcelona
   *
   * ```ts
   * amadeus.referenceData.locations.pointsOfInterest.get({
   *   longitude: 2.160873,
   *   latitude: 41.397158
   * });
   * ```
   */
  public get(params: Object = {}) {
    return this.client.get("/v1/reference-data/locations/pois", params);
  }
}
