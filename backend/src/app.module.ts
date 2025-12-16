import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './employee-profile/auth/auth.module';
import { TimeManagementModule } from './time-management/time-management.module';
import { RecruitmentModule } from './recruitment/recruitment.module';
import { LeavesModule } from './leaves/leaves.module';
import { PayrollTrackingModule } from './payroll-tracking/payroll-tracking.module';
import { EmployeeProfileModule } from './employee-profile/employee-profile.module';
import { PerformanceModule } from './performance/performance.module';
import { PayrollConfigurationModule } from './payroll-configuration/payroll-configuration.module';
import { PayrollExecutionModule } from './payroll-execution/payroll-execution.module';
import { OrganizationStructureModule } from './organization-structure/organization-structure.module';

import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // Load environment variables globally
    ConfigModule.forRoot({ isGlobal: true }),

    // Connect to MongoDB (Atlas preferred)
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const mongoUri = configService.get<string>('MONGO_URI') || 'mongodb://localhost:27017/hr_system';
        return {
          uri: mongoUri,
        };
      },
    }),

    AuthModule,
    TimeManagementModule,
    RecruitmentModule,
    LeavesModule,
    PayrollExecutionModule,
    PayrollConfigurationModule,
    PayrollTrackingModule,
    EmployeeProfileModule,
    PerformanceModule,
    OrganizationStructureModule, // last
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
