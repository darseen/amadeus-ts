import { ReturnedResponseSuccess } from "../../client/response";
import {
  AircraftEquipment,
  CollectionMetaLink,
  Fee,
  FlightEndPoint,
  FlightOffer,
  Issue,
  LocationEntry,
  QualifiedFreeText,
  Tax,
  Traveler,
} from "../shared";

type OperatingFlight = {
  carrierCode?: string;
  number?: string;
  suffix?: string;
};

type Price = {
  currency?: string;
  total?: string;
  base?: string;
  fees?: Fee[];
  taxes?: Tax[];
};

type SeatMap = {
  type?: string;
  id?: string;
  self?: Link;
  departure?: FlightEndPoint;
  arrival?: FlightEndPoint;
  carrierCode?: string;
  number?: string;
  operating?: OperatingFlight;
  aircraft?: AircraftEquipment;
  class?: string;
  flightOfferId?: string;
  segmentId?: string;
  decks?: Deck[];
  aircraftCabinAmenities?: AircraftCabinAmenities;
  availableSeatsCounters?: AvailableSeatsCounter[];
};

type Deck = {
  deckType?: "UPPER" | "MAIN" | "LOWER";
  deckConfiguration?: DeckConfiguration;
  facilities?: Facility[];
  seats?: Seat[];
};

type DeckConfiguration = {
  width?: number;
  length?: number;
  startSeatRow?: number;
  endSeatRow?: number;
  startWingsX?: number;
  endWingsX?: number;
  startWingsRow?: number;
  endWingsRow?: number;
  exitRowsX?: number[];
};

type Facility = {
  code?: string;
  column?: string;
  row?: string;
  position?: "FRONT" | "REAR" | "SEAT";
  coordinates?: Coordinates;
};

type Seat = {
  cabin?: string;
  number?: string;
  characteristicsCodes?: string[];
  travelerPricing?: SeatmapTravelerPricing[];
  coordinates?: Coordinates;
};

type Coordinates = {
  x?: number;
  y?: number;
};

type AvailableSeatsCounter = {
  travelerId?: string;
  value?: number;
};

type SeatmapTravelerPricing = {
  travelerId?: string;
  seatAvailabilityStatus?: "AVAILABLE" | "BLOCKED" | "OCCUPIED";
  price?: Price;
};

type AircraftCabinAmenities = {
  power?: AircraftCabinAmenitiesPower;
  seat?: AmenitySeat;
  wifi?: AircraftCabinAmenitiesWifi;
  entertainment?: AircraftCabinAmenitiesEntertainment[];
  food?: AircraftCabinAmenitiesFood;
  beverage?: AircraftCabinAmenitiesBeverage;
};

type AircraftCabinAmenitiesBeverage = Amenity & {
  beverageType?: "ALCOHOLIC" | "NON_ALCOHOLIC" | "ALCOHOLIC_AND_NON_ALCOHOLIC";
};

type AircraftCabinAmenitiesPower = Amenity & {
  powerType?: "PLUG" | "USB_PORT" | "ADAPTOR" | "PLUG_OR_USB_PORT";
  usbType?: "USB_A" | "USB_C" | "USB_A_AND_USB_C";
};

type AircraftCabinAmenitiesFood = Amenity & {
  foodType?: "MEAL" | "FRESH_MEAL" | "SNACK" | "FRESH_SNACK";
};

type AircraftCabinAmenitiesEntertainment = Amenity & {
  entertainmentType?:
    | "LIVE_TV"
    | "MOVIES"
    | "AUDIO_VIDEO_ON_DEMAND"
    | "TV_SHOWS"
    | "IP_TV";
};

type AircraftCabinAmenitiesWifi = Amenity & {
  wifiCoverage?: "FULL" | "PARTIAL";
};

type Amenity = {
  isChargeable?: boolean;
};

type AmenitySeat = {
  legSpace?: number;
  spaceUnit?: "INCHES" | "CENTIMENTERS";
  tilt?: "FULL_FLAT" | "ANGLE_FLAT" | "NORMAL";
  amenityType?: "SEAT";
  medias?: AmenityMedia[];
};

type AmenityMedia = {
  title?: string;
  href?: string;
  description?: QualifiedFreeText;
  mediaType?:
    | "application"
    | "audio"
    | "font"
    | "example"
    | "image"
    | "message"
    | "model"
    | "multipart"
    | "text"
    | "video";
};

type FacilityDictionary = Record<string, string>;
type SeatCharacteristicDictionary = Record<string, string>;

type Link = {
  href: string;
  methods?: ("GET" | "PUT" | "DELETE" | "POST" | "PATCH")[];
  count?: number;
};

type Dictionaries = {
  locations?: LocationEntry;
  facility?: FacilityDictionary;
  seatCharacteristics?: SeatCharacteristicDictionary;
};

export type SeatmapsGetParams = {
  "flight-orderId": string;
};

export type SeatmapsGetResult = {
  meta?: CollectionMetaLink;
  warnings?: Issue[];
  data: SeatMap[];
  dictionaries: Dictionaries;
};

export type SeatmapsGetReturnedResponse = ReturnedResponseSuccess<
  SeatmapsGetResult,
  SeatmapsGetResult["data"]
>;

export type SeatmapsPostParams = {
  data: FlightOffer[];
  included?: {
    travelers: {
      [key: string]: Traveler;
    };
  };
};

export type SeatmapsPostResult = {
  meta?: CollectionMetaLink;
  warnings?: Issue[];
  data: SeatMap[];
  dictionaries: Dictionaries;
};

export type SeatmapsPostReturnedResponse = ReturnedResponseSuccess<
  SeatmapsPostResult,
  SeatmapsPostResult["data"]
>;
