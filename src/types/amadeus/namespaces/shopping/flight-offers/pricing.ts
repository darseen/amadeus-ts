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

type FlightOfferPricingIn = {
  type: "flight-offers-pricing";
  flightOffers: FlightOffer[];
  payments?: {
    brand?: PaymentBrand;
    binNumber?: number;
    flightOfferIds?: string[];
  }[];
  travelers?: Traveler[];
};

type FlightOfferPricingOut = {
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
};

type CreditCardFee = {
  brand?: PaymentBrand;
  amount?: string;
  currency?: string;
  flightOfferId?: string;
};

type DetailedFareRules = {
  fareBasis?: string;
  name?: string;
  fareNotes?: TermAndCondition;
  segmentId?: string;
};

type Bags = BaggageAllowance & {
  name?: string;
  price?: ElementaryPrice;
  bookableByItinerary?: boolean;
  segmentIds?: string[];
  travelerIds?: string[];
};

type OtherServices = {
  name?: ServiceName;
  price?: ElementaryPrice;
  bookableByTraveler?: boolean;
  bookableByItinerary?: boolean;
  segmentIds?: string[];
  travelerIds?: string[];
};

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
    "credit-card-fees": Record<string, CreditCardFee>;
    bags: Record<string, Bags>;
    "other-services": Record<string, OtherServices>;
    "detailed-fare-rules": Record<string, DetailedFareRules>;
  };
  dictionaries?: Dictionaries;
};

export type FlightOffersPricingReturnedResponse = ReturnedResponseSuccess<
  FlightOffersPricingResult,
  FlightOffersPricingResult["data"]
>;
