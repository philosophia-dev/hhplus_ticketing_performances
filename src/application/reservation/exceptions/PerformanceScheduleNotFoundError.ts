export class PerformanceScheduleNotFoundError extends Error {
  constructor(msg?: string) {
    const message = msg ?? 'Performance schedule not found';
    super(message);
    this.message = message;
    Object.setPrototypeOf(this, PerformanceScheduleNotFoundError.prototype);
  }
}
