import Client from "../../client";

/**
 * A namespaced client for the
 * `/v1/shopping/activities/{activityId}` endpoints
 *
 * Access via the {@link Amadeus} object
 *
 * ```ts
 * const amadeus = new Amadeus();
 * amadeus.shopping.activity
 * ```
 *
 * @param {Client} client
 */
export default class Activity {
  private client: Client;
  private activityId: string;

  constructor(client: Client, activityId: string) {
    this.client = client;
    this.activityId = activityId;
  }

  /**
   * Retieve information of an activity by its Id.
   *
   * What is the activity information with Id 3216547684?
   * ```ts
   * amadeus.shopping.activity('3216547684').get();
   * ```
   */
  public get() {
    return this.client.get(`/v1/shopping/activities/${this.activityId}`);
  }
}
