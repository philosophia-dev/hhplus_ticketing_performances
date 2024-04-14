import { Inject, Injectable } from '@nestjs/common';
import { EntityManager, QueryRunner } from 'typeorm';
import { PerformancesRepository } from 'src/domain/reservation/repositories/performances.repository';
import { PerformanceTypeORM } from '../model/performance.entity';

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
    filter?: Partial<PerformanceTypeORM>,
  ): Promise<PerformanceTypeORM[]> {
    return queryRunner.manager.find(PerformanceTypeORM, { where: filter });
  }

  findOne(
    queryRunner: QueryRunner,
    filter: Partial<PerformanceTypeORM>,
  ): Promise<PerformanceTypeORM> {
    return queryRunner.manager.findOne(PerformanceTypeORM, { where: filter });
  }

  async update(
    queryRunner: QueryRunner,
    id: string,
    data: Partial<PerformanceTypeORM>,
  ): Promise<PerformanceTypeORM> {
    await queryRunner.manager.update(PerformanceTypeORM, id, data);
    return this.findOne(queryRunner, { id });
  }

  async delete(queryRunner: QueryRunner, id: string): Promise<void> {
    await queryRunner.manager.delete(PerformanceTypeORM, id);
  }
}
