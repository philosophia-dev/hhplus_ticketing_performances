export class PerformanceNotFoundError extends Error {
  constructor(msg?: string) {
    const message = msg ?? 'Seat not found';
    super(message);
    this.message = message;
    Object.setPrototypeOf(this, PerformanceNotFoundError.prototype);
  }
}
