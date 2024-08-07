import Client from "../../client";

/**
 * A namespaced client for the
 * `/v1/booking/hotel-bookings` endpoints
 *
 * Access via the {@link Amadeus} object
 *
 * ```ts
 * const amadeus = new Amadeus();
 * amadeus.booking.hotelBookings;
 * ```
 *
 * @param {Client} client
 */
export default class HotelBookings {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  /**
   * To book the offer retrieved from Hotel Shopping API.
   *
   * @param {Object} params
   * @return {Promise<Response|ResponseError>} a Promise
   *
   * To book the hotel offer with ID 'XXX' with guests & payments info
   *
   * ```ts
   * amadeus.booking.hotelBookings.post(
   * JSON.stringify({
   * 'data': {
   *   'offerId': 'XXXX',
   *   'guests': [],
   *   'payments': [],
   *   'rooms': []
   * }})
   * )
   * ```
   */
  public post(params: Object = {}) {
    return this.client.post("/v1/booking/hotel-bookings", params);
  }
}
