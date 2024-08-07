import Client from "../../../../client";

/**
 * A namespaced client for the
 * `/v1/travel/analytics/air-traffic/booked` endpoints
 *
 * Access via the {@link Amadeus} object
 *
 * ```ts
 * const amadeus = new Amadeus();
 * amadeus.travel.analytics.AirTraffic.Booked;
 * ```
 *
 * @param {Client} client
 */
export default class Booked {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  /**
   * Returns a list of air traffic reports based on the number of bookings.
   *
   * @param {Object} params
   * @param {string} params.originCityCode IATA code of the origin city - e.g. MAD for
   *   Madrid - required
   * @param {string} params.period period when consumers are travelling in
   *   YYYY-MM format
   * @return {Promise<Response|ResponseError>} a Promise
   *
   * Where were people flying to from Madrid in the August 2017?
   *
   * ```ts
   * amadeus.travel.analytics.AirTraffic.Booked.get({
   *   originCityCode: 'MAD',
   *   period: '2017-08'
   * });
   * ```
   */
  public get(params: Object = {}) {
    return this.client.get("/v1/travel/analytics/air-traffic/booked", params);
  }
}
