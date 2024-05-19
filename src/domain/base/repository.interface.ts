import {
  QueryRunner,
  LockOption,
  FindSortOrder,
} from './data-accessor.interface';

export interface Repository<T> {
  create(queryRunner: QueryRunner, data: T): Promise<T>;
  findAll(
    queryRunner: QueryRunner,
    filter?: Partial<T>[],
    sortMethod?: { [P in keyof T]?: FindSortOrder },
    lockOption?: LockOption,
  ): Promise<T[]>;
  findOne(
    queryRunner: QueryRunner,
    filter: Partial<T>,
    sortMethod?: { [P in keyof T]?: FindSortOrder },
    lockOption?: LockOption,
  ): Promise<T>;
  count(
    queryRunner: QueryRunner,
    filter: Partial<T>,
    lockOption?: LockOption,
  ): Promise<number>;
  updateOne(queryRunner: QueryRunner, id: string, data: Partial<T>): Promise<T>;
  updateMany(
    queryRunner: QueryRunner,
    ids: string[],
    data: Partial<T>,
  ): Promise<T[]>;
  deleteOne(queryRunner: QueryRunner, id: string): Promise<void>;
  deleteMany(queryRunner: QueryRunner, ids: string[]): Promise<void>;
}
