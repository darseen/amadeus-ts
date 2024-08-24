import { ReturnedResponseSuccess } from "../../../../client/response";

type TransferCancellation = {
  confirmNbr?: string;
  reservationStatus?: "CANCELLED" | "CONFIRMED";
};

export type OrderingTransferCancellationResult = {
  data: TransferCancellation;
};

export type OrderingTransferCancellationReturnedResponse =
  ReturnedResponseSuccess<
    OrderingTransferCancellationResult,
    OrderingTransferCancellationResult["data"]
  >;
