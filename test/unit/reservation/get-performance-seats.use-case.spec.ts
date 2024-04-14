import { Test, TestingModule } from '@nestjs/testing';
import { GetPerformanceSeatsUseCase } from 'src/application/reservation/use-cases/get-performance-seats.use-case';
import { User } from 'src/domain/auth/model/user.entity';
import {
  REPOSITORY_TOKEN as USERS_REPOSITORY_TOKEN,
  UsersRepository,
} from 'src/domain/auth/repositories/users.repository';
import {
  DataAccessor,
  TOKEN as DATA_ACCESSOR_TOKEN,
} from 'src/domain/base/data-accessor.interface';
import {
  PerformanceSeat,
  ReservationStatus,
} from 'src/domain/reservation/model/performance-seat.entity';
import { PerformanceStagingDate } from 'src/domain/reservation/model/performance-staging-date.entity';
import { Performance } from 'src/domain/reservation/model/performance.entity';
import { Stage } from 'src/domain/reservation/model/stage.entity';
import {
  REPOSITORY_TOKEN as PERFORMANCE_SEATS_REPOSITORY_TOKEN,
  PerformanceSeatsRepository,
} from 'src/domain/reservation/repositories/performance-seats.repository';

describe('GetPerformanceSeatsUseCase', () => {
  let useCase: GetPerformanceSeatsUseCase;
  let mockUsersRepository: jest.Mocked<UsersRepository<User>>;
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
        GetPerformanceSeatsUseCase,
        {
          provide: USERS_REPOSITORY_TOKEN,
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

    useCase = module.get<GetPerformanceSeatsUseCase>(
      GetPerformanceSeatsUseCase,
    );
    mockUsersRepository = module.get(USERS_REPOSITORY_TOKEN);
    mockPerformanceSeatsRepository = module.get(
      PERFORMANCE_SEATS_REPOSITORY_TOKEN,
    );
    mockDataAccessor = module.get(DATA_ACCESSOR_TOKEN);
  });

  describe('excute', () => {
    test('유효한 유저가 요청했으며, performanceStagingDateId가 유효하고, 해당하는 performanceStagingDateId의 좌석 중 예매 가능한 좌석이 남아있을 경우 좌석 정보 반환', async () => {});

    test('유저가 존재하지 않을 경우 UserNotFoundError 발생', async () => {});

    test('performanceStagingDateId가 유효하지만 해당하는 performanceStagingDateId의 공연 티켓팅 시작 일시에 아직 도달하지 않았을 경우 TicketingNotStartError 발생', async () => {});

    test('performanceStagingDateId가 유효하지만 해당하는 performanceStagingDateId의 좌석 중 예매 가능한 좌석이 없을 경우 SoldOutAllSeatsError 발생', async () => {});

    test('performanceStagingDateId가 유효하지 않을 시 IdNotFoundError 발생', async () => {});
  });
});