import EventEmitter from "events";
import Client from ".";
import { AmadeusOAuth2TokenSuccessResponse } from "../../types/amadeus/client/access-token";
import { ReturnedResponseSuccess } from "../../types/amadeus/client/response";

// The number of seconds before the token expires, when
// we will already try to refresh it
const TOKEN_BUFFER = 10;

/**
 * A helper library to create and maintain the OAuth2 AccessTokens between
 * requests. Keeps track of the expiry time and automatically tries to fetch
 * a new token if needed.
 *
 * @property {string} accessToken the cached current access token (bearer)
 * @property {number} expiresAt the aproximate time this token expires at
 */
export default class AccessToken {
  private accessToken?: string;
  private expiresAt: number;

  constructor() {
    this.expiresAt = 0;
  }

  /**
   * Fetches or returns a cached bearer token. Used by the Client to get a
   * token before making an API call.
   *
   * @param  {Client} client the Amadeus Client to make an API call with
   * @return {Promise.<Response, ResponseError>} a Promise
   * @public
   */
  public bearerToken(client: Client): Promise<string> {
    const emitter = new EventEmitter();
    const promise = this.promise(emitter);
    this.emitOrLoadAccessToken(client, emitter);
    return promise;
  }

  /**
   * Builds a promise to be returned to the API user
   *
   * @param  {EventEmitter} emitter the EventEmitter used to notify the Promise of
   * @return {Promise} a promise
   * @private
   */
  private promise(emitter: EventEmitter): Promise<string> {
    return new Promise((resolve, reject) => {
      emitter.on("resolve", (response) => resolve(response));
      emitter.on("reject", (error) => reject(error));
    });
  }

  /**
   * Checks if the token needs a refresh, if not emits the cached token,
   * otherwise tries to load a new access token
   *
   * @param  {Client} client the Amadeus Client to make an API call with
   * @param  {EventEmitter} emitter the EventEmitter used to emit the token
   * @private
   */
  private emitOrLoadAccessToken(client: Client, emitter: EventEmitter): void {
    if (this.needsLoadOrRefresh()) {
      this.loadAccessToken(client, emitter);
    } else {
      emitter.emit("resolve", this.accessToken);
    }
  }

  /**
   * Checks if the token needs a refresh or first load
   *
   * @return {boolean} wether the token needs a refresh
   * @private
   */
  private needsLoadOrRefresh(): boolean {
    return !this.accessToken || Date.now() + TOKEN_BUFFER > this.expiresAt;
  }

  /**
   * Loads the access token using the client, emits the token when it's loaded
   *
   * @param  {Client} client the Amadeus Client to make an API call with
   * @param  {EventEmitter} emitter the EventEmitter used to emit the token
   * @private
   */
  private async loadAccessToken(
    client: Client,
    emitter: EventEmitter
  ): Promise<void> {
    try {
      const response = await client.unauthenticatedRequest<
        AmadeusOAuth2TokenSuccessResponse,
        unknown
      >("POST", "/v1/security/oauth2/token", {
        grant_type: "client_credentials",
        client_id: client.clientId,
        client_secret: client.clientSecret,
      });

      this.storeAccessToken(response);
      this.emitOrLoadAccessToken(client, emitter);
    } catch (error) {
      emitter.emit("reject", error);
    }
  }

  /**
   * Stores a loaded access token, calculating the expiry date
   *
   * @param  {Response} response the response object received from the client
   * @private
   */
  private storeAccessToken(
    response: ReturnedResponseSuccess<
      AmadeusOAuth2TokenSuccessResponse,
      unknown
    >
  ): void {
    this.accessToken = response.result?.access_token;
    this.expiresAt = response.result
      ? Date.now() + response.result.expires_in * 1000
      : 0;
  }
}
