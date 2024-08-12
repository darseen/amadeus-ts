import {
  FlightOffersPricingAdditionalParams,
  FlightOffersPricingParams,
  FlightOffersPricingResult,
  FlightOffersPricingReturnedResponse,
} from "../../../../types/amadeus/namespaces/shopping/flight-offers/pricing";
import Client from "../../../client";

/**
 * A namespaced client for the
 * `/v1/shopping/flight-offers/pricing` endpoints
 *
 * Access via the {@link Amadeus} object
 *
 * ```ts
 * const amadeus = new Amadeus();
 * amadeus.shopping.flightOffers.pricing;
 * ```
 *
 * @param {Client} client
 */
export default class Pricing {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  /**
   * To get or confirm the price of a flight and obtain information
   * about taxes and fees to be applied to the entire journey. It also
   * retrieves ancillary information (e.g. additional bag or extra legroom
   * seats pricing) and the payment information details requested at booking time.
   *
   * @param {Object} params
   * @param {Object} params.data
   * @param {string} params.data.type 'flight-offers-pricing' for Flight Offer Pricing
   * @param {Array} params.data.flightOffers list of flight offers for which the
   * pricing needs to be retrieved
   * @return {Promise<Response|ResponseError>} a Promise
   *
   * ```ts
   * amadeus.shopping.flightOffers.pricing.post({
   *  data: {
   *      type: 'flight-offers-pricing',
   *      flightOffers: []
   *  }
   * });
   * ```
   */
  public post(
    params: FlightOffersPricingParams,
    additionalParams: FlightOffersPricingAdditionalParams = {}
  ): Promise<FlightOffersPricingReturnedResponse> {
    // Convert additionalParams object to query string
    const queryString = Object.keys(additionalParams)
      .map(
        (key) =>
          key +
          "=" +
          additionalParams[key as keyof FlightOffersPricingAdditionalParams]
      )
      .join("&");

    // Check if queryString is empty before appending it to the URL
    let url = "/v1/shopping/flight-offers/pricing";
    if (queryString !== "") {
      url += "?" + queryString;
    }

    return this.client.post<
      FlightOffersPricingResult,
      FlightOffersPricingResult["data"]
    >(url, JSON.stringify(params));
  }
}
