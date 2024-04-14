export class SeatNotTakenByUserError extends Error {
  constructor(msg?: string) {
    const message = msg ?? 'The seat is not taken by that user';
    super(message);
    this.message = message;
    Object.setPrototypeOf(this, SeatNotTakenByUserError.prototype);
  }
}
