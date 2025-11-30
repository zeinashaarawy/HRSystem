import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecruitmentModule } from './recruitment/recruitment.module';
import { MongooseModule } from '@nestjs/mongoose';

/**
 * AppModule - Main application module
 * 
 * Currently includes only the Recruitment module.
 * 
 * When other subsystems are ready, add them to imports:
 * - TimeManagementModule
 * - LeavesModule
 * - PayrollTrackingModule
 * - EmployeeProfileModule
 * - OrganizationStructureModule
 * - PerformanceModule
 * - PayrollConfigurationModule
 * - PayrollExecutionModule
 * - OnboardingModule (when created)
 * 
 * See: backend/src/recruitment/INTEGRATION_GUIDE.md for detailed integration instructions
 */
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/hr-system'),
    RecruitmentModule,
    // Add other subsystem modules here when ready
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
