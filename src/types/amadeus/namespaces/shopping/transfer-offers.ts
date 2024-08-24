import { ReturnedResponseSuccess } from "../../client/response";
import { Issue } from "../shared";

type TransferOffer = {
  transferType:
    | "PRIVATE"
    | "SHARED"
    | "TAXI"
    | "HOURLY"
    | "AIRPORT_EXPRESS"
    | "AIRPORT_BUS";
  start: Location;
  end?: Location;
  stopOvers?: StopOver[];
  passenegerCharacteristics?: PassengerCharacteristics[];
  duration?: string;
  vehicle: Vehicle;
  serviceProvider: ServiceProvider;
  partnerInfo?: PartnerInfo;
  quotation: Quotation;
  converted?: Quotation;
  extraServices?: ExtraService[];
  equipment?: Equipment[];
  cancellationRules?: CancellationRule[];
  methodsOfPaymentAccepted: ("CREDIT_CARD" | "INVOICE" | "TRAVEL_ACCOUNT")[];
  discountCodes?: DiscountCode[];
  language?: string;
  distance?: Distance;
} & {
  type: string;
  id: string;
};

type TransferOfferPost = TransferOffer & {
  startConnectedSegment?: TravelSegment;
} & {
  endConnectedSegment?: TravelSegment;
};

type AddressCommon = {
  line?: string;
  zip?: string;
  countryCode?: string;
  cityName?: string;
  stateCode?: string;
};

type Address = {
  line?: string;
  zip?: string;
  countryCode?: string;
  cityName?: string;
  stateCode?: string;
  latitude?: number;
  longitude?: number;
};

type Baggage = {
  count?: number;
  size?: "S" | "M" | "L";
};

type CancellationRule = {
  ruleDescription?: string;
  feeType?: "PERCENTAGE" | "VALUE";
  feeValue?: string;
  currencyCode?: string;
  metricType?: "MINUTES" | "HOURS" | "DAYS" | "YEARS";
  metricMin?: string;
  metricMax?: string;
};

type Contact = {
  phoneNumber?: string;
  email?: string;
};

type DiscountCode = {
  type?: "CD" | "PC";
  value?: string;
};

type Distance = {
  value?: number;
  unit?: "KM" | "MI";
};

type Equipment = {
  code:
    | "BBS"
    | "BYC"
    | "CBB"
    | "CBF"
    | "CBS"
    | "CSB"
    | "CSI"
    | "CST"
    | "SBR"
    | "SKB"
    | "SKR"
    | "TAB "
    | "WAR"
    | "WHC"
    | "WIF"
    | "CNT";
  itemId?: string;
  description?: string;
  quotation?: Quotation;
  converted?: Quotation;
  isBookable?: boolean;
  taxIncluded?: boolean;
  includedInTotal?: boolean;
};

type ExtraService = {
  code: "DSL" | "EWT" | "MAG" | "FLM" | "NWS" | "CAI" | "WNR";
  itemId?: string;
  description?: string;
  metricType?: "YEARS" | "DAYS" | "HOURS" | "MINUTES";
  metricValue?: string;
  quotation?: Quotation;
  converted?: Quotation;
  isBookable?: boolean;
  taxIncluded?: boolean;
  includedInTotal?: boolean;
};

type Fee = PointsAndCash & {
  currencyCode?: string;
  indicator?: string;
};

type Location = {
  dateTime?: string;
  locationCode?: string;
  address?: Address;
  name?: string;
  googlePlaceId?: string;
  uicCode?: string;
};

type StopOver = {
  duration?: string;
  sequenceNumber?: number;
  location?: Location;
};

type StopOverRequest = {
  duration?: string;
  locationCode?: string;
  addressLine?: string;
  countryCode?: string;
  cityName?: string;
  zipCode?: string;
  googlePlaceId?: string;
  name?: string;
  stateCode?: string;
  geoCode?: string;
  sequenceNumber?: number;
  uicCode?: string;
};

type PassengerCharacteristics = {
  passengerTypeCode?: string;
  age?: number;
};

type PartnerInfo = {
  serviceProvider?: ServiceProvider;
};

type PointsAndCash = {
  monetaryAmount?: string;
};

type Quotation = PointsAndCash & {
  currencyCode?: string;
  isEstimated?: boolean;
  base?: PointsAndCash;
  discount?: PointsAndCash;
  taxes?: Tax[];
  fees?: Fee[];
  totalTaxes?: PointsAndCash;
  totalFees?: PointsAndCash;
};

type Seat = {
  count?: number;
  row?: string;
  size?: string;
};

type ServiceProvider = {
  code: string;
  name: string;
  logoUrl: string;
  termsUrl?: string;
  isPreferred?: boolean;
  contacts?: ContactWithAddress;
  settings?: (
    | "BILLING_ADDRESS_REQUIRED"
    | "FLIGHT_NUMBER_REQUIRED"
    | "CVV_NUMBER_REQUIRED"
  )[];
  businessIdentification?: {
    vatRegistrationNumber?: string;
  };
};

type Tax = {
  monetaryAmount?: string;
} & {
  indicator?: string;
  natureCode?: string;
  countryCode?: string;
  rate?: string;
};

type TransportationType = "FLIGHT" | "TRAIN";

type TravelSegment = {
  transportationType?: TransportationType;
  transportationNumber?: string;
  departure?: TravelSegmentLocation;
  arrival?: TravelSegmentLocation;
};

type TravelSegmentLocation = {
  uicCode?: string;
  iataCode?: string;
  localDateTime?: string;
};

type Vehicle = {
  code:
    | "MBR"
    | "CAR"
    | "SED"
    | "WGN"
    | "ELC"
    | "VAN"
    | "SUV"
    | "LMS"
    | "TRN"
    | "BUS";
  category: "ST" | "BU" | "FC";
  description: string;
  seats: Seat[];
  baggages?: Baggage[];
  imageURL?: string;
};

type ContactWithAddress = Contact & {
  address?: AddressCommon;
};

export type ShoppingTransferOffersParams = {
  startDateTime: string;
  passengers?: number;
  startLocationCode: string;
  startUicCode?: string;
  startAddressLine?: string;
  startZipCode?: string;
  startCountryCode?: string;
  startCityName?: string;
  startStateCode?: string;
  startGeoCode?: string;
  startName?: string;
  startGooglePlaceId?: string;
  endLocationCode?: string;
  endUicCode?: string;
  endAddressLine?: string;
  endZipCode?: string;
  endCountryCode?: string;
  endCityName?: string;
  endStateCode?: string;
  endGeoCode?: string;
  endName?: string;
  endGooglePlaceId?: string;
  transferType?: TransferOffer["transferType"];
  duration?: string;
  language?: string;
  currency?: string;
  vehicleCategory?: "ST" | "BU" | "FC";
  vehicleCode?: Vehicle["code"];
  providerCodes?: string;
  baggages?: number;
  discountNumbers?: string;
  extraServiceCodes?: ExtraService["code"];
  equipmentCodes?: Equipment["code"];
  reference?: string;
  stopOvers?: StopOver[] | any; // I put any because I don't know what the type is exactly
  startConnectedSegment?: TravelSegment;
  endConnectedSegment?: TravelSegment;
  passengerCharacteristics?: PassengerCharacteristics[];
};

export type ShoppingTransferOffersResult = {
  data: TransferOfferPost[];
  warnings?: Issue[];
};

export type ShoppingTransferOffersReturnedResponse = ReturnedResponseSuccess<
  ShoppingTransferOffersResult,
  ShoppingTransferOffersResult["data"]
>;
