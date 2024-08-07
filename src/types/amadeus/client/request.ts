import { OutgoingHttpHeaders } from "http2";
import { Verb } from "../client";
import { ListHTTPOverride } from "../../../constants";

export interface IRequest {
  host: string;
  port: number;
  ssl: boolean;
  scheme: string;
  verb: Verb;
  path: string;
  params: any;
  queryPath: string;
  bearerToken: string | null;
  clientVersion: string;
  languageVersion: string;
  appId: string | null;
  appVersion: string | null;
  headers: OutgoingHttpHeaders;
}

export type ListHTTPOverrideType = typeof ListHTTPOverride;
export type ListHTTPOverrideItem = ListHTTPOverrideType[number];
