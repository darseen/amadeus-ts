import { ReturnedResponseSuccess } from "../../../types/amadeus/client/response";
import {
  FlightOrderGetResult,
  FlightOrderGetReturenedResponse,
} from "../../../types/amadeus/namespaces/booking/flight-order";
import Client from "../../client";

/**
 * A namespaced client for the
 * `/v1/booking/flight-orders` endpoints
 *
 * Access via the {@link Amadeus} object
 *
 * ```ts
 * const amadeus = new Amadeus();
 * amadeus.booking.flightOrder;
 * ```
 *
 * @param {Client} client
 */
export default class FlightOrder {
  private client: Client;
  private orderId: string;
  constructor(client: Client, orderId: string) {
    this.client = client;
    this.orderId = orderId;
  }

  /**
   * To retrieve a flight order based on its id.
   *
   * @return {Promise<Response|ResponseError>} a Promise
   *
   * To retrieve a flight order with ID 'XXX'
   *
   * ```ts
   * amadeus.booking.flightOrder('XXX').get();
   * ```
   */
  public get(): Promise<FlightOrderGetReturenedResponse> {
    if (!this.orderId) throw new Error("MISSING_REQUIRED_PARAMETER");

    return this.client.get<FlightOrderGetResult, FlightOrderGetResult["data"]>(
      "/v1/booking/flight-orders/" + this.orderId
    );
  }

  /**
   * To cancel a flight order based on its id.
   *
   * @return {Promise<Response|ResponseError>} a Promise
   *
   * To cancel a flight order with ID 'XXX'
   *
   * ```ts
   * amadeus.booking.flightOrder('XXX').delete();
   * ```
   */
  public delete(): Promise<ReturnedResponseSuccess<null, null>> {
    if (!this.orderId) throw new Error("MISSING_REQUIRED_PARAMETER");

    return this.client.delete<null, null>(
      "/v1/booking/flight-orders/" + this.orderId
    );
  }
}
