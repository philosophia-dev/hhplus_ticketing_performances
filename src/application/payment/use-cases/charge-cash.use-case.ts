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
import { ResultChargeCash } from '../types';
import { randomUUID } from 'crypto';

@Injectable()
export class ChargeCashUseCase implements UseCase<ResultChargeCash> {
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

  async execute(
    userId: string,
    chargeAmount: number,
  ): Promise<ResultChargeCash> {
    let queryRunner = null;

    try {
      queryRunner = await this.dataAccessor.connect();
      await this.dataAccessor.startTransaction(queryRunner, 'REPEATABLE READ');

      const currentCash = await this.cashBalanceRepository.findOne(
        queryRunner,
        { userId },
      );

      const updatedCash = await this.cashBalanceRepository.updateOne(
        queryRunner,
        currentCash.id,
        { balance: currentCash.balance + chargeAmount },
      );

      const createPaymentHistory = await this.paymentHistoryRepository.create(
        queryRunner,
        {
          id: randomUUID() as string,
          dateCreated: new Date(),
          cashBalanceId: currentCash.id,
          performanceSeatId: null,
          amount: chargeAmount,
          cause: 'CHARGE',
        },
      );

      await this.dataAccessor.commitTransaction(queryRunner);

      return {
        result: 'success',
        userId: updatedCash.userId,
        balance: updatedCash.balance,
      };
    } catch (error) {
      await this.dataAccessor.rollbackTransaction(queryRunner);
      throw error;
    } finally {
      await this.dataAccessor.releaseQueryRunner(queryRunner);
    }
  }
}
