import { ReturnedResponseSuccess } from "../../../client/response";
import { Dictionaries, FlightOffer, Issue, PaymentBrand } from "../../shared";

type Payment = {
  brand?: PaymentBrand;
  binNumber?: number;
  flightOfferIds?: string[];
};

type FlightOfferUpsellIn = {
  type: "flight-offers-upselling";
  flightOffers: FlightOffer[];
  payments?: Payment[];
};

type CollectionMetaUpsell = {
  count?: number;
  oneWayUpselledCombinations?: {
    flightOfferId?: string;
    upselledFlightOfferIds?: string[];
  }[];
};

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
