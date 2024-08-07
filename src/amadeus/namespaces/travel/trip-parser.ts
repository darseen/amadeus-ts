import Client from "../../client";

/**
 * A namespaced client for the
 * `/v3/travel/trip-parser` endpoints
 *
 * Access via the {@link Amadeus} object
 *
 * ```ts
 * const amadeus = new Amadeus();
 * amadeus.tripParser;
 * ```
 *
 * @param {Client} client
 */
export default class TripParser {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  /**
   * parse information from flight, hotel, rail, and rental car confirmation emails
   *
   * @param {Object} params
   * @return {Promise<Response|ResponseError>} a Promise
   *
   * "How can I show travelers their full itinerary in one place?"
   *
   * ```ts
   * amadeus.tripParser.post(body);
   * ```
   */
  public post(params: Object = {}) {
    return this.client.post("/v3/travel/trip-parser", params);
  }
  /**
   * Helper method to convert file contents in UTF-8 encoded string
   * into Base64 encoded string
   */
  public fromFile(fileContentsInUTF8Format: string | Buffer): string {
    return Buffer.from(fileContentsInUTF8Format).toString("base64");
  }
}
