import { QueryRunner } from './data-accessor.interface';

export interface Repository<T> {
  create(queryRunner: QueryRunner, data: T, ...args: any[]): Promise<T>;
  findAll(
    queryRunner: QueryRunner,
    filter?: Partial<T>,
    ...args: any[]
  ): Promise<T[]>;
  findOne(
    queryRunner: QueryRunner,
    filter: Partial<T>,
    ...args: any[]
  ): Promise<T>;
  update(
    queryRunner: QueryRunner,
    id: string,
    data: Partial<T>,
    ...args: any[]
  ): Promise<T>;
  delete(queryRunner: QueryRunner, id: string, ...args: any[]): Promise<void>;
}
