import { ApiProperty } from '@nestjs/swagger';

export class TakeSeatDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  performance_seat_id: string;
}
