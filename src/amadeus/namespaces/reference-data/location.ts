import {
  ReferenceDataLocationsResult,
  ReferenceDataLocationsReturnedResponse,
} from "../../../types/amadeus/namespaces/reference-data/locations";
import Client from "../../client";

/**
 * A namespaced client for the
 * `/v1/reference-data/locations/:location_id` endpoints
 *
 * Access via the {@link Amadeus} object
 *
 * ```ts
 * const amadeus = new Amadeus();
 * amadeus.referenceData.location('ALHR');
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
  public get(
    params: Object = {}
  ): Promise<ReferenceDataLocationsReturnedResponse> {
    return this.client.get<
      ReferenceDataLocationsResult,
      ReferenceDataLocationsResult["data"]
    >(`/v1/reference-data/locations/${this.locationId}`, params);
  }
}
