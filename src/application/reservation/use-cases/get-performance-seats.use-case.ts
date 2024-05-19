import { Inject, Injectable } from '@nestjs/common';
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
import { UseCase } from 'src/application/base/use-case.interface';
import {
  PerformanceNotFoundError,
  PerformanceScheduleNotFoundError,
  SoldOutAllSeatsError,
  TicketingNotStartError,
} from '../exceptions';
import { PerformanceSeatsAndReserveableSeatsCount } from '../types';

@Injectable()
export class GetPerformanceSeatsUseCase
  implements UseCase<PerformanceSeatsAndReserveableSeatsCount>
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
    performanceStagingDateId: string,
  ): Promise<PerformanceSeatsAndReserveableSeatsCount> {
    let queryRunner = null;

    try {
      queryRunner = await this.dataAccessor.connect();

      let result: PerformanceSeatsAndReserveableSeatsCount = {
        seats: [],
        reserveableSeatsCount: 0,
      };

      let stagingDate = await this.performanceStagingDateRepository.findOne(
        queryRunner,
        {
          id: performanceStagingDateId,
        },
      );
      if (!stagingDate) {
        throw new PerformanceScheduleNotFoundError();
      }

      let performance = await this.performancesRepository.findOne(queryRunner, {
        id: stagingDate.performanceId,
      });
      if (performance.ticketingStartDate > new Date()) {
        throw new TicketingNotStartError();
      }

      let reserveableSeatsCount = await this.performanceSeatsRepository.count(
        queryRunner,
        {
          performanceStagingDateId: stagingDate.id,
          reservationStatus: ReservationStatus.AVAILABLE,
        },
      );

      // 서버는 단순하게 좌석 정보만 반환
      // if (reserveableSeatsCount === 0) {
      //   throw new SoldOutAllSeatsError();
      // }
      result.reserveableSeatsCount = reserveableSeatsCount;

      let performanceSeatList = await this.performanceSeatsRepository.findAll(
        queryRunner,
        [{ performanceStagingDateId }],
      );

      for (const performanceSeat of performanceSeatList) {
        const { id, seatNumber, price, reservationStatus } = performanceSeat;
        let seat = {
          id,
          seatNumber,
          price,
          reservationStatus,
        };
        result.seats.push(seat);
      }

      return result;
    } catch (error) {
      throw error;
    } finally {
      await this.dataAccessor.releaseQueryRunner(queryRunner);
    }
  }
}
