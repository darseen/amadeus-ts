import { ReturnedResponseSuccess } from "../../client/response";
import { CollectionMetaLink, Issue } from "../shared";
import { Activity } from "./activities";

export type ActivityResult = {
  meta?: CollectionMetaLink;
  data: Activity;
  warnings?: Issue[];
};

export type ActivityReturnedResponse = ReturnedResponseSuccess<
  ActivityResult,
  ActivityResult["data"]
>;
