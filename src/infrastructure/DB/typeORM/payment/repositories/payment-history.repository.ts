import { Inject, Injectable } from '@nestjs/common';
import { EntityManager, QueryRunner } from 'typeorm';
import { PaymentHistoryTypeORM } from '../model/payment-history.entity';
import { PaymentHistoryRepository } from 'src/domain/payment/repositories/payment-history.repository';
import { FindSortOrder, LockOption } from '../../typeORMDataAccessor';

@Injectable()
export class PaymentHistoryRepositoryTypeORM
  implements PaymentHistoryRepository<PaymentHistoryTypeORM>
{
  constructor(
    @Inject(EntityManager) private readonly entityManager: EntityManager,
  ) {}

  create(
    queryRunner: QueryRunner,
    data: PaymentHistoryTypeORM,
  ): Promise<PaymentHistoryTypeORM> {
    const stage = queryRunner.manager.create(PaymentHistoryTypeORM, data);
    return queryRunner.manager.save(stage);
  }

  findAll(
    queryRunner: QueryRunner,
    filter?: Partial<PaymentHistoryTypeORM>,
    sortMethod?: { [P in keyof PaymentHistoryTypeORM]?: FindSortOrder },
    lockOption?: LockOption,
  ): Promise<PaymentHistoryTypeORM[]> {
    return queryRunner.manager.find(PaymentHistoryTypeORM, {
      lock: lockOption,
      where: filter,
      order: sortMethod,
    });
  }

  findOne(
    queryRunner: QueryRunner,
    filter: Partial<PaymentHistoryTypeORM>,
    sortMethod?: { [P in keyof PaymentHistoryTypeORM]?: FindSortOrder },
    lockOption?: LockOption,
  ): Promise<PaymentHistoryTypeORM> {
    return queryRunner.manager.findOne(PaymentHistoryTypeORM, {
      lock: lockOption,
      where: filter,
      order: sortMethod,
    });
  }

  count(
    queryRunner: QueryRunner,
    filter: Partial<PaymentHistoryTypeORM>,
    lockOption?: LockOption,
  ): Promise<number> {
    return queryRunner.manager.count(PaymentHistoryTypeORM, {
      lock: lockOption,
      where: filter,
    });
  }

  async update(
    queryRunner: QueryRunner,
    id: string,
    data: Partial<PaymentHistoryTypeORM>,
  ): Promise<PaymentHistoryTypeORM> {
    await queryRunner.manager.update(PaymentHistoryTypeORM, id, data);
    return this.findOne(queryRunner, { id });
  }

  async delete(queryRunner: QueryRunner, id: string): Promise<void> {
    await queryRunner.manager.delete(PaymentHistoryTypeORM, id);
  }
}
