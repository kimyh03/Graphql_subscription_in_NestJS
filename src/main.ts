import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as Sentry from '@sentry/node';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  Sentry.init({
    dsn:
      'https://591fafc005cd48d983ed042117b4c156@o503502.ingest.sentry.io/5588729',
  });
  await app.listen(3000);
}
bootstrap();
