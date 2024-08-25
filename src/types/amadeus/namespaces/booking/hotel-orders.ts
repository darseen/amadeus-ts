import { ReturnedResponseSuccess } from "../../client/response";

import {
  HotelProductDepositPolicy,
  HotelProductPaymentPolicy,
  QualifiedFreeText,
} from "../shared";

type Guest = {
  frequentTraveler?: {
    airlineCode: string;
    frequentTravelerId: string;
  }[];
  phone?: string;
  email?: string;
  title?: string;
  firstName?: string;
  lastName?: string;
  childAge?: number;
};

type HotelOrder = {
  hotelBookings: HotelBooking[];
  associatedRecords: {
    reference: string;
    originSystemCode: string;
  }[];
  self: string;
  type: string;
  guests: Guests;
  id: string;
};

type HotelBooking = {
  type: string;
  id: string;
  bookingStatus?:
    | "CONFIRMED"
    | "PENDING"
    | "CANCELLED"
    | "ON_HOLD"
    | "PAST"
    | "UNCONFIRMED"
    | "DENIED"
    | "GHOST"
    | "DELETED";
  roomAssociations: RoomAssociation[];
  hotelOffer: HotelOffer;
  hotel: {
    hotelId: string;
    chainCode: string;
    name: string;
    self?: string;
  };
  hotelProviderInformation: {
    hotelProviderCode: string;
    confirmationNumber: string;
    cancellationNumber?: string;
    onRequestNumber?: string;
  }[];
  payment?: PaymentOutput;
  travelAgentId: string;
  arrivalInformation?: {
    arrivalFlightDetails?: ArrivalFlightDetails;
  };
};

type RoomAssociation = {
  guestReferences: {
    guestReference: string;
    hotelLoyaltyId?: string;
  }[];
  specialRequest?: string;
  hotelOfferId: string;
};

type PaymentOutput = {
  iataTravelAgency?: {
    iataNumber: string;
  };
  billBack?: {
    travelAgencyId?: string;
    bookerId?: string;
    paymentInstructions?: string;
    billbackProviderDeploymentId: string;
    billbackProviderCode: string;
    billbackProviderAccountNumber: string;
    hotelSupplierInformation?: HotelContact;
  };
  method:
    | "CREDIT_CARD"
    | "CREDIT_CARD_AGENCY"
    | "CREDIT_CARD_TRAVELER"
    | "AGENCY_ACCOUNT"
    | "VCC_BILLBACK"
    | "VCC_B2B_WALLET"
    | "TRAVEL_AGENT_ID";
  b2bWallet?: {
    virtualCreditCardId: string;
    paymentProvider: string;
  };
  paymentCard?: {
    paymentCardInfo: {
      vendorCode: string;
      holderName: string;
      cardNumber: string;
      expiryDate: string;
    };
    cardOwnerType?: "TravelAgency" | "Guest" | "Corporation";
    VCC?: boolean;
    address?: Address;
  };
};

type CreateHotelBooking = {
  arrivalInformation?: {
    arrivalFlightDetails?: ArrivalFlightDetails;
  };
  payment?: PaymentInput;
  roomAssociations?: RoomAssociation[];
  travelAgent: {
    contact: {
      email: string;
      fax?: string;
      phone?: string;
    };
    travelAgentId?: string;
  };
};

type PaymentInput = {
  iataTravelAgency?: {
    iataNumber?: string;
  };
  method: "CREDIT_CARD";
  paymentCard?: {
    paymentCardInfo: {
      vendorCode: string;
      holderName: string;
      cardNumber: string;
      securityCode?: string;
      expiryDate: string;
    };
    address?: Address;
  };
};

type Errors = {
  errors?: {
    status?: number;
    code?: number;
    title?: string;
    detail?: string;
    source?: {
      parameter?: string;
      pointer?: string;
      example?: string;
    };
    documentation?: string;
  }[];
};

