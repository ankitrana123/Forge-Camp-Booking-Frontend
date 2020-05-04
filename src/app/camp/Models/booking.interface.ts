export interface IBooking {
  capacity: number;
  checkInDate: Date;
  checkOutDate: Date;
  country: string;
  zipcode: number;
  phone: number;
  billingAddress: string;
  state: string;
  amount: number;
  campId: string;
  userId: string;
  referenceNumber: string;
}
