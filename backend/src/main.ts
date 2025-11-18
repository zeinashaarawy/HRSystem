import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getConnectionToken } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Test MongoDB connection
  try {
    const connection = app.get<Connection>(getConnectionToken());
    console.log('✅ MongoDB connected successfully!');
    if (connection.db) {
      console.log('Database:', connection.db.databaseName);
    }
    console.log('Host:', connection.host);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
  }
  
  const port = process.env.PORT ?? 3000;
  
  try {
    await app.listen(port);
    console.log(`🚀 Application is running on: http://localhost:${port}`);
    console.log(`📝 CRUD endpoints available at: http://localhost:${port}/payroll-schemas`);
  } catch (error: any) {
    if (error.code === 'EADDRINUSE') {
      console.error(`\n❌ Port ${port} is already in use!`);
      console.error(`\n💡 To fix this, run one of the following:`);
      console.error(`   1. Kill the process: .\\kill-port.ps1 -Port ${port}`);
      console.error(`   2. Use a different port: PORT=3001 npm run start:dev`);
      console.error(`   3. Find and kill manually: Get-NetTCPConnection -LocalPort ${port} | Stop-Process -Id {OwningProcess} -Force\n`);
      process.exit(1);
    } else {
      throw error;
    }
  }
}
bootstrap();




