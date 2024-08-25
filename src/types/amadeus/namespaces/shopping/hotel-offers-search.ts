import { ReturnedResponseSuccess } from "../../client/response";
import {
  CurrencyCode,
  HotelProductDepositPolicy,
  HotelProductPaymentPolicy,
  QualifiedFreeText,
} from "../shared";

export type HotelOffers = {
  type?: "hotel-offers";
  available?: boolean;
  self?: string;
  offers?: HotelOffer[];
  hotel?: Hotel;
};

type Hotel = {
  hotelId?: string;
  chainCode?: string;
  brandCode?: string;
  dupeId?: string;
  name?: string;
  cityCode?: string;
};

type HotelOffer = {
  type?: Type;
  id: string;
  checkInDate?: string;
  checkOutDate?: string;
  roomQuantity?: string;
  rateCode: string;
  rateFamilyEstimated?: HotelProductRateFamily;
  category?: string;
  description?: QualifiedFreeText;
  commission?: HotelProductCommission;
  boardType?: BoardType;
  room: HotelProductRoomDetails;
  guests?: HotelProductGuests;
  price: HotelProductHotelPrice;
  policies?: HotelProductPolicyDetails;
  self?: string;
};

type BoardType =
  | "ROOM_ONLY"
  | "BREAKFAST"
  | "HALF_BOARD"
  | "FULL_BOARD"
  | "ALL_INCLUSIVE"
  | "BUFFET_BREAKFAST"
  | "CARIBBEAN_BREAKFAST"
  | "CONTINENTAL_BREAKFAST"
  | "ENGLISH_BREAKFAST"
  | "FULL_BREAKFAST"
  | "DINNER_BED_AND_BREAKFAST"
  | "LUNCH"
  | "DINNER"
  | "FAMILY_PLAN"
  | "AS_BROCHURED"
  | "SELF_CATERING"
  | "BERMUDA"
  | "AMERICAN"
  | "FAMILY_AMERICAN"
  | "MODIFIED";

type HotelProductCancellationPolicy = {
  type?: CancellationType;
  amount?: string;
  numberOfNights?: number;
  percentage?: string;
  deadline?: string;
  description?: QualifiedFreeText;
};

type HotelProductCheckInOutPolicy = {
  checkIn?: string;
  checkInDescription?: QualifiedFreeText;
  checkOut?: string;
  checkOutDescription?: QualifiedFreeText;
};

type HotelProductCommission = {
  percentage?: string;
  amount?: string;
  description?: QualifiedFreeText;
};

type HotelProductEstimatedRoomType = {
  category?: string;
  beds?: number;
  bedType?: string;
};

type HotelProductGuaranteePolicy = {
  description?: QualifiedFreeText;
  acceptedPayments?: HotelProductPaymentPolicy;
};

type HotelProductGuests = {
  adults?: number;
  childAges?: number[];
};

type HotelProductHoldPolicy = {
  deadline: string;
};

type HotelProductHotelPrice = {
  currency?: string;
  sellingTotal?: string;
  total?: string;
  base?: string;
  taxes?: Tax[];
  markups?: Markup[];
  variations?: HotelProductPriceVariations;
};

type HotelProductPolicyDetails = {
  paymentType?: PaymentType;
  guarantee?: HotelProductGuaranteePolicy;
  deposit?: HotelProductDepositPolicy;
  prepay?: HotelProductDepositPolicy;
  holdTime?: HotelProductHoldPolicy;
  cancellations?: HotelProductCancellationPolicy[];
  checkInOut?: HotelProductCheckInOutPolicy;
};

type HotelProductPriceVariation = {
  startDate: string;
  endDate: string;
  currency?: string;
  sellingTotal?: string;
  total?: string;
  base?: string;
  markups?: Markup[];
};

type HotelProductPriceVariations = {
  average?: Price;
  changes?: HotelProductPriceVariation[];
};

type HotelProductRateFamily = {
  code?: string;
  type?: string;
};

type HotelProductRoomDetails = {
  type?: string;
  typeEstimated?: HotelProductEstimatedRoomType;
  description?: QualifiedFreeText;
};

type Markup = {
  amount?: string;
};

type Method =
  | "CREDIT_CARD"
  | "AGENCY_ACCOUNT"
  | "TRAVEL_AGENT_ID"
  | "CORPORATE_ID"
  | "HOTEL_GUEST_ID"
  | "CHECK"
  | "MISC_CHARGE_ORDER"
  | "ADVANCE_DEPOSIT"
  | "COMPANY_ADDRESS"
  | "VCC_BILLBACK"
  | "VCC_B2B_WALLET"
  | "DEFERED_PAYMENT"
  | "TRAVEL_AGENT_IMMEDIATE";

type PaymentType = "GUARANTEE" | "DEPOSIT" | "PREPAY" | "HOLDTIME";

type Price = {
  currency?: string;
  sellingTotal?: string;
  total?: string;
  base?: string;
  markups?: Markup[];
};

type Tax = {
  amount?: string;
  currency?: string;
  code?: string;
  percentage?: string;
  included?: boolean;
  description?: string;
  pricingFrequency?: string;
  pricingMode?: string;
};

type Type = "hotel-offer";

type CancellationType = "FULL_STAY";

export type HotelOffersSearchParams = {
  hotelIds: string;
  adults?: number;
  checkInDate?: string;
  checkOutDate?: string;
  countryOfResidence?: string;
  priceRange?: string;
  currencyCode?: CurrencyCode;
  paymentPolicy?: "GUARANTEE" | "DEPOSIT" | "NONE";
  boardType?:
    | "ROOM_ONLY"
    | "BREAKFAST"
    | "HALF_BOARD"
    | "FULL_BOARD"
    | "ALL_INCLUSIVE";
  includeClosed?: boolean;
  bestRateOnly?: boolean;
  lang?: string;
};

export type HotelOffersSearchResult = {
  data: HotelOffers[];
};

export type HotelOffersSearchReturnedResponse = ReturnedResponseSuccess<
  HotelOffersSearchResult,
  HotelOffersSearchResult["data"]
>;
