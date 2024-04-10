import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Patch,
  ValidationPipe,
} from '@nestjs/common';

@Controller('reservation')
export class ReservationController {
  constructor() {}

  @Get('/performaces')
  @Header('Authorization', 'none')
  @Header('Queue-Token', 'none')
  async getPerformances() {
    const mockData = {
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
    return mockData;
  }

  @Get('/performance_seats/:performance_staging_date_id')
  @Header('Authorization', 'none')
  @Header('Queue-Token', 'none')
  async getPerformanceSeats(
    @Param('performance_staging_date_id') performanceStagingDateId,
  ) {
    const mockData = {
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
    return mockData;
  }

  @Patch('/take_performance_seat')
  @Header('Authorization', 'none')
  @Header('Queue-Token', 'none')
  async takePerformanceSeat(
    @Body(ValidationPipe) body: { performance_seat_id: string },
  ) {
    const mockData = {
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
    return mockData;
  }

  @Get('/reserved_performance_seats')
  @Header('Authorization', 'none')
  async getReservedPerformanceSeats() {
    const mockData = {
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
            seat: {
              id: 1,
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
    return mockData;
  }
}
