import { Module } from '@nestjs/common';
import { QueueController } from './queue.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature()],
  controllers: [QueueController],
  providers: [],
})
export class QueueModule {}
