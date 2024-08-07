import Client from "../../../client";

/**
 * A namespaced client for the
 * `/v2/reference-data/locations/cities` endpoints
 *
 * Access via the {@link Amadeus} object
 *
 * ```ts
 * cosnt amadeus = new Amadeus();
 * amadeus.referenceData.locations.cities;
 * ```
 *
 * @param {Client} client
 */
export default class Cities {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  /**
   * Return a list of cities matching a given keyword..
   *
   * @param {Object} params
   * @param {string} params.keyword keyword that should represent
   * the start of a word in a city name
   * @return {Promise<Response|ResponseError>} a Promise
   *
   * Return a list of cities matching a keyword 'France'
   *
   * ```ts
   * amadeus.referenceData.locations.cities.get({
   *   keyword: 'FRANCE'
   * });
   * ```
   */
  public get(params: Object = {}) {
    return this.client.get("/v1/reference-data/locations/cities", params);
  }
}
