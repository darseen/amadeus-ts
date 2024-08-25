import { ReturnedResponseSuccess } from "../../client/response";
import { CollectionMetaLink, Issue } from "../shared";

type HotelSentiment = {
  hotelId: string;
  type?: "hotelSentiment";
  overallRating: Score;
  numberOfRatings: number;
  numberOfReviews: number;
  sentiments?: {
    sleepQuality?: Score;
    service?: Score;
    facilities?: Score;
    roomComforts?: Score;
    valueForMoney?: Score;
    catering?: Score;
    swimmingPool?: Score;
    location?: Score;
    internet?: Score;
    pointsOfInterest?: Score;
    staff?: Score;
  };
};

type Score = number;

export type HotelSentimentsParams = {
  hotelIds: string;
};

export type HotelSentimentsResult = {
  warnings?: (Issue & { documentation?: string })[];
  data?: HotelSentiment[];
  meta?: CollectionMetaLink;
};

export type HotelSentimentReturnedResponse = ReturnedResponseSuccess<
  HotelSentimentsResult,
  HotelSentimentsResult["data"]
>;
