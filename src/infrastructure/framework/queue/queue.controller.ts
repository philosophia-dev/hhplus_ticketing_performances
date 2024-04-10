import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';

@Controller('queue')
export class QueueController {
  constructor() {}

  @Post('/enqueue')
  @Header('Authorization', 'none')
  async enqueue(@Body(ValidationPipe) body: { request_endpoint: string }) {
    const mockData = {
      queueToken: '{USER_QUEUE_TOKEN}',
    };
    return mockData;
  }
}
