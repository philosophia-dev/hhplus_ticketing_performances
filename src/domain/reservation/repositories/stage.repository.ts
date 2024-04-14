import { Repository } from 'src/domain/base/repository.interface';

export const REPOSITORY_TOKEN = 'StageRepository';
export interface StageRepository<T> extends Repository<T> {}
