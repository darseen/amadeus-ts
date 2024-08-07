import http from "node:http";
import https from "node:https";

import Client from "../amadeus/client";
import ReferenceData from "../amadeus/namespaces/reference-data";
import Shopping from "../amadeus/namespaces/shopping";
import Booking from "../amadeus/namespaces/booking";
import Travel from "../amadeus/namespaces/travel";
import EReputation from "../amadeus/namespaces/e-reputation";
import Media from "../amadeus/namespaces/media";
import Ordering from "../amadeus/namespaces/ordering";
import Airport from "../amadeus/namespaces/airport";
import Pagination from "../amadeus/client/pagination";
import Schedule from "../amadeus/namespaces/schedule";
import Analytics from "../amadeus/namespaces/analytics";
import Airline from "../amadeus/namespaces/airline";

export interface IAmadeus {
  referenceData: ReferenceData;
  shopping: Shopping;
  booking: Booking;
  travel: Travel;
  eReputation: EReputation;
  media: Media;
  ordering: Ordering;
  airport: Airport;
  pagination: Pagination;
  schedule: Schedule;
  analytics: Analytics;
  airline: Airline;
}

export type LogLevel = "debug" | "warn" | "silent";
export type Hostname = "production" | "test";
export type Network = typeof http | typeof https;

export type Options = {
  clientId?: string;
  clientSecret?: string;
  logger?: Console;
  logLevel?: LogLevel;
  hostname?: Hostname;
  host?: string;
  ssl?: boolean;
  port?: number;
  customAppId?: string;
  customAppVersion?: string;
  http?: Network;
};

export type LocationType = {
  airport: "AIRPORT";
  city: "CITY";
  any: "AIRPORT,CITY";
};
export type DirectionType = {
  arriving: "ARRIVING";
  departing: "DEPARTING";
};
