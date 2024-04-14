import { Test, TestingModule } from '@nestjs/testing';
import { ChargeCashUseCase } from 'src/application/payment/use-cases/charge-cash.use-case';
import { User } from 'src/domain/auth/model/user.entity';
import {
  REPOSITORY_TOKEN as USERS_REPOSITORY_TOKEN,
  UsersRepository,
} from 'src/domain/auth/repositories/users.repository';
import {
  CashBalanceRepository,
  REPOSITORY_TOKEN as CASH_BALANCE_REPOSITORY_TOKEN,
} from 'src/domain/payment/repositories/cash-balance.repository';
import {
  DataAccessor,
  TOKEN as DATA_ACCESSOR_TOKEN,
} from 'src/domain/base/data-accessor.interface';
import {
  PaymentHistoryRepository,
  REPOSITORY_TOKEN as PAYMENT_HISTORY_REPOSITORY_TOKEN,
} from 'src/domain/payment/repositories/payment-history.repository';
import { PerformanceStagingDate } from 'src/domain/reservation/model/performance-staging-date.entity';
import { Performance } from 'src/domain/reservation/model/performance.entity';
import { Stage } from 'src/domain/reservation/model/stage.entity';
import { CashBalance } from 'src/domain/payment/model/cash-balance.entity';
import {
  PerformanceSeat,
  ReservationStatus,
} from 'src/domain/reservation/model/performance-seat.entity';
import { PaymentHistory } from 'src/domain/payment/model/payment-history.entity';

describe('ChargeCashUseCase', () => {
  let useCase: ChargeCashUseCase;
  let mockUsersRepository: jest.Mocked<UsersRepository<User>>;
  let mockCashBalanceRepository: jest.Mocked<
    CashBalanceRepository<CashBalance>
  >;
  let mockPaymentHistoryRepository: jest.Mocked<
    PaymentHistoryRepository<PaymentHistory>
  >;
  let mockDataAccessor: jest.Mocked<DataAccessor>;

  let tempUser: User = {
    id: '6515b03d-1e22-4ab4-a74e-e97335cc639b',
    dateCreated: new Date(),
    emailAddress: 'test@test.com',
    password: 'test',
    name: 'test',
    phoneNumber: '010-0000-0000',
  };

  beforeEach(async () => {
    const repositoryMockFunc = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChargeCashUseCase,
        {
          provide: USERS_REPOSITORY_TOKEN,
          useValue: repositoryMockFunc,
        },
        {
          provide: CASH_BALANCE_REPOSITORY_TOKEN,
          useValue: repositoryMockFunc,
        },
        {
          provide: PAYMENT_HISTORY_REPOSITORY_TOKEN,
          useValue: repositoryMockFunc,
        },
        {
          provide: DATA_ACCESSOR_TOKEN,
          useValue: {
            connect: jest.fn(),
            startTransaction: jest.fn(),
            commitTransaction: jest.fn(),
            rollbackTransaction: jest.fn(),
            releaseQueryRunner: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<ChargeCashUseCase>(ChargeCashUseCase);
    mockUsersRepository = module.get(USERS_REPOSITORY_TOKEN);
    mockCashBalanceRepository = module.get(CASH_BALANCE_REPOSITORY_TOKEN);
    mockPaymentHistoryRepository = module.get(PAYMENT_HISTORY_REPOSITORY_TOKEN);
    mockDataAccessor = module.get(DATA_ACCESSOR_TOKEN);
  });

  describe('excute', () => {
    test('유효한 유저가 요청한 경우 잔액 충전 처리', async () => {});

    test('유저가 존재하지 않을 경우 UserNotFoundError 발생', async () => {});
  });
});
