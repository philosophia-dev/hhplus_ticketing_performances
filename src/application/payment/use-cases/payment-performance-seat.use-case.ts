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
  REPOSITORY_TOKEN as PERFORMANCE_SEATS_REPOSITORY_TOKEN,
  PerformanceSeatsRepository,
} from 'src/domain/reservation/repositories/performance-seats.repository';
import {
  PerformanceSeat,
  ReservationStatus,
} from 'src/domain/reservation/model/performance-seat.model';
import {
  REPOSITORY_TOKEN as USERS_REPOSITORY_TOKEN,
  UsersRepository,
} from 'src/domain/auth/repositories/users.repository';
import { User } from 'src/domain/auth/model/user.model';
import { ResultPaymentPerformanceSeat } from '../types/result-payment-performance-seat';
import { SeatNotFoundError } from 'src/application/reservation/exceptions';
import {
  InsufficientBalanceError,
  SeatAlreadyPaymentError,
  SeatNotTakenByUserError,
} from '../exceptions';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';
import { randomUUID } from 'crypto';

@Injectable()
export class PaymentPerformanceSeatUseCase
  implements UseCase<ResultPaymentPerformanceSeat>
{
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

  async execute(
    userId: string,
    performanceSeatIds: string[],
  ): Promise<ResultPaymentPerformanceSeat> {
    let queryRunner = null;

    try {
      queryRunner = await this.dataAccessor.connect();
      await this.dataAccessor.startTransaction(queryRunner, 'REPEATABLE READ');

      let performanceSeats = await this.performanceSeatsRepository.findAll(
        queryRunner,
        performanceSeatIds.map((id) => ({
          id,
        })),
        undefined,
        { mode: 'pessimistic_read' },
      );

      if (performanceSeats.length !== performanceSeatIds.length) {
        throw new SeatNotFoundError();
      }

      let requiredAmount = 0;

      for (const seat of performanceSeats) {
        requiredAmount += seat.price;

        if (seat.reservedUserId !== userId) {
          throw new SeatNotTakenByUserError();
        }

        if (seat.reservationStatus === ReservationStatus.RESERVED) {
          throw new SeatAlreadyPaymentError();
        }
      }

      const currentCash = await this.cashBalanceRepository.findOne(
        queryRunner,
        {
          userId,
        },
      );

      if (currentCash.balance < requiredAmount) {
        throw new InsufficientBalanceError();
      }

      const updatedCash = await this.cashBalanceRepository.updateOne(
        queryRunner,
        currentCash.id,
        { balance: currentCash.balance - requiredAmount },
      );

      for (const seat of performanceSeats) {
        const createPaymentHistory = await this.paymentHistoryRepository.create(
          queryRunner,
          {
            id: randomUUID() as string,
            dateCreated: new Date(),
            cashBalanceId: currentCash.id,
            performanceSeatId: seat.id,
            amount: seat.price,
            cause: 'PAYMENT_SEAT',
          },
        );
      }

      const updatedPerformanceSeats =
        await this.performanceSeatsRepository.updateMany(
          queryRunner,
          performanceSeatIds,
          {
            reservationStatus: ReservationStatus.RESERVED,
          },
        );

      await this.dataAccessor.commitTransaction(queryRunner);

      return {
        result: 'success',
        seats: updatedPerformanceSeats.map((seat) => ({
          id: seat.id,
          seatNumber: seat.seatNumber,
          price: -seat.price,
          reservationStatus: seat.reservationStatus,
          reservedUserId: seat.reservedUserId,
        })),
      };
    } catch (error) {
      await this.dataAccessor.rollbackTransaction(queryRunner);
      throw error;
    } finally {
      await this.dataAccessor.releaseQueryRunner(queryRunner);
    }
  }
}
