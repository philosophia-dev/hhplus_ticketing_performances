import { Performance } from './performance.model';

export interface PerformanceStagingDate {
  id: string;
  performanceId: string;
  performance?: Performance;
  stagingDate: Date;
}
