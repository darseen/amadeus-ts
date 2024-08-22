import { ReturnedResponseSuccess } from "../../client/response";
import { CollectionMetaLink, Issue } from "../shared";

type DatedFlight = {
  type?: string;
  scheduledDepartureDate?: string;
  flightDesignator?: FlightDesignator;
  flightPoints?: FlightPoint[];
  segments?: Segment[];
  legs?: Leg[];
};

type FlightDesignator = {
  carrierCode?: string;
  flightNumber?: number;
  operationalSuffix?: string;
};

type FlightPoint = {
  iataCode?: string;
  departure?: Departure;
  arrival?: Arrival;
};

type Segment = {
  boardPointIataCode?: string;
  offPointIataCode?: string;
  scheduledSegmentDuration?: string;
  partnership?: Partnership;
};

type Partnership = {
  operatingFlight?: FlightDesignator;
};

type Leg = {
  boardPointIataCode?: string;
  offPointIataCode?: string;
  aircraftEquipment?: AircraftEquipment;
  scheduledLegDuration?: string;
};

type Departure = {
  terminal?: Terminal;
  gate?: Gate;
  timings?: Timing[];
};

type Arrival = {
  terminal?: Terminal;
  gate?: Gate;
  timings?: Timing[];
};

type Terminal = {
  code?: string;
};

type Gate = {
  mainGate?: string;
};

type Timing = {
  qualifier?: string;
  value?: string;
  delays?: Delay[];
};

type Delay = {
  duration?: string;
};

type AircraftEquipment = {
  aircraftType?: string;
};

export type ScheduleFlightsParams = {
  carrierCode: string;
  flightNumber: string;
  scheduledDepartureDate: string;
  operationalSuffix?: string;
};

export type ScheduleFlightsResult = {
  meta?: CollectionMetaLink;
  data: DatedFlight[];
  warnings?: Issue[];
};

export type ScheduleFlightsReturnedResponse = ReturnedResponseSuccess<
  ScheduleFlightsResult,
  ScheduleFlightsResult["data"]
>;
