import Client from "../../client";

/**
 * A namespaced client for the
 * `/v1/airport/direct-destinations` endpoints
 *
 * Access via the {@link Amadeus} object
 *
 * ```ts
 * const amadeus = new Amadeus();
 * amadeus.airport.directDestinations;
 * ```
 *
 * @param {Client} client
 */
export default class DirectDestinations {
  private client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  /**
   * Get the percentage of on-time flight departures from a given airport
   *
   * @param {Object} params
   * @param {string} params.departureAirportCode airport IATA code, e.g. BOS for Boston
   * @return {Promise<Response|ResponseError>} a Promise
   *
   * What destinations are served by this airport?
   *  ```ts
   * amadeus.airport.directDestinations.get({
   *   departureAirportCode: 'JFK',
   * })
   * ```
   */
  public get(params = {}) {
    return this.client.get("/v1/airport/direct-destinations", params);
  }
}
