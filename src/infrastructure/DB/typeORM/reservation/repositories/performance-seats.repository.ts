import { Inject, Injectable } from '@nestjs/common';
import { EntityManager, QueryRunner } from 'typeorm';
import { PerformanceSeatTypeORM } from '../model/performance-seat.entity';
import { PerformanceSeatsRepository } from 'src/domain/reservation/repositories/performance-seats.repository';
import { FindSortOrder, LockOption } from '../../typeORMDataAccessor';

@Injectable()
export class PerformanceSeatsRepositoryTypeORM
  implements PerformanceSeatsRepository<PerformanceSeatTypeORM>
{
  constructor(
    @Inject(EntityManager) private readonly entityManager: EntityManager,
  ) {}

  create(
    queryRunner: QueryRunner,
    data: PerformanceSeatTypeORM,
  ): Promise<PerformanceSeatTypeORM> {
    const stage = queryRunner.manager.create(PerformanceSeatTypeORM, data);
    return queryRunner.manager.save(stage);
  }

  findAll(
    queryRunner: QueryRunner,
    filter?: Partial<PerformanceSeatTypeORM>[],
    sortMethod?: { [P in keyof PerformanceSeatTypeORM]?: FindSortOrder },
    lockOption?: LockOption,
  ): Promise<PerformanceSeatTypeORM[]> {
    return queryRunner.manager.find(PerformanceSeatTypeORM, {
      lock: lockOption,
      where: filter,
      order: sortMethod,
    });
  }

  findOne(
    queryRunner: QueryRunner,
    filter: Partial<PerformanceSeatTypeORM>,
    sortMethod?: { [P in keyof PerformanceSeatTypeORM]?: FindSortOrder },
    lockOption?: LockOption,
  ): Promise<PerformanceSeatTypeORM> {
    return queryRunner.manager.findOne(PerformanceSeatTypeORM, {
      lock: lockOption,
      where: filter,
      order: sortMethod,
    });
  }

  count(
    queryRunner: QueryRunner,
    filter: Partial<PerformanceSeatTypeORM>,
    lockOption?: LockOption,
  ): Promise<number> {
    return queryRunner.manager.count(PerformanceSeatTypeORM, {
      lock: lockOption,
      where: filter,
    });
  }

  async updateOne(
    queryRunner: QueryRunner,
    id: string,
    data: Partial<PerformanceSeatTypeORM>,
  ): Promise<PerformanceSeatTypeORM> {
    await queryRunner.manager.update(PerformanceSeatTypeORM, id, data);
    return this.findOne(queryRunner, { id });
  }

  async updateMany(
    queryRunner: QueryRunner,
    ids: string[],
    data: Partial<PerformanceSeatTypeORM>,
  ): Promise<PerformanceSeatTypeORM[]> {
    await queryRunner.manager.update(PerformanceSeatTypeORM, ids, data);
    return this.findAll(
      queryRunner,
      ids.map((x) => ({ id: x })),
    );
  }

  async deleteOne(queryRunner: QueryRunner, id: string): Promise<void> {
    await queryRunner.manager.delete(PerformanceSeatTypeORM, id);
  }

  async deleteMany(queryRunner: QueryRunner, ids: string[]): Promise<void> {
    await queryRunner.manager.delete(PerformanceSeatTypeORM, ids);
  }
}
