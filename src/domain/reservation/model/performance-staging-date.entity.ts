import { Performances } from './performances.entity';

export class PerformanceStagingDate {
  id: string;
  performanceId: string;
  performance?: Performances;
  stagingDate: Date;
}
