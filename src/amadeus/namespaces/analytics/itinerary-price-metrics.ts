import {
  ItineraryPriceMetricsParams,
  ItineraryPriceMetricsResult,
  ItineraryPriceMetricsReturnedResponse,
} from "../../../types/amadeus/namespaces/analytics/itinerary-price-metrics";
import Client from "../../client";

/**
 * A namespaced client for the
 * `/v1/analytics/itinerary-price-metrics
 *
 * Access via the {@link Amadeus} object
 *
 * ```ts
 * const amadeus = new Amadeus();
 * amadeus.analytics.itineraryPriceMetrics
 * ```
 *
 * @param {Client} client
 */
export default class ItineraryPriceMetrics {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  /**
   * Provides historical prices in a quartile distribution, including minimum, maximum and average price.
   *
   * @param {Object} params
   * @param {string} params.originIataCode city/airport code, following IATA standard, from which the traveler will depart
   * @param {string} params.destinationIataCode city/airport code, following IATA standard, from which the traveler is going
   * @param {string} params.departureDate The date on which the traveler will depart from the origin to go to the destination.
   * @return {Promise<Response|ResponseError>} a Promise
   * Am I getting a good deal on this flight?
   * ```ts
   * amadeus.analytics.itineraryPriceMetrics.get({
   * originIataCode: 'MAD',
   * destinationIataCode: 'CDG',
   * departureDate: '2021-03-13'
   * });
   * ```
   */
  public get(
    params: ItineraryPriceMetricsParams
  ): Promise<ItineraryPriceMetricsReturnedResponse> {
    return this.client.get<
      ItineraryPriceMetricsResult,
      ItineraryPriceMetricsResult["data"]
    >("/v1/analytics/itinerary-price-metrics", params);
  }
}
