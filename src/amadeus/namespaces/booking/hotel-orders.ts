import Client from "../../client";

/**
 * A namespaced client for the
 * `/v2/booking/hotel-orders` endpoints
 *
 * Access via the {@link Amadeus} object
 *
 * ```ts
 * const amadeus = new Amadeus();
 * amadeus.booking.hotelOrders;
 * ```
 *
 * @param {Client} client
 */
export default class HotelOrders {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  /**
   * To book the offer retrieved from Hotel Search API.
   *
   * @param {Object} params
   * @return {Promise<Response|ResponseError>} a Promise
   *
   * To book the hotel offer with ID 'XXX' with guests, travel agents and payment info
   *
   * ```ts
   * amadeus.booking.hotelOrders.post(
   * JSON.stringfy({
   * 'data': {
   *     'type': 'hotel-order',
   *     'guests': [],
   *     'travelAgent': {},
   *     'roomAssociations': [],
   *     'payment': {}
   * }})
   *)
   * ```
   */
  public post(params: Object = {}) {
    return this.client.post("/v2/booking/hotel-orders", params);
  }
}
