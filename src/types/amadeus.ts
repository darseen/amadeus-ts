import type * as http from "node:http";
import type * as https from "node:https";

import type ReferenceData from "../amadeus/namespaces/reference-data";
import type Shopping from "../amadeus/namespaces/shopping";
import type Booking from "../amadeus/namespaces/booking";
import type Travel from "../amadeus/namespaces/travel";
import type EReputation from "../amadeus/namespaces/e-reputation";
import type Media from "../amadeus/namespaces/media";
import type Ordering from "../amadeus/namespaces/ordering";
import type Airport from "../amadeus/namespaces/airport";
import type Pagination from "../amadeus/client/pagination";
import type Schedule from "../amadeus/namespaces/schedule";
import type Analytics from "../amadeus/namespaces/analytics";
import type Airline from "../amadeus/namespaces/airline";

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
