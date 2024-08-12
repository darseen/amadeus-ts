import { ReturnedResponseSuccess } from "../../client/response";
import {
  Dictionaries,
  FlightOffer,
  FlightOfferSource,
  TravelClass,
  TravelerType,
} from "../shared";

type UtilRequiredKeys<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

export interface CollectionMeta {
  count?: number;
  oneWayCombinations?: {
    originDestinationId?: string;
    flightOfferIds?: string[];
  }[];
}

export interface CollectionMetaLink {
  count?: number;
  links?: {
    self?: string;
    next?: string;
    previous?: string;
    last?: string;
    first?: string;
    up?: string;
  };
}

export type OriginDestination = OriginDestinationLight & {
  originRadius?: number;
  alternativeOriginsCodes?: string[];
  destinationRadius?: number;
  alternativeDestinationsCodes?: string[];
  departureDateTimeRange?: DateTimeRange;
  arrivalDateTimeRange?: DateTimeRange;
};

export interface OriginDestinationLight {
  id?: string;
  originLocationCode?: string;
  destinationLocationCode?: string;
  includedConnectionPoints?: string[];
  excludedConnectionPoints?: string[];
}

export type DateTimeRange = UtilRequiredKeys<DateTimeType, "date"> & {
  dateWindow?: string;
  timeWindow?: string;
};

export interface DateTimeType {
  date: string;
  time?: string;
}

export type ExtendedTravelerInfo = UtilRequiredKeys<
  TravelerInfo,
  "id" | "travelerType"
>;

export interface TravelerInfo {
  id: string;
  travelerType: TravelerType;
  associatedAdultId?: string;
}

export interface SearchCriteria {
  excludeAllotments?: boolean;
  addOneWayOffers?: boolean;
  maxFlightOffers?: number;
  maxPrice?: number;
  allowAlternativeFareOptions?: boolean;
  oneFlightOfferPerDay?: boolean;
  additionalInformation?: {
    chargeableCheckedBags?: boolean;
    brandedFares?: boolean;
  };
  pricingOptions?: ExtendedPricingOptions;
  flightFilters?: FlightFilters;
}

export interface CabinRestriction {
  cabin?: TravelClass;
  originDestinationIds?: string[];
}

export type ExtendedCabinRestriction = CabinRestriction & {
  coverage?: Coverage;
};

export interface FlightFilters {
  crossBorderAllowed?: boolean;
  moreOvernightsAllowed?: boolean;
  returnToDepartureAirport?: boolean;
  railSegmentAllowed?: boolean;
  busSegmentAllowed?: boolean;
  maxFlightTime?: number;
  carrierRestrictions?: CarrierRestrictions;
  cabinRestrictions?: ExtendedCabinRestriction[];
  connectionRestriction?: ConnectionRestriction;
}

export interface CarrierRestrictions {
  blacklistedInEUAllowed?: boolean;
  excludedCarrierCodes?: string[];
  includedCarrierCodes?: string[];
}

export interface ConnectionRestriction {
  maxNumberOfConnections?: number;
  nonStopPreferred?: boolean;
  airportChangeAllowed?: boolean;
  technicalStopsAllowed?: boolean;
}

export interface ExtendedPricingOptions {
  includedCheckedBagsOnly?: boolean;
  refundableFare?: boolean;
  noRestrictionFare?: boolean;
  noPenaltyFare?: boolean;
}

export type Coverage =
  | "MOST_SEGMENTS"
  | "AT_LEAST_ONE_SEGMENT"
  | "ALL_SEGMENTS";

export type FlightOffersSearchPostParams = {
  currencyCode?: string;
  originDestinations: OriginDestination[];
  travelers: ExtendedTravelerInfo[];
  sources: FlightOfferSource[];
  searchCriteria?: SearchCriteria;
};

export type FlightOffersSearchPostResult = {
  meta: CollectionMeta;
  data: FlightOffer[];
  dictionaries: Dictionaries;
};

export type FlightOffersSearchGetParams = {
  originLocationCode: string;
  destinationLocationCode: string;
  departureDate: string;
  returnDate?: string;
  adults: number;
  children?: number;
  infants?: number;
  travelClass?: TravelClass;
  includedAirlineCodes?: string;
  excludedAirlineCodes?: string;
  nonStop?: boolean;
  currencyCode?: string;
  maxPrice?: number;
  max?: number;
};

export type FlightOffersSearchGetResult = {
  meta: CollectionMetaLink;
  data: FlightOffer[];
  dictionaries: Dictionaries;
};

export type FlightOffersSearchGetReturnedResponse = Promise<
  ReturnedResponseSuccess<
    FlightOffersSearchGetResult,
    FlightOffersSearchGetResult["data"]
  >
>;

export type FlightOffersSearchPostReturnedResponse = Promise<
  ReturnedResponseSuccess<
    FlightOffersSearchPostResult,
    FlightOffersSearchPostResult["data"]
  >
>;
