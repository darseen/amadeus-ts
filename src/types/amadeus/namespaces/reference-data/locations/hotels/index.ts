import { ReturnedResponseSuccess } from "../../../../client/response";
import { CollectionMetaLink, GeoCode } from "../../../shared";

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

export type ReferecneDataLocationsHotelsParams = {
  hotelIds: string[];
};

export type ReferecneDataLocationsHotelsResult = {
  data: Hotel[];
  meta?: CollectionMetaLink;
};

export type ReferecneDataLocationsHotelsReturnedResponse =
  ReturnedResponseSuccess<
    ReferecneDataLocationsHotelsResult,
    ReferecneDataLocationsHotelsResult["data"]
  >;
