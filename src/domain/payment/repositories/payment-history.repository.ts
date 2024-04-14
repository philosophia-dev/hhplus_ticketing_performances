import { Repository } from 'src/domain/base/repository.interface';

export const repositoryToken = 'PaymentHistoryRepository';
export interface PaymentHistoryRepository<T> extends Repository<T> {}
