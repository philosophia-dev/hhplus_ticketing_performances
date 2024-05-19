export class UnauthorizedError extends Error {
  constructor(msg?: string) {
    const message = msg ?? 'Invalid credentials';
    super(message);
    this.message = message;
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}
