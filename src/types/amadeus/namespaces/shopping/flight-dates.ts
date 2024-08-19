import { ReturnedResponseSuccess } from "../../client/response";
import { Defaults, Issue, Meta } from "../shared";

type Price = {
  total?: string;
};

type LocationValue = {
  subType?: "AIRPORT" | "CITY";
  detailedName?: string;
};

type LocationDictionary = Record<string, LocationValue>;
type CurrencyDictionary = Record<string, string>;

type FlightDate = {
  type?: string;
  origin?: string;
  destination?: string;
  departureDate?: string;
  returnDate?: string;
  price?: Price;
  links?: {
    flightDestinations?: string;
    flightOffers?: string;
  };
};

type Dictionaries = {
  currencies?: CurrencyDictionary;
  locations?: LocationDictionary;
};

export type FlightDatesParams = {
  origin: string;
  destination: string;
} & Defaults;

export type FlightDatesResult = {
  data: FlightDate[];
  dictionaries?: Dictionaries;
  meta?: Meta;
  warnings?: Issue[];
};

export type FlightDatesReturnedResponse = ReturnedResponseSuccess<
  FlightDatesResult,
  FlightDatesResult["data"]
>;
