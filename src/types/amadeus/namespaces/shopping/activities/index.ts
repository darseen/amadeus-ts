import { ReturnedResponseSuccess } from "../../../client/response";
import {
  CollectionMetaLink,
  ElementaryPrice,
  GeoCode,
  Issue,
} from "../../shared";

export type Activity = {
  type?: "activity";
  id?: string;
  self?: Link;
  name?: string;
  shortDescription?: string;
  description?: string;
  geoCode?: GeoCode;
  rating?: string;
  price?: ElementaryPrice;
  pictures?: string[];
  bookingLink?: string;
  minimumDuration?: string;
};

type Link = {
  href?: string;
  methods?: ("GET" | "PUT" | "DELETE" | "POST" | "PATCH")[];
};

export type ActivitiesParams = {
  latitude: number;
  longitude: number;
  radius?: number;
};

export type ActivitiesResult = {
  meta?: CollectionMetaLink;
  data: Activity[];
  warnings?: Issue[];
};

export type ActivitiesReturnedResponse = ReturnedResponseSuccess<
  ActivitiesResult,
  ActivitiesResult["data"]
>;
