import { Repository } from 'src/domain/base/repository.interface';

export const REPOSITORY_TOKEN = 'PerformancesRepository';
export interface PerformancesRepository<T> extends Repository<T> {}
