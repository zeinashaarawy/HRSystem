import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AvailabilityController } from './availability.controller';
import { AvailabilityService } from './availability.service';
import { Holiday, HolidaySchema } from '../holiday/schemas/holiday.schema';
import { ScheduleHelperService } from '../attendance/services/schedule-helper.service';
import { VacationIntegrationService } from '../attendance/services/vacation-integration.service';
import { AttendanceModule } from '../attendance/attendance.module';
import { LeavesModule } from '../../leaves/leaves.module';
import {
  AttendanceRecord,
  AttendanceRecordSchema,
} from '../attendance/schemas/attendance-record.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Holiday.name, schema: HolidaySchema },
      { name: AttendanceRecord.name, schema: AttendanceRecordSchema },
    ]),
    AttendanceModule, // Provides ScheduleHelperService
    forwardRef(() => LeavesModule), // Provides VacationIntegrationService access to LeavesService
  ],
  controllers: [AvailabilityController],
  providers: [
    AvailabilityService,
    // NOTE: VacationIntegrationService is also provided in TimeManagementModule.
    // This is acceptable because NestJS uses singleton instances by default,
    // so both modules will share the same instance.
    VacationIntegrationService, // Required by AvailabilityService
  ],
  exports: [AvailabilityService],
})
export class AvailabilityModule {}

