import {
  AirlineDestinationsParams,
  AirlineDestinationsResult,
  AirlineDestinationsReturnedResponse,
} from "../../../types/amadeus/namespaces/airline/destinations";
import Client from "../../client";

/**
 * A namespaced client for the
 * `/v1/airline/destinations` endpoints
 *
 * Access via the {@link Amadeus} object
 *
 * ```ts
 * const amadeus = new Amadeus();
 * amadeus.airline.destinations;
 * ```
 *
 * @param {Client} client
 */
export default class Destinations {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  /**
   * find all destinations served by a given airline
   *
   * @param {Object} params
   * @param {string} params.airlineCode airline IATA code, e.g. BA for British airways
   * @return {Promise<Response|ResponseError>} a Promise
   *
   *  What destinations are served by this airline?
   *  ```ts
   * amadeus.airline.destinations.get({
   *   airlineCode: 'BA',
   * })
   * ```
   */
  public get(
    params: AirlineDestinationsParams
  ): Promise<AirlineDestinationsReturnedResponse> {
    return this.client.get<
      AirlineDestinationsResult,
      AirlineDestinationsResult["data"]
    >("/v1/airline/destinations", params);
  }
}
