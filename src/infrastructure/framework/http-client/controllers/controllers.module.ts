import { Module } from '@nestjs/common';
import { QueueController } from './queue.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { ReservationController } from './reservation.controller';
import { PaymentController } from './payment.controller';

@Module({
  imports: [TypeOrmModule.forFeature()],
  controllers: [
    AuthController,
    ReservationController,
    PaymentController,
    QueueController,
  ],
  providers: [],
})
export class ControllersModule {}
