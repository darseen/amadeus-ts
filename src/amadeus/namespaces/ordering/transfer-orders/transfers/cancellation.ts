import Client from "../../../../client";

/**
 * A namespaced client for the
 * `/v1/ordering/transfer-orders/XXX/transfers/cancellation` endpoints
 *
 * Access via the {@link Amadeus} object
 *
 * ```ts
 * const amadeus = new Amadeus();
 * amadeus.ordering.transferOrder('XXX').transfers.cancellation.post(JSON.stringify({}), '12345');;
 * ```
 *
 * @param {Client} client
 */
export default class Cancellation {
  private client: Client;
  private orderId: string;

  constructor(client: Client, orderId: string) {
    this.client = client;
    this.orderId = orderId;
  }

  /**
   * To cancel a transfer order based on its id
   * @return {Promise<Response|ResponseError>} a Promise
   *
   * To cancel a transfer order with ID 'XXX' and confirmation number '12345'
   *
   * ```ts
   * amadeus.ordering.transferOrder('XXX').transfers.cancellation.post(JSON.stringify({}), '12345');;
   * ```
   */
  public post(body: any, confirmNbr: string) {
    return this.client.post(
      `/v1/ordering/transfer-orders/${this.orderId}/transfers/cancellation?confirmNbr=${confirmNbr}`,
      body
    );
  }
}
