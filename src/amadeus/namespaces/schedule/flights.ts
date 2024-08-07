import Client from "../../client";

/**
 * A namespaced client for the
 * `/v2/schedule/flights` endpoints
 *
 * Access via the {@link Amadeus} object
 *
 * ```ts
 * const amadeus = new Amadeus();
 * amadeus.schedule.flights;
 * ```
 *
 * @param {Client} client
 */
export default class Flights {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  /**
   * Provides real-time flight schedule data including up-to-date departure and arrival times,
   *  terminal and gate information, flight duration and real-time delay status
   *
   * @param {Object} params
   * @param {string} params.carrierCode 2 to 3-character IATA carrier code - required
   * @param {string} params.flightNumber 1 to 4-digit number of the flight. e.g. 4537 - required
   * @param {string} params.scheduledDepartureDate scheduled departure date of the flight, local to the departure airport - required
   * @return {Promise<Response|ResponseError>} a Promise
   * What's the current status of my flight?
   * ```ts
   * amadeus.schedule.flights.get({
   * carrierCode: 'AZ',
   * flightNumber: '319',
   * scheduledDepartureDate: '2021-03-13'
   * });
   * ```
   */
  public get(params: Object = {}) {
    return this.client.get("/v2/schedule/flights", params);
  }
}
