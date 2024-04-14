import { Repository } from 'src/domain/base/repository.interface';

export const REPOSITORY_TOKEN = 'PerformanceStagingDateRepository';
export interface PerformanceStagingDateRepository<T> extends Repository<T> {}
