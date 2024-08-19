import { ReturnedResponseSuccess } from "../../client/response";
import { Issue } from "../shared";

export interface Links {
  self?: string;
}

export interface Price {
  total?: string;
}

export type LocationDictionary = any;

export interface LocationValue {
  subType?: "AIRPORT" | "CITY";
  detailedName?: string;
}

export type CurrencyDictionary = any;

export interface FlightDestinations {
  data?: FlightDestination[];
  dictionaries?: Dictionaries;
  meta?: Meta;
  warnings?: Issue[];
}

export interface FlightDestination {
  type?: string;
  origin?: string;
  destination?: string;
  departureDate?: string;
  returnDate?: string;
  price?: Price;
  links?: {
    flightDates?: string;
    flightOffers?: string;
  };
}

export interface Dictionaries {
  currencies?: CurrencyDictionary;
  locations?: LocationDictionary;
}

export interface Meta {
  currency?: string;
  links?: Links;
  defaults?: Defaults;
}

export interface Defaults {
  departureDate?: string;
  oneWay?: boolean;
  duration?: string;
  nonStop?: boolean;
  maxPrice?: number;
  viewBy?: "COUNTRY" | "DATE" | "DESTINATION" | "DURATION" | "WEEK";
}

// Types used in class
export type FlightDestinationsParams = {
  origin: string;
} & Defaults;

export type FlightDestinationsResult = {
  data: FlightDestination[];
  dictionaries?: Dictionaries;
  meta?: Meta;
  warnings?: Issue[];
};

export type FlightDestinationsReturnedResponse = ReturnedResponseSuccess<
  FlightDestinationsResult,
  FlightDestinationsResult["data"]
>;
