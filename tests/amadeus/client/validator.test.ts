import { beforeEach, describe, expect, it, vi } from "vitest";
import Validator from "../../../src/amadeus/client/validator";
import Client from "../../../src/amadeus/client";
import { RECOGNIZED_OPTIONS } from "../../../src/constants";
import { Options } from "../../../src/types/amadeus";

describe("Validator", () => {
  it("should exports the functions", () => {
    expect(Validator).not.toBe(null);
  });

  describe(".initRequired", () => {
    it("should return the expected values", () => {
      const options = {
        clientId: "asd",
        clientSecret: "qwe",
      };
      process.env.AMADEUS_TEST2 = "2";
      expect(Validator["initRequired"]("clientId", options)).toBe("asd");
      expect(Validator["initRequired"]("clientSecret", options)).toBe("qwe");
      process.env.AMADEUS_TEST2 = undefined;
    });

    it("should throw error if key not found", () => {
      expect(() => {
        // @ts-expect-error
        Validator["initRequired"]("randomKey", {});
      }).toThrowError();
    });
  });

  describe(".initOptional", () => {
    it("should return the expected values", () => {
      const options: Options = {
        logLevel: "debug",
      };
      process.env.AMADEUS_CLIENT_ID = "asd";
      process.env.AMADEUS_CLIENT_SECRET = "qwe";

      expect(Validator["initOptional"]("clientId", options)).toBe("asd");
      expect(Validator["initOptional"]("clientSecret", options)).toBe("qwe");
      expect(Validator["initOptional"]("logLevel", options, "silent")).toBe(
        "debug"
      );
      expect(Validator["initOptional"]("port", options, 443)).toBe(443);
      expect(Validator["initOptional"]("ssl", options, true)).toBe(true);
      expect(Validator["initOptional"]("customAppId", options)).toBe(undefined);
      expect(Validator["initOptional"]("customAppVersion", options)).toBe(
        undefined
      );

      process.env.AMADEUS_CLIENT_ID = undefined;
      process.env.AMADEUS_CLIENT_SECRET = undefined;
    });
  });

  describe(".warnOnUnrecognizedOptions", () => {
    let client: Client;
    let logSpy: any;

    beforeEach(() => {
      client = new Client();
      logSpy = vi.spyOn(client.logger, "log");
      vi.spyOn(client, "warn").mockReturnValue(true);
    });

    it("should return null if all keys are recognised", () => {
      const options: Options = { clientId: "asd", clientSecret: "qwe" };

      expect(
        Validator["warnOnUnrecognizedOptions"](
          options,
          client,
          RECOGNIZED_OPTIONS
        )
      ).toBe(undefined);
      expect(logSpy).not.toHaveBeenCalled();
    });

    it("should log a warning if the key was not recognized", () => {
      const options = { randomKey: "123" };
      const recognizedOptions: string[] = [];

      Validator["warnOnUnrecognizedOptions"](
        // @ts-expect-error
        options,
        client,
        recognizedOptions
      );

      expect(logSpy).toHaveBeenCalledWith("Unrecognized option: randomKey");
    });
  });
});
