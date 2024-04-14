import { Inject, Injectable } from '@nestjs/common';
import { PerformanceStagingDateRepository } from 'src/domain/reservation/repositories/performance-staging-date.repository';
import { EntityManager, QueryRunner } from 'typeorm';
import { PerformanceStagingDateTypeORM } from '../model/performance-staging-date.entity';

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
    filter?: Partial<PerformanceStagingDateTypeORM>,
  ): Promise<PerformanceStagingDateTypeORM[]> {
    return queryRunner.manager.find(PerformanceStagingDateTypeORM, {
      where: filter,
    });
  }

  findOne(
    queryRunner: QueryRunner,
    filter: Partial<PerformanceStagingDateTypeORM>,
  ): Promise<PerformanceStagingDateTypeORM> {
    return queryRunner.manager.findOne(PerformanceStagingDateTypeORM, {
      where: filter,
    });
  }

  async update(
    queryRunner: QueryRunner,
    id: string,
    data: Partial<PerformanceStagingDateTypeORM>,
  ): Promise<PerformanceStagingDateTypeORM> {
    await queryRunner.manager.update(PerformanceStagingDateTypeORM, id, data);
    return this.findOne(queryRunner, { id });
  }

  async delete(queryRunner: QueryRunner, id: string): Promise<void> {
    await queryRunner.manager.delete(PerformanceStagingDateTypeORM, id);
  }
}
