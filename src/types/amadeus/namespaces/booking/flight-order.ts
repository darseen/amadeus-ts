import { ReturnedResponseSuccess } from "../../client/response";
import {
  AssociatedRecord,
  CollectionMetaLink,
  Contact,
  Dictionaries,
  FlightOffer,
  Remarks,
  TicketingAgreement,
  Traveler,
} from "../shared";

export type FlightOrderGetResult = {
  meta: CollectionMetaLink;
  data: {
    type: "flight-order";
    id: string;
    queuingOfficeId: string;
    associatedRecords: AssociatedRecord;
    flightOffers: FlightOffer[];
    travelers: Traveler[];
    remarks: Remarks;
    ticketingAgreement: TicketingAgreement;
    contacts: Contact;
  };
  dictionaries: Dictionaries;
};

export type FlightOrderGetReturenedResponse = ReturnedResponseSuccess<
  FlightOrderGetResult,
  FlightOrderGetResult["data"]
>;
