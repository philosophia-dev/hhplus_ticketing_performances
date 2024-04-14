import { Users } from 'src/domain/auth/model/users.entity';

export interface CashBalance {
  id: string;
  userId: string;
  user?: Users;
  balance: number;
}
