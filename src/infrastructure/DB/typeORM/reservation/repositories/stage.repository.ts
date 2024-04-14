import { Inject, Injectable } from '@nestjs/common';
import { EntityManager, QueryRunner } from 'typeorm';
import { StageRepository } from 'src/domain/reservation/repositories/stage.repository';
import { StageTypeORM } from '../model/stage.entity';

@Injectable()
export class StageRepositoryTypeORM implements StageRepository<StageTypeORM> {
  constructor(
    @Inject(EntityManager) private readonly entityManager: EntityManager,
  ) {}

  create(queryRunner: QueryRunner, data: StageTypeORM): Promise<StageTypeORM> {
    const stage = queryRunner.manager.create(StageTypeORM, data);
    return queryRunner.manager.save(stage);
  }

  findAll(
    queryRunner: QueryRunner,
    filter?: Partial<StageTypeORM>,
  ): Promise<StageTypeORM[]> {
    return queryRunner.manager.find(StageTypeORM, { where: filter });
  }

  findOne(
    queryRunner: QueryRunner,
    filter: Partial<StageTypeORM>,
  ): Promise<StageTypeORM> {
    return queryRunner.manager.findOne(StageTypeORM, { where: filter });
  }

  async update(
    queryRunner: QueryRunner,
    id: string,
    data: Partial<StageTypeORM>,
  ): Promise<StageTypeORM> {
    await queryRunner.manager.update(StageTypeORM, id, data);
    return this.findOne(queryRunner, { id });
  }

  async delete(queryRunner: QueryRunner, id: string): Promise<void> {
    await queryRunner.manager.delete(StageTypeORM, id);
  }
}
