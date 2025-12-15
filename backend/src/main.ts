import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Allow the Next.js frontend (running on a different port) to call this API
  app.enableCors({
    origin: true, // reflect request origin
    credentials: false,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
