import Client from "../../../client";
import CheckinLinks from "./checkin-links";

/**
 * A namespaced client for the
 * `/v2/reference-data/urls` endpoints
 *
 * Access via the {@link Amadeus} object
 *
 * ```ts
 * const amadeus = new Amadeus();
 * amadeus.referenceData.urls;
 * ```
 *
 * @param {Client} client
 * @property {CheckinLinks} checkin_links
 * @protected
 */
export default class Urls {
  private client: Client;
  public checkinLinks: CheckinLinks;

  constructor(client: Client) {
    this.client = client;
    this.checkinLinks = new CheckinLinks(client);
  }
}
