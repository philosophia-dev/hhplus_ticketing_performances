import { Inject, Injectable } from '@nestjs/common';
import { EntityManager, QueryRunner } from 'typeorm';
import { PerformancesRepository } from 'src/domain/reservation/repositories/performances.repository';
import { PerformancesTypeORM } from '../model/performances.entity';

@Injectable()
export class PerformancesRepositoryTypeORM
  implements PerformancesRepository<PerformancesTypeORM>
{
  constructor(
    @Inject(EntityManager) private readonly entityManager: EntityManager,
  ) {}

  create(
    queryRunner: QueryRunner,
    data: PerformancesTypeORM,
  ): Promise<PerformancesTypeORM> {
    const stage = queryRunner.manager.create(PerformancesTypeORM, data);
    return queryRunner.manager.save(stage);
  }

  findAll(
    queryRunner: QueryRunner,
    filter?: Partial<PerformancesTypeORM>,
  ): Promise<PerformancesTypeORM[]> {
    return queryRunner.manager.find(PerformancesTypeORM, { where: filter });
  }

  findOne(
    queryRunner: QueryRunner,
    filter: Partial<PerformancesTypeORM>,
  ): Promise<PerformancesTypeORM> {
    return queryRunner.manager.findOne(PerformancesTypeORM, { where: filter });
  }

  async update(
    queryRunner: QueryRunner,
    id: string,
    data: Partial<PerformancesTypeORM>,
  ): Promise<PerformancesTypeORM> {
    await queryRunner.manager.update(PerformancesTypeORM, id, data);
    return this.findOne(queryRunner, { id });
  }

  async delete(queryRunner: QueryRunner, id: string): Promise<void> {
    await queryRunner.manager.delete(PerformancesTypeORM, id);
  }
}
