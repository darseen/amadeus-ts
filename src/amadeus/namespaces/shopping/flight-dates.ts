import {
  FlightDatesParams,
  FlightDatesResult,
  FlightDatesReturnedResponse,
} from "../../../types/amadeus/namespaces/shopping/flight-dates";
import Client from "../../client";

/**
 * A namespaced client for the
 * `/v1/shopping/flight-dates` endpoints
 *
 * Access via the {@link Amadeus} object
 *
 * ```ts
 * const amadeus = new Amadeus();
 * amadeus.shopping.flightDates;
 * ```
 *
 * @param {Client} client
 */
export default class FlightDates {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  /**
   * Find the cheapest flight dates from an origin to a destination.
   *
   * @param {Object} params
   * @param {string} params.origin City/Airport IATA code from which the flight
   *   will depart. BOS, for example.
   * @param {string} params.destination City/Airport IATA code to which the
   *   traveler is going. PAR, for example
   * @return {Promise<Response|ResponseError>} a Promise
   *
   * Find the cheapest flight dates from New-York to Madrid
   *
   * ```ts
   * amadeus.shopping.flightDates.get({
   *   origin: 'NYC',
   *   destination: 'MAD'
   * });
   * ```
   */
  public get(params: FlightDatesParams): Promise<FlightDatesReturnedResponse> {
    return this.client.get<FlightDatesResult, FlightDatesResult["data"]>(
      "/v1/shopping/flight-dates",
      params
    );
  }
}
