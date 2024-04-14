import { PerformanceSeat } from 'src/domain/reservation/model/performance-seat.entity';
import { CashBalance } from './cash-balance.entity';

export interface PaymentHistory {
  id: string;
  dateCreated: Date;
  cashBalanceId: string;
  cashBalance?: CashBalance;
  amount: number;
  cause: string;
  performanceSeatId: string;
  performanceSeat?: PerformanceSeat;
}
