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
import {
  PaymentHistoryRepository,
  REPOSITORY_TOKEN as PAYMENT_HISTORY_REPOSITORY_TOKEN,
} from 'src/domain/payment/repositories/payment-history.repository';
import { PerformanceStagingDate } from 'src/domain/reservation/model/performance-staging-date.model';
import { Performance } from 'src/domain/reservation/model/performance.model';
import { Stage } from 'src/domain/reservation/model/stage.model';
import { CashBalance } from 'src/domain/payment/model/cash-balance.model';
import {
  PerformanceSeat,
  ReservationStatus,
} from 'src/domain/reservation/model/performance-seat.model';
import { PaymentHistory } from 'src/domain/payment/model/payment-history.model';
import { PaymentPerformanceSeatUseCase } from 'src/application/payment/use-cases/payment-performance-seat.use-case';
import {
  REPOSITORY_TOKEN as PERFORMANCE_SEATS_REPOSITORY_TOKEN,
  PerformanceSeatsRepository,
} from 'src/domain/reservation/repositories/performance-seats.repository';

describe('PaymentPerformanceSeatUseCase', () => {
  let useCase: PaymentPerformanceSeatUseCase;
  let mockUsersRepository: jest.Mocked<UsersRepository<User>>;
  let mockCashBalanceRepository: jest.Mocked<
    CashBalanceRepository<CashBalance>
  >;
  let mockPaymentHistoryRepository: jest.Mocked<
    PaymentHistoryRepository<PaymentHistory>
  >;
  let mockPerformanceSeatsRepository: jest.Mocked<
    PerformanceSeatsRepository<PerformanceSeat>
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

  let tempStage: Stage = {
    id: 'acbaceaa-0613-4544-8255-e1b9f7e00c65',
    dateCreated: new Date(),
    name: 'test concert hall',
    location: 'republic of korea',
  };

  let tempPerformance: Performance = {
    id: '5e4e6aab-783c-485f-bbec-c5f8c413e3a5',
    dateCreated: new Date(),
    stageId: tempStage.id,
    title: 'test concert',
    ticketingStartDate: new Date('2024-04-15 00:00'),
  };

  let tempPerformanceStagingDate: PerformanceStagingDate = {
    id: '0d801596-b2db-4fd5-b95d-6b7e54abb0b2',
    stagingDate: new Date(),
    performanceId: tempPerformance.id,
  };

  let tempPerformanceSeat1: PerformanceSeat = {
    id: '1a0d0859-85ce-44fd-aaae-45f8b5469aaf',
    dateCreated: new Date(),
    performanceStagingDateId: tempPerformanceStagingDate.id,
    seatNumber: 'R01',
    price: 100000,
    reservationStatus: ReservationStatus.AVAILABLE,
    reservedUserId: null,
  };

  let tempPerformanceSeat2: PerformanceSeat = {
    id: '0d3f9103-a912-4a4b-86e2-e7f06fd2c2fc',
    dateCreated: new Date(),
    performanceStagingDateId: tempPerformanceStagingDate.id,
    seatNumber: 'S01',
    price: 70000,
    reservationStatus: ReservationStatus.AVAILABLE,
    reservedUserId: null,
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
        PaymentPerformanceSeatUseCase,
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
          provide: PERFORMANCE_SEATS_REPOSITORY_TOKEN,
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

    useCase = module.get<PaymentPerformanceSeatUseCase>(
      PaymentPerformanceSeatUseCase,
    );
    mockUsersRepository = module.get(USERS_REPOSITORY_TOKEN);
    mockCashBalanceRepository = module.get(CASH_BALANCE_REPOSITORY_TOKEN);
    mockPaymentHistoryRepository = module.get(PAYMENT_HISTORY_REPOSITORY_TOKEN);
    mockPerformanceSeatsRepository = module.get(
      PERFORMANCE_SEATS_REPOSITORY_TOKEN,
    );
    mockDataAccessor = module.get(DATA_ACCESSOR_TOKEN);
  });

  describe('excute', () => {
    test('유효한 유저가 요청했으며, 좌석 결제 금액을 소지하고 있고, 결제 요청한 좌석이 유저 본인이 선점한 좌석일 경우 좌석 결제 처리 후 결과 반환', async () => {});

    test('결제 요청한 좌석이 유저 본인이 선점한 좌석이 아닐 경우 SeatNotTakenByUserError 발생', async () => {});

    test('결제 요청한 좌석이 이미 유저 본인에 의해 결제된 좌석일 경우 SeatAlreadyPaymentError 발생', async () => {});

    test('결제 요청한 좌석이 유저 본인이 선점한 좌석이나 잔액이 부족할 경우 InsufficientBalanceError 발생', async () => {});
  });
});
