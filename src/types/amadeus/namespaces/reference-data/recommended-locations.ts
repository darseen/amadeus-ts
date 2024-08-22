import { ReturnedResponseSuccess } from "../../client/response";
import { Issue } from "../shared";

type Meta = {
  count?: number;
  links?: {
    self?: string;
  };
};

type RecommendedLocation = {
  subtype?: string;
  name?: string;
  iataCode?: string;
  geoCode?: {
    latitude?: number;
    longitude?: number;
  };
} & {
  type?: string;
  relevance?: number;
};

export type RecommendedLocationsParams = {
  cityCodes: string;
  travelerCountryCode?: string;
  destinationCountryCodes?: string;
};

export type RecommendedLocationsResult = {
  meta?: Meta;
  data: RecommendedLocation[];
  warnings?: Issue[];
};

export type RecommendedLocationsReturnedResponse = ReturnedResponseSuccess<
  RecommendedLocationsResult,
  RecommendedLocationsResult["data"]
>;
