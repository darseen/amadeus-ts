import Client from "../../client";
import Destinations from "./destinations";

/**
 * A namespaced client for the
 * `/v1/airline` endpoints
 *
 * Access via the {@link Amadeus} object
 *
 * ```ts
 * const amadeus = new Amadeus();
 * amadeus.airline;
 * ```
 *
 * @param {Client} client
 */
class Airline {
  private client: Client;
  public destinations: Destinations;

  constructor(client: Client) {
    this.client = client;
    this.destinations = new Destinations(client);
  }
}

export default Airline;
