import { Repository } from 'src/domain/base/repository.interface';

export const repositoryToken = 'StageRepository';
export interface StageRepository<T> extends Repository<T> {}
