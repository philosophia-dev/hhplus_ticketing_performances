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
import { CashBalance } from 'src/domain/payment/model/cash-balance.entity';
import {
  PaymentHistoryRepository,
  REPOSITORY_TOKEN as PAYMENT_HISTORY_REPOSITORY_TOKEN,
} from 'src/domain/payment/repositories/payment-history.repository';
import { PaymentHistory } from 'src/domain/payment/model/payment-history.entity';
import {
  REPOSITORY_TOKEN as PERFORMANCE_SEATS_REPOSITORY_TOKEN,
  PerformanceSeatsRepository,
} from 'src/domain/reservation/repositories/performance-seats.repository';
import { PerformanceSeat } from 'src/domain/reservation/model/performance-seat.entity';
import {
  REPOSITORY_TOKEN as USERS_REPOSITORY_TOKEN,
  UsersRepository,
} from 'src/domain/auth/repositories/users.repository';
import { User } from 'src/domain/auth/model/user.entity';

@Injectable()
export class PaymentPerformanceSeatUseCase implements UseCase<PaymentHistory> {
  constructor(
    @Inject(USERS_REPOSITORY_TOKEN)
    private usersRepository: UsersRepository<User>,
    @Inject(CASH_BALANCE_REPOSITORY_TOKEN)
    private cashBalanceRepository: CashBalanceRepository<CashBalance>,
    @Inject(PAYMENT_HISTORY_REPOSITORY_TOKEN)
    private paymentHistoryRepository: PaymentHistoryRepository<PaymentHistory>,
    @Inject(PERFORMANCE_SEATS_REPOSITORY_TOKEN)
    private performanceSeatsRepository: PerformanceSeatsRepository<PerformanceSeat>,
    @Inject(DATA_ACCESSOR_TOKEN)
    private dataAccessor: DataAccessor,
  ) {}

  async execute(): Promise<PaymentHistory> {
    return this.paymentHistoryRepository.findAll();
  }
}
