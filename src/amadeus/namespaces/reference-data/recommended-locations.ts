import {
  RecommendedLocationsParams,
  RecommendedLocationsResult,
  RecommendedLocationsReturnedResponse,
} from "../../../types/amadeus/namespaces/reference-data/recommended-locations";
import Client from "../../client";

/**
 * A namespaced client for the
 * `/v1/reference-data/recommended-locations` endpoints
 *
 * Access via the {@link Amadeus} object
 *
 * ```ts
 * const amadeus = new Amadeus();
 * amadeus.referenceData.recommendedLocations;
 * ```
 *
 * @param {Client} client
 */
export default class RecommendedLocations {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  /**
   * Returns the recommended locations (destinations).
   *
   * @param {Object} params
   * @param {string} params.cityCodes Code of the city following IATA standard.
   * @param {string} params.travelerCountryCode Origin country of the traveler following IATA standard.
   * @param {string} params.destinationCountryCodes Country codes follow IATA standard.
   * @return {Promise<Response|ResponseError>} a Promise
   *
   * Get recommended destinations from a given origin
   *
   * ```ts
   * amadeus.referenceData.recommendedDestinations.get({
   *   cityCodes: 'PAR',
   *   travelerCountryCode: 'FR'
   * });
   * ```
   */
  public get(
    params: RecommendedLocationsParams
  ): Promise<RecommendedLocationsReturnedResponse> {
    return this.client.get<
      RecommendedLocationsResult,
      RecommendedLocationsResult["data"]
    >("/v1/reference-data/recommended-locations", params);
  }
}
