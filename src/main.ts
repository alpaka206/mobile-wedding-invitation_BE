import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;
  const origin = configService.get<string>('CORS_ORIGIN');
  const isProd = configService.get<string>('NODE_ENV');

  // 보안 헤더
  app.use(helmet());

  // CORS 설정 (production일 때만 credentials: true 허용)
  app.enableCors({
    origin: ['http://localhost:5173', origin],
    methods: ['GET', 'POST', 'DELETE'],
    credentials: isProd,
  });

  // DTO 유효성 검사
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // 포트 열기
  await app.listen(port, '0.0.0.0');
}

bootstrap();
