import {
  ReferenceDataLocationsHotelParams,
  ReferenceDataLocationsHotelResult,
  ReferenceDataLocationsHotelReturnedResponse,
} from "../../../../types/amadeus/namespaces/reference-data/locations/hotel";
import Client from "../../../client";

/**
 * A namespaced client for the
 * `/v1/reference-data/locations/hotel` endpoints
 *
 * Access via the {@link Amadeus} object
 *
 * ```ts
 * const amadeus = new Amadeus();
 * amadeus.referenceData.locations.hotel;
 * ```
 *
 * @param {Client} client
 */
export default class Hotel {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }
  /**
   * Returns a list of hotels for a given area.
   *
   * @param {Object} params
   * @param {string} params.keyword Location query keyword Example: PARI
   * @param {string} params.subType Category of search - To enter several value, repeat the query parameter    * Use HOTEL_LEISURE to target aggregators or HOTEL_GDS to target directly the chains
   * @return {Promise<Response|ResponseError>} a Promise
   *
   *  Find relevant points of interest within an area in Barcelona
   * ```ts
   * amadeus.referenceData.locations.hotel.get({
   *   keyword: 'PARIS',
   *   subType: 'HOTEL_GDS'
   * })
   * ```
   */
  public get(
    params: ReferenceDataLocationsHotelParams
  ): Promise<ReferenceDataLocationsHotelReturnedResponse> {
    return this.client.get<
      ReferenceDataLocationsHotelResult,
      ReferenceDataLocationsHotelResult["data"]
    >("/v1/reference-data/locations/hotel", params);
  }
}
