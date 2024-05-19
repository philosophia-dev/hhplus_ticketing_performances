import { Inject, Injectable } from '@nestjs/common';
import { PerformanceStagingDateRepository } from 'src/domain/reservation/repositories/performance-staging-date.repository';
import { EntityManager, QueryRunner } from 'typeorm';
import { PerformanceStagingDateTypeORM } from '../model/performance-staging-date.entity';
import { FindSortOrder, LockOption } from '../../typeORMDataAccessor';

@Injectable()
export class PerformanceStagingDateRepositoryTypeORM
  implements PerformanceStagingDateRepository<PerformanceStagingDateTypeORM>
{
  constructor(
    @Inject(EntityManager) private readonly entityManager: EntityManager,
  ) {}

  create(
    queryRunner: QueryRunner,
    data: PerformanceStagingDateTypeORM,
  ): Promise<PerformanceStagingDateTypeORM> {
    const stage = queryRunner.manager.create(
      PerformanceStagingDateTypeORM,
      data,
    );
    return queryRunner.manager.save(stage);
  }

  findAll(
    queryRunner: QueryRunner,
    filter?: Partial<PerformanceStagingDateTypeORM>[],
    sortMethod?: { [P in keyof PerformanceStagingDateTypeORM]?: FindSortOrder },
    lockOption?: LockOption,
  ): Promise<PerformanceStagingDateTypeORM[]> {
    return queryRunner.manager.find(PerformanceStagingDateTypeORM, {
      lock: lockOption,
      where: filter,
      order: sortMethod,
    });
  }

  findOne(
    queryRunner: QueryRunner,
    filter: Partial<PerformanceStagingDateTypeORM>,
    sortMethod?: { [P in keyof PerformanceStagingDateTypeORM]?: FindSortOrder },
    lockOption?: LockOption,
  ): Promise<PerformanceStagingDateTypeORM> {
    return queryRunner.manager.findOne(PerformanceStagingDateTypeORM, {
      lock: lockOption,
      where: filter,
      order: sortMethod,
    });
  }

  count(
    queryRunner: QueryRunner,
    filter: Partial<PerformanceStagingDateTypeORM>,
    lockOption?: LockOption,
  ): Promise<number> {
    return queryRunner.manager.count(PerformanceStagingDateTypeORM, {
      lock: lockOption,
      where: filter,
    });
  }

  async updateOne(
    queryRunner: QueryRunner,
    id: string,
    data: Partial<PerformanceStagingDateTypeORM>,
  ): Promise<PerformanceStagingDateTypeORM> {
    await queryRunner.manager.update(PerformanceStagingDateTypeORM, id, data);
    return this.findOne(queryRunner, { id });
  }

  async updateMany(
    queryRunner: QueryRunner,
    ids: string[],
    data: Partial<PerformanceStagingDateTypeORM>,
  ): Promise<PerformanceStagingDateTypeORM[]> {
    await queryRunner.manager.update(PerformanceStagingDateTypeORM, ids, data);
    return this.findAll(
      queryRunner,
      ids.map((x) => ({ id: x })),
    );
  }

  async deleteOne(queryRunner: QueryRunner, id: string): Promise<void> {
    await queryRunner.manager.delete(PerformanceStagingDateTypeORM, id);
  }

  async deleteMany(queryRunner: QueryRunner, ids: string[]): Promise<void> {
    await queryRunner.manager.delete(PerformanceStagingDateTypeORM, ids);
  }
}
