import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StageTypeORM } from './stage.entity';
import { Performances } from 'src/domain/reservation/model/performances.entity';

@Entity('performances')
export class PerformancesTypeORM implements Performances {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp', nullable: false })
  dateCreated: Date;

  @Column({ type: 'varchar', length: 256, nullable: true })
  title: string;

  @Column({ type: 'uuid', nullable: true })
  stageId: string;

  @ManyToOne(() => StageTypeORM)
  @JoinColumn({ name: 'stage_id' })
  stage: StageTypeORM;

  @Column({ type: 'timestamp', nullable: false })
  ticketingStartDate: Date;
}
