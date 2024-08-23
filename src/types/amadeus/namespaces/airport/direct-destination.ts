import { ReturnedResponseSuccess } from "../../client/response";
import { Issue } from "../shared";

type Locations = {
  type?: string;
  subtype?: string;
  name?: string;
  iataCode?: string;
  geoCode?: {
    latitude?: number;
    longitude?: number;
  };
  address?: {
    countryName?: string;
    countryCode?: string;
    stateCode?: string;
    regionCode?: string;
  };
  timeZone?: {
    offSet?: string;
    referenceLocalDateTime?: string;
  };
  metrics?: {
    relevance?: number;
  };
};

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
  data: Locations;
  meta?: Meta;
};

export type AirportDirectDestinationReturnedResponse = ReturnedResponseSuccess<
  AirportDirectDestinationResult,
  AirportDirectDestinationResult["data"]
>;
