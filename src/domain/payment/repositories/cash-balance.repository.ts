import { Repository } from 'src/domain/base/repository.interface';

export const repositoryToken = 'CashBalanceRepository';
export interface CashBalanceRepository<T> extends Repository<T> {}
