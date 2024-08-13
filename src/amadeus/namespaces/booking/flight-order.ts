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
  public get() {
    if (this.orderId)
      return this.client.get("/v1/booking/flight-orders/" + this.orderId);
    throw new Error("MISSING_REQUIRED_PARAMETER");
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
  public delete() {
    if (this.orderId)
      return this.client.delete("/v1/booking/flight-orders/" + this.orderId);
    throw new Error("MISSING_REQUIRED_PARAMETER");
  }
}
