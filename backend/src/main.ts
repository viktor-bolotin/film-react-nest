import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/afisha');
  app.enableCors();
  await app.listen(process.env.PORT);
  const url = await app.getUrl();
  console.log(`Сервер работает на ${url}`);
}
bootstrap();
