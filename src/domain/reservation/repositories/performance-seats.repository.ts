import { Repository } from 'src/domain/base/repository.interface';

export const repositoryToken = 'PerformanceSeatsRepository';
export interface PerformanceSeatsRepository<T> extends Repository<T> {}
