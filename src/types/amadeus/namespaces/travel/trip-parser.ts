import { ReturnedResponseSuccess } from "../../client/response";
import { Issue } from "../shared";

type Trip = {
  type?: string;
  reference?: string;
  creationDateTime?: string;
  bookingDate?: string;
  bookingNumber?: string;
  provider?: string;
  title?: string;
  description?: string;
  start?: Start;
  end?: End;
  travelAgency?: TravelAgency;
  stakeholders?: Stakeholder[];
  price?: Price;
  products?: (Air | Hotel | Car | Train)[];
};

type Start = {
  localDateTime?: string;
  name?: string;
  iataCode?: string;
  address?: Address;
};

type Address = {
  category?: string;
  lines?: string[];
  postalCode?: string;
  countryCode?: string;
  cityName?: string;
  stateCode?: string;
  postalBox?: string;
  text?: string;
  state?: string;
};

type End = {
  localDateTime?: string;
  name?: string;
  iataCode?: string;
  address?: Address;
};

type TravelAgency = {
  officeName?: string;
  address?: Address;
  phone?: Phone;
  email?: Email;
};

type Email = {
  category?: "BUSINESS" | "PERSONAL" | "OTHER";
  address?: string;
};

type Phone = {
  category?: "BUSINESS" | "PERSONAL" | "OTHER";
  countryCode?: string;
  number?: string;
};

type Name = {
  firstName?: string;
  lastName?: string;
  title?: string;
  middleName?: string;
  prefix?: string;
  suffix?: string;
};

type Price = {
  currency?: string;
  total?: string;
  base?: string;
  totalTaxes?: string;
};

type AirData = {
  confirmationNumber?: string;
  baggages?: Baggages;
  meal?: Meal;
  departureAirportLocation?: DepartureAirportLocation;
  arrivalAirportLocation?: ArrivalAirportLocation;
  departure?: DepartureAir;
  arrival?: ArrivalAir;
  marketing?: Marketing;
  operating?: Operating;
  aircraft?: Aircraft;
  seats?: (Seats & {
    associationRefs?: AssociationRefs[];
  })[];
};

type HotelData = {
  confirmationNumber?: string;
  checkInDate?: string;
  checkOutDate?: string;
  roomQuantity?: number;
  contact?: ContactHotel;
  address?: Address;
  amenities?: string[];
  name?: string;
  description?: Description;
  policies?: Policies;
  guests?: Guests;
  room?: Room;
};

type CarData = {
  confirmationNumber?: string;
  serviceProviderName?: string;
  associatedEquipments?: AssociatedEquipments[];
  pickup?: Pickup;
  dropoff?: Dropoff;
  driver?: Driver;
  vehicle?: CarVehicle;
};

type TrainData = {
  confirmNbr?: string;
  serviceProviderName?: string;
  bookingClass?: string;
  departure?: Departure;
  departureDateTime?: string;
  arrivalDateTime?: string;
  arrival?: Arrival;
  duration?: string;
  departureTrack?: string;
  arrivalTrack?: string;
  seats?: Seats[];
  vehicle?: Vehicle;
};

type Stakeholder = {
  id?: string;
  nationality?: string;
  passangerTypeCode?: string;
  dateOfBirth?: string;
  age?: number;
  name?: Name;
};

type Departure = {
  subType?: string;
  name?: string;
  iataCode?: string;
};

type Arrival = {
  subtype?: string;
  name?: string;
  iataCode?: string;
};

type Seats = {
  number?: string;
  cabin?: string;
};

type Vehicle = {
  vehicleType?: string;
  code?: string;
  number?: string;
  displayName?: string;
};

type AssociatedEquipments = {
  name?: string;
};

type Pickup = {
  localDateTime?: string;
  location?: Location;
};

type Location = {
  iataCode?: string;
  address?: Address;
};

type Dropoff = {
  localDateTime?: string;
  location?: Location;
};

type Driver = {
  contacts?: Contact[];
};

type CarVehicle = {
  acrissCode?: string;
  carModel?: string;
  doors?: number;
};

type Contact = {
  phone?: Phone;
};

type Description = {
  text?: string;
};

type Policies = {
  cancellation?: Cancellation;
};

type Cancellation = {
  description?: Description;
};

type Guests = {
  adults?: number;
  childAge?: number[];
};

type Room = {
  type?: string;
  typeEstimated?: TypeEstimated;
};

type TypeEstimated = {
  category?: string;
  beds?: number;
  bedType?: string;
};

type Baggages = {
  quantity?: number;
  weight?: Weight;
};

type Weight = {
  amount?: string;
};

type Meal = {
  code?: string;
  description?: string;
};

type DepartureAirportLocation = {
  name?: string;
  address?: Address;
};

type ArrivalAirportLocation = {
  name?: string;
  address?: Address;
};

type DepartureAir = {
  iataCode?: string;
  terminal?: string;
  checkInEndTime?: string;
  localDateTime?: string;
};

type ArrivalAir = {
  iataCode?: string;
  terminal?: string;
  localDateTime?: string;
};

type AssociationRefs = {
  id?: string;
  type?: string;
};

type Aircraft = {
  aircraftType?: string;
  aircraftDescription?: string;
};

type Marketing = {
  carrier?: Carrier;
  flightDesignator?: FlightDesignator;
};

type Carrier = {
  name?: string;
};

type FlightDesignator = {
  carrierCode?: string;
  flightNumber?: string;
  operationalSuffix?: string;
};

type Operating = {
  carrier?: Carrier;
  flightDesignator?: FlightDesignator;
};

type ContactHotel = {
  phone?: string;
};

type Air = {
  air?: AirData;
};

type Hotel = {
  hotel?: HotelData;
};

type Car = {
  car?: CarData;
};

type Train = {
  train?: TrainData;
};

export type TripParserParams = {
  payload?: string;
  metadata?: {
    documentType?: string;
    name?: string;
    encoding?: "BASE_64" | "BASE_64_URL";
  };
};

export type TripParserResult = {
  data: Trip;
  warnings?: Issue[];
};

export type TripParserReturnedResponse = ReturnedResponseSuccess<
  TripParserResult,
  TripParserResult["data"]
>;
