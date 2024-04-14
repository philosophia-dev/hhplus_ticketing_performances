export class SeatAlreadyTakenError extends Error {
  constructor(msg?: string) {
    const message = msg ?? 'The seat has already been taken';
    super(message);
    this.message = message;
    Object.setPrototypeOf(this, SeatAlreadyTakenError.prototype);
  }
}
