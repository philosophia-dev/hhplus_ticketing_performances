import { User } from 'src/domain/auth/model/user.model';

export interface CashBalance {
  id: string;
  userId: string;
  user?: User;
  balance: number;
}
