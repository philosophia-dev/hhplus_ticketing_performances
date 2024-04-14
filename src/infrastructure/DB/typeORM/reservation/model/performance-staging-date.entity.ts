import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PerformanceTypeORM } from './performance.entity';
import { PerformanceStagingDate } from 'src/domain/reservation/model/performance-staging-date.entity';

@Entity('performance_staging_date')
export class PerformanceStagingDateTypeORM implements PerformanceStagingDate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  performanceId: string;

  @ManyToOne(() => PerformanceTypeORM)
  @JoinColumn({ name: 'performance_id' })
  performance: PerformanceTypeORM;

  @Column({ type: 'timestamp', nullable: false })
  stagingDate: Date;
}
