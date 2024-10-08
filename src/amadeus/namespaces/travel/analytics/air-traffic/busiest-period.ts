import {
  TravelAnalayticsAirTrafficBusiestPeriodParams,
  TravelAnalayticsAirTrafficBusiestPeriodResult,
  TravelAnalayticsAirTrafficBusiestPeriodReturnedResponse,
} from "../../../../../types/amadeus/namespaces/travel/analytics/air-traffic/busiest-period";
import Client from "../../../../client";

/**
 * A namespaced client for the
 * `/v1/travel/analytics/air-traffic/busiest-period` endpoints
 *
 * Access via the {@link Amadeus} object
 *
 * ```ts
 * const amadeus = new Amadeus();
 * amadeus.travel.analytics.AirTraffic.BusiestPeriod;
 * ```
 *
 * @param {Client} client
 */
export default class BusiestPeriod {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  /**
   * Returns a list of air traffic reports.
   *
   * @param {Object} params
   * @param {string} params.cityCode IATA code of the origin city - e.g. MAD for
   *   Madrid - required
   * @param {string} params.period period when consumers are travelling in
   *   YYYY-MM format
   * @param {string} params.direction to select between arrivals and departures (default: arrivals)
   *   YYYY-MM format
   * @return {Promise<Response|ResponseError>} a Promise
   *
   * What were the busiest months for Madrid in 2017?
   *
   * ```ts
   * amadeus.travel.analytics.AirTraffic.BusiestPeriod.get({
   *   cityCode: 'MAD',
   *   period: '2017',
   *   direction: Amadeus.direction.arriving
   * });
   * ```
   */
  public get(
    params: TravelAnalayticsAirTrafficBusiestPeriodParams
  ): Promise<TravelAnalayticsAirTrafficBusiestPeriodReturnedResponse> {
    return this.client.get<
      TravelAnalayticsAirTrafficBusiestPeriodResult,
      TravelAnalayticsAirTrafficBusiestPeriodResult["data"]
    >("/v1/travel/analytics/air-traffic/busiest-period", params);
  }
}
