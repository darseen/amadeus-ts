import Client from "../../client";

/**
 * A namespaced client for the
 * `/v3/shopping/hotel-offers/:offer_id` endpoints
 *
 * Access via the {@link Amadeus} object
 *
 * ```ts
 * const amadeus = new Amadeus();
 * amadeus.shopping.hotelOfferSearch('XXX');
 * ```
 *
 * @param {Client} client
 * @property {number} offerId
 */
export default class HotelOfferSearch {
  private client: Client;
  private offerId: string;

  constructor(client: Client, offerId: string) {
    this.client = client;
    this.offerId = offerId;
  }

  /**
   * Returns details for a specific offer
   *
   * @param {Object} params
   * @return {Promise<Response|ResponseError>} a Promise
   *
   * Find details for the offer with ID 'XXX'
   *
   * ```ts
   *  amadeus.shopping.hotelOfferSearch('XXX').get();
   * ```
   */
  public get(params: Object = {}) {
    return this.client.get(`/v3/shopping/hotel-offers/${this.offerId}`, params);
  }
}
