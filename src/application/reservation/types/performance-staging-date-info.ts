import { PerformanceStagingDate } from 'src/domain/reservation/model/performance-staging-date.model';

export type PerformanceStagingDateInfo = Pick<
  PerformanceStagingDate,
  'id' | 'performanceId' | 'stagingDate'
>;
