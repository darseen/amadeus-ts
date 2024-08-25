import {
  HotelSentimentReturnedResponse,
  HotelSentimentsParams,
  HotelSentimentsResult,
} from "../../../types/amadeus/namespaces/e-reputation/hotel-sentiments";
import Client from "../../client";

/**
 * A namespaced client for the
 * `/v2/e-reputation/hotel-sentiments` endpoints
 *
 * Access via the {@link Amadeus} object
 *
 * ```ts
 * const amadeus = new Amadeus();
 * amadeus.eReputation.hotelSentiments;
 * ```
 *
 * @param {Client} client
 */
export default class HotelSentiments {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  /**
   * Get the sentiment analysis of hotel reviews
   *
   * @param {Object} params
   * @param {string} params.hotelIds Comma separated list of Amadeus hotel
   *   codes to request. Example: XKPARC12
   * @return {Promise<Response|ResponseError>} a Promise
   *
   * Get Sentiment Analysis of reviews about Holiday Inn Paris Notre Dame.
   *
   * ```ts
   * amadeus.eReputation.hotelSentiments.get({
   *   hotelIds: 'XKPARC12'
   * })
   * ```
   */
  public get(
    params: HotelSentimentsParams
  ): Promise<HotelSentimentReturnedResponse> {
    return this.client.get<
      HotelSentimentsResult,
      HotelSentimentsResult["data"]
    >("/v2/e-reputation/hotel-sentiments", params);
  }
}
