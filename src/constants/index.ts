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
