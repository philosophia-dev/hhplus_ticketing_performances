import {
  Body,
  Controller,
  Get,
  Header,
  Headers,
  HttpStatus,
  Param,
  Patch,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBody,
  ApiHeaders,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  PerformanceDto,
  SeatDto,
  TakeSeatResponseDto,
} from '../dto/reservation/reservation.response.dto';
import { TakeSeatDto } from '../dto/reservation/reservation.request.dto';

@ApiTags('Reservation')
@Controller('reservation')
export class ReservationController {
  constructor() {}

  @Get('/performaces')
  @ApiOperation({
    summary: '공연 목록 조회',
    description:
      '공연 전체 목록 및 해당 공연의 일정을 반환한다. 각 일정에는 예매 가능한 좌석의 수를 포함한다.',
  })
  @ApiHeaders([
    {
      name: 'Authorization',
      required: true,
      description:
        '유저가 로그인 시 발급 받은 접근 토큰 : Bearer {USER_ACCESS_TOKEN}',
    },
    {
      name: 'Queue-Token',
      required: true,
      description:
        '유저가 대기열에 등록하고 받은 토큰 : Bearer {USER_QUEUE_TOKEN}',
    },
  ])
  @ApiResponse({
    status: HttpStatus.OK,
    type: Array<PerformanceDto>,
    description: '공연 목록과 함께 대기열 정보를 함께 반환한다.',
    schema: {
      example: {
        data: {
          title: '공연 제목',
          ticketing_start_date: '2024-04-15T00:00:00.000Z',
          stage: {
            name: '공연장 이름',
            location: '공연장 위치',
          },
          performance_staging_date: [
            {
              id: 1,
              staging_date: '2024-05-01T00:00:00.000Z',
              reserveable_seats_count: 10,
            },
          ],
        },
        queue_data: {
          id: '{UUID}',
          issued_timestamp: 1570543163783,
          active_timestamp: 1570543213783,
          expire_timestamp: 1570543263783,
          rank: 0,
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description:
      '대기열에 존재하지 않는 유저일 경우 새로 대기열에 추가한 후 대기 정보를 반환한다. 이미 대기열에 존재하는 유저일 경우 현재 대기 정보를 반환한다.',
    schema: {
      example: {
        message: 'Please wait for your order to arrive.',
        queue_data: {
          id: '{UUID}',
          issued_timestamp: 1570543163783,
          rank: 10,
        },
        statusCode: 202,
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
    schema: {
      example: {
        message: '<error-message>',
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    schema: {
      example: {
        message: '<error-message>',
        error: 'Bad Request',
        statusCode: 401,
      },
    },
  })
  async getPerformances(@Headers() headers: Record<string, string>) {
    const MOCK_DATA = {
      data: {
        title: '공연 제목',
        ticketing_start_date: '2024-04-15T00:00:00.000Z',
        stage: {
          name: '공연장 이름',
          location: '공연장 위치',
        },
        performance_staging_date: [
          {
            id: 1,
            staging_date: '2024-05-01T00:00:00.000Z',
            reserveable_seats_count: 10,
          },
        ],
      },
      queue_data: {
        id: '{UUID}',
        issued_timestamp: 1570543163783,
        active_timestamp: 1570543213783,
        expire_timestamp: 1570543263783,
        rank: 0,
      },
    };
    return MOCK_DATA;
  }

  @ApiOperation({
    summary: '좌석 목록 조회',
    description:
      '특정 공연 일정의 좌석 목록을 조회한다. 각 좌석의 예매 가능 상태를 포함한다.',
  })
  @ApiHeaders([
    {
      name: 'Authorization',
      required: true,
      description:
        '유저가 로그인 시 발급 받은 접근 토큰 : Bearer {USER_ACCESS_TOKEN}',
    },
    {
      name: 'Queue-Token',
      required: true,
      description:
        '유저가 대기열에 등록하고 받은 토큰 : Bearer {USER_QUEUE_TOKEN}',
    },
  ])
  @ApiResponse({
    status: HttpStatus.OK,
    type: Array<SeatDto>,
    description:
      '좌석 목록과 함께 대기열 정보를 함께 반환한다. [reservation_status] "AVAILABLE" : 예매 가능, "TEMPORARY_RESERVED" : 이미 선점되어 있으며 결제 대기중, "RESERVED" : 예매됨',
    schema: {
      example: {
        data: [
          {
            id: '123e4567-e89b-12d3-a456-426614174000',
            seat_number: '1',
            price: 70000,
            reservation_status: 'AVAILABLE',
          },
        ],
        queue_data: {
          id: '{UUID}',
          issued_timestamp: 1570543163783,
          active_timestamp: 1570543213783,
          expire_timestamp: 1570543263783,
          rank: 0,
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description:
      '대기열에 존재하지 않는 유저일 경우 새로 대기열에 추가한 후 대기 정보를 반환한다. 이미 대기열에 존재하는 유저일 경우 현재 대기 정보를 반환한다.',
    schema: {
      example: {
        message: 'Please wait for your order to arrive.',
        queue_data: {
          id: '{UUID}',
          issued_timestamp: 1570543163783,
          rank: 10,
        },
        statusCode: 202,
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
    schema: {
      example: {
        message: '<error-message>',
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    schema: {
      example: {
        message: '<error-message>',
        error: 'Bad Request',
        statusCode: 401,
      },
    },
  })
  @Get('/performance_seats/:performance_staging_date_id')
  async getPerformanceSeats(
    @Param('performance_staging_date_id') performanceStagingDateId: string,
    @Headers() headers: Record<string, string>,
  ) {
    const MOCK_DATA = {
      data: [
        {
          id: 1,
          seat_number: '1',
          price: 70000,
          reservation_status: 'AVAILABLE',
        },
      ],
      queue_data: {
        id: '{UUID}',
        issued_timestamp: 1570543163783,
        active_timestamp: 1570543213783,
        expire_timestamp: 1570543263783,
        rank: 0,
      },
    };
    return MOCK_DATA;
  }

  @ApiOperation({
    summary: '좌석 선점 요청',
    description: '특정 공연 일정의 특정 좌석을 선점 요청한다.',
  })
  @ApiHeaders([
    {
      name: 'Authorization',
      required: true,
      description:
        '유저가 로그인 시 발급 받은 접근 토큰 : Bearer {USER_ACCESS_TOKEN}',
    },
    {
      name: 'Queue-Token',
      required: true,
      description:
        '유저가 대기열에 등록하고 받은 토큰 : Bearer {USER_QUEUE_TOKEN}',
    },
  ])
  @ApiBody({ type: TakeSeatDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '선점 요청 결과와 함께 대기열 정보를 함께 반환한다.',
    type: TakeSeatResponseDto,
    schema: {
      example: {
        result: 'success',
        data: {
          seat_number: '1',
          price: 70000,
          reservation_status: 'TEMPORARY_RESERVED',
        },
        queue_data: {
          id: '{UUID}',
          issued_timestamp: 1570543163783,
          active_timestamp: 1570543213783,
          expire_timestamp: 1570543263783,
          rank: 0,
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description:
      '대기열에 존재하지 않는 유저일 경우 새로 대기열에 추가한 후 대기 정보를 반환한다. 이미 대기열에 존재하는 유저일 경우 현재 대기 정보를 반환한다.',
    schema: {
      example: {
        message: 'Please wait for your order to arrive.',
        queue_data: {
          id: '{UUID}',
          issued_timestamp: 1570543163783,
          rank: 10,
        },
        statusCode: 202,
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
    schema: {
      example: {
        message: '<error-message>',
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    schema: {
      example: {
        message: '<error-message>',
        error: 'Bad Request',
        statusCode: 401,
      },
    },
  })
  @Patch('/take_performance_seat')
  async takePerformanceSeat(
    @Body(ValidationPipe) body: { performance_seat_id: string },
    @Headers() headers: Record<string, string>,
  ) {
    const MOCK_DATA = {
      result: 'success',
      data: {
        seat_number: '1',
        price: 70000,
        reservation_status: 'TEMPORARY_RESERVED',
      },
      queue_data: {
        id: '{UUID}',
        issued_timestamp: 1570543163783,
        active_timestamp: 1570543213783,
        expire_timestamp: 1570543263783,
        rank: 0,
      },
    };
    return MOCK_DATA;
  }

  @ApiOperation({
    summary: '선점하거나 예매한 좌석 목록 조회',
    description: '유저가 선점하거나 예매한 좌석 목록을 조회한다.',
  })
  @ApiHeaders([
    {
      name: 'Authorization',
      required: true,
      description:
        '유저가 로그인 시 발급 받은 접근 토큰 : Bearer {USER_ACCESS_TOKEN}',
    },
  ])
  @ApiResponse({
    status: HttpStatus.OK,
    type: Array<
      PerformanceDto & {
        performance_staging_date: Omit<
          PerformanceDto['performance_staging_date'],
          'reserveable_seats_count'
        > & { seat: SeatDto[] };
      }
    >,
    description:
      '유저가 선점하거나 예매한 좌석 목록과 함께 대기열 정보를 함께 반환한다.',
    schema: {
      example: {
        data: [
          {
            title: '공연 제목',
            ticketing_start_date: '2024-04-15T00:00:00.000Z',
            stage: {
              name: '공연장 이름',
              location: '공연장 위치',
            },
            performance_staging_date: [
              {
                id: 1,
                staging_date: '2024-05-01T00:00:00.000Z',
                seat: [
                  {
                    id: 1,
                    seat_number: '1',
                    price: 70000,
                    reservation_status: 'TEMPORARY_RESERVED',
                  },
                ],
              },
            ],
          },
        ],
        queue_data: {
          id: '{UUID}',
          issued_timestamp: 1570543163783,
          active_timestamp: 1570543213783,
          expire_timestamp: 1570543263783,
          rank: 0,
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
    schema: {
      example: {
        message: '<error-message>',
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    schema: {
      example: {
        message: '<error-message>',
        error: 'Bad Request',
        statusCode: 401,
      },
    },
  })
  @Get('/reserved_performance_seats')
  async getReservedPerformanceSeats(
    @Headers('authorization') authorization: string,
  ) {
    const MOCK_DATA = {
      data: {
        title: '공연 제목',
        ticketing_start_date: '2024-04-15T00:00:00.000Z',
        stage: {
          name: '공연장 이름',
          location: '공연장 위치',
        },
        performance_staging_date: [
          {
            id: '123e4567-e89b-12d3-a456-426614174000',
            staging_date: '2024-05-01T00:00:00.000Z',
            seat: {
              id: '123e4567-e89b-12d3-a456-426614174000',
              seat_number: '1',
              price: 70000,
              reservation_status: 'TEMPORARY_RESERVED',
            },
          },
        ],
      },
      queue_data: {
        id: '{UUID}',
        issued_timestamp: 1570543163783,
        active_timestamp: 1570543213783,
        expire_timestamp: 1570543263783,
        rank: 0,
      },
    };
    return MOCK_DATA;
  }
}
