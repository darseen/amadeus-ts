import { ReturnedResponseSuccess } from "../../../../client/response";
import { CollectionMetaLink, Issue } from "../../../shared";

type AirTraffic = {
  type?: "air-traffic";
  period?: string;
  analytics?: Analytics;
};

type Analytics = {
  travelers?: Travelers;
};

type Travelers = {
  score?: number;
};

export type TravelAnalayticsAirTrafficBusiestPeriodParams = {
  cityCode: string;
  period: string;
  direction?: "ARRIVING" | "DEPARTING";
};

export type TravelAnalayticsAirTrafficBusiestPeriodResult = {
  warnings?: Issue[];
  meta?: CollectionMetaLink;
  data: AirTraffic[];
};

export type TravelAnalayticsAirTrafficBusiestPeriodReturnedResponse =
  ReturnedResponseSuccess<
    TravelAnalayticsAirTrafficBusiestPeriodResult,
    TravelAnalayticsAirTrafficBusiestPeriodResult["data"]
  >;
