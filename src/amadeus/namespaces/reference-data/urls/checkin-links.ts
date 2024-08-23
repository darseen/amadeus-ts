import {
  ReferenceDataCheckinLinksParams,
  ReferenceDataCheckinLinksResult,
  ReferenceDataCheckinLinksReturnedResponse,
} from "../../../../types/amadeus/namespaces/reference-data/urls/checkin-links";
import Client from "../../../client";

/**
 * A namespaced client for the
 * `/v2/reference-data/urls/checkin-links` endpoints
 *
 * Access via the {@link Amadeus} object
 *
 * ```ts
 * const amadeus = new Amadeus();
 * amadeus.referenceData.urls.checkinLinks;
 * ```
 *
 * @param {Client} client
 */
export default class CheckinLinks {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  /**
   * Returns the checkin links for an airline, for the
   * language of your choice
   *
   * @param {Object} params
   * @param {string} params.airlineCode airline ID - required
   * @param {string} [params.language="en-GB"] the locale for the links
   * @return {Promise<Response|ResponseError>} a Promise
   *
   * Find a the checkin links for Air France
   *
   * ```ts
   * amadeus.referenceData.urls.checkinLinks.get({
   *   airlineCode: 'AF'
   * });
   * ```
   */
  public get(
    params: ReferenceDataCheckinLinksParams
  ): Promise<ReferenceDataCheckinLinksReturnedResponse> {
    return this.client.get<
      ReferenceDataCheckinLinksResult,
      ReferenceDataCheckinLinksResult["data"]
    >("/v2/reference-data/urls/checkin-links", params);
  }
}
