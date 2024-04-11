import { ApiProperty } from '@nestjs/swagger';

export class EnqueueResponseDto {
  @ApiProperty({ example: 'user_queue_token' })
  queueToken: string;
}
