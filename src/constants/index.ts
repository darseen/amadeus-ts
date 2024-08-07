export const HOSTS = {
  test: "test.api.amadeus.com",
  production: "api.amadeus.com",
} as const;

export const RECOGNIZED_OPTIONS = [
  "clientId",
  "clientSecret",
  "logger",
  "logLevel",
  "hostname",
  "host",
  "customAppId",
  "customAppVersion",
  "http",
  "ssl",
  "port",
] as const;

export const ListHTTPOverride = [
  "/v2/shopping/flight-offers",
  "/v1/shopping/seatmaps",
  "/v1/shopping/availability/flight-availabilities",
  "/v2/shopping/flight-offers/prediction",
  "/v1/shopping/flight-offers/pricing",
  "/v1/shopping/flight-offers/upselling",
] as const;
