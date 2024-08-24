import {
  ActivitiesBySquareParams,
  ActivitiesBySquareResult,
  ActivitiesBySquareReturnedResponse,
} from "../../../../types/amadeus/namespaces/shopping/activities/by-square";
import Client from "../../../client";

/**
 * A namespaced client for the
 * `/v1/shopping/activities/by-square` endpoints
 *
 * Access via the {@link Amadeus} object
 *
 * ```ts
 * const amadeus = new Amadeus();
 * amadeus.shopping.activities.bySquare;
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
   * Returns a list of tours and activities a given area.
   *
   * @param {Object} params
   * @param {number} params.north latitude north of bounding box - required
   * @param {number} params.west  longitude west of bounding box - required
   * @param {number} params.south latitude south of bounding box - required
   * @param {number} params.east  longitude east of bounding box - required
   * @return {Promise<Response|ResponseError>} a Promise
   *
   * Find relevant tours and activities within an area in Barcelona
   *
   * ```ts
   * amadeus.shopping.activities.bySquare.get({
   *   north: 41.397158,
   *   west: 2.160873,
   *   south: 41.394582,
   *   east: 2.177181
   * });
   * ```
   */
  public get(
    params: ActivitiesBySquareParams
  ): Promise<ActivitiesBySquareReturnedResponse> {
    return this.client.get<
      ActivitiesBySquareResult,
      ActivitiesBySquareResult["data"]
    >("/v1/shopping/activities/by-square", params);
  }
}
