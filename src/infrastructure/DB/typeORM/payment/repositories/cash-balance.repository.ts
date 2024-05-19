import { Inject, Injectable } from '@nestjs/common';
import { EntityManager, QueryRunner } from 'typeorm';
import { CashBalanceTypeORM } from '../model/cash-balance.entity';
import { CashBalanceRepository } from 'src/domain/payment/repositories/cash-balance.repository';
import { FindSortOrder, LockOption } from '../../typeORMDataAccessor';

@Injectable()
export class CashBalanceRepositoryTypeORM
  implements CashBalanceRepository<CashBalanceTypeORM>
{
  constructor(
    @Inject(EntityManager) private readonly entityManager: EntityManager,
  ) {}

  create(
    queryRunner: QueryRunner,
    data: CashBalanceTypeORM,
  ): Promise<CashBalanceTypeORM> {
    const stage = queryRunner.manager.create(CashBalanceTypeORM, data);
    return queryRunner.manager.save(stage);
  }

  findAll(
    queryRunner: QueryRunner,
    filter?: Partial<CashBalanceTypeORM>[],
    sortMethod?: { [P in keyof CashBalanceTypeORM]?: FindSortOrder },
    lockOption?: LockOption,
  ): Promise<CashBalanceTypeORM[]> {
    return queryRunner.manager.find(CashBalanceTypeORM, {
      lock: lockOption,
      where: filter,
      order: sortMethod,
    });
  }

  findOne(
    queryRunner: QueryRunner,
    filter: Partial<CashBalanceTypeORM>,
    sortMethod?: { [P in keyof CashBalanceTypeORM]?: FindSortOrder },
    lockOption?: LockOption,
  ): Promise<CashBalanceTypeORM> {
    return queryRunner.manager.findOne(CashBalanceTypeORM, {
      lock: lockOption,
      where: filter,
      order: sortMethod,
    });
  }

  count(
    queryRunner: QueryRunner,
    filter: Partial<CashBalanceTypeORM>,
    lockOption?: LockOption,
  ): Promise<number> {
    return queryRunner.manager.count(CashBalanceTypeORM, {
      lock: lockOption,
      where: filter,
    });
  }

  async updateOne(
    queryRunner: QueryRunner,
    id: string,
    data: Partial<CashBalanceTypeORM>,
  ): Promise<CashBalanceTypeORM> {
    await queryRunner.manager.update(CashBalanceTypeORM, id, data);
    return this.findOne(queryRunner, { id });
  }

  async updateMany(
    queryRunner: QueryRunner,
    ids: string[],
    data: Partial<CashBalanceTypeORM>,
  ): Promise<CashBalanceTypeORM[]> {
    await queryRunner.manager.update(CashBalanceTypeORM, ids, data);
    return this.findAll(
      queryRunner,
      ids.map((x) => ({ id: x })),
    );
  }

  async deleteOne(queryRunner: QueryRunner, id: string): Promise<void> {
    await queryRunner.manager.delete(CashBalanceTypeORM, id);
  }

  async deleteMany(queryRunner: QueryRunner, ids: string[]): Promise<void> {
    await queryRunner.manager.delete(CashBalanceTypeORM, ids);
  }
}
