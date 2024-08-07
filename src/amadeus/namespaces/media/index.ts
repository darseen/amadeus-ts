import Client from "../../client";
import Files from "./files";

/**
 * A namespaced client for the
 * `/v2/media` endpoints
 *
 * Access via the {@link Amadeus} object
 *
 * ```ts
 * const amadeus = new Amadeus();
 * amadeus.media;
 * ```
 *
 * @param {Client} client
 * @property {Files} files
 */
export default class Media {
  private client: Client;
  public files: Files;

  constructor(client: Client) {
    this.client = client;
    this.files = new Files(client);
  }
}
