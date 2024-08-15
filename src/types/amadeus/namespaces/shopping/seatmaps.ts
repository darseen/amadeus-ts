import { ReturnedResponseSuccess } from "../../client/response";
import {
  AircraftEquipment,
  CollectionMetaLink,
  ElementaryPrice,
  ExtendedPrice,
  FareRules,
  Fee,
  FlightEndPoint,
  FlightOfferSource,
  Issue,
  LocationEntry,
  PricingOptionsFareType,
  Segment,
  ServiceName,
  SliceDiceIndicator,
  Tax,
  TravelClass,
  Traveler,
  TravelerPricingFareOption,
  TravelerType,
} from "../shared";

export interface OperatingFlight {
  carrierCode?: string;
  number?: string;
  suffix?: string;
}

export interface FlightOffer {
  type: string;
  id: string;
  source?: FlightOfferSource;
  instantTicketingRequired?: boolean;
  disablePricing?: boolean;
  nonHomogeneous?: boolean;
  oneWay?: boolean;
  paymentCardRequired?: boolean;
  lastTicketingDate?: string;
  numberOfBookableSeats?: number;
  itineraries?: {
    duration?: string;
    segments: Segment[];
  }[];
  price?: ExtendedPrice;
  pricingOptions?: {
    fareType?: PricingOptionsFareType;
    corporateCodes?: string[];
    includedCheckedBagsOnly?: boolean;
    refundableFare?: boolean;
    noRestrictionFare?: boolean;
    noPenaltyFare?: boolean;
  };
  validatingAirlineCodes?: string[];
  travelerPricings?: {
    travelerId: string;
    fareOption: TravelerPricingFareOption;
    travelerType: TravelerType;
    associatedAdultId?: string;
    price?: Price;
    fareDetailsBySegment: {
      segmentId: string;
      cabin?: TravelClass;
      fareBasis?: string;
      brandedFare?: string;
      class?: string;
      isAllotment?: boolean;
      allotmentDetails?: {
        tourName?: string;
        tourReference?: string;
      };
      sliceDiceIndicator?: SliceDiceIndicator;
      includedCheckedBags?: BaggageAllowance;
      additionalServices?: {
        chargeableCheckedBags?: BaggageAllowance;
        chargeableSeatNumber?: string;
        otherServices?: ServiceName[];
      };
    }[];
  }[];
  fareRules?: FareRules;
}

export interface BaggageAllowance {
  excessRate?: ElementaryPrice;
  quantity?: number;
  weight?: number;
  weightUnit?: string;
}

export interface Price {
  currency?: string;
  total?: string;
  base?: string;
  fees?: Fee[];
  taxes?: Tax[];
}

export interface SeatMap {
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
}

export interface Deck {
  deckType?: "UPPER" | "MAIN" | "LOWER";
  deckConfiguration?: DeckConfiguration;
  facilities?: Facility[];
  seats?: Seat[];
}

export interface DeckConfiguration {
  width?: number;
  length?: number;
  startSeatRow?: number;
  endSeatRow?: number;
  startWingsX?: number;
  endWingsX?: number;
  startWingsRow?: number;
  endWingsRow?: number;
  exitRowsX?: number[];
}

export interface Facility {
  code?: string;
  column?: string;
  row?: string;
  position?: "FRONT" | "REAR" | "SEAT";
  coordinates?: Coordinates;
}

export interface Seat {
  cabin?: string;
  number?: string;
  characteristicsCodes?: string[];
  travelerPricing?: SeatmapTravelerPricing[];
  coordinates?: Coordinates;
}

export interface Coordinates {
  x?: number;
  y?: number;
}

export interface AvailableSeatsCounter {
  travelerId?: string;
  value?: number;
}

export interface SeatmapTravelerPricing {
  travelerId?: string;
  seatAvailabilityStatus?: "AVAILABLE" | "BLOCKED" | "OCCUPIED";
  price?: Price;
}

export interface AircraftCabinAmenities {
  power?: AircraftCabinAmenitiesPower;
  seat?: AmenitySeat;
  wifi?: AircraftCabinAmenitiesWifi;
  entertainment?: AircraftCabinAmenitiesEntertainment[];
  food?: AircraftCabinAmenitiesFood;
  beverage?: AircraftCabinAmenitiesBeverage;
}

export type AircraftCabinAmenitiesBeverage = Amenity & {
  beverageType?: "ALCOHOLIC" | "NON_ALCOHOLIC" | "ALCOHOLIC_AND_NON_ALCOHOLIC";
};

export type AircraftCabinAmenitiesPower = Amenity & {
  powerType?: "PLUG" | "USB_PORT" | "ADAPTOR" | "PLUG_OR_USB_PORT";
  usbType?: "USB_A" | "USB_C" | "USB_A_AND_USB_C";
};

export type AircraftCabinAmenitiesFood = Amenity & {
  foodType?: "MEAL" | "FRESH_MEAL" | "SNACK" | "FRESH_SNACK";
};

export type AircraftCabinAmenitiesEntertainment = Amenity & {
  entertainmentType?:
    | "LIVE_TV"
    | "MOVIES"
    | "AUDIO_VIDEO_ON_DEMAND"
    | "TV_SHOWS"
    | "IP_TV";
};

export type AircraftCabinAmenitiesWifi = Amenity & {
  wifiCoverage?: "FULL" | "PARTIAL";
};

export interface Amenity {
  isChargeable?: boolean;
}

export interface AmenitySeat {
  legSpace?: number;
  spaceUnit?: "INCHES" | "CENTIMENTERS";
  tilt?: "FULL_FLAT" | "ANGLE_FLAT" | "NORMAL";
  amenityType?: "SEAT";
  medias?: AmenityMedia[];
}

export interface AmenityMedia {
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
}

export type FacilityDictionary = Record<string, string>;
export type SeatCharacteristicDictionary = Record<string, string>;

export interface Link {
  href: string;
  methods?: ("GET" | "PUT" | "DELETE" | "POST" | "PATCH")[];
  count?: number;
}

export interface QualifiedFreeText {
  text?: string;
  lang?: string;
}

export interface Dictionaries {
  locations?: LocationEntry;
  facility?: FacilityDictionary;
  seatCharacteristics?: SeatCharacteristicDictionary;
}

// Types used in class
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
