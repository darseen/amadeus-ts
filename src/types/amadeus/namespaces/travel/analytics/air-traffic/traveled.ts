import { ReturnedResponseSuccess } from "../../../../client/response";
import { CollectionMetaLink, Issue } from "../../../shared";

type AirTraffic = {
  type?: "air-traffic";
  subType?: string;
  destination?: string;
  analytics?: Analytics;
};

type Analytics = {
  flights?: Flights;
  travelers?: Travelers;
};

type Flights = {
  score?: number;
};

type Travelers = {
  score?: number;
};

export type TravelAnalayticsAirTrafficTraveledParams = {
  originCityCode: string;
  period: string;
  max?: number;
  fields?: string;
  page?: {
    offset?: number;
    limit?: number;
  };
  sort?: "analytics.flights.score" | "analytics.travelers.score";
};

export type TravelAnalayticsAirTrafficTraveledResult = {
  warnings?: Issue[];
  meta?: CollectionMetaLink;
  data: AirTraffic[];
};

export type TravelAnalayticsAirTrafficTraveledReturnedResponse =
  ReturnedResponseSuccess<
    TravelAnalayticsAirTrafficTraveledResult,
    TravelAnalayticsAirTrafficTraveledResult["data"]
  >;
