import { User } from 'src/domain/auth/model/user.entity';

export class CashBalance {
  id: string;
  userId: string;
  user?: User;
  balance: number;
}
