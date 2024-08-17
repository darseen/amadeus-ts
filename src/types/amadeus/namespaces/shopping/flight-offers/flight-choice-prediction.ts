import { ReturnedResponseSuccess } from "../../../client/response";
import {
  CollectionMetaLink,
  OneWayCombinations,
  Dictionaries,
  FlightOffer,
  Issue,
} from "../../shared";
import { FlightOffersSearchGetResult } from "../flight-offers-search";

// Types used in class
export type FlightOffersPredictionParams = FlightOffersSearchGetResult;

export type FlightOffersPredictionResult = {
  warnings?: Issue[];
  meta?: CollectionMetaLink & {
    oneWayCombinations?: OneWayCombinations;
  };
  data: FlightOffer[];
  dictionaries?: Dictionaries;
};

export type FlightOffersPredictionReturnedResponse = ReturnedResponseSuccess<
  FlightOffersPredictionResult,
  FlightOffersPredictionResult["data"]
>;
