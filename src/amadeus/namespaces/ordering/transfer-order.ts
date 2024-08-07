import Client from "../../client";
import Transfers from "./transfer-orders/transfers";

/**
 * A namespaced client for the
 * `/v1/ordering/transfer-orders/XXXXX` endpoints
 *
 * Access via the {@link Amadeus} object
 *
 * ```ts
 * const amadeus = new Amadeus();
 * amadeus.ordering.transferOrder('XXX');
 * ```
 *
 * @param {Client} client
 * @param {string} orderId
 */
export default class TransferOrder {
  private client: Client;
  private orderId: string;
  public transfers: Transfers;

  constructor(client: Client, orderId: string) {
    this.client = client;
    this.orderId = orderId;
    this.transfers = new Transfers(client, orderId);
  }
}
