import { ReturnedResponseSuccess } from "../../../client/response";
import { GeoCode, Issue } from "../../shared";

type CategoryRatedAreas = {
  geoCode?: GeoCode;
  radius?: number;
  categoryScores?: {
    sight?: {
      overall?: number;
      historical?: number;
      beachAndPark?: number;
    };
    restaurant?: {
      overall?: number;
      vegetarian?: number;
    };
    shopping?: {
      overall?: number;
      luxury?: number;
    };
    nightLife?: {
      overall?: number;
    };
  };
} & {
  type?: string;
};

type Meta = {
  count?: number;
  links?: {
    self?: string;
  };
};

export type CategoryRatedAreaParams = {
  latitude: number;
  longitude: number;
};

export type CategoryRatedAreaResult = {
  meta?: Meta;
  data: CategoryRatedAreas[];
  warnings?: Issue[];
};

export type CategoryRatedAreasReturnedResponse = ReturnedResponseSuccess<
  CategoryRatedAreaResult,
  CategoryRatedAreaResult["data"]
>;
