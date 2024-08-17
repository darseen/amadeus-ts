import { ReturnedResponseSuccess } from "../../../client/response";
import { Dictionaries, FlightOffer, Issue, PaymentBrand } from "../../shared";

export interface Payment {
  brand?: PaymentBrand;
  binNumber?: number;
  flightOfferIds?: string[];
}

export interface FlightOfferUpsellIn {
  type: "flight-offers-upselling";
  flightOffers: FlightOffer[];
  payments?: Payment[];
}

export interface CollectionMetaUpsell {
  count?: number;
  oneWayUpselledCombinations?: {
    flightOfferId?: string;
    upselledFlightOfferIds?: string[];
  }[];
}

// Types used in class
export type FlightOffersUpsellingParams = {
  data: FlightOfferUpsellIn;
};

export type FlightOffersUpsellingResult = {
  meta?: CollectionMetaUpsell;
  warnings?: Issue[];
  data: FlightOffer[];
  dictionaries?: Dictionaries;
};

export type FlightOffersUpsellingReturnedResponse = ReturnedResponseSuccess<
  FlightOffersUpsellingResult,
  FlightOffersUpsellingResult["data"]
>;
