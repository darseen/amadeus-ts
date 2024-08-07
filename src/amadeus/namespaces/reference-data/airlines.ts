import Client from "../../client";

/**
 * A namespaced client for the
 * `/v1/reference-data/airlines` endpoints
 *
 * Access via the {@link Amadeus} object
 *
 * ```ts
 * const amadeus = new Amadeus();
 * amadeus.referenceData.airlines;
 * ```
 *
 * @param {Client} client
 */
export default class Airlines {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  /**
   * Returns the airline name and code.
   *
   * @param {Object} params
   * @param {string} params.airlineCodes Code of the airline following IATA or ICAO standard.
   * @return {Promise<Response|ResponseError>} a Promise
   *
   * Find to which airlines belongs IATA Code BA
   *
   * ```ts
   * amadeus.referenceData.airlines.get({
   *   airlineCodes : 'BA'
   * });
   * ```
   */
  public get(params: Object = {}) {
    return this.client.get("/v1/reference-data/airlines", params);
  }
}
