import http from "node:http";
import https from "node:https";

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

export type Location = {
  airport: "AIRPORT";
  city: "CITY";
  any: "AIRPORT,CITY";
};
export type Direction = {
  arriving: "ARRIVING";
  departing: "DEPARTING";
};
