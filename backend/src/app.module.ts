import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Core modules
import { AttendanceModule } from './modules/attendance/attendance.module';
import { EmployeeProfileModule } from './modules/employee-profile/employee-profile.module';
import { EmployeeLeaveBalanceModule } from './modules/employee-leave-balance/employee-leave-balance.module';
import { HolidayModule } from './modules/holiday/holiday.module';
import { IntegrationModule } from './modules/integration/integration.module';
import { LeaveAdjustmentsModule } from './modules/leave-adjustments/leave-adjustments.module';
import { LeavePoliciesModule } from './modules/leave-policies/leave-policies.module';
import { LeaveRequestsModule } from './modules/leave-requests/leave-requests.module';
import { LeaveTypesModule } from './modules/leave-types/leave-types.module';
import { OffboardingModule } from './modules/offboarding/models/offboarding.module';
import { OnboardingModule } from './modules/onboarding/models/onboarding.module';
import { OrganizationCalendarModule } from './modules/organization-calendar/organization-calendar.module';
import { OrganizationStructureModule } from './modules/organization-structure/organization-structure.module';
import { PerformanceModule } from './modules/performance/performance.module';
import { RecruitmentModule } from './modules/recruitment/models/recruitment.module';
import { ShiftModule } from './modules/shift/shift.module';
import { ShiftAssignmentModule } from './modules/shift-assignment/shift-assignment.module';
import { TimeExceptionModule } from './modules/time-exception/time-exception.module';
import { TimeManagementModule } from './modules/time-management/time-management.module';
import { VacationPackagesModule } from './modules/vacation-packages/vacation-packages.module';
import { PayrollModule } from './modules/payroll/payroll.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/hr-system'),
    // Core modules
    AttendanceModule,
    EmployeeProfileModule,
    EmployeeLeaveBalanceModule,
    HolidayModule,
    IntegrationModule,
    LeaveAdjustmentsModule,
    LeavePoliciesModule,
    LeaveRequestsModule,
    LeaveTypesModule,
    OffboardingModule,
    OnboardingModule,
    OrganizationCalendarModule,
    OrganizationStructureModule,
    PerformanceModule,
    RecruitmentModule,
    ShiftModule,
    ShiftAssignmentModule,
    TimeExceptionModule,
    TimeManagementModule,
    VacationPackagesModule,
    PayrollModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
