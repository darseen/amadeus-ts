import Client from "../../client";
import Airlines from "./airlines";
import Location from "./location";
import Locations from "./locations";
import RecommendedLocations from "./recommended-locations";
import Urls from "./urls";

/**
 * A namespaced client for the
 * `/v2/reference-data` endpoints
 *
 * Access via the {Amadeus} object
 *
 * ```ts
 * const amadeus = new Amadeus();
 * amadeus.referenceData.urls;
 * ```
 *
 * @param {Client} client
 * @property {Urls} urls
 * @protected
 */
export default class ReferenceData {
  private client: Client;
  public urls: Urls;
  public locations: Locations;
  public airlines: Airlines;
  public recommendedLocations: RecommendedLocations;

  constructor(client: Client) {
    this.client = client;
    this.urls = new Urls(client);
    this.locations = new Locations(client);
    this.airlines = new Airlines(client);
    this.recommendedLocations = new RecommendedLocations(client);
  }

  /**
   * The namespace for the Location APIs - accessing a specific location
   *
   * @param  {string} [locationId] The ID of the location to search for
   * @return {Location}
   **/
  public location(locationId: string): Location {
    return new Location(this.client, locationId);
  }
}
