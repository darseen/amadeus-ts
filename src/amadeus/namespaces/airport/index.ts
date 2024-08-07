import Client from "../../client";
import DirectDestinations from "./direct-destination";
import Predictions from "./predictions";

/**
 * A namespaced client for the
 * `/v1/airport` endpoints
 *
 * Access via the {@link Amadeus} object
 *
 * ```ts
 * const amadeus = new Amadeus();
 * amadeus.airport;
 * ```
 *
 * @param {Client} client
 * @property {Predictions} predictions
 */
export default class Airport {
  private client: Client;
  public directDestinations: DirectDestinations;
  public predictions: Predictions;

  constructor(client: Client) {
    this.client = client;
    this.directDestinations = new DirectDestinations(client);
    this.predictions = new Predictions(client);
  }
}
