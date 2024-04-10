import { Module } from '@nestjs/common';
import { ReservationController } from './reservation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature()],
  controllers: [ReservationController],
  providers: [],
})
export class ReservationModule {}
