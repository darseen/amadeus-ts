import { ReturnedResponseSuccess } from "../../../client/response";
import { GeoCode, Issue } from "../../shared";

type Location = {
  type?: string;
  relationships?: {
    id?: string;
    type?: string;
    href?: string;
  }[];
} & {
  subtype?: string;
  name?: string;
  iataCode?: string;
  address?: {
    postalCode?: string;
    countryCode?: string;
    stateCode?: string;
  };
  geoCode?: GeoCode;
};

type Meta = {
  count?: number;
  links?: {
    self?: string;
  };
};

export type ReferenceDataLocationsCitiesParams = {
  countryCode?: string;
  keyword: string;
  max?: number;
  include?: "Airports"[];
};

export type ReferenceDataLocationsCitiesResult = {
  meta?: Meta;
  data: Location[];
  warnings?: Issue[];
  included?: {
    airports?: Record<string, Location>;
  };
};

export type ReferenceDataLocationsCitiesReturnedResponse =
  ReturnedResponseSuccess<
    ReferenceDataLocationsCitiesResult,
    ReferenceDataLocationsCitiesResult["data"]
  >;
