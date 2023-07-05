import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const host = process.env.HOST || 'localhost';
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(port, host);
  logger.log(`Listening on ${host}:${port}`);
}
bootstrap();
