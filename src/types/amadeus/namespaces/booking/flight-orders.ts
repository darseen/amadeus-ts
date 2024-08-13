import { ReturnedResponseSuccess } from "../../client/response";
import {
  AssociatedRecord,
  CollectionMetaLink,
  Contact,
  Dictionaries,
  ElementaryPrice,
  FlightOffer,
  Issue,
  Remarks,
  TicketingAgreement,
  Traveler,
} from "../shared";

export interface FlightOrder {
  type: "flight-order";
  id?: string;
  queuingOfficeId?: string;
  ownerOfficeId?: string;
  associatedRecords?: AssociatedRecord[];
  flightOffers: FlightOffer[];
  travelers?: Traveler[];
  remarks?: Remarks;
  formOfPayments?: FormOfPayment[];
  ticketingAgreement?: TicketingAgreement;
  automatedProcess?: AutomatedProcess[];
  contacts?: Contact[];
  tickets?: AirTravelDocument[];
  formOfIdentifications?: FormOfIdentification[];
}

export interface FormOfIdentification {
  identificationType?:
    | "DRIVERS_LICENSE"
    | "PASSPORT"
    | "NATIONAL_IDENTITY_CARD"
    | "BOOKING_CONFIRMATION"
    | "TICKET"
    | "OTHER_ID";
  carrierCode?: string;
  number?: string;
  travelerIds?: string[];
  flightOfferIds?: string[];
}

export interface AutomatedProcessCommon {
  code?: AutomatedProcessCode;
  queue?: {
    number?: string;
    category?: string;
  };
  text?: string;
}

export type AutomatedProcess = AutomatedProcessCommon & {
  delay?: string;
  officeId?: string;
  dateTime?: string;
};

export type AutomatedProcessCode = "IMMEDIATE" | "DELAYED" | "ERROR";

export interface FormOfPayment {
  b2bWallet?: B2BWallet;
  creditCard?: CreditCard;
  other?: OtherMethod;
}

export interface B2BWallet {
  cardId?: string;
  cardUsageName?: string;
  cardFriendlyName?: string;
  reportingData?: {
    name?: string;
    value?: string;
  }[];
  virtualCreditCardDetails?: VirtualCreditCardDetails;
  flightOfferIds?: string[];
}

export type VirtualCreditCardDetails = CreditCardCommon & ElementaryPrice;

export type CreditCard = CreditCardCommon & {
  securityCode?: string;
  flightOfferIds?: string[];
};

export interface CreditCardCommon {
  brand?: CreditCardBrand;
  holder?: string;
  number?: string;
  expiryDate?: string;
}

export type CreditCardBrand =
  | "VISA"
  | "AMERICAN_EXPRESS"
  | "MASTERCARD"
  | "VISA_ELECTRON"
  | "VISA_DEBIT"
  | "MASTERCARD_DEBIT"
  | "MAESTRO"
  | "DINERS"
  | "EASYPAY";

export interface OtherMethod {
  method?: OtherPaymentMethod;
  flightOfferIds?: string[];
}

export type OtherPaymentMethod = "ACCOUNT" | "CHECK" | "CASH" | "NONREFUNDABLE";

export type AirTravelDocument = AirTravelDocumentCommon & {
  travelerId?: string;
  segmentIds?: string[];
};

export interface AirTravelDocumentCommon {
  documentType?: "ETICKET" | "PTICKET" | "EMD" | "MCO";
  documentNumber?: string;
  documentStatus?: "ISSUED" | "REFUNDED" | "VOID" | "ORIGINAL" | "EXCHANGED";
}

export type FlightOrdersParams = {
  data: FlightOrder;
};

export type FlightOrdersResult = {
  meta: CollectionMetaLink;
  warnings?: Issue[];
  data: FlightOrder;
  dictionaries: Dictionaries;
};

export type FlightOrdersReturnType = ReturnedResponseSuccess<
  FlightOrdersResult,
  FlightOrdersResult["data"]
>;
