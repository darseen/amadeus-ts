import { ReturnedResponse } from "../../client/response";

type UtilRequiredKeys<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

export interface Error400 {
  errors: Issue[];
}

export interface Error500 {
  errors: Issue[];
}

export interface Issue {
  status?: number;
  code?: number;
  title?: string;
  detail?: string;
  source?: {
    pointer?: string;
    parameter?: string;
    example?: string;
  };
}

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

export type LocationEntry = any;

export type AircraftEntry = any;

export type CurrencyEntry = any;

export type CarrierEntry = any;

export interface FlightSegment {
  departure?: FlightEndPoint;
  arrival?: FlightEndPoint;
  carrierCode?: string;
  number?: string;
  aircraft?: AircraftEquipment;
  operating?: OperatingFlight;
  duration?: string;
  stops?: FlightStop[];
}

export interface OriginalFlightEndPoint {
  iataCode?: string;
  terminal?: string;
}

export type FlightEndPoint = OriginalFlightEndPoint & {
  at?: string;
};

export interface OriginalFlightStop {
  iataCode?: string;
  duration?: string;
}

export type FlightStop = OriginalFlightStop & {
  arrivalAt?: string;
  departureAt?: string;
};

export interface AircraftEquipment {
  code?: string;
}

export interface OperatingFlight {
  carrierCode?: string;
}

export interface Price {
  currency?: string;
  total?: string;
  base?: string;
  fees?: Fee[];
  taxes?: Tax[];
  refundableTaxes?: string;
}

export type ExtendedPrice = {
  margin?: string;
  grandTotal?: string;
  billingCurrency?: string;
  additionalServices?: {
    amount?: string;
    type?: AdditionalServiceType;
  }[];
} & Price;

export interface Fee {
  amount?: string;
  type?: FeeType;
}

export type FeeType = "TICKETING" | "FORM_OF_PAYMENT" | "SUPPLIER";

export interface Tax {
  amount?: string;
  code?: string;
}

export type TravelClass = "ECONOMY" | "PREMIUM_ECONOMY" | "BUSINESS" | "FIRST";

export interface Co2Emission {
  weight?: number;
  weightUnit?: string;
  cabin?: TravelClass;
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

export interface FlightOffer {
  type: string;
  id: string;
  source?: FlightOfferSource;
  instantTicketingRequired?: boolean;
  disablePricing?: boolean;
  nonHomogeneous?: boolean;
  oneWay?: boolean;
  paymentCardRequired?: boolean;
  lastTicketingDate?: string;
  lastTicketingDateTime?: string;
  numberOfBookableSeats?: number;
  itineraries?: {
    duration?: string;
    segments: Segment[];
  }[];
  price?: ExtendedPrice;
  pricingOptions?: {
    fareType?: PricingOptionsFareType;
    includedCheckedBagsOnly?: boolean;
    refundableFare?: boolean;
    noRestrictionFare?: boolean;
    noPenaltyFare?: boolean;
  };
  validatingAirlineCodes?: string[];
  travelerPricings?: {
    travelerId: string;
    fareOption: TravelerPricingFareOption;
    travelerType: TravelerType;
    associatedAdultId?: string;
    price?: Price;
    fareDetailsBySegment: {
      segmentId: string;
      cabin?: TravelClass;
      fareBasis?: string;
      brandedFare?: string;
      class?: string;
      isAllotment?: boolean;
      allotmentDetails?: AllotmentDetails;
      sliceDiceIndicator?: SliceDiceIndicator;
      includedCheckedBags?: BaggageAllowance;
      additionalServices?: {
        chargeableCheckedBags?: ChargeableCheckdBags;
        chargeableSeat?: ChargeableSeat;
        chargeableSeatNumber?: string;
        otherServices?: ServiceName[];
      };
    }[];
  }[];
}

export interface ExtendedPricingOptions {
  includedCheckedBagsOnly?: boolean;
  refundableFare?: boolean;
  noRestrictionFare?: boolean;
  noPenaltyFare?: boolean;
}

export type Segment = {
  id?: string;
  numberOfStops?: number;
  blacklistedInEU?: boolean;
  co2Emissions?: Co2Emission[];
} & FlightSegment;

export type TravelerType =
  | "ADULT"
  | "CHILD"
  | "SENIOR"
  | "YOUNG"
  | "HELD_INFANT"
  | "SEATED_INFANT"
  | "STUDENT";

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

export type AdditionalServiceType =
  | "CHECKED_BAGS"
  | "MEALS"
  | "SEATS"
  | "OTHER_SERVICES";

export type FlightOfferSource = "GDS";

export type PricingOptionsFareType = (
  | "PUBLISHED"
  | "NEGOTIATED"
  | "CORPORATE"
)[];

export type TravelerPricingFareOption =
  | "STANDARD"
  | "INCLUSIVE_TOUR"
  | "SPANISH_MELILLA_RESIDENT"
  | "SPANISH_CEUTA_RESIDENT"
  | "SPANISH_CANARY_RESIDENT"
  | "SPANISH_BALEARIC_RESIDENT"
  | "AIR_FRANCE_METROPOLITAN_DISCOUNT_PASS"
  | "AIR_FRANCE_DOM_DISCOUNT_PASS"
  | "AIR_FRANCE_COMBINED_DISCOUNT_PASS"
  | "AIR_FRANCE_FAMILY"
  | "ADULT_WITH_COMPANION"
  | "COMPANION";

export type SliceDiceIndicator =
  | "LOCAL_AVAILABILITY"
  | "SUB_OD_AVAILABILITY_1"
  | "SUB_OD_AVAILABILITY_2";

export interface AllotmentDetails {
  tourName?: string;
  tourReference?: string;
}

export type ChargeableCheckdBags = BaggageAllowance & {
  id?: string;
};

export interface ChargeableSeat {
  id?: string;
  number?: string;
}

export interface Dictionaries {
  locations?: LocationEntry;
  aircraft?: AircraftEntry;
  currencies?: CurrencyEntry;
  carriers?: CarrierEntry;
}

export interface LocationValue {
  cityCode?: string;
  countryCode?: string;
}

export type ServiceName = "PRIORITY_BOARDING" | "AIRPORT_CHECKIN";

export interface BaggageAllowance {
  quantity?: number;
  weight?: number;
  weightUnit?: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  secure?: boolean;
  path: string;
  type?: ContentType;
  query?: QueryParamsType;
  format?: ResponseFormat;
  body?: unknown;
  baseUrl?: string;
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export type FlightOffersSearchPostRequest = {
  currencyCode?: string;
  originDestinations: OriginDestination[];
  travelers: ExtendedTravelerInfo[];
  sources: FlightOfferSource[];
  searchCriteria?: SearchCriteria;
};

export type FlightOffersSearchPostResponse = {
  meta: CollectionMeta;
  data: FlightOffer[];
  dictionaries: Dictionaries;
};

export type FlightOffersSearchGetRequest = {
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

export type FlightOffersSearchGetResponse = {
  meta: CollectionMetaLink;
  data: FlightOffer[];
  dictionaries: Dictionaries;
};

export type FlightOffersSearchGetReturnType = Promise<
  ReturnedResponse<
    FlightOffersSearchGetResponse,
    FlightOffersSearchGetResponse["data"]
  >
>;

export type FlightOffersSearchPostReturnType = Promise<
  ReturnedResponse<
    FlightOffersSearchPostResponse,
    FlightOffersSearchPostResponse["data"]
  >
>;
