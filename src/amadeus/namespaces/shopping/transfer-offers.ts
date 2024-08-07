import Client from "../../client";

/**
 * A namespaced client for the
 * `/v1/shopping/transfer-offers` endpoints
 *
 * Access via the {@link Amadeus} object
 *
 * ```ts
 * const amadeus = new Amadeus();
 * amadeus.shopping.transferOffers;
 * ```
 *
 * @param {Client} client
 */
export default class TransferOffers {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  /**
   * To search the list of transfer offers.
   *
   * @param {Object} params
   * @return {Promise<Response|ResponseError>} a Promise
   *
   * To search the list of transfer offers
   *
   * ```ts
   * amadeus.shopping.transferOffers.post(body)

   * ```
  */
  public post(params: Object = {}) {
    return this.client.post("/v1/shopping/transfer-offers", params);
  }
}
