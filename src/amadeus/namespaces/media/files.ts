import Client from "../../client";

/**
 * A namespaced client for the
 * `/v2/media/files` endpoints
 *
 * Access via the {@link Amadeus} object
 *
 * ```ts
 * const amadeus = new Amadeus();
 * amadeus.media.files;
 * ```
 *
 * @param {Client} client
 */
export default class Files {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }
}
