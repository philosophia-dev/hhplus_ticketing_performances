import {
  Body,
  Controller,
  Get,
  Header,
  Headers,
  HttpStatus,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBody,
  ApiHeaders,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { EnqueueRequestDto } from '../dto/queue/queue.request.dto';

@ApiTags('Queue')
@Controller('queue')
export class QueueController {
  constructor() {}

  @Post('/enqueue')
  @ApiOperation({
    summary: '대기열 토큰 발급',
    description:
      '대기가 필요한 API를 사용하는 데 필요한 대기열 토큰을 발급한다.',
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
    status: HttpStatus.CREATED,
    type: EnqueueRequestDto,
    schema: {
      example: {
        queueToken: '{USER_QUEUE_TOKEN}',
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
  async enqueue(
    @Headers('authorization') authorization: string,
    @Body(ValidationPipe) body: { request_endpoint: string },
  ) {
    const MOCK_DATA = {
      queueToken: '{USER_QUEUE_TOKEN}',
    };
    return MOCK_DATA;
  }
}
