import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { configProvider } from './app.config.provider';
import { FilmsController } from './films/films.controller';
import { FilmsService } from './films/films.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Films } from './films/film.entity';
import { Schedules } from './order/schedule.entity';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: '.env',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_DRIVER'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [Films, Schedules],
        synchronize: true,
        ssl: false,
      }),
    }),
    TypeOrmModule.forFeature([Films, Schedules]),
  ],
  controllers: [FilmsController, OrderController],
  providers: [configProvider, FilmsService, OrderService],
})
export class AppModule {}
