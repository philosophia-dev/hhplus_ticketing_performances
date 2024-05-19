import { Inject, Injectable } from '@nestjs/common';
import {
  DataAccessor,
  TOKEN as DATA_ACCESSOR_TOKEN,
} from 'src/domain/base/data-accessor.interface';
import { UseCase } from 'src/application/base/use-case.interface';
import {
  CashBalanceRepository,
  REPOSITORY_TOKEN as CASH_BALANCE_REPOSITORY_TOKEN,
} from 'src/domain/payment/repositories/cash-balance.repository';
import { CashBalance } from 'src/domain/payment/model/cash-balance.model';
import {
  PaymentHistoryRepository,
  REPOSITORY_TOKEN as PAYMENT_HISTORY_REPOSITORY_TOKEN,
} from 'src/domain/payment/repositories/payment-history.repository';
import { PaymentHistory } from 'src/domain/payment/model/payment-history.model';
import {
  REPOSITORY_TOKEN as USERS_REPOSITORY_TOKEN,
  UsersRepository,
} from 'src/domain/auth/repositories/users.repository';
import { User } from 'src/domain/auth/model/user.model';
import { UserPaymentHistory } from '../types/user-payment-history';

@Injectable()
export class GetPaymentHistoryUseCase implements UseCase<UserPaymentHistory[]> {
  constructor(
    @Inject(USERS_REPOSITORY_TOKEN)
    private usersRepository: UsersRepository<User>,
    @Inject(CASH_BALANCE_REPOSITORY_TOKEN)
    private cashBalanceRepository: CashBalanceRepository<CashBalance>,
    @Inject(PAYMENT_HISTORY_REPOSITORY_TOKEN)
    private paymentHistoryRepository: PaymentHistoryRepository<PaymentHistory>,
    @Inject(DATA_ACCESSOR_TOKEN)
    private dataAccessor: DataAccessor,
  ) {}

  async execute(userId: string): Promise<UserPaymentHistory[]> {
    let queryRunner = null;

    try {
      queryRunner = await this.dataAccessor.connect();

      const cashBalance = await this.cashBalanceRepository.findOne(
        queryRunner,
        {
          userId,
        },
      );

      const paymentHistory = await this.paymentHistoryRepository.findAll(
        queryRunner,
        [
          {
            cashBalanceId: cashBalance.id,
          },
        ],
        {
          dateCreated: 'asc',
        },
      );

      return paymentHistory.map((x: PaymentHistory) => ({
        dateCreated: x.dateCreated,
        amount: x.amount,
        cause: x.cause,
        performanceSeatId: x.performanceSeatId,
      }));
    } catch (error) {
      throw error;
    } finally {
      await this.dataAccessor.releaseQueryRunner(queryRunner);
    }
  }
}
