import Client from "../../client";

/**
 * A namespaced client for the
 * `/v1/shopping/seatmaps` endpoints
 *
 * Access via the {@link Amadeus} object
 *
 * ```ts
 * const amadeus = new Amadeus();
 * amadeus.shopping.seatmaps;
 * ```
 *
 * @param {Client} client
 */
export default class Seatmaps {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  /**
   * To retrieve the seat map of each flight present in an order.
   *
   * @param {Object} params
   * @return {Promise<Response|ResponseError>} a Promise
   *
   * Retrieve the seat map for flight order with ID 'XXX'
   *
   * ```ts
   * amadeus.shopping.seatmaps.get({
   *    'flight-orderId': 'XXX'}
   * );
   * ```
   */
  public get(params: Object = {}) {
    return this.client.get("/v1/shopping/seatmaps", params);
  }

  /**
   * To retrieve the seat map of each flight included in a flight offer.
   *
   * @param {Object} params
   * @return {Promise<Response|ResponseError>} a Promise
   *
   * To retrieve the seat map of each flight included in flight offers
   * for MAD-NYC flight on 2020-08-01.
   *
   * ```ts
   * amadeus.shopping.flightOffers.get({
   *    origin: 'MAD',
   *    destination: 'NYC',
   *    departureDate: '2020-08-01'
   * }).then(function(response){
   *    return amadeus.shopping.flightOffers.seatmaps.post(
   *        JSON.stringify({
   *            'data': response.data
   *        })
   *    );
   * });
   * ```
   */
  public post(params: Object = {}) {
    return this.client.post("/v1/shopping/seatmaps", params);
  }
}
