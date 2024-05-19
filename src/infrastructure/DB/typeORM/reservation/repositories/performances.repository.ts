import { Inject, Injectable } from '@nestjs/common';
import { EntityManager, QueryRunner } from 'typeorm';
import { PerformancesRepository } from 'src/domain/reservation/repositories/performances.repository';
import { PerformanceTypeORM } from '../model/performance.entity';
import { FindSortOrder, LockOption } from '../../typeORMDataAccessor';

@Injectable()
export class PerformancesRepositoryTypeORM
  implements PerformancesRepository<PerformanceTypeORM>
{
  constructor(
    @Inject(EntityManager) private readonly entityManager: EntityManager,
  ) {}

  create(
    queryRunner: QueryRunner,
    data: PerformanceTypeORM,
  ): Promise<PerformanceTypeORM> {
    const stage = queryRunner.manager.create(PerformanceTypeORM, data);
    return queryRunner.manager.save(stage);
  }

  findAll(
    queryRunner: QueryRunner,
    filter?: Partial<PerformanceTypeORM>[],
    sortMethod?: { [P in keyof PerformanceTypeORM]?: FindSortOrder },
    lockOption?: LockOption,
  ): Promise<PerformanceTypeORM[]> {
    return queryRunner.manager.find(PerformanceTypeORM, {
      lock: lockOption,
      where: filter,
      order: sortMethod,
    });
  }

  findOne(
    queryRunner: QueryRunner,
    filter: Partial<PerformanceTypeORM>,
    sortMethod?: { [P in keyof PerformanceTypeORM]?: FindSortOrder },
    lockOption?: LockOption,
  ): Promise<PerformanceTypeORM> {
    return queryRunner.manager.findOne(PerformanceTypeORM, {
      lock: lockOption,
      where: filter,
      order: sortMethod,
    });
  }

  count(
    queryRunner: QueryRunner,
    filter: Partial<PerformanceTypeORM>,
    lockOption?: LockOption,
  ): Promise<number> {
    return queryRunner.manager.count(PerformanceTypeORM, {
      lock: lockOption,
      where: filter,
    });
  }

  async updateOne(
    queryRunner: QueryRunner,
    id: string,
    data: Partial<PerformanceTypeORM>,
  ): Promise<PerformanceTypeORM> {
    await queryRunner.manager.update(PerformanceTypeORM, id, data);
    return this.findOne(queryRunner, { id });
  }

  async updateMany(
    queryRunner: QueryRunner,
    ids: string[],
    data: Partial<PerformanceTypeORM>,
  ): Promise<PerformanceTypeORM[]> {
    await queryRunner.manager.update(PerformanceTypeORM, ids, data);
    return this.findAll(
      queryRunner,
      ids.map((x) => ({ id: x })),
    );
  }

  async deleteOne(queryRunner: QueryRunner, id: string): Promise<void> {
    await queryRunner.manager.delete(PerformanceTypeORM, id);
  }

  async deleteMany(queryRunner: QueryRunner, ids: string[]): Promise<void> {
    await queryRunner.manager.delete(PerformanceTypeORM, ids);
  }
}
