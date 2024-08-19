import { ReturnedResponseSuccess } from "../../client/response";
import {
  CabinRestriction,
  CarrierRestrictions,
  CollectionMeta,
  CollectionMetaLink,
  ConnectionRestriction,
  CurrencyCode,
  DateTimeType,
  Dictionaries,
  FlightOffer,
  FlightOfferSource,
  Issue,
  TravelClass,
  TravelerInfo,
  TravelerType,
} from "../shared";

type UtilRequiredKeys<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

type OriginDestination = OriginDestinationLight & {
  originRadius?: number;
  alternativeOriginsCodes?: string[];
  destinationRadius?: number;
  alternativeDestinationsCodes?: string[];
  departureDateTimeRange?: DateTimeRange;
  arrivalDateTimeRange?: DateTimeRange;
};

type OriginDestinationLight = {
  id?: string;
  originLocationCode?: string;
  destinationLocationCode?: string;
  includedConnectionPoints?: string[];
  excludedConnectionPoints?: string[];
};

type DateTimeRange = UtilRequiredKeys<DateTimeType, "date"> & {
  dateWindow?: string;
  timeWindow?: string;
};

type ExtendedTravelerInfo = UtilRequiredKeys<
  TravelerInfo,
  "id" | "travelerType"
>;

type SearchCriteria = {
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
};

type ExtendedCabinRestriction = CabinRestriction & {
  coverage?: Coverage;
};

type FlightFilters = {
  crossBorderAllowed?: boolean;
  moreOvernightsAllowed?: boolean;
  returnToDepartureAirport?: boolean;
  railSegmentAllowed?: boolean;
  busSegmentAllowed?: boolean;
  maxFlightTime?: number;
  carrierRestrictions?: CarrierRestrictions;
  cabinRestrictions?: ExtendedCabinRestriction[];
  connectionRestriction?: ConnectionRestriction;
};

type ExtendedPricingOptions = {
  includedCheckedBagsOnly?: boolean;
  refundableFare?: boolean;
  noRestrictionFare?: boolean;
  noPenaltyFare?: boolean;
};

type Coverage = "MOST_SEGMENTS" | "AT_LEAST_ONE_SEGMENT" | "ALL_SEGMENTS";

export type FlightOffersSearchPostParams = {
  currencyCode?: CurrencyCode;
  originDestinations: OriginDestination[];
  travelers: ExtendedTravelerInfo[];
  sources: FlightOfferSource[];
  searchCriteria?: SearchCriteria;
};

export type FlightOffersSearchPostResult = {
  meta?: CollectionMeta;
  warnings?: Issue[];
  data: FlightOffer[];
  dictionaries?: Dictionaries;
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
  currencyCode?: CurrencyCode;
  maxPrice?: number;
  max?: number;
};

export type FlightOffersSearchGetResult = {
  meta?: CollectionMetaLink;
  warnings?: Issue[];
  data: FlightOffer[];
  dictionaries?: Dictionaries;
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
