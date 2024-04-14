import { Inject, Injectable } from '@nestjs/common';
import { EntityManager, QueryRunner } from 'typeorm';
import { PerformanceSeatsTypeORM } from '../model/performance-seats.entity';
import { PerformanceSeatsRepository } from 'src/domain/reservation/repositories/performance-seats.repository';

@Injectable()
export class PerformanceSeatsRepositoryTypeORM
  implements PerformanceSeatsRepository<PerformanceSeatsTypeORM>
{
  constructor(
    @Inject(EntityManager) private readonly entityManager: EntityManager,
  ) {}

  create(
    queryRunner: QueryRunner,
    data: PerformanceSeatsTypeORM,
  ): Promise<PerformanceSeatsTypeORM> {
    const stage = queryRunner.manager.create(PerformanceSeatsTypeORM, data);
    return queryRunner.manager.save(stage);
  }

  findAll(
    queryRunner: QueryRunner,
    filter?: Partial<PerformanceSeatsTypeORM>,
  ): Promise<PerformanceSeatsTypeORM[]> {
    return queryRunner.manager.find(PerformanceSeatsTypeORM, {
      where: filter,
    });
  }

  findOne(
    queryRunner: QueryRunner,
    filter: Partial<PerformanceSeatsTypeORM>,
  ): Promise<PerformanceSeatsTypeORM> {
    return queryRunner.manager.findOne(PerformanceSeatsTypeORM, {
      where: filter,
    });
  }

  async update(
    queryRunner: QueryRunner,
    id: string,
    data: Partial<PerformanceSeatsTypeORM>,
  ): Promise<PerformanceSeatsTypeORM> {
    await queryRunner.manager.update(PerformanceSeatsTypeORM, id, data);
    return this.findOne(queryRunner, { id });
  }

  async delete(queryRunner: QueryRunner, id: string): Promise<void> {
    await queryRunner.manager.delete(PerformanceSeatsTypeORM, id);
  }
}
