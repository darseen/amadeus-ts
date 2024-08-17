import {
  FlightOffersUpsellingParams,
  FlightOffersUpsellingResult,
  FlightOffersUpsellingReturnedResponse,
} from "../../../../types/amadeus/namespaces/shopping/flight-offers/upselling";
import Client from "../../../client";

/**
 * A namespaced client for the
 * `/v1/shopping/flight-offers/upselling` endpoints
 *
 * Access via the {@link Amadeus} object
 *
 * ```ts
 * const amadeus = new Amadeus();
 * amadeus.shopping.flightOffers.upselling;
 * ```
 *
 * @param {Client} client
 */
export default class Upselling {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  /**
   * Get available seats in different fare classes
   *
   * @param {Object} params
   * @return {Promise<Response|ResponseError>} a Promise
   *
   * ```ts
   * amadeus.shopping.flightOffers.upselling.post(body);
   * ```
   */
  public post(
    params: FlightOffersUpsellingParams
  ): Promise<FlightOffersUpsellingReturnedResponse> {
    return this.client.post<
      FlightOffersUpsellingResult,
      FlightOffersUpsellingResult["data"]
    >("/v1/shopping/flight-offers/upselling", JSON.stringify(params));
  }
}
