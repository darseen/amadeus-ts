import { ReturnedResponseSuccess } from "../../../client/response";
import { CollectionMetaLink, Issue } from "../../shared";

type CheckinLink = {
  type: string;
  id: string;
  href: string;
  channel: "Mobile" | "Web" | "All";
  parameters?: Record<string, Parameter>;
};

type Parameter = {
  description?: string;
  type: string;
  format?: string;
};

export type ReferenceDataCheckinLinksParams = {
  airlineCode: string;
  language?: string;
};

export type ReferenceDataCheckinLinksResult = {
  warnings?: Issue[];
  data: CheckinLink[];
  meta?: CollectionMetaLink;
};

export type ReferenceDataCheckinLinksReturnedResponse = ReturnedResponseSuccess<
  ReferenceDataCheckinLinksResult,
  ReferenceDataCheckinLinksResult["data"]
>;
