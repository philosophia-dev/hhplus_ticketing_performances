import { PerformanceSeats } from 'src/domain/reservation/model/performance-seats.entity';
import { CashBalance } from './cash-balance.entity';

export interface PaymentHistory {
  id: string;
  dateCreated: Date;
  cashBalanceId: string;
  cashBalance?: CashBalance;
  amount: number;
  cause: string;
  performanceSeatId: string;
  performanceSeat?: PerformanceSeats;
}
