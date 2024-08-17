import { ReturnedResponseSuccess } from "../../client/response";
import { CollectionMetaLink, CurrencyCode, Issue } from "../shared";

export interface ItineraryPriceMetric {
  type?: string;
  origin?: {
    iataCode?: string;
  };
  destination?: {
    iataCode?: string;
  };
  departureDate?: string;
  transportType?: "FLIGHT";
  currencyCode?: CurrencyCode;
  oneWay?: boolean;
  priceMetrics?: {
    amount?: string;
    quartileRanking?: "MINIMUM" | "FIRST" | "MEDIUM" | "THIRD" | "MAXIMUM";
  }[];
}

// Types used in class
export type ItineraryPriceMetricsParams = {
  originIataCode: string;
  destinationIataCode: string;
  departureDate: string;
  currencyCode?: CurrencyCode;
  oneWay?: boolean;
};

export type ItineraryPriceMetricsResult = {
  warnings?: Issue[];
  data: ItineraryPriceMetric[];
  meta?: CollectionMetaLink;
};

export type ItineraryPriceMetricsReturnedResponse = ReturnedResponseSuccess<
  ItineraryPriceMetricsResult,
  ItineraryPriceMetricsResult["data"]
>;
