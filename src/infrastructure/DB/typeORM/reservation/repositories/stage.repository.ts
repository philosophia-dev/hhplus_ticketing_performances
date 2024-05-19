import { Inject, Injectable } from '@nestjs/common';
import { EntityManager, QueryRunner } from 'typeorm';
import { StageRepository } from 'src/domain/reservation/repositories/stage.repository';
import { StageTypeORM } from '../model/stage.entity';
import { FindSortOrder, LockOption } from '../../typeORMDataAccessor';

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
    filter?: Partial<StageTypeORM>[],
    sortMethod?: { [P in keyof StageTypeORM]?: FindSortOrder },
    lockOption?: LockOption,
  ): Promise<StageTypeORM[]> {
    return queryRunner.manager.find(StageTypeORM, {
      lock: lockOption,
      where: filter,
      order: sortMethod,
    });
  }

  findOne(
    queryRunner: QueryRunner,
    filter: Partial<StageTypeORM>,
    sortMethod?: { [P in keyof StageTypeORM]?: FindSortOrder },
    lockOption?: LockOption,
  ): Promise<StageTypeORM> {
    return queryRunner.manager.findOne(StageTypeORM, {
      lock: lockOption,
      where: filter,
      order: sortMethod,
    });
  }

  count(
    queryRunner: QueryRunner,
    filter: Partial<StageTypeORM>,
    lockOption?: LockOption,
  ): Promise<number> {
    return queryRunner.manager.count(StageTypeORM, {
      lock: lockOption,
      where: filter,
    });
  }

  async updateOne(
    queryRunner: QueryRunner,
    id: string,
    data: Partial<StageTypeORM>,
  ): Promise<StageTypeORM> {
    await queryRunner.manager.update(StageTypeORM, id, data);
    return this.findOne(queryRunner, { id });
  }

  async updateMany(
    queryRunner: QueryRunner,
    ids: string[],
    data: Partial<StageTypeORM>,
  ): Promise<StageTypeORM[]> {
    await queryRunner.manager.update(StageTypeORM, ids, data);
    return this.findAll(
      queryRunner,
      ids.map((x) => ({ id: x })),
    );
  }

  async deleteOne(queryRunner: QueryRunner, id: string): Promise<void> {
    await queryRunner.manager.delete(StageTypeORM, id);
  }

  async deleteMany(queryRunner: QueryRunner, ids: string[]): Promise<void> {
    await queryRunner.manager.delete(StageTypeORM, ids);
  }
}
