import { ReturnedResponseSuccess } from "../../../../client/response";
import { Amenities, CollectionMetaLink, GeoCode } from "../../../shared";

type Hotel = ({
  subtype?: string;
  name?: string;
  timeZoneName?: string;
  iataCode?: string;
  address?: {
    countryCode?: string;
  };
  geoCode?: GeoCode;
} & {
  hotelId?: string;
  chainCode?: string;
  name?: string;
} & object) & {
  distance?: {
    unit?:
      | "NIGHT"
      | "PIXELS"
      | "KILOGRAMS"
      | "POUNDS"
      | "CENTIMETERS"
      | "INCHES"
      | "BITS_PER_PIXEL"
      | "KILOMETERS"
      | "MILES"
      | "BYTES"
      | "KILOBYTES";
    value?: number;
    displayValue?: string;
    isUnlimited?: string;
  };
  last_update?: string;
};

type HotelScore = "BEDBANK" | "DIRECTCHAIN" | "ALL";

export type ReferenceDataLocationsHotelsByHotelsParams = {
  hotelIds: string;
};

export type ReferenceDataLocationsHotelsByCityParams = {
  cityCode: string;
  radius?: number;
  radiusUnit?: "MILE" | "KM";
  chainCodes?: string;
  amenities?: Amenities | (string & {});
  ratings?: string;
  hotelScore?: HotelScore;
};

export type ReferenceDataLocationsHotelsByGeoCodeParams = {
  latitude: number;
  longitude: number;
  radius?: number;
  radiusUnit?: "MILE" | "KM";
  chainCodes?: string;
  amenities?: Amenities | (string & {});
  ratings?: string;
  hotelScore?: HotelScore;
};

export type ReferenceDataLocationsHotelsResult = {
  data: Hotel[];
  meta?: CollectionMetaLink;
};

export type ReferenceDataLocationsHotelsReturnedResponse =
  ReturnedResponseSuccess<
    ReferenceDataLocationsHotelsResult,
    ReferenceDataLocationsHotelsResult["data"]
  >;
