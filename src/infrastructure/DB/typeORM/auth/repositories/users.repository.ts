import { Inject, Injectable } from '@nestjs/common';
import { EntityManager, QueryRunner } from 'typeorm';
import { UserTypeORM } from '../model/user.entity';
import { UsersRepository } from 'src/domain/auth/repositories/users.repository';
import { FindSortOrder, LockOption } from '../../typeORMDataAccessor';

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
    filter?: Partial<UserTypeORM>[],
    sortMethod?: { [P in keyof UserTypeORM]?: FindSortOrder },
    lockOption?: LockOption,
  ): Promise<UserTypeORM[]> {
    return queryRunner.manager.find(UserTypeORM, {
      lock: lockOption,
      where: filter,
      order: sortMethod,
    });
  }

  findOne(
    queryRunner: QueryRunner,
    filter: Partial<UserTypeORM>,
    sortMethod?: { [P in keyof UserTypeORM]?: FindSortOrder },
    lockOption?: LockOption,
  ): Promise<UserTypeORM> {
    return queryRunner.manager.findOne(UserTypeORM, {
      lock: lockOption,
      where: filter,
      order: sortMethod,
    });
  }

  count(
    queryRunner: QueryRunner,
    filter: Partial<UserTypeORM>,
    lockOption?: LockOption,
  ): Promise<number> {
    return queryRunner.manager.count(UserTypeORM, {
      lock: lockOption,
      where: filter,
    });
  }

  async updateOne(
    queryRunner: QueryRunner,
    id: string,
    data: Partial<UserTypeORM>,
  ): Promise<UserTypeORM> {
    await queryRunner.manager.update(UserTypeORM, id, data);
    return this.findOne(queryRunner, { id });
  }

  async updateMany(
    queryRunner: QueryRunner,
    ids: string[],
    data: Partial<UserTypeORM>,
  ): Promise<UserTypeORM[]> {
    await queryRunner.manager.update(UserTypeORM, ids, data);
    return this.findAll(
      queryRunner,
      ids.map((x) => ({ id: x })),
    );
  }

  async deleteOne(queryRunner: QueryRunner, id: string): Promise<void> {
    await queryRunner.manager.delete(UserTypeORM, id);
  }

  async deleteMany(queryRunner: QueryRunner, ids: string[]): Promise<void> {
    await queryRunner.manager.delete(UserTypeORM, ids);
  }
}
