type Guest = {
  id: number;
  name: {
    title: string;
    firstName: string;
    lastName: string;
  };
  contact: {
    phone: string;
    email: string;
  };
};

type Payment = {
  id: number;
  method: string;
  card: {
    vendorCode: string;
    cardNumber: string;
    expiryDate: string;
  };
};

export type HotelBookingParams = {
  data: {
    offerId: string;
    guests: Guest[];
    payments: Payment[];
  };
};
