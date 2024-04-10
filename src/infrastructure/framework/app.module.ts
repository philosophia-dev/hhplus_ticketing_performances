import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { RedisModule } from '@nestjs-modules/ioredis';
import { ReservationModule } from './reservation/reservation.module';
import { PaymentModule } from './payment/payment.module';
import { AuthModule } from './auth/auth.module';
import { QueueModule } from './queue/queue.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        return {
          type: process.env.DB_TYPE,
          host: process.env.DB_HOST,
          port: process.env.DB_PORT,
          username: process.env.DB_USER_NAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE,
          // entities: , //엔티티
          synchronize: false,
          logging: false,
        } as TypeOrmModuleOptions;
      },
    }),
    RedisModule.forRoot({
      options: {
        host: process.env.REDIS_HOST,
        port: +process.env.REDIS_PORT,
      },
      type: 'single',
    }),
    ReservationModule,
    PaymentModule,
    AuthModule,
    QueueModule,
  ],
})
export class AppModule {}
