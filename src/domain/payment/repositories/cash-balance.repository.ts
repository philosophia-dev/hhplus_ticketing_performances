import { Repository } from 'src/domain/base/repository.interface';

export const REPOSITORY_TOKEN = 'CashBalanceRepository';
export interface CashBalanceRepository<T> extends Repository<T> {}
