import Client from "../../client";
import TransferOrder from "./transfer-order";
import TransferOrders from "./transfer-orders";

/**
 * A namespaced client for the
 * `/v1/ordering` endpoints
 *
 * Access via the {@link Amadeus} object
 *
 * ```ts
 * const amadeus = new Amadeus();
 * amadeus.ordering;
 * ```
 *
 * @param {Client} client
 * @property {TransferOrders} transferOrders
 * @property {TransferOrder} transferOrder
 */
export default class Ordering {
  private client: Client;
  public transferOrders: TransferOrders;
  public transferOrder: (orderId: string) => TransferOrder;

  constructor(client: Client) {
    this.client = client;
    this.transferOrders = new TransferOrders(client);
    this.transferOrder = (orderId: string) =>
      new TransferOrder(client, orderId);
  }
}
