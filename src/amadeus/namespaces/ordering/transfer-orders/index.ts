import Client from "../../../client";

/**
 * A namespaced client for the
 * `/v1/ordering/transfer-orders` endpoints
 *
 * Access via the {@link Amadeus} object
 *
 * ```ts
 * cosnt amadeus = new Amadeus();
 * amadeus.ordering.transferOrders;
 * ```
 *
 * @param {Client} client
 */
export default class TransferOrders {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  /**
   * To book the selected transfer-offer and create a transfer-order
   *
   * @return {Promise<Response|ResponseError>} a Promise
   *
   * To book the transfer-offer(s) suggested by transferOffers and create a transfer-order
   *
   * ```ts
   * amadeus.ordering.transferOrders.post(body, '2094123123');;
   * ```
   */
  public post(body: any, offerId: string) {
    return this.client.post(
      `/v1/ordering/transfer-orders?offerId=${offerId}`,
      body
    );
  }
}
