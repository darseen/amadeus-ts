import { ReturnedResponseSuccess } from "../../../client/response";
import { Analytics, CollectionMetaLink, Distance, GeoCode } from "../../shared";

// renamed to avoid conflict with Location type in lib.dom.d.ts
type Location$2 = {
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
};

type Address = {
  cityName?: string;
  cityCode?: string;
  countryName?: string;
  countryCode?: string;
  stateCode?: string;
  regionCode?: string;
};

export type ReferenceDataLocationsAirportsParams = {
  latitude: number;
  longitude: number;
  radius?: number;
  page?: {
    limit?: number;
    offset?: number;
  };
  sort?:
    | "relevance"
    | "distance"
    | "analytics.travelers.score"
    | "analytics.flights.score";
};

export type ReferenceDataLocationsAirportsResult = {
  meta?: CollectionMetaLink;
  data: Location$2[];
};

export type ReferenceDataLocationsAirportsReturnedResponse =
  ReturnedResponseSuccess<
    ReferenceDataLocationsAirportsResult,
    ReferenceDataLocationsAirportsResult["data"]
  >;
