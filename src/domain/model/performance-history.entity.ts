import { CashBalance } from './cash-balance.entity';
import { PerformanceSeats } from './performance-seats.entity';

export class PaymentHistory {
  id: string;
  dateCreated: Date;
  cashBalanceId: string;
  cashBalance?: CashBalance;
  amount: number;
  cause: string;
  performanceSeatId: string;
  performanceSeat?: PerformanceSeats;
}
