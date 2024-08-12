import { beforeEach, describe, expect, it, vi } from "vitest";
import Client from "../../../src/amadeus/client";
import Pagination from "../../../src/amadeus/client/pagination";
import Response from "../../../src/amadeus/client/response";

let pagination: Pagination;
let client: Client;

describe("Pagination", () => {
  it("should exports an Pagination class", () => {
    expect(Pagination).toBeDefined();
  });

  describe(".instance", () => {
    beforeEach(() => {
      client = new Client({ clientId: "123", clientSecret: "234" });
      pagination = new Pagination(client);
    });

    describe(".page", () => {
      it("should make a call for the right page if it exists", () => {
        const response = {
          request: {
            verb: "GET",
            path: "/foo/bar",
          },
          result: {
            meta: {
              links: {
                next: "https://example.com?page%5Boffset%5D=2",
              },
            },
          },
        };

        client.request = vi.fn();
        pagination.page("next", response as any);
        expect(client.request).toHaveBeenCalledWith("GET", "/foo/bar", {
          page: { offset: "2" },
        });
      });

      it("should resolve to null if no pagination headers were found", () => {
        let response = {
          request: {},
          result: {},
        };

        // client.call = vi.fn();
        expect(pagination.page("next", response as any)).resolves.toBeNull();
      });
    });
  });
});
