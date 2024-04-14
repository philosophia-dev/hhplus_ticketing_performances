export class PasswordDontMatchError extends Error {
  constructor(msg?: string) {
    const message = msg ?? "The passwords don't match";
    super(message);
    this.message = message;
    Object.setPrototypeOf(this, PasswordDontMatchError.prototype);
  }
}
