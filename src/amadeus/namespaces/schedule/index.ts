import Client from "../../client";
import Flights from "./flights";

/**
 * A namespaced client for the
 * `/v2/schedule` endpoints
 *
 * Access via the {Amadeus} object
 *
 * ```ts
 * const amadeus = new Amadeus();
 * amadeus.schedule.flights;
 * ```
 *
 * @param {Client} client
 * @property {Flights} flights
 * @protected
 */
export default class Schedule {
  private client: Client;
  public flights: Flights;

  constructor(client: Client) {
    this.client = client;
    this.flights = new Flights(client);
  }
}
