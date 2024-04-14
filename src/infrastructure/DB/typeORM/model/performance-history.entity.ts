import { PaymentHistory } from 'src/domain/model/performance-history.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PerformanceSeatsTypeORM } from './performance-seats.entity';
import { CashBalanceTypeORM } from './cash-balance.entity';

@Entity('payment_history')
export class PaymentHistoryTypeORM implements PaymentHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp', nullable: false })
  dateCreated: Date;

  @Column({ type: 'uuid', nullable: false })
  cashBalanceId: string;

  @ManyToOne(() => CashBalanceTypeORM)
  @JoinColumn({ name: 'cash_balance_id' })
  cashBalance: CashBalanceTypeORM;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: false })
  amount: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  cause: string;

  @Column({ type: 'uuid', nullable: false })
  performanceSeatId: string;

  @ManyToOne(() => PerformanceSeatsTypeORM)
  @JoinColumn({ name: 'performance_seat_id' })
  performanceSeat: PerformanceSeatsTypeORM;
}
