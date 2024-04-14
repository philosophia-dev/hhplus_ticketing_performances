import {
  Body,
  Controller,
  Delete,
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
import { EnqueueRequestDto } from '../../dto/queue/queue.request.dto';
import {
  DeleteQueueResponseDto,
  QueueResponseDto,
} from '../../dto/queue/queue.response.dto';

@ApiTags('Queue')
@Controller('queue')
export class QueueController {
  constructor() {}

  @Post('/queue')
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
    type: QueueResponseDto,
    schema: {
      example: {
        id: '{USER_QUEUE_TOKEN}',
        requested_endpoint: '/endpoint',
        issued_timestamp: 1570543163783,
        active_timestamp: 1570543213783,
        expire_timestamp: 1570543263783,
        rank: 0,
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
      id: '{USER_QUEUE_TOKEN}',
      requested_endpoint: '/endpoint',
      issued_timestamp: 1570543163783,
      active_timestamp: 1570543213783,
      expire_timestamp: 1570543263783,
      rank: 0,
    };
    return MOCK_DATA;
  }

  @Get('/queue')
  @ApiOperation({
    summary: '대기열 토큰 정보 조회',
    description: '기존에 발급 받은 대기열 토큰의 정보를 조회한다.',
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
    type: QueueResponseDto,
    schema: {
      example: {
        id: '{USER_QUEUE_TOKEN}',
        requested_endpoint: '/endpoint',
        issued_timestamp: 1570543163783,
        active_timestamp: 1570543213783,
        expire_timestamp: 1570543263783,
        rank: 0,
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
  async getQueueItem(@Headers() headers: Record<string, string>) {
    const MOCK_DATA = {
      id: '{USER_QUEUE_TOKEN}',
      requested_endpoint: '/endpoint',
      issued_timestamp: 1570543163783,
      active_timestamp: 1570543213783,
      expire_timestamp: 1570543263783,
      rank: 0,
    };
    return MOCK_DATA;
  }

  @Delete('/queue')
  @ApiOperation({
    summary: '대기열 토큰 삭제',
    description:
      '기존에 발급 받은 대기열 토큰을 삭제한다. 주로 유저의 브라우저 이탈 등의 이벤트 발생 시 client에서 요청하기 위해 사용된다.',
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
    type: DeleteQueueResponseDto,
    schema: {
      example: {
        result: 'success',
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
  async deleteQueueItem(@Headers() headers: Record<string, string>) {
    const MOCK_DATA = {
      result: 'success',
    };
    return MOCK_DATA;
  }
}
