import { Performances } from './performances.entity';

export interface PerformanceStagingDate {
  id: string;
  performanceId: string;
  performance?: Performances;
  stagingDate: Date;
}
