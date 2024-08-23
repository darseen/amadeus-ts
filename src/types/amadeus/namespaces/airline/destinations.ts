import { ReturnedResponseSuccess } from "../../client/response";
import { Issue, Locations } from "../shared";

type Meta = {
  count?: number;
  links?: {
    self?: string;
  };
};

export type AirlineDestinationsParams = {
  airlineCode: string;
  max?: number;
  arrivalCountryCode?: string;
};

export type AirlineDestinationsResult = {
  warnings?: Issue[];
  data: Locations[];
  meta?: Meta;
};

export type AirlineDestinationsReturnedResponse = ReturnedResponseSuccess<
  AirlineDestinationsResult,
  AirlineDestinationsResult["data"]
>;
