import Client from "../../../../client";

/**
 * A namespaced client for the
 * `/v1/travel/analytics/air-traffic/traveled` endpoints
 *
 * Access via the {@link Amadeus} object
 *
 * ```ts
 * const amadeus = new Amadeus();
 * amadeus.travel.analytics.AirTraffic.Traveled;
 * ```
 *
 * @param {Client} client
 */
export default class Traveled {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  /**
   * Returns a list of air traffic reports based on the number of people traveling.
   *
   * @param {Object} params
   * @param {string} params.originCityCode IATA code of the origin city - e.g. MAD for
   *   Madrid - required
   * @param {string} params.period period when consumers are travelling in
   *   YYYY-MM format
   * @return {Promise<Response|ResponseError>} a Promise
   *
   * Where were people flying to from Madrid in the January 2017?
   *
   * ```ts
   * amadeus.travel.analytics.AirTraffic.Traveled.get({
   *   originCityCode: 'MAD',
   *   period: '2017-01'
   * });
   * ```
   */
  public get(params: Object = {}) {
    return this.client.get("/v1/travel/analytics/air-traffic/traveled", params);
  }
}
