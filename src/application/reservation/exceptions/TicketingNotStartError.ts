export class TicketingNotStartError extends Error {
  constructor(msg?: string) {
    const message = msg ?? "Ticketing hasn't started yet";
    super(message);
    this.message = message;
    Object.setPrototypeOf(this, TicketingNotStartError.prototype);
  }
}
