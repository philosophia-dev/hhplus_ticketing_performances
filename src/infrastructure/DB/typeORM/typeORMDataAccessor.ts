import { Injectable } from '@nestjs/common';
import {
  EntityManager,
  FindOneOptions,
  FindOptionsOrderValue,
  QueryRunner,
} from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { IsolationLevel } from 'typeorm/driver/types/IsolationLevel';
import { DataAccessor } from 'src/domain/base/data-accessor.interface';

@Injectable()
export class TypeORMDataAccessor implements DataAccessor {
  constructor(@InjectEntityManager() private entityManager: EntityManager) {}

  async connect(): Promise<QueryRunner> {
    const queryRunner = this.entityManager.connection.createQueryRunner();
    await queryRunner.connect();
    return queryRunner;
  }

  async startTransaction(
    queryRunner: QueryRunner,
    isolationLevel?: IsolationLevel,
  ): Promise<void> {
    await queryRunner.startTransaction(isolationLevel);
  }

  async commitTransaction(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.commitTransaction();
  }

  async rollbackTransaction(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.rollbackTransaction();
  }

  async releaseQueryRunner(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.release();
  }
}

export type LockOption = FindOneOptions['lock'];
export type FindSortOrder = FindOptionsOrderValue;
