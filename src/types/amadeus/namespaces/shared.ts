export type Error400 = {
  errors: Issue[];
};

export type Error500 = {
  errors: Issue[];
};

export type Issue = {
  status?: number;
  code?: number;
  title?: string;
  detail?: string;
  source?: {
    pointer?: string;
    parameter?: string;
    example?: string;
  };
};

export type CollectionMeta = {
  count?: number;
  oneWayCombinations?: OneWayCombinations;
};

export type OneWayCombinations = {
  originDestinationId?: string;
  flightOfferIds?: string[];
}[];

export type CollectionMetaLink = {
  count?: number;
  links?: CollectionLinks;
};

export type CollectionLinks = {
  self?: string;
  next?: string;
  previous?: string;
  last?: string;
  first?: string;
  up?: string;
};

export type LocationValue = {
  cityCode?: string;
  countryCode?: string;
};

export type LocationEntry = Record<string, LocationValue>;
export type AircraftEntry = Record<string, string>;
export type CurrencyEntry = Record<string, string>;
export type CarrierEntry = Record<string, string>;

export type FlightSegment = {
  departure?: FlightEndPoint;
  arrival?: FlightEndPoint;
  carrierCode?: string;
  number?: string;
  aircraft?: AircraftEquipment;
  operating?: OperatingFlight;
  duration?: string;
  stops?: FlightStop[];
};

export type FlightEndPoint = {
  iataCode?: string;
  terminal?: string;
  at?: string;
};

export type OriginalFlightStop = {
  iataCode?: string;
  duration?: string;
};

export type FlightStop = OriginalFlightStop & {
  arrivalAt?: string;
  departureAt?: string;
};

export type AircraftEquipment = {
  code?: string;
};

export type OperatingFlight = {
  carrierCode?: string;
};

export type CurrencyCode =
  | "CAD"
  | "HKD"
  | "ISK"
  | "PHP"
  | "DKK"
  | "HUF"
  | "CZK"
  | "AUD"
  | "RON"
  | "SEK"
  | "IDR"
  | "INR"
  | "BRL"
  | "RUB"
  | "HRK"
  | "JPY"
  | "THB"
  | "EUR"
  | "CHF"
  | "SGD"
  | "PLN"
  | "BGN"
  | "TRY"
  | "CNY"
  | "NOK"
  | "NZD"
  | "ZAR"
  | "USD"
  | "MXN"
  | "ILS"
  | "GBP"
  | "KRW"
  | "MYR";

export type Price = {
  currency?: string;
  total?: string;
  base?: string;
  fees?: Fee[];
  taxes?: Tax[];
  refundableTaxes?: string;
};

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

export type Fee = {
  amount?: string;
  type?: FeeType;
};

export type FeeType = "TICKETING" | "FORM_OF_PAYMENT" | "SUPPLIER";

export type Tax = {
  amount?: string;
  code?: string;
};

export type Co2Emission = {
  weight?: number;
  weightUnit?: string;
  cabin?: TravelClass;
};

export type TravelClass = "ECONOMY" | "PREMIUM_ECONOMY" | "BUSINESS" | "FIRST";

export type FlightOffer = {
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
  fareRules?: FareRules;
};

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

export type Dictionaries = {
  locations?: LocationEntry;
  aircraft?: AircraftEntry;
  currencies?: CurrencyEntry;
  carriers?: CarrierEntry;
};

export type AllotmentDetails = {
  tourName?: string;
  tourReference?: string;
};

export type ChargeableCheckdBags = BaggageAllowance & {
  id?: string;
};

export type ChargeableSeat = {
  id?: string;
  number?: string;
};

export type BaggageAllowance = {
  quantity?: number;
  weight?: number;
  weightUnit?: string;
};

export type ServiceName = "PRIORITY_BOARDING" | "AIRPORT_CHECKIN";

export type PricingOptionsFareType = (
  | "PUBLISHED"
  | "NEGOTIATED"
  | "CORPORATE"
)[];

export type Stakeholder = {
  id?: string;
  dateOfBirth?: string;
  gender?: StakeholderGender;
  name?: Name;
  documents?: IdentityDocument[];
};

export type StakeholderGender = "MALE" | "FEMALE";

export type IdentityDocument = Document & {
  documentType?: DocumentType;
  validityCountry?: string;
  birthCountry?: string;
  holder?: boolean;
};

export type Document = {
  number?: string;
  issuanceDate?: string;
  expiryDate?: string;
  issuanceCountry?: string;
  issuanceLocation?: string;
  nationality?: string;
  birthPlace?: string;
};

export type DocumentType =
  | "VISA"
  | "PASSPORT"
  | "IDENTITY_CARD"
  | "KNOWN_TRAVELER"
  | "REDRESS";

export type EmergencyContact = {
  addresseeName?: string;
  countryCode?: string;
  number?: string;
  text?: string;
};

export type LoyaltyProgram = {
  programOwner?: string;
  id?: string;
};

export type Discount = {
  subType?: DiscountType;
  cityName?: string;
  travelerType?: DiscountTravelerType;
  cardNumber?: string;
  certificateNumber?: string;
};

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

export type BaseName = {
  firstName?: string;
  lastName?: string;
  middleName?: string;
};

export type ElementaryPrice = {
  amount?: string;
  currencyCode?: CurrencyCode;
};

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

export type ContactDictionary = {
  addresseeName?: Name;
  address?: Address;
  language?: string;
  purpose?: ContactPurpose;
};

export type Address = {
  lines?: string[];
  postalCode?: string;
  countryCode?: string;
  cityName?: string;
  stateName?: string;
  postalBox?: string;
};

