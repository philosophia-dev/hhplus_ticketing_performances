import { ApiProperty } from '@nestjs/swagger';
import { ReservationStatus } from 'src/domain/reservation/model/performance-seat.model';

class StageDto {
  @ApiProperty({ example: 'Grand Theater' })
  name: string;

  @ApiProperty({ example: 'Downtown, City' })
  location: string;
}

class PerformanceDateDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ example: '2024-05-01T00:00:00.000Z' })
  stagingDate: Date;

  @ApiProperty({ example: 10 })
  reserveableSeatsCount: number;
}

export class PerformanceDto {
  @ApiProperty({ example: 'The Great Show' })
  title: string;

  @ApiProperty({ example: '2024-04-15T00:00:00.000Z' })
  ticketingStartDate: Date;

  @ApiProperty({ type: StageDto })
  stage: StageDto;

  @ApiProperty({ type: [PerformanceDateDto] })
  performanceStagingDate: PerformanceDateDto[];
}

export class SeatDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ example: '1' })
  seatNumber: string;

  @ApiProperty({ example: 70000 })
  price: number;

  @ApiProperty({ example: 'TEMPORARY_RESERVED' })
  reservationStatus: ReservationStatus;
}

export class TakeSeatResponseDto {
  @ApiProperty({ example: 'success' })
  result: 'success' | 'fail';

  @ApiProperty({ type: SeatDto })
  data: SeatDto;
}
