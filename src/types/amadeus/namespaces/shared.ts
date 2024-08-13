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

export interface Stakeholder {
  id?: string;
  dateOfBirth?: string;
  gender?: StakeholderGender;
  name?: Name;
  documents?: IdentityDocument[];
}

export type StakeholderGender = "MALE" | "FEMALE";

export type IdentityDocument = Document & {
  documentType?: DocumentType;
  validityCountry?: string;
  birthCountry?: string;
  holder?: boolean;
};

export interface Document {
  number?: string;
  issuanceDate?: string;
  expiryDate?: string;
  issuanceCountry?: string;
  issuanceLocation?: string;
  nationality?: string;
  birthPlace?: string;
}

export type DocumentType =
  | "VISA"
  | "PASSPORT"
  | "IDENTITY_CARD"
  | "KNOWN_TRAVELER"
  | "REDRESS";

export interface EmergencyContact {
  addresseeName?: string;
  countryCode?: string;
  number?: string;
  text?: string;
}

export interface LoyaltyProgram {
  programOwner?: string;
  id?: string;
}

export interface Discount {
  subType?: DiscountType;
  cityName?: string;
  travelerType?: DiscountTravelerType;
  cardNumber?: string;
  certificateNumber?: string;
}

export type DiscountType =
  | "SPANISH_RESIDENT"
  | "AIR_FRANCE_DOMESTIC"
  | "AIR_FRANCE_COMBINED"
  | "AIR_FRANCE_METROPOLITAN";

export type DiscountTravelerType =
  | "SPANISH_CITIZEN"
  | "EUROPEAN_CITIZEN"
  | "GOVERNMENT_WORKER"
  | "MILITARY"
  | "MINOR_WITHOUT_ID";

export type Name = BaseName & {
  secondLastName?: string;
};

export interface BaseName {
  firstName?: string;
  lastName?: string;
  middleName?: string;
}

export interface ElementaryPrice {
  amount?: string;
  currencyCode?: string;
}

export type Traveler = Stakeholder & {
  emergencyContact?: EmergencyContact;
  loyaltyPrograms?: LoyaltyProgram[];
  discountEligibility?: Discount[];
  contact?: Contact;
};

export type Contact = ContactDictionary & {
  phones?: Phone[];
  companyName?: string;
  emailAddress?: string;
};

export type ContactPurpose =
  | "STANDARD"
  | "INVOICE"
  | "STANDARD_WITHOUT_TRANSMISSION";

export interface ContactDictionary {
  addresseeName?: Name;
  address?: Address;
  language?: string;
  purpose?: ContactPurpose;
}

export interface Address {
  lines?: string[];
  postalCode?: string;
  countryCode?: string;
  cityName?: string;
  stateName?: string;
  postalBox?: string;
}

export interface Phone {
  deviceType?: PhoneDeviceType;
  countryCallingCode?: string;
  number?: string;
}

export type PhoneDeviceType = "MOBILE" | "LANDLINE" | "FAX";

export interface Remarks {
  general?: GeneralRemark[];
  airline?: AirlineRemark[];
}

export interface GeneralRemark {
  subType: GeneralRemarkType;
  category?: string;
  text: string;
  travelerIds?: string[];
  flightOfferIds?: string[];
}

export type GeneralRemarkType =
  | "GENERAL_MISCELLANEOUS"
  | "CONFIDENTIAL"
  | "INVOICE"
  | "QUALITY_CONTROL"
  | "BACKOFFICE"
  | "FULFILLMENT"
  | "ITINERARY"
  | "TICKETING_MISCELLANEOUS"
  | "TOUR_CODE";

export interface AirlineRemark {
  subType: AirlineRemarkType;
  keyword?: string;
  airlineCode: string;
  text: string;
  travelerIds?: string[];
  flightOfferIds?: string[];
}

export type AirlineRemarkType =
  | "OTHER_SERVICE_INFORMATION"
  | "KEYWORD"
  | "OTHER_SERVICE"
  | "CLIENT_ID"
  | "ADVANCED_TICKET_TIME_LIMIT";

export interface TicketingAgreement {
  option?: TicketingAgreementOption;
  delay?: string;
  dateTime?: string;
  segmentIds?: string[];
}

export type TicketingAgreementOption =
  | "CONFIRM"
  | "DELAY_TO_QUEUE"
  | "DELAY_TO_CANCEL";

export interface AssociatedRecordCommon {
  reference?: string;
  creationDate?: string;
  originSystemCode?: string;
}

export type AssociatedRecord = AssociatedRecordCommon & {
  flightOfferId?: string;
};
