import { ReturnedResponseSuccess } from "../../../../client/response";
import { CollectionMetaLink } from "../../../shared";

export type ReferenceDataLocationsPoisPoiResult = {
  meta?: CollectionMetaLink;
  data: Location;
};

export type ReferenceDataLocationsPoisPoiReturnedResponse =
  ReturnedResponseSuccess<
    ReferenceDataLocationsPoisPoiResult,
    ReferenceDataLocationsPoisPoiResult["data"]
  >;
