import { beforeEach, describe, expect, it, vi } from "vitest";
import Validator from "../../../src/amadeus/client/validator";
import Client from "../../../src/amadeus/client";
import { Options } from "../../../src/types/amadeus";
import { RECOGNIZED_OPTIONS } from "../../../src/constants";

const validator = new Validator();

describe("Validator", () => {
  it("should exports the functions", () => {
    expect(validator).not.toBe(null);
  });

  describe(".initRequired", () => {
    it("should return the expected values", () => {
      const options = {
        clientId: "asd",
        clientSecret: "qwe",
      };
      process.env.AMADEUS_TEST2 = "2";
      expect(validator["initRequired"]("clientId", options)).toBe("asd");
      expect(validator["initRequired"]("clientSecret", options)).toBe("qwe");
      process.env.AMADEUS_TEST2 = undefined;
    });

    it("should throw error if key not found", () => {
      expect(() => {
        // @ts-expect-error
        validator["initRequired"]("randomKey", {});
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

      expect(validator["initOptional"]("clientId", options)).toBe("asd");
      expect(validator["initOptional"]("clientSecret", options)).toBe("qwe");
      expect(validator["initOptional"]("logLevel", options, "silent")).toBe(
        "debug"
      );
      expect(validator["initOptional"]("port", options, 443)).toBe(443);
      expect(validator["initOptional"]("ssl", options, true)).toBe(true);
      expect(validator["initOptional"]("customAppId", options)).toBe(undefined);
      expect(validator["initOptional"]("customAppVersion", options)).toBe(
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
        validator["warnOnUnrecognizedOptions"](
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

      validator["warnOnUnrecognizedOptions"](
        // @ts-expect-error
        options,
        client,
        recognizedOptions
      );

      expect(logSpy).toHaveBeenCalledWith("Unrecognized option: randomKey");
    });
  });
});
