import { Inject, Injectable } from '@nestjs/common';
import { EntityManager, QueryRunner } from 'typeorm';
import { CashBalanceTypeORM } from '../model/cash-balance.entity';
import { CashBalanceRepository } from 'src/domain/payment/repositories/cash-balance.repository';

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
    filter?: Partial<CashBalanceTypeORM>,
  ): Promise<CashBalanceTypeORM[]> {
    return queryRunner.manager.find(CashBalanceTypeORM, {
      where: filter,
    });
  }

  findOne(
    queryRunner: QueryRunner,
    filter: Partial<CashBalanceTypeORM>,
  ): Promise<CashBalanceTypeORM> {
    return queryRunner.manager.findOne(CashBalanceTypeORM, {
      where: filter,
    });
  }

  async update(
    queryRunner: QueryRunner,
    id: string,
    data: Partial<CashBalanceTypeORM>,
  ): Promise<CashBalanceTypeORM> {
    await queryRunner.manager.update(CashBalanceTypeORM, id, data);
    return this.findOne(queryRunner, { id });
  }

  async delete(queryRunner: QueryRunner, id: string): Promise<void> {
    await queryRunner.manager.delete(CashBalanceTypeORM, id);
  }
}
