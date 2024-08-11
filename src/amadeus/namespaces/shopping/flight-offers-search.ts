import {
  FlightOffersSearchGetRequest,
  FlightOffersSearchGetResponse,
  FlightOffersSearchGetReturnType,
  FlightOffersSearchPostRequest,
  FlightOffersSearchPostResponse,
  FlightOffersSearchPostReturnType,
} from "../../../types/amadeus/namespaces/shopping/flight-offers-search";
import Client from "../../client";

/**
 * A namespaced client for the
 * `/v2/shopping/flight-offers` endpoints
 *
 * Access via the {@link Amadeus} object
 *
 * ```ts
 * const amadeus = new Amadeus();
 * amadeus.shopping.flightOffersSeach;
 * ```
 *
 * @param {Client} client
 */
export default class FlightOffersSearch {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  /**
   * Get cheapest flight recommendations and prices on a given journey.
   *
   * @param {Object} params
   * @param {string} params.originLocationCode city/airport IATA code from which the traveler will depart, e.g. BOS for Boston
   * @param {string} params.destinationLocationCode city/airport IATA code to which the traveler is going, e.g. PAR for Paris
   * @param {string} params.departureDate the date on which the traveler will depart
   * from the origin to go to the destination. Dates are specified in the ISO 8601 YYYY-MM-DD format, e.g. 2017-12-25
   * @param {string} params.adults the number of adult travelers (age 12 or older on date of departure)
   * @return {Promise<Response|ResponseError>} a Promise
   *
   * Get cheapest flight recommendations and prices for SYD-BKK on 2020-08-01 for 2 adults
   *
   * ```ts
   * amadeus.shopping.flightOffers.get({
   *    originLocationCode: 'SYD',
   *    destinationLocationCode: 'BKK',
   *    departureDate: '2020-08-01',
   *    adults: '2'
   * });
   * ```
   */
  public get(
    params: FlightOffersSearchGetRequest
  ): FlightOffersSearchGetReturnType {
    return this.client.get<
      FlightOffersSearchGetResponse,
      FlightOffersSearchGetResponse["data"]
    >("/v2/shopping/flight-offers", params);
  }

  /**
   * To do a customized search with every option available.
   *
   * @param {FlightOffersSearchPostRequest} params
   * @param {number} params.getFlightOffersBody list of criteria to retrieve a list of flight offers
   * @return {Promise<Response|ResponseError>} a Promise
   *
   * To do a customized search with given options.
   *
   * ```ts
   * amadeus.shopping.flightOffersSearch.post({
        "currencyCode": "USD",
        "originDestinations": [
          {
            "id": "1",
            "originLocationCode": "RIO",
            "destinationLocationCode": "MAD",
            "departureDateTimeRange": {
              "date": "2020-03-01",
              "time": "10:00:00"
            }
          },
          {
            "id": "2",
            "originLocationCode": "MAD",
            "destinationLocationCode": "RIO",
            "departureDateTimeRange": {
              "date": "2020-03-05",
              "time": "17:00:00"
            }
          }
        ],
        "travelers": [
          {
            "id": "1",
            "travelerType": "ADULT",
            "fareOptions": [
              "STANDARD"
            ]
          },
          {
            "id": "2",
            "travelerType": "CHILD",
            "fareOptions": [
              "STANDARD"
            ]
          }
        ],
        "sources": [
          "GDS"
        ],
        "searchCriteria": {
          "maxFlightOffers": 50,
          "flightFilters": {
            "cabinRestrictions": [
              {
                "cabin": "BUSINESS",
                "coverage": "MOST_SEGMENTS",
                "originDestinationIds": [
                  "1"
                ]
              }
            ],
            "carrierRestrictions": {
              "excludedCarrierCodes": [
                "AA",
                "TP",
                "AZ"
              ]
            }
          }
        }
      });
    * ```
    */
  public post(
    params: FlightOffersSearchPostRequest
  ): FlightOffersSearchPostReturnType {
    return this.client.post<
      FlightOffersSearchPostResponse,
      FlightOffersSearchPostResponse["data"]
    >("/v2/shopping/flight-offers", JSON.stringify(params));
  }
}
