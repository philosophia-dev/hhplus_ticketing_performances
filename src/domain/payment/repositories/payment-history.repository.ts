import { Repository } from 'src/domain/base/repository.interface';

export const REPOSITORY_TOKEN = 'PaymentHistoryRepository';
export interface PaymentHistoryRepository<T> extends Repository<T> {}
