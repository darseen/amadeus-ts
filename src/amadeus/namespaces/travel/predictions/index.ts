import Client from "../../../client";
import FlightDelay from "./flight-delay";
import TripPurpose from "./trip-purpose";

/**
 * A namespaced client for the
 * `/v1/travel/predictions/trip-purpose` endpoints
 *
 * Access via the {@link Amadeus} object
 *
 * ```ts
 * const amadeus = new Amadeus();
 * amadeus.travel.predictions;
 * ```
 *
 * @param {Client} client
 * @property {TripPurpose} tripPurpose
 * @property {FlightDelay} flightDelay
 */
export default class Predictions {
  private client: Client;
  public tripPurpose: TripPurpose;
  public flightDelay: FlightDelay;

  constructor(client: Client) {
    this.client = client;
    this.tripPurpose = new TripPurpose(client);
    this.flightDelay = new FlightDelay(client);
  }
}
