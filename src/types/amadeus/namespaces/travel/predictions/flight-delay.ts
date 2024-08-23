import { ReturnedResponseSuccess } from "../../../client/response";
import { CollectionMetaLink } from "../../shared";

type PredictionResultType =
  | "LESS_THAN_30_MINUTES"
  | "BETWEEN_30_AND_60_MINUTES"
  | "BETWEEN_60_AND_120_MINUTES"
  | "OVER_120_MINUTES_OR_CANCELLED";

type DelayPrediction = {
  type?: string;
  subType?: string;
  id?: string;
  result?: PredictionResultType;
  probability?: string;
};

export type FlightDelayPredictionParams = {
  originLocationCode: string;
  destinationLocationCode: string;
  departureDate: string;
  departureTime: string;
  arrivalDate: string;
  arrivalTime: string;
  aircraftCode: string;
  carrierCode: string;
  flightNumber: string;
  duration: string;
};

export type FlightDelayPredictionResult = {
  data: DelayPrediction[];
  meta?: CollectionMetaLink;
};

export type FlightDelayPredictionReturnedResponse = ReturnedResponseSuccess<
  FlightDelayPredictionResult,
  FlightDelayPredictionResult["data"]
>;
