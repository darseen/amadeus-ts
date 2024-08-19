import { ReturnedResponseSuccess } from "../../client/response";
import { Issue } from "../shared";

type Links = {
  self?: string;
};

type Price = {
  total?: string;
};

type LocationValue = {
  subType?: "AIRPORT" | "CITY";
  detailedName?: string;
};

type LocationDictionary = Record<string, LocationValue>;
type CurrencyDictionary = Record<string, string>;

type FlightDestination = {
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
};

type Dictionaries = {
  currencies?: CurrencyDictionary;
  locations?: LocationDictionary;
};

type Meta = {
  currency?: string;
  links?: Links;
  defaults?: Defaults;
};

type Defaults = {
  departureDate?: string;
  oneWay?: boolean;
  duration?: string;
  nonStop?: boolean;
  maxPrice?: number;
  viewBy?: "COUNTRY" | "DATE" | "DESTINATION" | "DURATION" | "WEEK";
};

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
