import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { RedisModule } from '@nestjs-modules/ioredis';
import { ControllersModule } from './presentaion/restApi/controllers/controllers.module';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

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
          namingStrategy: new SnakeNamingStrategy(),
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
    ControllersModule,
  ],
})
export class AppModule {}
