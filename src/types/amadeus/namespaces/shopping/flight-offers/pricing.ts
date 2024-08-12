import { ReturnedResponseSuccess } from "../../../client/response";
import { Dictionaries, FlightOffer, ServiceName } from "../../shared";

// export type PricingOptionsFareType = "PUBLISHED"[];

export interface FareRules {
  currency?: string;
  rules?: TermAndCondition[];
}

export interface TermAndCondition {
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
}

export interface FlightOfferPricingIn {
  type: "flight-offers-pricing";
  flightOffers: FlightOffer[];
  payments?: {
    brand?: PaymentBrand;
    binNumber?: number;
    flightOfferIds?: string[];
  }[];
  travelers?: Traveler[];
}

export interface FlightOfferPricingOut {
  type: string;
  flightOffers: FlightOffer[];
  bookingRequirements?: {
    invoiceAddressRequired?: boolean;
    mailingAddressRequired?: boolean;
    emailAddressRequired?: boolean;
    phoneCountryCodeRequired?: boolean;
    mobilePhoneNumberRequired?: boolean;
    phoneNumberRequired?: boolean;
    postalCodeRequired?: boolean;
    travelerRequirements?: {
      travelerId?: string;
      genderRequired?: boolean;
      documentRequired?: boolean;
      documentIssuanceCityRequired?: boolean;
      dateOfBirthRequired?: boolean;
      redressRequiredIfAny?: boolean;
      airFranceDiscountRequired?: boolean;
      spanishResidentDiscountRequired?: boolean;
      residenceRequired?: boolean;
    }[];
  };
}

export interface CreditCardFee {
  brand?: PaymentBrand;
  amount?: string;
  currency?: string;
  flightOfferId?: string;
}

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

export interface DetailedFareRules {
  fareBasis?: string;
  name?: string;
  fareNotes?: TermAndCondition;
  segmentId?: string;
}

export type Bags = BaggageAllowance & {
  name?: string;
  price?: ElementaryPrice;
  bookableByItinerary?: boolean;
  segmentIds?: string[];
  travelerIds?: string[];
};

export interface ElementaryPrice {
  amount?: string;
  currencyCode?: string;
}

export interface BaggageAllowance {
  quantity?: number;
  weight?: number;
  weightUnit?: string;
}

export interface OtherServices {
  name?: ServiceName;
  price?: ElementaryPrice;
  bookableByTraveler?: boolean;
  bookableByItinerary?: boolean;
  segmentIds?: string[];
  travelerIds?: string[];
}

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

export type Name = BaseName & {
  secondLastName?: string;
};

export interface BaseName {
  firstName?: string;
  lastName?: string;
  middleName?: string;
}

export interface Phone {
  deviceType?: PhoneDeviceType;
  countryCallingCode?: string;
  number?: string;
}

export type PhoneDeviceType = "MOBILE" | "LANDLINE" | "FAX";

export interface Address {
  lines?: string[];
  postalCode?: string;
  countryCode?: string;
  cityName?: string;
  stateName?: string;
  postalBox?: string;
}

export type FlightOffersPricingParams = {
  data: FlightOfferPricingIn;
};

export type FlightOffersPricingAdditionalParams = {
  include?: string | string[];
  forceClass?: boolean;
};

export type FlightOffersPricingResult = {
  data: FlightOfferPricingOut;
  included?: {
    "credit-card-fees": {
      [key: string]: CreditCardFee;
    };
    bags: {
      [key: string]: Bags;
    };
    "other-services": {
      [key: string]: OtherServices;
    };
    "detailed-fare-rules": {
      [key: string]: DetailedFareRules;
    };
  };
  dictionaries?: Dictionaries;
};

export type FlightOffersPricingReturnedResponse = ReturnedResponseSuccess<
  FlightOffersPricingResult,
  FlightOffersPricingResult["data"]
>;
