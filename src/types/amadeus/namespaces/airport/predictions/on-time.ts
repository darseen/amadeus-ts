import { ReturnedResponseSuccess } from "../../../client/response";

type Meta = {
  links?: Links;
};

type OnTimePrediction = {
  type?: "prediction";
  subType?: string;
  id?: string;
  result?: PredictionResultType;
  probability?: string;
};

type PredictionResultType = string;

type Links = {
  self?: string;
  related?: string;
  type?: string;
};

export type AirpoerPredictionsOnTimeParams = {
  airportCode: string;
  date: string;
};

export type AirpoerPredictionsOnTimeResult = {
  data?: OnTimePrediction;
  meta?: Meta;
};

export type AirportOnTimePredictionReturnedResponse = ReturnedResponseSuccess<
  AirpoerPredictionsOnTimeResult,
  AirpoerPredictionsOnTimeResult["data"]
>;
