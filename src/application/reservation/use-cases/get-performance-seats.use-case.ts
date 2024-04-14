import { Inject, Injectable } from '@nestjs/common';
import {
  REPOSITORY_TOKEN as STAGE_REPOSITORY_TOKEN,
  StageRepository,
} from 'src/domain/reservation/repositories/stage.repository';
import { Stage } from 'src/domain/reservation/model/stage.entity';
import {
  REPOSITORY_TOKEN as PERFORMANCES_REPOSITORY_TOKEN,
  PerformancesRepository,
} from 'src/domain/reservation/repositories/performances.repository';
import { Performance } from 'src/domain/reservation/model/performance.entity';
import {
  REPOSITORY_TOKEN as PERFORMANCE_STAGING_DATE_REPOSITORY_TOKEN,
  PerformanceStagingDateRepository,
} from 'src/domain/reservation/repositories/performance-staging-date.repository';
import {
  REPOSITORY_TOKEN as PERFORMANCE_SEATS_REPOSITORY_TOKEN,
  PerformanceSeatsRepository,
} from 'src/domain/reservation/repositories/performance-seats.repository';
import { PerformanceStagingDate } from 'src/domain/reservation/model/performance-staging-date.entity';
import { PerformanceSeat } from 'src/domain/reservation/model/performance-seat.entity';
import {
  DataAccessor,
  TOKEN as DATA_ACCESSOR_TOKEN,
} from 'src/domain/base/data-accessor.interface';
import {
  REPOSITORY_TOKEN as USERS_REPOSITORY_TOKEN,
  UsersRepository,
} from 'src/domain/auth/repositories/users.repository';
import { User } from 'src/domain/auth/model/user.entity';
import { UseCase } from 'src/application/base/use-case.interface';

@Injectable()
export class GetPerformanceSeatsUseCase implements UseCase<PerformanceSeat> {
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

  async execute(): Promise<PerformanceSeat> {
    return this.performanceSeatsRepository.findAll();
  }
}
