import { ReturnedResponseSuccess } from "../../client/response";
import { HotelOffers } from "./hotel-offers-search";

export type HotelOfferSearchParams = {
  lang?: string;
};

export type HotelOfferSearchResult = {
  data: HotelOffers;
};

export type HotelOfferSearchReturnedResponse = ReturnedResponseSuccess<
  HotelOfferSearchResult,
  HotelOfferSearchResult["data"]
>;
