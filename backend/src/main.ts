import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load .env file from project root (where package.json is)
// Try current directory first, then one level up
let envPath = resolve(process.cwd(), '.env');
const fs = require('fs');
if (!fs.existsSync(envPath)) {
  // Try one level up (project root where package.json is)
  envPath = resolve(process.cwd(), '..', '.env');
}
const result = dotenv.config({ path: envPath });

if (result.error) {
  console.warn('⚠️  Could not load .env file:', result.error.message);
  console.warn('   Looking for .env at:', envPath);
} else {
  console.log('✅ Loaded .env file from:', envPath);
  console.log('📝 MONGO_URI:', process.env.MONGO_URI ? 'Set ✓' : 'Missing ✗');
}

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable validation pipes globally
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger/OpenAPI setup
  const config = new DocumentBuilder()
    .setTitle('HR Recruitment, Onboarding & Offboarding API')
    .setDescription('API documentation for Recruitment subsystem (Milestone 2)')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('recruitment', 'Recruitment process endpoints')
    .addTag('jobs', 'Job templates and requisitions')
    .addTag('applications', 'Candidate applications')
    .addTag('interviews', 'Interview scheduling and feedback')
    .addTag('offers', 'Job offers and approvals')
    .addTag('analytics', 'Recruitment analytics')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
  console.log(`🚀 Application is running on: http://localhost:${process.env.PORT ?? 3000}`);
  console.log(`📚 Swagger documentation: http://localhost:${process.env.PORT ?? 3000}/api`);
}
bootstrap();
