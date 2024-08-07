import Client from "../../../client";
import FlightAvailabilities from "./flight-availabilities";

/**
 * A namespaced client for the
 * `/v1/shopping/availability` endpoints
 *
 * Access via the {@link Amadeus} object
 *
 * ```ts
 * const amadeus = new Amadeus();
 * amadeus.shopping.availability;
 * ```
 *
 * @param {Client} client
 * @property {Availability} availability
 * @protected
 */
export default class Availability {
  private client: Client;
  public flightAvailabilities: FlightAvailabilities;

  constructor(client: Client) {
    this.client = client;
    this.flightAvailabilities = new FlightAvailabilities(client);
  }
}
