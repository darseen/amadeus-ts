import { ReturnedResponseSuccess } from "../../../client/response";

type Prediction = {
  data?: PurposePrediction;
  meta?: Meta;
};

type Meta = {
  links?: Links;
  defaults?: Defaults;
};

type PurposePrediction = {
  type?: "prediction";
  subType?: string;
  id?: string;
  result?: PredictionResultType;
  probability?: string;
};

type PredictionResultType = "BUSINESS" | "LEISURE";

type Links = {
  self?: string;
  related?: string;
  type?: string;
};

type Defaults = {
  searchDate?: string;
};

export type TripPurposeParams = {
  originLocationCode: string;
  destinationLocationCode: string;
  departureDate: string;
  returnDate: string;
  searchDate?: string;
};

export type TripPurposeResult = {
  data?: PurposePrediction;
  meta?: Meta;
};

export type TripPurposesReturnedResponse = ReturnedResponseSuccess<
  TripPurposeResult,
  TripPurposeResult["data"]
>;
