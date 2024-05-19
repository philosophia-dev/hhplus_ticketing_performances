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
import {
  PerformanceStagingWithSeats,
  ReservedPerformanceSeats,
} from '../types';

@Injectable()
export class GetReservedPerformanceSeatsUseCase
  implements UseCase<ReservedPerformanceSeats[]>
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

  async execute(userId: string): Promise<ReservedPerformanceSeats[]> {
    let queryRunner = null;

    try {
      queryRunner = await this.dataAccessor.connect();

      let reservedPerformanceSeatList =
        await this.performanceSeatsRepository.findAll(queryRunner, [
          {
            reservationStatus: ReservationStatus.RESERVED,
            reservedUserId: userId,
          },
        ]);

      let temporaryReservedPerformanceSeatList =
        await this.performanceSeatsRepository.findAll(queryRunner, [
          {
            reservationStatus: ReservationStatus.TEMPORARY_RESERVED,
            reservedUserId: userId,
          },
        ]);

      let performanceSeatList = [
        ...reservedPerformanceSeatList,
        ...temporaryReservedPerformanceSeatList,
      ];

      let performanceStagingDateResult: Record<
        string,
        PerformanceStagingWithSeats
      >;
      let performanceResult: Record<string, ReservedPerformanceSeats>;
      let results: ReservedPerformanceSeats[];

      for (const performanceSeat of performanceSeatList) {
        const {
          id,
          seatNumber,
          price,
          reservationStatus,
          performanceStagingDateId,
        } = performanceSeat;

        if (performanceStagingDateId in performanceStagingDateResult) {
          performanceStagingDateResult[performanceStagingDateId].seats.push({
            id,
            seatNumber,
            price,
            reservationStatus,
          });
        } else {
          const performanceStagingDate =
            await this.performanceStagingDateRepository.findOne(queryRunner, {
              id: performanceStagingDateId,
            });

          performanceStagingDateResult[performanceStagingDateId] = {
            id: performanceStagingDateId,
            performanceId: performanceStagingDate.performanceId,
            stagingDate: performanceStagingDate.stagingDate,
            seats: [
              {
                id,
                seatNumber,
                price,
                reservationStatus,
              },
            ],
          };
        }
      }

      for (const performanceStagingDateId in performanceStagingDateResult) {
        const performanceStagingDate =
          performanceStagingDateResult[performanceStagingDateId];
        const { performanceId } = performanceStagingDate;
        if (performanceResult[performanceId]) {
          performanceResult[performanceId].performanceStagingDate.push(
            performanceStagingDate,
          );
        } else {
          const performance = await this.performancesRepository.findOne(
            queryRunner,
            {
              id: performanceId,
            },
          );

          const stage = await this.stageRepository.findOne(queryRunner, {
            id: performance.stageId,
          });

          performanceResult[performanceId] = {
            id: performanceId,
            title: performance.title,
            ticketingStartDate: performance.ticketingStartDate,
            stage: {
              id: stage.id,
              name: stage.name,
              location: stage.location,
            },
            performanceStagingDate: [performanceStagingDate],
          };
        }
      }

      results = Object.values(performanceResult);
      return results;
    } catch (error) {
      throw error;
    } finally {
      await this.dataAccessor.releaseQueryRunner(queryRunner);
    }
  }
}
