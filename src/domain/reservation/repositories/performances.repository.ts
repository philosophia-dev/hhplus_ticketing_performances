import { Repository } from 'src/domain/base/repository.interface';

export const repositoryToken = 'PerformancesRepository';
export interface PerformancesRepository<T> extends Repository<T> {}
