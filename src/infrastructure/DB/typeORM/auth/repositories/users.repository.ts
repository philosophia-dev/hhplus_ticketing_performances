import { Inject, Injectable } from '@nestjs/common';
import { EntityManager, QueryRunner } from 'typeorm';
import { UsersTypeORM } from '../model/users.entity';
import { UsersRepository } from 'src/domain/auth/repositories/users.repository';

@Injectable()
export class UsersRepositoryTypeORM implements UsersRepository<UsersTypeORM> {
  constructor(
    @Inject(EntityManager) private readonly entityManager: EntityManager,
  ) {}

  create(queryRunner: QueryRunner, data: UsersTypeORM): Promise<UsersTypeORM> {
    const stage = queryRunner.manager.create(UsersTypeORM, data);
    return queryRunner.manager.save(stage);
  }

  findAll(
    queryRunner: QueryRunner,
    filter?: Partial<UsersTypeORM>,
  ): Promise<UsersTypeORM[]> {
    return queryRunner.manager.find(UsersTypeORM, {
      where: filter,
    });
  }

  findOne(
    queryRunner: QueryRunner,
    filter: Partial<UsersTypeORM>,
  ): Promise<UsersTypeORM> {
    return queryRunner.manager.findOne(UsersTypeORM, {
      where: filter,
    });
  }

  async update(
    queryRunner: QueryRunner,
    id: string,
    data: Partial<UsersTypeORM>,
  ): Promise<UsersTypeORM> {
    await queryRunner.manager.update(UsersTypeORM, id, data);
    return this.findOne(queryRunner, { id });
  }

  async delete(queryRunner: QueryRunner, id: string): Promise<void> {
    await queryRunner.manager.delete(UsersTypeORM, id);
  }
}
