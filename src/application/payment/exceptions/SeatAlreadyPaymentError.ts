export class SeatAlreadyPaymentError extends Error {
  constructor(msg?: string) {
    const message = msg ?? 'The seat has already been Payment';
    super(message);
    this.message = message;
    Object.setPrototypeOf(this, SeatAlreadyPaymentError.prototype);
  }
}
