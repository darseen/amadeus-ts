import {
  ReferenceDataLocationsPoisPoiResult,
  ReferenceDataLocationsPoisPoiReturnedResponse,
} from "../../../../../types/amadeus/namespaces/reference-data/locations/points-of-interest/poi";
import Client from "../../../../client";

/**
 * A namespaced client for the
 * `/v1/reference-data/locations/pois` endpoints
 *
 * Access via the {@link Amadeus} object
 *
 * ```ts
 * const amadeus = new Amadeus();
 * amadeus.referenceData.locations.pointOfInterest;
 * ```
 *
 * @param {Client} client
 */
export default class PointOfInterest {
  private client: Client;
  private poiId: string;

  constructor(client: Client, poiId: string) {
    this.client = client;
    this.poiId = poiId;
  }

  /**
   * Extracts the information about point of interest with given ID
   *
   * Extract the information about point of interest with ID '9CB40CB5D0'
   * ```ts
   * amadeus.referenceData.locations.pointOfInterest('9CB40CB5D0').get();
   * ```
   */
  public get(): Promise<ReferenceDataLocationsPoisPoiReturnedResponse> {
    return this.client.get<
      ReferenceDataLocationsPoisPoiResult,
      ReferenceDataLocationsPoisPoiResult["data"]
    >(`/v1/reference-data/locations/pois/${this.poiId}`);
  }
}
