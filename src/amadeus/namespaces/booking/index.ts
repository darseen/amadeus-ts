import Client from "../../client";
import FlightOrder from "./flight-order";
import FlightOrders from "./flight-orders";
import HotelBookings from "./hotel-bookings";
import HotelOrders from "./hotel-orders";

/**
 * A namespaced client for the
 * `/v1/booking` endpoints
 *
 * Access via the {@link Amadeus} object
 *
 * ```ts
 * const amadeus = new Amadeus();
 * amadeus.booking;
 * ```
 *
 * @param {Client} client
 * @property {FlightOrders} flightOrders
 * @property {FlightOrder} flightOrder
 * @property {HotelBookings} hotelBookings
 * @property {HotelOrders} hotelOrders
 * @protected
 */
export default class Booking {
  private client: Client;
  public flightOrders: FlightOrders;
  public hotelBookings: HotelBookings;
  public hotelOrders: HotelOrders;

  constructor(client: Client) {
    this.client = client;
    this.flightOrders = new FlightOrders(client);
    this.hotelBookings = new HotelBookings(client);
    this.hotelOrders = new HotelOrders(client);
  }

  flightOrder(orderId: string) {
    return new FlightOrder(this.client, orderId);
  }
}
