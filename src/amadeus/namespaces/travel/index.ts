import Client from "../../client";
import Analytics from "./analytics";
import Predictions from "./predictions";
import TripParser from "./trip-parser";

/**
 * A namespaced client for the
 * `/v1/travel` & `/v2/travel` & `/v3/travel` endpoints
 *
 * Access via the {@link Amadeus} object
 *
 * ```ts
 * const amadeus = new Amadeus();
 * amadeus.travel;
 * ```
 *
 * @param {Client} client
 * @property {Analytics} analytics
 * @property {Predictions} predictions
 * @property {TripParser} tripParser
 * @protected
 */
export default class Travel {
  private client: Client;
  public analytics: Analytics;
  public predictions: Predictions;
  public tripParser: TripParser;

  constructor(client: Client) {
    this.client = client;
    this.analytics = new Analytics(client);
    this.predictions = new Predictions(client);
    this.tripParser = new TripParser(client);
  }
}
