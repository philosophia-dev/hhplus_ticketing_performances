import { CashBalance } from 'src/domain/payment/model/cash-balance.model';

export type UserCashBalance = Pick<CashBalance, 'userId' | 'balance'>;
