import { ReturnedResponseSuccess } from "../../client/response";
import { CollectionMetaLink, Issue } from "../shared";

type Airline = {
  type?: string;
  iataCode?: string;
  icaoCode?: string;
  businessName?: string;
  commonName?: string;
};

export type ReferenceDataAirlinesParams = {
  airlineCodes?: string;
};

export type ReferenceDataAirlinesResult = {
  warnings?: Issue[];
  data: Airline[];
  meta?: CollectionMetaLink;
};

export type ReferenceDataAirlinesReturnedResponse = ReturnedResponseSuccess<
  ReferenceDataAirlinesResult,
  ReferenceDataAirlinesResult["data"]
>;
