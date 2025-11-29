import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

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
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'prac',
      password: 'prac',
      database: 'prac',
      entities: [Films, Schedules],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Films]),
    TypeOrmModule.forFeature([Schedules]),
  ],
  controllers: [FilmsController, OrderController],
  providers: [configProvider, FilmsService, OrderService],
})
export class AppModule {}
