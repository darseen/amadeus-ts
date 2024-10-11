import Client from "../../client";
import Analytics from "./analytics";
import Predictions from "./predictions";

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
 * @protected
 */
export default class Travel {
  public analytics: Analytics;
  public predictions: Predictions;

  constructor(client: Client) {
    this.analytics = new Analytics(client);
    this.predictions = new Predictions(client);
  }
}
