import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CollectionsInitService } from './database/collections-init.service';
import { PayrollRunEmployeeModule } from './payroll-run-employee/payroll-run-employee.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    PayrollRunEmployeeModule,
  ],
  controllers: [AppController],
  providers: [AppService, CollectionsInitService],
})
export class AppModule {}

