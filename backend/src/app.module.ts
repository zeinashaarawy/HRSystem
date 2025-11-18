import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Feature Modules
import { AttendanceModule } from './modules/attendance/attendance.module';
import { EmployeeLeaveBalanceModule } from './modules/employee-leave-balance/employee-leave-balance.module';
import { EmployeeProfileModule } from './modules/employee-profile/employee-profile.module';
import { HolidayModule } from './modules/holiday/holiday.module';
import { IntegrationModule } from './modules/integration/integration.module';
import { LeaveAdjustmentsModule } from './modules/leave-adjustments/leave-adjustments.module';
import { LeavePoliciesModule } from './modules/leave-policies/leave-policies.module';
import { LeaveRequestsModule } from './modules/leave-requests/leave-requests.module';
import { LeaveTypesModule } from './modules/leave-types/leave-types.module';
import { OrganizationCalendarModule } from './modules/organization-calendar/organization-calendar.module';
import { OrganizationStructureModule } from './modules/organization-structure/organization-structure.module';
import { PerformanceModule } from './modules/performance/performance.module';
import { ShiftModule } from './modules/shift/shift.module';
import { ShiftAssignmentModule } from './modules/shift-assignment/shift-assignment.module';
import { TimeExceptionModule } from './modules/time-exception/time-exception.module';
import { TimeManagementModule } from './modules/time-management/time-management.module';
import { VacationPackagesModule } from './modules/vacation-packages/vacation-packages.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
    }),
    // Feature Modules
    AttendanceModule,
    EmployeeLeaveBalanceModule,
    EmployeeProfileModule,
    HolidayModule,
    IntegrationModule,
    LeaveAdjustmentsModule,
    LeavePoliciesModule,
    LeaveRequestsModule,
    LeaveTypesModule,
    OrganizationCalendarModule,
    OrganizationStructureModule,
    PerformanceModule,
    ShiftModule,
    ShiftAssignmentModule,
    TimeExceptionModule,
    TimeManagementModule,
    VacationPackagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
