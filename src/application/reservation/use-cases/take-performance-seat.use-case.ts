import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from 'src/application/base/use-case.interface';
import {
  REPOSITORY_TOKEN as STAGE_REPOSITORY_TOKEN,
  StageRepository,
} from 'src/domain/reservation/repositories/stage.repository';
import { Stage } from 'src/domain/reservation/model/stage.model';
import {
  REPOSITORY_TOKEN as PERFORMANCES_REPOSITORY_TOKEN,
  PerformancesRepository,
} from 'src/domain/reservation/repositories/performances.repository';
import { Performance } from 'src/domain/reservation/model/performance.model';
import {
  REPOSITORY_TOKEN as PERFORMANCE_STAGING_DATE_REPOSITORY_TOKEN,
  PerformanceStagingDateRepository,
} from 'src/domain/reservation/repositories/performance-staging-date.repository';
import {
  REPOSITORY_TOKEN as PERFORMANCE_SEATS_REPOSITORY_TOKEN,
  PerformanceSeatsRepository,
} from 'src/domain/reservation/repositories/performance-seats.repository';
import { PerformanceStagingDate } from 'src/domain/reservation/model/performance-staging-date.model';
import {
  PerformanceSeat,
  ReservationStatus,
} from 'src/domain/reservation/model/performance-seat.model';
import {
  DataAccessor,
  TOKEN as DATA_ACCESSOR_TOKEN,
} from 'src/domain/base/data-accessor.interface';
import {
  REPOSITORY_TOKEN as USERS_REPOSITORY_TOKEN,
  UsersRepository,
} from 'src/domain/auth/repositories/users.repository';
import { User } from 'src/domain/auth/model/user.model';
import { SeatAlreadyTakenError, SeatNotFoundError } from '../exceptions';
import { ResultTakePerformanceSeat } from '../types';

@Injectable()
export class TakePerformanceSeatUseCase
  implements UseCase<ResultTakePerformanceSeat>
{
  constructor(
    @Inject(USERS_REPOSITORY_TOKEN)
    private usersRepository: UsersRepository<User>,
    @Inject(STAGE_REPOSITORY_TOKEN)
    private stageRepository: StageRepository<Stage>,
    @Inject(PERFORMANCES_REPOSITORY_TOKEN)
    private performancesRepository: PerformancesRepository<Performance>,
    @Inject(PERFORMANCE_STAGING_DATE_REPOSITORY_TOKEN)
    private performanceStagingDateRepository: PerformanceStagingDateRepository<PerformanceStagingDate>,
    @Inject(PERFORMANCE_SEATS_REPOSITORY_TOKEN)
    private performanceSeatsRepository: PerformanceSeatsRepository<PerformanceSeat>,
    @Inject(DATA_ACCESSOR_TOKEN)
    private dataAccessor: DataAccessor,
  ) {}

  async execute(
    userId: string,
    performanceSeatIds: string[],
  ): Promise<ResultTakePerformanceSeat> {
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

      for (const seat of performanceSeats) {
        if (
          (seat.reservationStatus === ReservationStatus.RESERVED ||
            seat.reservationStatus === ReservationStatus.TEMPORARY_RESERVED) &&
          seat.reservedUserId.length > 0
        ) {
          throw new SeatAlreadyTakenError();
        }
      }

      const updatedPerformanceSeats =
        await this.performanceSeatsRepository.updateMany(
          queryRunner,
          performanceSeatIds,
          {
            reservationStatus: ReservationStatus.TEMPORARY_RESERVED,
            reservedUserId: userId,
          },
        );

      await this.dataAccessor.commitTransaction(queryRunner);

      return {
        result: 'success',
        seats: updatedPerformanceSeats.map((seat) => ({
          id: seat.id,
          seatNumber: seat.seatNumber,
          price: seat.price,
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
