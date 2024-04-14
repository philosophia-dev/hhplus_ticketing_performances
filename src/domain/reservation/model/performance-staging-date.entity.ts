import { Performance } from './performance.entity';

export interface PerformanceStagingDate {
  id: string;
  performanceId: string;
  performance?: Performance;
  stagingDate: Date;
}
