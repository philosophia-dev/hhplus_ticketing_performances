import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserTypeORM } from './user.entity';
import { PerformanceStagingDateTypeORM } from './performance-staging-date.entity';
import {
  PerformanceSeats,
  ReservationStatus,
} from 'src/domain/model/performance-seats.entity';

@Entity('performance_seats')
export class PerformanceSeatsTypeORM implements PerformanceSeats {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp', nullable: false })
  dateCreated: Date;

  @Column({ type: 'uuid', nullable: false })
  performanceStagingDateId: string;

  @ManyToOne(() => PerformanceStagingDateTypeORM)
  @JoinColumn({ name: 'performance_staging_date_id' })
  performanceStagingDate: PerformanceStagingDateTypeORM;

  @Column({ type: 'varchar', length: 10, nullable: false })
  seatNumber: string;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({
    type: 'enum',
    enum: ReservationStatus,
    default: ReservationStatus.UNAVAILABLE,
  })
  reservationStatus: ReservationStatus;

  @Column({ type: 'uuid', nullable: true })
  reservedUserId: string;

  @ManyToOne(() => UserTypeORM)
  @JoinColumn({ name: 'reserved_user_id' })
  reservedUser: UserTypeORM;
}
