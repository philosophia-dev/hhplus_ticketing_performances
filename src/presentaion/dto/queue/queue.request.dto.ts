import { ApiProperty } from '@nestjs/swagger';

export class EnqueueRequestDto {
  @ApiProperty({
    example: '/reservation/performaces',
    description: '요청할 endpoint',
  })
  requestEndpoint: string;
}
