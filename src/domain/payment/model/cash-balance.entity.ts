import { User } from 'src/domain/auth/model/user.entity';

export interface CashBalance {
  id: string;
  userId: string;
  user?: User;
  balance: number;
}
