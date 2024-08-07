import Client from "../../../client";
import FlightChoicePrediction from "./flight-choice-prediction";
import Pricing from "./pricing";
import Upselling from "./upselling";

/**
 * A namespaced client for the
 * `/v1/shopping/flight-offers` endpoints
 *
 * Access via the {@link Amadeus} object
 *
 * ```ts
 * const amadeus = new Amadeus();
 * amadeus.shopping.flightOffers;
 * ```
 *
 * @param {Client} client
 */
export default class FlightOffers {
  private client: Client;
  public prediction: FlightChoicePrediction;
  public pricing: Pricing;
  public upselling: Upselling;

  constructor(client: Client) {
    this.client = client;
    this.prediction = new FlightChoicePrediction(client);
    this.pricing = new Pricing(client);
    this.upselling = new Upselling(client);
  }
}
