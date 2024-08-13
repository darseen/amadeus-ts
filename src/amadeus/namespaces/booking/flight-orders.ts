import {
  FlightOrdersParams,
  FlightOrdersResult,
  FlightOrdersReturnType,
} from "../../../types/amadeus/namespaces/booking/flight-orders";
import Client from "../../client";

/**
 * A namespaced client for the
 * `/v1/booking/flight-orders` endpoints
 *
 * Access via the {@link Amadeus} object
 *
 * ```ts
 * const amadeus = new Amadeus();
 * amadeus.booking.flightOrders;
 * ```
 *
 * @param {Client} client
 */
export default class FlightOrders {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  /**
   * To book the selected flight-offer and create a flight-order
   *
   * @param {Object} params
   * @return {Promise<Response|ResponseError>} a Promise
   *
   * To book the flight-offer(s) suggested by flightOffersSearch and create a flight-order
   *
   * ```ts
   * amadeus.booking.flightOrders.post({
   *  'type': 'flight-order',
   *  'flightOffers': [],
   *  'travelers': []
   * });
   * ```
   */
  public post(params: FlightOrdersParams): Promise<FlightOrdersReturnType> {
    return this.client.post<FlightOrdersResult, FlightOrdersResult["data"]>(
      "/v1/booking/flight-orders",
      JSON.stringify(params)
    );
  }
}
