import { Repository } from 'src/domain/base/repository.interface';

export const repositoryToken = 'UsersRepository';
export interface UsersRepository<T> extends Repository<T> {}
