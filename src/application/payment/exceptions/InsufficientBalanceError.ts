export class InsufficientBalanceError extends Error {
  constructor(msg?: string) {
    const message = msg ?? 'Insufficient balance';
    super(message);
    this.message = message;
    Object.setPrototypeOf(this, InsufficientBalanceError.prototype);
  }
}