type Price = {
  currency?: string;
  sellingTotal?: string;
  total?: string;
  base?: string;
  markups?: {
    amount?: string;
  }[];
};

type ArrivalFlightDetails = {
  carrierCode: string;
  number: string;
  departure: {
    iataCode: string;
  };
  arrival?: {
    iataCode: string;
    terminal: string;
    at: string;
  };
};

type Guests = ({
  tid?: number;
  id: number;
} & Guest)[];

type HotelProductsGuests = {
  adults?: number;
  childAges?: number[];
};

type Address = {
  lines?: string[];
  postalCode: string;
  countryCode: string;
  cityName: string;
  stateCode?: string;
};

type HotelContact = {
  phone?: string;
  fax: string;
  email?: string;
};

type HotelOffer = {
  type?: "hotel-offer";
  id: string;
} & HotelProduct;

type HotelProduct = {
  checkInDate?: string;
  checkOutDate?: string;
  roomQuantity?: number;
  rateCode: string;
  category?: string;
  commission?: {
    percentage?: string;
    amount?: string;
    description?: QualifiedFreeText;
  };
  room: {
    type?: string;
    description?: QualifiedFreeText;
  };
  guests?: HotelProductsGuests;
  price: Price & {
    taxes?: {
      currency?: string;
      amount?: string;
      code?: string;
      percentage?: string;
      included?: boolean;
      description?: string;
      pricingFrequency?: string;
      pricingMode?: string;
    }[];
    variations?: {
      changes?: ({
        startDate: string;
        endDate: string;
      } & Price)[];
    };
  };
  policies?: {
    paymentType?: "GUARANTEE" | "DEPOSIT" | "PREPAY" | "HOLDTIME";
    guarantee?: {
      description?: QualifiedFreeText;
      acceptedPayments?: HotelProductPaymentPolicy;
    };
    deposit?: HotelProductDepositPolicy;
    prepay?: HotelProductDepositPolicy;
    holdTime?: {
      deadline: string;
    };
    checkInOut?: {
      checkIn?: string;
      checkInDescription?: QualifiedFreeText;
      checkOut?: string;
      checkOutDescription?: QualifiedFreeText;
    };
    cancellations?: {
      type?: "FULL_STAY";
      amount?: string;
      numberOfNights?: number;
      percentage?: string;
      deadline?: string;
      description?: QualifiedFreeText;
    }[];
  };
  rateFamilyEstimated?: {
    code?: string;
    type?: string;
  };
};

type Warning = {
  code: number;
  title: string;
  detail?: string;
  source?: {
    parameter?: string;
    pointer?: string;
    example?: string;
  };
  documentation?: string;
  sources?: any[];
  relationships?: {
    collection?: {
      id?: string;
      type?: string;
      ref?: string;
      targetSchema?: string;
      targetMediaType?: string;
      hrefSchema?: string;
      href?: string;
      methods?: ("GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "OPTIONS")[];
      rel?: string;
    }[];
  };
};

export type HotelOrdersParams = {
  data: {
    type: "hotel-order";
    guests: {
      tid: number;
      frequentTraveler?: {
        airlineCode: string;
        frequentTravelerId: string;
      }[];
      phone?: string;
      email?: string;
      title?: string;
      firstName?: string;
      lastName?: string;
      childAge?: number;
    }[];
    arrivalInformation?: {
      arrivalFlightDetails?: ArrivalFlightDetails;
    };
    payment?: PaymentInput;
    roomAssociations?: RoomAssociation[];
    travelAgent: {
      contact: {
        email: string;
        fax?: string;
        phone?: string;
      };
      travelAgentId?: string;
    };
  };
};

export type HotelOrdersResult = {
  data: HotelOrder;
  warnings?: Warning[];
};

export type HotelOrdersReturnedResponse = ReturnedResponseSuccess<
  HotelOrdersResult,
  HotelOrdersResult["data"]
>;
