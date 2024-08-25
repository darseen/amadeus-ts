import { ReturnedResponseSuccess } from "../../../client/response";
import { GeoCode } from "../../shared";

type SubType = "HOTEL_LEISURE" | "HOTEL_GDS";

export type ReferenceDataLocationsHotelParams = {
  keyword: string;
  subType: SubType | (string & {});
  countryCode?: string;
  lang?: string;
  max?: number;
};

export type ReferenceDataLocationsHotelResult = {
  data: {
    id: number;
    type: string;
    name: string;
    iataCode: string;
    hotelIds: string;
    subType: SubType | (string & {});
    address?: {
      cityName: string;
      stateCode?: string;
      countryCode: string;
    };
    geoCode?: Required<GeoCode>;
    relevance?: number;
  }[];
};

export type ReferenceDataLocationsHotelReturnedResponse =
  ReturnedResponseSuccess<
    ReferenceDataLocationsHotelResult,
    ReferenceDataLocationsHotelResult["data"]
  >;
