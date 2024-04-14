import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PerformancesTypeORM } from './performances.entity';
import { PerformanceStagingDate } from 'src/domain/reservation/model/performance-staging-date.entity';

@Entity('performance_staging_date')
export class PerformanceStagingDateTypeORM implements PerformanceStagingDate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  performanceId: string;

  @ManyToOne(() => PerformancesTypeORM)
  @JoinColumn({ name: 'performance_id' })
  performance: PerformancesTypeORM;

  @Column({ type: 'timestamp', nullable: false })
  stagingDate: Date;
}
