import { Location } from ".";
import { ReturnedResponseSuccess } from "../../../../client/response";
import { CollectionMetaLink } from "../../../shared";

export type ReferenceDataLocationsPoisBySquareParams = {
  north: number;
  west: number;
  south: number;
  east: number;
  page?: {
    limit?: number;
    offset?: number;
  };
  categories?:
    | "SIGHTS"
    | "NIGHTLIFE"
    | "RESTAURANT"
    | "SHOPPING"
    | (string & {});
};

export type ReferenceDataLocationsPoisBySquareResult = {
  meta?: CollectionMetaLink;
  data: Location[];
};

export type ReferenceDataLocationsPoisBySquareReturnedResponse =
  ReturnedResponseSuccess<
    ReferenceDataLocationsPoisBySquareResult,
    ReferenceDataLocationsPoisBySquareResult["data"]
  >;
