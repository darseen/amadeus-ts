import Client from ".";
import { PageName } from "../../types/amadeus/client/pagination";
import { ReturnedResponseSuccess } from "../../types/amadeus/client/response";
import Request from "./request";

/**
 * A helper library for handling pagination.
 *
 * @param {Client} client the client to make the API calls against
 * @protected
 */
export default class Pagination {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  /**
   * Fetch the page for the given page name, and make the next API call based on
   * the previous request made.
   *
   * @param {PageName} pageName the name of the page to fetch, should be available
   *    as a link in the meta links in the response
   * @param {Response} response the response containing the links to the next pages,
   *   and the request used to make the previous call
   * @return {Promise<Response|ResponseError>} a Promise
   * @public
   */
  public page(
    pageName: PageName,
    response: ReturnedResponseSuccess<any, any>
  ): Promise<any> {
    const pageNumber = this.pageNumber(response, pageName);

    if (pageNumber) return this.call(response.request, pageNumber);

    return this.nullPromise();
  }

  /**
   * Makes a new call for the new page number
   *
   * @param  {Request} request the request used to make the previous call
   * @param  {number} pageNumber the page number to fetch
   * @return {Promise<Response|ResponseError>} a Promise
   * @private
   */
  private call(request: Request, pageNumber: string): Promise<any> {
    const params = request.params || {};
    params["page"] = params["page"] || {};
    params["page"]["offset"] = pageNumber;

    return this.client.request(request.verb, request.path, params);
  }

  /**
   * Tries to determine the page number from the page name. If not present, it
   * just returns null
   *
   * @param  {ReturnedResponseSuccess} response the response containing the links to the next pages
   * @param  {PageName} pageName the name of the page to fetch
   * @return {string}
   * @private
   */
  private pageNumber(
    response: ReturnedResponseSuccess<any, any>,
    pageName: PageName
  ): string | null {
    try {
      const number = response.result["meta"]["links"][pageName]
        .split("page%5Boffset%5D=")[1]
        .split("&")[0];

      return number;
    } catch (TypeError) {
      return null;
    }
  }

  /**
   * Returns a Promise that always resolves to null
   *
   * @return {Promise} a Promise that always resolves to null
   * @private
   */
  private nullPromise(): Promise<null> {
    return new Promise(function (resolve) {
      resolve(null);
    });
  }
}
