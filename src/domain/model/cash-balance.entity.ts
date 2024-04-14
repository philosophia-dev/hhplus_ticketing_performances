import { User } from './user.entity';

export class CashBalance {
  id: string;
  userId: string;
  user?: User;
  balance: number;
}
