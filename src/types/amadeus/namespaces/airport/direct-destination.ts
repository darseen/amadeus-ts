import { ReturnedResponseSuccess } from "../../client/response";
import { Issue, Locations } from "../shared";

type Meta = {
  count?: number;
  links?: {
    self?: string;
  };
};

export type AirportDirectDestinationParams = {
  departureAirportCode: string;
  max?: number;
  arrivalCountryCode?: string;
};

export type AirportDirectDestinationResult = {
  warnings?: Issue[];
  data: Locations[];
  meta?: Meta;
};

export type AirportDirectDestinationReturnedResponse = ReturnedResponseSuccess<
  AirportDirectDestinationResult,
  AirportDirectDestinationResult["data"]
>;
