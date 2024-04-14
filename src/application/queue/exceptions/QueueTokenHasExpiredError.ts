export class QueueTokenHasExpiredError extends Error {
  constructor(msg?: string) {
    const message = msg ?? 'That queue token has expired';
    super(message);
    this.message = message;
    Object.setPrototypeOf(this, QueueTokenHasExpiredError.prototype);
  }
}
