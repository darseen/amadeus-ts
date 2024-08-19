import { ReturnedResponseSuccess } from "../../../client/response";
import {
  AllotmentDetails,
  CabinRestriction,
  CarrierRestrictions,
  ConnectionRestriction,
  DateTimeType,
  Dictionaries,
  FlightOfferSource,
  Issue,
  Segment,
  TravelerInfo,
} from "../../shared";

type ExtendedOriginDestinationLight = OriginDestinationLight & {
  departureDateTime?: DateTimeType;
  arrivalDateTime?: DateTimeType;
};

type OriginDestinationLight = {
  id?: string;
  originLocationCode?: string;
  destinationLocationCode?: string;
  includedConnectionPoints?: string[];
  excludedConnectionPoints?: string[];
};

type SearchCriteriaLight = {
  excludeAllotments?: boolean;
  flightFilters?: FlightFiltersLight;
};

type ExtendedSearchCriteria = SearchCriteriaLight & {
  includeClosedContent?: boolean;
  class?: string;
};

type FlightFiltersLight = {
  carrierRestrictions?: CarrierRestrictions;
  cabinRestrictions?: CabinRestriction[];
  connectionRestriction?: Omit<ConnectionRestriction, "technicalStopsAllowed">;
};

type FlightAvailability = {
  type: string;
  id: string;
  originDestinationId?: string;
  source: FlightOfferSource;
  instantTicketingRequired?: boolean;
  paymentCardRequired?: boolean;
  duration?: string;
  segments: ExtendedSegment[];
};

type ExtendedSegment = {
  closedStatus?: "CANCELLED" | "DEPARTED" | "NOT_AVAILABLE";
  availabilityClasses?: AvailabilityClass[];
} & Segment;

type AvailabilityClass = {
  numberOfBookableSeats?: number;
  class?: string;
  closedStatus?: "WAITLIST_OPEN" | "WAITLIST_CLOSED" | "ON_REQUEST";
  tourAllotment?: TourAllotment;
};

type TourAllotment = AllotmentDetails & {
  mode?: "FREE" | "FORCED";
  remainingSeats?: number;
};

type CollectionMetaAvailSearch = {
  count?: number;
};

export type FlightAvailabilitiesParams = {
  originDestinations: ExtendedOriginDestinationLight[];
  travelers: TravelerInfo[];
  sources: FlightOfferSource[];
  searchCriteria?: ExtendedSearchCriteria;
};

export type FlightAvailabilitiesResult = {
  warnings?: Issue[];
  meta?: CollectionMetaAvailSearch;
  data: FlightAvailability[];
  dictionaries?: Dictionaries;
};

export type FlightAvailabilitiesReturnedResponse = ReturnedResponseSuccess<
  FlightAvailabilitiesResult,
  FlightAvailabilitiesResult["data"]
>;
