import { Repository } from 'src/domain/base/repository.interface';

export const REPOSITORY_TOKEN = 'PerformanceSeatsRepository';
export interface PerformanceSeatsRepository<T> extends Repository<T> {}
