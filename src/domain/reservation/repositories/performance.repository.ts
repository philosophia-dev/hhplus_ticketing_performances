import { Repository } from 'src/domain/base/repository.interface';

export const REPOSITORY_TOKEN = 'PerformanceRepository';
export interface PerformanceRepository<T> extends Repository<T> {}
