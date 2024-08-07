import Client from "../../../src/amadeus/client";
import { beforeEach, describe, expect, it, vi } from "vitest";
import AccessToken from "../../../src/amadeus/client/access-token";

let accessToken: AccessToken;
let client: Client;
const clientParams = { clientId: "123", clientSecret: "234" };

describe("Request", () => {
  it("should exports an AccessToken object", () => {
    expect(AccessToken).toBeDefined();
  });

  describe(".instance", () => {
    beforeEach(() => {
      accessToken = new AccessToken();
      client = new Client(clientParams);
    });

    describe(".bearerToken", () => {
      it("should make a new API call if no token has been loaded before", () => {
        // @ts-expect-error
        client["unauthenticatedRequest"] = vi.fn(() =>
          Promise.resolve({ result: { access_token: "token" } })
        );
        expect.assertions(2);
        expect(accessToken.bearerToken(client)).resolves.toEqual("token");
        expect(client.unauthenticatedRequest).toHaveBeenCalledWith(
          "POST",
          "/v1/security/oauth2/token",
          {
            grant_type: "client_credentials",
            client_id: client.clientId,
            client_secret: client.clientSecret,
          }
        );
      });

      it("should bubble errors", () => {
        client.unauthenticatedRequest = vi.fn(() => Promise.reject("error"));

        expect.assertions(2);

        expect(accessToken.bearerToken(client)).rejects.toEqual("error");
        expect(client.unauthenticatedRequest).toHaveBeenCalled();
      });

      it("should return a cached token if it still valid", () => {
        accessToken["expiresAt"] = Date.now() + 100;
        accessToken["accessToken"] = "old_token";

        client.unauthenticatedRequest = vi.fn();

        expect.assertions(1);
        expect(client.unauthenticatedRequest).not.toHaveBeenCalled();
      });

      it("should make a new API call the old token expired", () => {
        accessToken["expiresAt"] = Date.now();
        accessToken["accessToken"] = "old_token";
        // @ts-expect-error
        client["unauthenticatedRequest"] = vi.fn(() =>
          Promise.resolve({ result: { access_token: "token" } })
        );

        expect.assertions(2);

        expect(accessToken.bearerToken(client)).resolves.toEqual("token");
        expect(client.unauthenticatedRequest).toHaveBeenCalledWith(
          "POST",
          "/v1/security/oauth2/token",
          {
            grant_type: "client_credentials",
            client_id: client.clientId,
            client_secret: client.clientSecret,
          }
        );
      });
    });
  });
});
