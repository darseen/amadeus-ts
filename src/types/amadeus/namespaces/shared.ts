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

export interface LocationValue {
  cityCode?: string;
  countryCode?: string;
}

export type LocationEntry = {
  [key: string]: LocationValue;
};

export type AircraftEntry = {
  [key: string]: string;
};

export type CurrencyEntry = {
  [key: string]: string;
};

export type CarrierEntry = {
  [key: string]: string;
};

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

export type AdditionalServiceType =
  | "CHECKED_BAGS"
  | "MEALS"
  | "SEATS"
  | "OTHER_SERVICES";

export interface Fee {
  amount?: string;
  type?: FeeType;
}

export type FeeType = "TICKETING" | "FORM_OF_PAYMENT" | "SUPPLIER";

export interface Tax {
  amount?: string;
  code?: string;
}

export interface Co2Emission {
  weight?: number;
  weightUnit?: string;
  cabin?: TravelClass;
}

export type TravelClass = "ECONOMY" | "PREMIUM_ECONOMY" | "BUSINESS" | "FIRST";

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

export type FlightOfferSource = "GDS";

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

export interface BaggageAllowance {
  quantity?: number;
  weight?: number;
  weightUnit?: string;
}

export type ServiceName = "PRIORITY_BOARDING" | "AIRPORT_CHECKIN";

export type PricingOptionsFareType = (
  | "PUBLISHED"
  | "NEGOTIATED"
  | "CORPORATE"
)[];
