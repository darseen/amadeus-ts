import { ReturnedResponseSuccess } from "../../../client/response";
import { Issue } from "../../shared";

type Transfer = {
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
  methodsOfPaymentAccepted: (
    | "CREDIT_CARD"
    | "INVOICE"
    | "TRAVEL_ACCOUNT"
    | "PAYMENT_SERVICE_PROVIDER"
  )[];
  discountCodes?: DiscountCode[];
  distance?: Distance;
};

type TransferReservation = {
  confirmNbr?: string;
  status?: "CONFIRMED" | "CANCELLED";
  note?: string;
  methodOfPayment?:
    | "CREDIT_CARD"
    | "INVOICE"
    | "TRAVEL_ACCOUNT"
    | "PAYMENT_SERVICE_PROVIDER";
  paymentServiceProvider?: "STRIPE_CONNECT";
  offerId?: string;
} & Transfer;

type TransferOrder = {
  type: string;
  id: string;
  reference?: string;
  transfers: TransferReservation[];
  passengers?: Passenger[];
  agency?: Agency;
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

type Agency = {
  contacts?: {
    email?: {
      address?: string;
    };
  }[];
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

type Corporation = {
  address?: AddressCommon;
  info?: Record<string, string>;
};

type CreditCard = {
  number: string;
  holderName: string;
  vendorCode: string;
  expiryDate: string;
  cvv?: string;
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

type PassengerCharacteristics = {
  passengerTypeCode?: string;
  age?: number;
};

type LoyaltyNumber = {
  program?: string;
  value?: string;
};

type Name = {
  type?: string;
  firstName?: string;
  lastName?: string;
  title?: string;
};

type Passenger = Name & {
  contacts?: Contact;
  billingAddress?: AddressCommon;
};

type Payment = {
  methodOfPayment?:
    | "CREDIT_CARD"
    | "TRAVEL_ACCOUNT"
    | "PAYMENT_SERVICE_PROVIDER";
  paymentReference?: string;
  paymentServiceProvider?: "STRIPE_CONNECT";
  creditCard?: CreditCard;
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
    | "CAR"
    | "SED"
    | "WGN"
    | "ELC"
    | "VAN"
    | "SUV"
    | "LMS"
    | "MBR"
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

export type OrderingTransferOrdersParams = {
  data: {
    note?: string;
    flightNumber?: string;
    passengers: Passenger[];
    agency?: Agency;
    payment: Payment;
    equipment?: Equipment[];
    extraServices?: ExtraService[];
    loyaltyNumber?: LoyaltyNumber;
    corporation?: Corporation;
    startConnectedSegment?: TravelSegment;
    endConnectedSegment?: TravelSegment;
  };
};

export type OrderingTransferOrdersResult = {
  data: TransferOrder;
  warnings?: Issue[];
};

export type OrderingTransferOrdersReturnedResponse = ReturnedResponseSuccess<
  OrderingTransferOrdersResult,
  OrderingTransferOrdersResult["data"]
>;
