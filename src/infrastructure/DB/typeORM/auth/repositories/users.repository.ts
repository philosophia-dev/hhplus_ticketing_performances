import { Inject, Injectable } from '@nestjs/common';
import { EntityManager, QueryRunner } from 'typeorm';
import { UserTypeORM } from '../model/user.entity';
import { UsersRepository } from 'src/domain/auth/repositories/users.repository';

@Injectable()
export class UsersRepositoryTypeORM implements UsersRepository<UserTypeORM> {
  constructor(
    @Inject(EntityManager) private readonly entityManager: EntityManager,
  ) {}

  create(queryRunner: QueryRunner, data: UserTypeORM): Promise<UserTypeORM> {
    const stage = queryRunner.manager.create(UserTypeORM, data);
    return queryRunner.manager.save(stage);
  }

  findAll(
    queryRunner: QueryRunner,
    filter?: Partial<UserTypeORM>,
  ): Promise<UserTypeORM[]> {
    return queryRunner.manager.find(UserTypeORM, {
      where: filter,
    });
  }

  findOne(
    queryRunner: QueryRunner,
    filter: Partial<UserTypeORM>,
  ): Promise<UserTypeORM> {
    return queryRunner.manager.findOne(UserTypeORM, {
      where: filter,
    });
  }

  async update(
    queryRunner: QueryRunner,
    id: string,
    data: Partial<UserTypeORM>,
  ): Promise<UserTypeORM> {
    await queryRunner.manager.update(UserTypeORM, id, data);
    return this.findOne(queryRunner, { id });
  }

  async delete(queryRunner: QueryRunner, id: string): Promise<void> {
    await queryRunner.manager.delete(UserTypeORM, id);
  }
}
