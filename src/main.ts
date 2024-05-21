import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggerInterceptor } from './interceptors/log.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ origin: '*' });
  app.setGlobalPrefix('api');
  app.useGlobalInterceptors(new LoggerInterceptor());
  await app.listen(3000);
}
bootstrap();
