import { Test, TestingModule } from '@nestjs/testing';
import { User } from 'src/domain/auth/model/user.model';
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
import { GetCashBalanceUseCase } from 'src/application/payment/use-cases/get-cash-balance.use-case';
import { CashBalance } from 'src/domain/payment/model/cash-balance.model';

describe('GetCashUseCase', () => {
  let useCase: GetCashBalanceUseCase;
  let mockUsersRepository: jest.Mocked<UsersRepository<User>>;
  let mockCashBalanceRepository: jest.Mocked<
    CashBalanceRepository<CashBalance>
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
        GetCashBalanceUseCase,
        {
          provide: USERS_REPOSITORY_TOKEN,
          useValue: repositoryMockFunc,
        },
        {
          provide: CASH_BALANCE_REPOSITORY_TOKEN,
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

    useCase = module.get<GetCashBalanceUseCase>(GetCashBalanceUseCase);
    mockUsersRepository = module.get(USERS_REPOSITORY_TOKEN);
    mockCashBalanceRepository = module.get(CASH_BALANCE_REPOSITORY_TOKEN);
    mockDataAccessor = module.get(DATA_ACCESSOR_TOKEN);
  });

  describe('excute', () => {
    test('해당 유저의 현재 잔액 반환', async () => {});
  });
});
