import {
  HotelOffersSearchParams,
  HotelOffersSearchResult,
  HotelOffersSearchReturnedResponse,
} from "../../../types/amadeus/namespaces/shopping/hotel-offers-search";
import Client from "../../client";

/**
 * A namespaced client for the
 * `/v3/shopping/hotel-offers` endpoints
 *
 * Access via the {@link Amadeus} object
 *
 * ```ts
 * const amadeus = new Amadeus();
 * amadeus.shopping.hotelOffersSearch;
 * ```
 *
 * @param {Client} client
 */
export default class HotelOffersSearch {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  /**
   * Find the list of available offers in the specific hotels
   *
   * @param {Object} params
   * @param {string} params.hotelIds Comma separated list of Amadeus hotel
   * codes to request. Example: RTPAR001
   * @param {string} params.adults Number of adult guests (1-9) per room.
   * @return {Promise<Response|ResponseError>} a Promise
   *
   * Search for available offers in Novotel Paris for 2 adults
   *
   * ```ts
   * amadeus.shopping.hotelOffersSearch.get({
   *   hotelIds: 'RTPAR001',
   *   adults: '2'
   * })
   * ```
   */
  public get(
    params: HotelOffersSearchParams
  ): Promise<HotelOffersSearchReturnedResponse> {
    return this.client.get<
      HotelOffersSearchResult,
      HotelOffersSearchResult["data"]
    >("/v3/shopping/hotel-offers", params);
  }
}
