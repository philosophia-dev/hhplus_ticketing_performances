import { Test, TestingModule } from '@nestjs/testing';
import { SignInUseCase } from 'src/application/auth/use-cases/sign-in.use-case';
import { User } from 'src/domain/auth/model/user.entity';
import {
  REPOSITORY_TOKEN,
  UsersRepository,
} from 'src/domain/auth/repositories/users.repository';
import {
  DataAccessor,
  TOKEN as DATA_ACCESSOR_TOKEN,
} from 'src/domain/base/data-accessor.interface';

describe('SignInUseCase', () => {
  let useCase: SignInUseCase;
  let mockUsersRepository: jest.Mocked<UsersRepository<User>>;
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
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SignInUseCase,
        {
          provide: REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
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

    useCase = module.get<SignInUseCase>(SignInUseCase);
    mockUsersRepository = module.get(REPOSITORY_TOKEN);
    mockDataAccessor = module.get(DATA_ACCESSOR_TOKEN);
  });

  describe('excute', () => {
    test('emailAddress와 password가 일치하는 데이터가 존재하면 로그인 처리 후 access token 발급', async () => {});

    test('emailAddress가 일치하는 유저가 존재하지 않을 시 UserNotFoundError 발생', async () => {});

    test('emailAddress가 일치하는 유저는 존재하나 비밀번호가 일치하지 않을 시 UserNotFoundError 발생', async () => {});
  });
});
