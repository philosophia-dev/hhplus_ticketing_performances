import { Inject, Injectable } from '@nestjs/common';
import { EntityManager, QueryRunner } from 'typeorm';
import { PerformanceSeatTypeORM } from '../model/performance-seat.entity';
import { PerformanceSeatsRepository } from 'src/domain/reservation/repositories/performance-seats.repository';

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
    filter?: Partial<PerformanceSeatTypeORM>,
  ): Promise<PerformanceSeatTypeORM[]> {
    return queryRunner.manager.find(PerformanceSeatTypeORM, {
      where: filter,
    });
  }

  findOne(
    queryRunner: QueryRunner,
    filter: Partial<PerformanceSeatTypeORM>,
  ): Promise<PerformanceSeatTypeORM> {
    return queryRunner.manager.findOne(PerformanceSeatTypeORM, {
      where: filter,
    });
  }

  async update(
    queryRunner: QueryRunner,
    id: string,
    data: Partial<PerformanceSeatTypeORM>,
  ): Promise<PerformanceSeatTypeORM> {
    await queryRunner.manager.update(PerformanceSeatTypeORM, id, data);
    return this.findOne(queryRunner, { id });
  }

  async delete(queryRunner: QueryRunner, id: string): Promise<void> {
    await queryRunner.manager.delete(PerformanceSeatTypeORM, id);
  }
}
