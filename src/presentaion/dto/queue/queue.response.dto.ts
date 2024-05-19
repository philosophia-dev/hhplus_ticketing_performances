import { ApiProperty } from '@nestjs/swagger';

export class QueueResponseDto {
  @ApiProperty({ example: 'user_queue_token' })
  id: string;

  @ApiProperty({ example: '/endpoint' })
  requestedEndpoint: string;

  @ApiProperty({ example: 1570543163783 })
  issuedTimestamp: number;

  @ApiProperty({ example: 1570543163783 })
  activeTimestamp: number;

  @ApiProperty({ example: 1570543163783 })
  expireTimestamp: number;

  @ApiProperty({ example: 0 })
  rank: number;
}

export class DeleteQueueResponseDto {
  @ApiProperty({ example: 'success' })
  result: 'success' | 'fail';
}
