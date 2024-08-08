import { describe, it, expect, beforeEach, vi } from "vitest";
import * as https from "https";
import EventEmitter from "events";
import Client from "../../../src/amadeus/client";
import { Hostname, LogLevel } from "../../../src/types/amadeus";
import { Verb } from "../../../src/types/amadeus/client";

let client: Client;
const credentials = {
  clientId: "123",
  clientSecret: "234",
};

const verb: Verb = "GET";
const path = "/foo/bar";
const params = { baz: "qux" };

describe("Client", () => {
  it("should exports an Client object", () => {
    expect(Client).toBeDefined();
  });

  describe(".instance", () => {
    beforeEach(() => {
      client = new Client(credentials);
    });

    it("should export an Client object", () => {
      expect(client).toBeInstanceOf(Client);
    });

    it("should throw an error without required credentials", () => {
      expect(() => {
        new Client();
      }).toThrow();
    });

    it("should initialize all default values", () => {
      expect(client.clientId).toBe("123");
      expect(client.clientSecret).toBe("234");
      expect(client.logger).toBe(console);
      expect(client.host).toBe("test.api.amadeus.com");
      expect(client.customAppId).toBeUndefined();
      expect(client.customAppVersion).toBeUndefined();
      expect(client.http).toBe(https);
      expect(client.logLevel).toBe("silent");
    });

    it("should allow for setting a custom logger", () => {
      const logger = console;
      const options = { clientId: "123", clientSecret: "234", logger };
      const client = new Client(options);
      expect(client.logger).toBe(logger);
    });

    it("should allow for setting debug mode", () => {
      const options = {
        clientId: "123",
        clientSecret: "234",
        logLevel: "debug" as LogLevel,
      };
      const client = new Client(options);
      expect(client.logLevel).toBe("debug");
    });

    it("should allow for setting a different hostname", () => {
      const options = {
        clientId: "123",
        clientSecret: "234",
        hostname: "test" as Hostname,
      };
      const client = new Client(options);
      expect(client.host).toBe("test.api.amadeus.com");
    });

    it("should allow for setting a custom App ID and Version", () => {
      const options = {
        clientId: "123",
        clientSecret: "234",
        customAppId: "cli",
        customAppVersion: "1.0.0",
      };
      const client = new Client(options);
      expect(client.customAppId).toBe("cli");
      expect(client.customAppVersion).toBe("1.0.0");
    });

    it("should allow for setting a custom http client", () => {
      const http = https;
      const options = { clientId: "123", clientSecret: "234", http: http };
      const client = new Client(options);
      expect(client.http).toBe(http);
    });

    describe(".get", () => {
      it("should create a new request and call it", async () => {
        client.unauthenticatedRequest = vi.fn();
        // @ts-expect-error
        client["accessToken"] = { bearerToken: () => Promise.resolve("token") };
        await client.get(path, params);
        expect(client.unauthenticatedRequest).toHaveBeenCalledWith(
          "GET",
          path,
          params,
          "token"
        );
      });

      it("should work without params", async () => {
        client.unauthenticatedRequest = vi.fn();
        // @ts-expect-error
        client["accessToken"] = { bearerToken: () => Promise.resolve("token") };
        await client.get(path);
        expect(client.unauthenticatedRequest).toHaveBeenCalledWith(
          "GET",
          path,
          {},
          "token"
        );
      });
    });

    describe(".post", () => {
      it("should create a new request and call it", async () => {
        client.unauthenticatedRequest = vi.fn();
        // @ts-expect-error
        client["accessToken"] = { bearerToken: () => Promise.resolve("token") };
        await client.post(path, params);
        expect(client.unauthenticatedRequest).toHaveBeenCalledWith(
          "POST",
          path,
          params,
          "token"
        );
      });

      it("should work without params", async () => {
        client.unauthenticatedRequest = vi.fn();
        // @ts-expect-error
        client["accessToken"] = { bearerToken: () => Promise.resolve("token") };
        await client.post(path);
        expect(client.unauthenticatedRequest).toHaveBeenCalledWith(
          "POST",
          path,
          {},
          "token"
        );
      });
    });

    describe(".delete", () => {
      it("should create a new request and call it", async () => {
        client.unauthenticatedRequest = vi.fn();
        // @ts-expect-error
        client["accessToken"] = { bearerToken: () => Promise.resolve("token") };
        await client.delete(path, params);
        expect(client.unauthenticatedRequest).toHaveBeenCalledWith(
          "DELETE",
          path,
          params,
          "token"
        );
      });

      it("should work without params", async () => {
        client.unauthenticatedRequest = vi.fn();
        // @ts-expect-error
        client["accessToken"] = { bearerToken: () => Promise.resolve("token") };
        await client.delete(path);
        expect(client.unauthenticatedRequest).toHaveBeenCalledWith(
          "DELETE",
          path,
          {},
          "token"
        );
      });
    });

    describe(".unauthenticatedRequest", () => {
      it("should create a new request and call it", async () => {
        client["accessToken"].bearerToken = vi.fn(() =>
          Promise.resolve("data")
        );
        client["execute"] = vi.fn();
        const request = {};
        // @ts-expect-error
        client["buildRequest"] = vi.fn(() => request);
        client["buildPromise"] = vi.fn();
        await client.unauthenticatedRequest(verb, path, params);
        expect(client["buildPromise"]).toHaveBeenCalledWith(
          expect.any(EventEmitter)
        );
        expect(client["buildRequest"]).toHaveBeenCalledWith(
          verb,
          path,
          params,
          null
        );
        expect(client["execute"]).toHaveBeenCalledWith(
          request,
          expect.any(EventEmitter)
        );
      });
    });

    describe(".execute", () => {
      it("should make a request and bind the handlers", () => {
        const emitter = new EventEmitter();
        const request = client["buildRequest"]("GET", "/foo/bar", {});

        const http_request = {
          on: vi.fn(),
          write: vi.fn(),
          end: vi.fn(),
        };

        vi.mock("https", () => ({
          request: vi.fn().mockImplementation(() => http_request),
        }));
        client.http.request = vi.fn().mockImplementation(() => http_request);

        client["execute"](request, emitter);

        expect(client.http.request).toHaveBeenCalledWith(expect.any(Object));
        expect(http_request.on).toHaveBeenCalledTimes(2);
        expect(http_request.on).toHaveBeenCalledWith(
          "response",
          expect.any(Function)
        );
        expect(http_request.on).toHaveBeenCalledWith(
          "error",
          expect.any(Function)
        );
        expect(http_request.write).toHaveBeenCalledWith("");
        expect(http_request.end).toHaveBeenCalled();
      });
    });

    describe(".buildPromise", () => {
      it("should return a new promise with the emitter bound to resolve/reject", () => {
        const onFn = vi.fn();
        const emitter = { on: onFn };

        // @ts-expect-error
        client["buildPromise"](emitter);

        expect(onFn).toHaveBeenCalledTimes(2);
        expect(onFn).toHaveBeenCalledWith("resolve", expect.any(Function));
        expect(onFn).toHaveBeenCalledWith("reject", expect.any(Function));
      });

      it("should listen to the emitter on resolve", async () => {
        const emitter = new EventEmitter();
        const promise = client["buildPromise"](emitter);

        emitter.emit("resolve", "success");
        await expect(promise).resolves.toBe("success");
      });

      it("should listen to the emitter on reject", async () => {
        const emitter = new EventEmitter();
        const promise = client["buildPromise"](emitter);

        emitter.emit("reject", "error");
        await expect(promise).rejects.toBe("error");
      });
    });

    describe(".debug", () => {
      it("should be true if the log level is debug", () => {
        client.logLevel = "debug";
        expect(client.debug()).toBeTruthy();
      });

      it("should be false if the log level is not debug", () => {
        client.logLevel = "warn";
        expect(client.debug()).toBeFalsy();
      });
    });

    describe(".warn", () => {
      it("should be true if the log level is debug", () => {
        client.logLevel = "debug";
        expect(client.warn()).toBeTruthy();
      });

      it("should be true if the log level is warn", () => {
        client.logLevel = "warn";
        expect(client.warn()).toBeTruthy();
      });

      it("should be false if the log level is not debug or warn", () => {
        client.logLevel = "silent";
        expect(client.warn()).toBeFalsy();
      });
    });
  });
});
