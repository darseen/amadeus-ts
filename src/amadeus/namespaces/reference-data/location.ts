import Client from "../../client";

/**
 * A namespaced client for the
 * `/v2/reference-data/locations/:location_id` endpoints
 *
 * Access via the {@link Amadeus} object
 *
 * ```ts
 * const amadeus = new Amadeus();
 * amadeus.referenceData.locations('ALHR');
 * ```
 *
 * @param {Client} client
 * @property {number} locationId
 */
export default class Location {
  private client: Client;
  private locationId: string;

  constructor(client: Client, locationId: string) {
    this.client = client;
    this.locationId = locationId;
  }

  /**
   * Returns details for a specific airport
   *
   * @param {Object} params
   * @return {Promise<Response|ResponseError>} a Promise
   *
   * Find details for location with ID 'ALHR'
   *
   * ```ts
   * amadeus.referenceData.location('ALHR').get();
   * ```
   */
  public get(params: Object = {}) {
    return this.client.get(
      `/v1/reference-data/locations/${this.locationId}`,
      params
    );
  }
}
