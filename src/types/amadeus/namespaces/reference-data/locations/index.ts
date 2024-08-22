import { ReturnedResponseSuccess } from "../../../client/response";
import { CollectionMetaLink } from "../../shared";

// renamed to avoid conflict with Location type in lib.dom.d.ts
type Location$1 = {
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

type Distance = {
  value?: number;
  unit?: "KM" | "MI";
};

type GeoCode = {
  latitude?: number;
  longitude?: number;
};

type Analytics = {
  travelers?: Travelers;
};

type Travelers = {
  score?: number;
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
  data: Location$1[];
};

export type ReferenceDataLocationsReturnedResponse = ReturnedResponseSuccess<
  ReferenceDataLocationsResult,
  ReferenceDataLocationsResult["data"]
>;
