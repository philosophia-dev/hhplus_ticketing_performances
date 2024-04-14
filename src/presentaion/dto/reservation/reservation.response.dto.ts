import { ApiProperty } from '@nestjs/swagger';

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
  staging_date: Date;

  @ApiProperty({ example: 10 })
  reserveable_seats_count: number;
}

export class PerformanceDto {
  @ApiProperty({ example: 'The Great Show' })
  title: string;

  @ApiProperty({ example: '2024-04-15T00:00:00.000Z' })
  ticketing_start_date: Date;

  @ApiProperty({ type: StageDto })
  stage: StageDto;

  @ApiProperty({ type: [PerformanceDateDto] })
  performance_staging_date: PerformanceDateDto[];
}

export class SeatDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ example: '1' })
  seat_number: string;

  @ApiProperty({ example: 70000 })
  price: number;

  @ApiProperty({ example: 'TEMPORARY_RESERVED' })
  reservation_status: string;
}

export class TakeSeatResponseDto {
  @ApiProperty({ example: 'success' })
  result: string;

  @ApiProperty({ type: SeatDto })
  data: SeatDto;
}
