import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ ENABLE CORS FOR FRONTEND
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3001', // Next.js frontend (default port 3001)
    credentials: true,
  });

  // ✅ SWAGGER SETUP
  const config = new DocumentBuilder()
    .setTitle('Employee Profile API')
    .setDescription('API documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // ✅ START SERVER
  await app.listen(process.env.PORT || 3000);

  console.log(`🚀 Backend running on http://localhost:${process.env.PORT || 3000}`);
}

bootstrap();