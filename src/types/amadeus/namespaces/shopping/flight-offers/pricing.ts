import { ReturnedResponseSuccess } from "../../../client/response";
import {
  BaggageAllowance,
  Dictionaries,
  ElementaryPrice,
  FlightOffer,
  Issue,
  PaymentBrand,
  ServiceName,
  TermAndCondition,
  Traveler,
} from "../../shared";

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

export interface OtherServices {
  name?: ServiceName;
  price?: ElementaryPrice;
  bookableByTraveler?: boolean;
  bookableByItinerary?: boolean;
  segmentIds?: string[];
  travelerIds?: string[];
}

// Types used in class
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
