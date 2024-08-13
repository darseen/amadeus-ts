import { ReturnedResponseSuccess } from "../../../client/response";
import {
  Dictionaries,
  ElementaryPrice,
  FlightOffer,
  Issue,
  ServiceName,
  Traveler,
} from "../../shared";

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

export type FlightOffersPricingParams = {
  data: FlightOfferPricingIn;
};

export type FlightOffersPricingAdditionalParams = {
  include?: string | string[];
  forceClass?: boolean;
};

export type FlightOffersPricingResult = {
  data: FlightOfferPricingOut;
  warnings?: Issue[];
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