export type Phone = {
  deviceType?: PhoneDeviceType;
  countryCallingCode?: string;
  number?: string;
};

export type PhoneDeviceType = "MOBILE" | "LANDLINE" | "FAX";

export type Remarks = {
  general?: GeneralRemark[];
  airline?: AirlineRemark[];
};

export type GeneralRemark = {
  subType: GeneralRemarkType;
  category?: string;
  text: string;
  travelerIds?: string[];
  flightOfferIds?: string[];
};

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

export type AirlineRemark = {
  subType: AirlineRemarkType;
  keyword?: string;
  airlineCode: string;
  text: string;
  travelerIds?: string[];
  flightOfferIds?: string[];
};

export type AirlineRemarkType =
  | "OTHER_SERVICE_INFORMATION"
  | "KEYWORD"
  | "OTHER_SERVICE"
  | "CLIENT_ID"
  | "ADVANCED_TICKET_TIME_LIMIT";

export type TicketingAgreement = {
  option?: TicketingAgreementOption;
  delay?: string;
  dateTime?: string;
  segmentIds?: string[];
};

export type TicketingAgreementOption =
  | "CONFIRM"
  | "DELAY_TO_QUEUE"
  | "DELAY_TO_CANCEL";

export type AssociatedRecordCommon = {
  reference?: string;
  creationDate?: string;
  originSystemCode?: string;
};

export type AssociatedRecord = AssociatedRecordCommon & {
  flightOfferId?: string;
};

export type FlightOrder = {
  type: "flight-order";
  id?: string;
  queuingOfficeId?: string;
  ownerOfficeId?: string;
  associatedRecords?: AssociatedRecord[];
  flightOffers: FlightOffer[];
  travelers?: Traveler[];
  remarks?: Remarks;
  formOfPayments?: FormOfPayment[];
  ticketingAgreement?: TicketingAgreement;
  automatedProcess?: AutomatedProcess[];
  contacts?: Contact[];
  tickets?: AirTravelDocument[];
  formOfIdentifications?: FormOfIdentification[];
};

export type FormOfIdentification = {
  identificationType?:
    | "DRIVERS_LICENSE"
    | "PASSPORT"
    | "NATIONAL_IDENTITY_CARD"
    | "BOOKING_CONFIRMATION"
    | "TICKET"
    | "OTHER_ID";
  carrierCode?: string;
  number?: string;
  travelerIds?: string[];
  flightOfferIds?: string[];
};

export type AutomatedProcessCommon = {
  code?: AutomatedProcessCode;
  queue?: {
    number?: string;
    category?: string;
  };
  text?: string;
};

export type AutomatedProcess = AutomatedProcessCommon & {
  delay?: string;
  officeId?: string;
  dateTime?: string;
};

export type AutomatedProcessCode = "IMMEDIATE" | "DELAYED" | "ERROR";

export type FormOfPayment = {
  b2bWallet?: B2BWallet;
  creditCard?: CreditCard;
  other?: OtherMethod;
};

export type B2BWallet = {
  cardId?: string;
  cardUsageName?: string;
  cardFriendlyName?: string;
  reportingData?: {
    name?: string;
    value?: string;
  }[];
  virtualCreditCardDetails?: VirtualCreditCardDetails;
  flightOfferIds?: string[];
};

export type VirtualCreditCardDetails = CreditCardCommon & ElementaryPrice;

export type CreditCard = CreditCardCommon & {
  securityCode?: string;
  flightOfferIds?: string[];
};

export type CreditCardCommon = {
  brand?: CreditCardBrand;
  holder?: string;
  number?: string;
  expiryDate?: string;
};

export type CreditCardBrand =
  | "VISA"
  | "AMERICAN_EXPRESS"
  | "MASTERCARD"
  | "VISA_ELECTRON"
  | "VISA_DEBIT"
  | "MASTERCARD_DEBIT"
  | "MAESTRO"
  | "DINERS"
  | "EASYPAY";

export type OtherMethod = {
  method?: OtherPaymentMethod;
  flightOfferIds?: string[];
};

export type OtherPaymentMethod = "ACCOUNT" | "CHECK" | "CASH" | "NONREFUNDABLE";

export type AirTravelDocument = AirTravelDocumentCommon & {
  travelerId?: string;
  segmentIds?: string[];
};

export type AirTravelDocumentCommon = {
  documentType?: "ETICKET" | "PTICKET" | "EMD" | "MCO";
  documentNumber?: string;
  documentStatus?: "ISSUED" | "REFUNDED" | "VOID" | "ORIGINAL" | "EXCHANGED";
};

export type FareRules = {
  currency?: string;
  rules?: TermAndCondition[];
};

export type TermAndCondition = {
  category?:
    | "REFUND"
    | "EXCHANGE"
    | "REVALIDATION"
    | "REISSUE"
    | "REBOOK"
    | "CANCELLATION";
  circumstances?: string;
  notApplicable?: boolean;
  maxPenaltyAmount?: string;
  descriptions?: {
    descriptionType?: string;
    text?: string;
  }[];
};

export type PaymentBrand =
  | "VISA"
  | "AMERICAN_EXPRESS"
  | "MASTERCARD"
  | "VISA_ELECTRON"
  | "VISA_DEBIT"
  | "MASTERCARD_DEBIT"
  | "MAESTRO"
  | "DINERS"
  | "MASTERCARD_IXARIS"
  | "VISA_IXARIS"
  | "MASTERCARD_AIRPLUS"
  | "UATP_AIRPLUS";
