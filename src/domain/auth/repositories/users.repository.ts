import { Repository } from 'src/domain/base/repository.interface';

export const REPOSITORY_TOKEN = 'UsersRepository';
export interface UsersRepository<T> extends Repository<T> {}
