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
import { JwtService } from '@nestjs/jwt';
import { PerformanceInfo } from '../types';

export class GetPerformanceUseCase implements UseCase<PerformanceInfo[]> {
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
    private readonly jwtService: JwtService,
  ) {}

  async execute(): Promise<PerformanceInfo[]> {
    let queryRunner = null;

    try {
      queryRunner = await this.dataAccessor.connect();

      let results: PerformanceInfo[] = [];

      let performanceList =
        await this.performancesRepository.findAll(queryRunner);

      for (const performance of performanceList) {
        const { id, title, ticketingStartDate, stageId } = performance;
        let stage = await this.stageRepository.findOne(queryRunner, {
          id: stageId,
        });
        let stagingDateList =
          await this.performanceStagingDateRepository.findAll(queryRunner, [
            {
              performanceId: id,
            },
          ]);
        let stagingDateAndSeatsCountList = [];
        for (const stagingDate of stagingDateList) {
          let reserveableSeatsCount =
            await this.performanceSeatsRepository.count(queryRunner, {
              performanceStagingDateId: stagingDate.id,
              reservationStatus: ReservationStatus.AVAILABLE,
            });

          let stagingDateAndSeatsCount = {
            id: stagingDate.id,
            stagingDate: stagingDate.stagingDate,
            reserveableSeatsCount,
          };

          stagingDateAndSeatsCountList.push(stagingDateAndSeatsCount);
        }
        let result = {
          id,
          title,
          ticketingStartDate,
          stage: {
            id: stage.id,
            name: stage.name,
            location: stage.location,
          },
          performanceStagingDate: stagingDateAndSeatsCountList,
        };

        results.push(result);
      }

      return results;
    } catch (error) {
      throw error;
    } finally {
      await this.dataAccessor.releaseQueryRunner(queryRunner);
    }
  }
}
