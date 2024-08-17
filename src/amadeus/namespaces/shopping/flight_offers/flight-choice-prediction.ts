import {
  FlightOffersPredictionParams,
  FlightOffersPredictionResult,
  FlightOffersPredictionReturnedResponse,
} from "../../../../types/amadeus/namespaces/shopping/flight-offers/flight-choice-prediction";
import Client from "../../../client";

/**
 * A namespaced client for the
 * `/v1/shopping/flight-offers/prediction` endpoints
 *
 * Access via the {@link Amadeus} object
 *
 * ```ts
 * const amadeus = new Amadeus();
 * amadeus.shopping.flightOffers.prediction;
 * ```
 *
 * @param {Client} client
 */
export default class FlightChoicePrediction {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  /**
   * Returns a list of flight offers with the probability to be chosen.
   *
   * @param {Object} params
   * @return {Promise<Response|ResponseError>} a Promise
   *
   * Returns flights from NYC to MAD with the probability to be chosen.
   *
   * ```ts
   * amadeus.shopping.flightOffersSearch.get({
   *     originLocationCode: 'SYD',
   *     destinationLocationCode: 'BKK',
   *     departureDate: '2020-08-01',
   *     adults: '2'
   * }).then(function(response){
   *     return amadeus.shopping.flightOffers.prediction.post(
   *       response
   *     );
   * }).then(function(response){
   *     console.log(response.data);
   * }).catch(function(responseError){
   *     console.log(responseError);
   * });
   * ```
   */
  public post(
    params: FlightOffersPredictionParams
  ): Promise<FlightOffersPredictionReturnedResponse> {
    return this.client.post<
      FlightOffersPredictionResult,
      FlightOffersPredictionResult["data"]
    >("/v2/shopping/flight-offers/prediction", JSON.stringify(params));
  }
}
