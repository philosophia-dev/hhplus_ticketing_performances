import { CashBalance } from 'src/domain/payment/model/cash-balance.model';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserTypeORM } from '../../auth/model/user.entity';

@Entity('cash_balance')
export class CashBalanceTypeORM implements CashBalance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  userId: string;

  @ManyToOne(() => UserTypeORM)
  @JoinColumn({ name: 'user_id' })
  user: UserTypeORM;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: false })
  balance: number;
}
