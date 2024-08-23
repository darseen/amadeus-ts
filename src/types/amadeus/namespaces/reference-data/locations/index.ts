import { ReturnedResponseSuccess } from "../../../client/response";
import { Analytics, CollectionMetaLink, Distance, GeoCode } from "../../shared";

type Location = {
  id?: string;
  self?: Links;
  type?: string;
  subType?: "AIRPORT" | "CITY" | "POINT_OF_INTEREST" | "DISTRICT";
  name?: string;
  detailedName?: string;
  timeZoneOffset?: string;
  iataCode?: string;
  geoCode?: GeoCode;
  address?: Address;
  distance?: Distance;
  analytics?: Analytics;
  relevance?: number;
  category?:
    | "SIGHTS"
    | "BEACH_PARK"
    | "HISTORICAL"
    | "NIGHTLIFE"
    | "RESTAURANT"
    | "SHOPPING";
  tags?: string[];
  rank?: string;
};

type Address = {
  cityName?: string;
  cityCode?: string;
  countryName?: string;
  countryCode?: string;
  stateCode?: string;
  regionCode?: string;
};

type Links = {
  href: string;
  methods?: ("GET" | "PUT" | "DELETE" | "POST" | "PATCH")[];
  count?: number;
};

export type ReferenceDataLocationsParams = {
  subType: "AIRPORT" | "CITY" | "AIRPORT,CITY";
  keyword: string;
  countryCode?: string;
  page?: {
    limit?: number;
    offset?: number;
  };
  sort?: "analytics.travelers.score";
  view?: "FULL" | "LIGHT";
};

export type ReferenceDataLocationsResult = {
  meta?: CollectionMetaLink;
  data: Location[];
};

export type ReferenceDataLocationsReturnedResponse = ReturnedResponseSuccess<
  ReferenceDataLocationsResult,
  ReferenceDataLocationsResult["data"]
>;
