import {
  FlightDestinationsParams,
  FlightDestinationsResult,
  FlightDestinationsReturnedResponse,
} from "../../../types/amadeus/namespaces/shopping/flight-destinations";
import Client from "../../client";

/**
 * A namespaced client for the
 * `/v1/shopping/flight-destinations` endpoints
 *
 * Access via the {@link Amadeus} object
 *
 * ```ts
 * const amadeus = new Amadeus();
 * amadeus.shopping.flightDestinations;
 * ```
 *
 * @param {Client} client
 */
export default class FlightDestinations {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  /**
   * Find the cheapest destinations where you can fly to.
   *
   * @param {Object} params
   * @param {string} params.origin City/Airport IATA code from which the flight
   *   will depart. BOS, for example.
   * @return {Promise<Response|ResponseError>} a Promise
   *
   * Find the cheapest destination from Madrid
   *
   * ```ts
   * amadeus.shopping.flightDestinations.get({
   *   origin: 'MAD'
   * });
   * ```
   */
  public get(
    params: FlightDestinationsParams
  ): Promise<FlightDestinationsReturnedResponse> {
    return this.client.get<
      FlightDestinationsResult,
      FlightDestinationsResult["data"]
    >("/v1/shopping/flight-destinations", params);
  }
}
