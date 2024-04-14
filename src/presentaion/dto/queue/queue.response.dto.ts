import { ApiProperty } from '@nestjs/swagger';

export class QueueResponseDto {
  @ApiProperty({ example: 'user_queue_token' })
  id: string;

  @ApiProperty({ example: '/endpoint' })
  requested_endpoint: string;

  @ApiProperty({ example: 1570543163783 })
  issued_timestamp: number;

  @ApiProperty({ example: 1570543163783 })
  active_timestamp: number;

  @ApiProperty({ example: 1570543163783 })
  expire_timestamp: number;

  @ApiProperty({ example: 0 })
  rank: number;
}

export class DeleteQueueResponseDto {
  @ApiProperty({ example: 'success' })
  result: string;
}
