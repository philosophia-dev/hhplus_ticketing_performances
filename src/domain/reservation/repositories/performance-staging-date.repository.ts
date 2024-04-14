import { Repository } from 'src/domain/base/repository.interface';

export const repositoryToken = 'PerformanceStagingDateRepository';
export interface PerformanceStagingDateRepository<T> extends Repository<T> {}
