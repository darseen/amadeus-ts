import * as http from "http";
import * as https from "https";

import { LogLevel, Network, Options } from "../../types/amadeus";
import {
  Fallback,
  RecognizedOptionsArray,
  RecognizedOptionsItem,
} from "../../types/amadeus/client/validator";
import Client from "../client";
import { HOSTS, RECOGNIZED_OPTIONS } from "../../constants";

class Validator {
  /**
   * Initialise the client's default value, ensuring the required values are
   * present
   *
   * @param  {Client} client the client object to set the defaults for
   * @param  {Object} options the associative array of options passed to the
   *  client on initialization
   */
  public static validateAndInitialize(client: Client, options: Options): void {
    this.initializeClientCredentials(client, options);
    this.initializeLogger(client, options);
    this.initializeHost(client, options);
    this.initializeCustomApp(client, options);
    this.initializeHttp(client, options);

    this.warnOnUnrecognizedOptions(options, client, RECOGNIZED_OPTIONS);
  }

  static initializeClientCredentials(client: Client, options: Options): void {
    client.clientId = this.initRequired("clientId", options) as string;
    client.clientSecret = this.initRequired("clientSecret", options) as string;
  }

  static initializeLogger(client: Client, options: Options) {
    client.logLevel = this.initOptional(
      "logLevel",
      options,
      "silent"
    ) as LogLevel;
    client.logger = this.initOptional("logger", options, console) as Console;
  }

  static initializeHost(client: Client, options: Options): void {
    const hostname = this.initOptional(
      "hostname",
      options,
      "test"
    ) as keyof typeof HOSTS;
    client.host = this.initOptional("host", options, HOSTS[hostname]) as string;
    client.port = this.initOptional("port", options, 443) as number;
    client.ssl = this.initOptional("ssl", options, true) as boolean;
  }

  static initializeCustomApp(client: Client, options: Options): void {
    client.customAppId = this.initOptional("customAppId", options) as
      | string
      | undefined;

    client.customAppVersion = this.initOptional("customAppVersion", options) as
      | string
      | undefined;
  }

  static initializeHttp(client: Client, options: Options): void {
    const network = client.ssl ? https : http;
    client.http = this.initOptional("http", options, network) as Network;
  }

  static initRequired(key: "clientId" | "clientSecret", options: Options) {
    const result = this.initOptional(key, options);
    if (!result) throw new ArgumentError(`Missing required argument: ${key}`);
    return result;
  }

  static initOptional(
    key: RecognizedOptionsItem,
    options: Options,
    fallback?: Fallback
  ) {
    //Env variables names expected to be in SNAKE_CASE and uppercase
    const envKey = `AMADEUS_${key
      .replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`)
      .toUpperCase()}`;
    const value = options[key] || process.env[envKey] || fallback;
    return value;
  }

  static warnOnUnrecognizedOptions(
    options: Options,
    client: Client,
    recognizedOptions: RecognizedOptionsArray
  ): void {
    Object.keys(options).forEach((key) => {
      if (
        recognizedOptions.indexOf(key as RecognizedOptionsItem) === -1 &&
        client.warn()
      ) {
        client.logger.log(`Unrecognized option: ${key}`);
      }
    });
  }
}

class ArgumentError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ArgumentError";
  }
}

export default Validator;
