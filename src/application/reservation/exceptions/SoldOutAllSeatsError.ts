export class SoldOutAllSeatsError extends Error {
  constructor(msg?: string) {
    const message = msg ?? 'All seats have been sold out';
    super(message);
    this.message = message;
    Object.setPrototypeOf(this, SoldOutAllSeatsError.prototype);
  }
}
