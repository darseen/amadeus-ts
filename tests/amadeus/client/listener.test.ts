import Listener from "../../../src/amadeus/client/listener";
import Response from "../../../src/amadeus/client/response";
import { ResponseError } from "../../../src/amadeus/client/errors";
import EventEmitter from "events";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Client from "../../../src/amadeus/client";
import Request from "../../../src/amadeus/client/request";
import { IncomingMessage } from "http";

const http_response: Partial<IncomingMessage> = { on: vi.fn() };
let handler: Listener;
let request: Request;
let emitter: EventEmitter;
let client: Client;

describe("Listener", () => {
  it("should export the module", () => {
    expect(Listener).toBeDefined();
  });

  describe(".instance", () => {
    beforeEach(() => {
      emitter = new EventEmitter();
      client = new Client({ clientId: "foo", clientSecret: "bar" });
      request = new Request({
        host: client.host,
        verb: "POST",
        path: "/foo/bar",
        params: {
          foo: "bar",
        },
        bearerToken: null,
        clientVersion: client["version"],
        languageVersion: process.versions.node,
        appId: client.customAppId || null,
        appVersion: client.customAppVersion || null,
        port: client.port,
        ssl: client.ssl,
      });

      handler = new Listener(request, emitter, client);
    });

    it("should initialize the params", () => {
      expect(handler["request"]).toBe(request);
      expect(handler["emitter"]).toBe(emitter);
    });

    describe(".onResponse", () => {
      it("should create a response object and listen to http events", () => {
        // @ts-expect-error
        handler.onResponse(http_response);
        expect(http_response.on).toHaveBeenCalledTimes(4);
        expect(http_response.on).toHaveBeenCalledWith(
          "data",
          expect.any(Function)
        );
        expect(http_response.on).toHaveBeenCalledWith(
          "end",
          expect.any(Function)
        );
        expect(http_response.on).toHaveBeenCalledWith(
          "close",
          expect.any(Function)
        );
        expect(http_response.on).toHaveBeenCalledWith(
          "error",
          expect.any(Function)
        );
      });
    });

    describe(".onError", () => {
      it("should create and trigger onNetworkError", () => {
        handler["onNetworkError"] = vi.fn(() => {
          return () => {};
        });
        // @ts-expect-error
        handler.onError(http_response);
        // @ts-expect-error
        expect(handler.onNetworkError).toHaveBeenCalledWith(
          expect.any(Response)
        );
      });
    });

    describe(".onEnd", () => {
      it("should parse the response and trigger success if it parsed", () => {
        handler["onSuccess"] = vi.fn();

        // @ts-expect-error
        const response = new Response(http_response, {});
        response.parse = vi.fn();
        response.success = vi.fn(() => {
          return true;
        });

        handler["onEnd"](response);
        expect(handler["onSuccess"]).toHaveBeenCalledWith(response);
        expect(response.parse).toHaveBeenCalled();
      });

      it("should parse the response and trigger fail if it did not parse", () => {
        handler["onFail"] = vi.fn();

        //@ts-expect-error
        const response = new Response(http_response, {});
        response.parse = vi.fn();
        response.success = vi.fn(() => {
          return false;
        });

        handler["onEnd"](response);
        expect(handler["onFail"]).toHaveBeenCalledWith(response);
        expect(response.parse).toHaveBeenCalled();
      });
    });

    describe(".onSuccess", () => {
      it("should emit the response", () => {
        handler["emitter"].emit = vi.fn();

        //@ts-expect-error
        const response = new Response(http_response, request);
        handler["onSuccess"](response);
        expect(emitter.emit).toHaveBeenCalledWith(
          "resolve",
          response.returnResponseSuccess()
        );
      });
    });

    describe(".onFail", () => {
      it("should handle a ServerError", () => {
        emitter.emit = vi.fn();
        // @ts-expect-error
        const response = new Response({ statusCode: 500 }, {});
        handler["onFail"](response);
        expect(emitter.emit).toHaveBeenCalledWith(
          "reject",
          expect.objectContaining({ code: "ServerError" })
        );
      });

      it("should handle a AuthenticationError", () => {
        emitter.emit = vi.fn();
        // @ts-expect-error
        const response = new Response({ statusCode: 401 }, {});
        handler["onFail"](response);
        expect(emitter.emit).toHaveBeenCalledWith(
          "reject",
          expect.objectContaining({ code: "AuthenticationError" })
        );
      });

      it("should handle a NotFoundError", () => {
        emitter.emit = vi.fn();
        // @ts-expect-error
        const response = new Response({ statusCode: 404 }, {});
        handler["onFail"](response);
        expect(emitter.emit).toHaveBeenCalledWith(
          "reject",
          expect.objectContaining({ code: "NotFoundError" })
        );
      });

      it("should handle a ClientError", () => {
        emitter.emit = vi.fn();
        // @ts-expect-error
        const response = new Response({ statusCode: 403 }, {});
        handler["onFail"](response);
        expect(emitter.emit).toHaveBeenCalledWith(
          "reject",
          expect.objectContaining({ code: "ClientError" })
        );
      });

      it("should handle a ParserError", () => {
        emitter.emit = vi.fn();
        // @ts-expect-error
        const response = new Response({ statusCode: 200 }, {});
        response.addChunk('{ a: "b"');
        handler["onFail"](response);
        expect(emitter.emit).toHaveBeenCalledWith(
          "reject",
          expect.objectContaining({ code: "ParserError" })
        );
      });

      it("should handle a UnknownError", () => {
        emitter.emit = vi.fn();
        // @ts-expect-error
        let response = new Response({ statusCode: 200 }, {});
        response.parsed = true;
        handler["onFail"](response);
        expect(emitter.emit).toHaveBeenCalledWith(
          "reject",
          expect.objectContaining({ code: "UnknownError" })
        );
      });
    });

    describe(".onNetworkError", () => {
      it("should try to parse and then return a NetworkError", () => {
        // @ts-expect-error
        const response = new Response(http_response, {});
        response.parse = vi.fn();
        handler["emitter"].emit = vi.fn();

        handler["onNetworkError"](response);
        expect(response.parse).toHaveBeenCalled();
        expect(handler["emitter"].emit).toHaveBeenCalledWith(
          "reject",
          expect.any(ResponseError)
        );
      });
    });
  });
});
