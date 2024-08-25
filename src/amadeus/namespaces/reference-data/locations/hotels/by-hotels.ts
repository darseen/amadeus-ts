import {
  ReferenceDataLocationsHotelsByHotelsParams,
  ReferenceDataLocationsHotelsByHotelsResult,
  ReferenceDataLocationsHotelsByHotelsReturnedResponse,
} from "../../../../../types/amadeus/namespaces/reference-data/locations/hotels/by-hotels";
import Client from "../../../../client";

/**
 * A namespaced client for the
 * `/v1/reference-data/locations/hotels/by-hotels` endpoints
 *
 * Access via the {@link Amadeus} object
 *
 * ```ts
 * const amadeus = new Amadeus();
 * amadeus.referenceData.locations.hotels.byHotels;
 * ```
 *
 * @param {Client} client
 */
export default class byHotels {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  /**
   * Returns a list of hotels for a given area.
   *
   * @param {Object} params
   * @param {string} params.hotelIds Comma separated list of Amadeus hotel
   *   codes to request. Example: XKPARC12
   * @return {Promise<Response|ResponseError>} a Promise
   *
   * Find relevant points of interest within an area in Barcelona
   * ```ts
   * amadeus.referenceData.locations.hotels.byHotels.get({
   *   hotelIds: 'ACPAR245'
   * })
   * ```
   */
  public get(
    params: ReferenceDataLocationsHotelsByHotelsParams
  ): Promise<ReferenceDataLocationsHotelsByHotelsReturnedResponse> {
    return this.client.get<
      ReferenceDataLocationsHotelsByHotelsResult,
      ReferenceDataLocationsHotelsByHotelsResult["data"]
    >("/v1/reference-data/locations/hotels/by-hotels", params);
  }
}
