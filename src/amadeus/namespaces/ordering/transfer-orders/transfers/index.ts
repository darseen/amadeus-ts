import Client from "../../../../client";
import Cancellation from "./cancellation";

/**
 * A namespaced client for the
 * `/v1/ordering/transfer-orders/XXXXX/transfers` endpoints
 *
 * Access via the {@link Amadeus} object
 *
 * ```ts
 * const amadeus = new Amadeus();
 * amadeus.ordering.transferOrders('XXX').transfers;
 * ```
 *
 * @param {Client} client
 */
export default class Transfers {
  private client: Client;
  private orderId: string;
  public cancellation: Cancellation;

  constructor(client: Client, orderId: string) {
    this.client = client;
    this.orderId = orderId;
    this.cancellation = new Cancellation(client, orderId);
  }
}
