import { PerformanceSeat } from 'src/domain/reservation/model/performance-seat.model';
import { PerformanceStagingDate } from 'src/domain/reservation/model/performance-staging-date.model';
import { Performance } from 'src/domain/reservation/model/performance.model';
import { Stage } from 'src/domain/reservation/model/stage.model';
import { PerformanceStagingDateInfo } from './performance-staging-date-info';
import { PerformanceSeatInfo } from './performance-seat-info';

export type PerformanceStagingWithReserveableSeatsCount =
  PerformanceStagingDateInfo & {
    reserveableSeatsCount: number;
  };

export type PerformanceInfo = Pick<
  Performance,
  'id' | 'title' | 'ticketingStartDate'
> & {
  stage: Omit<Stage, 'dateCreated'>;
  performanceStagingDate: PerformanceStagingWithReserveableSeatsCount[];
};
