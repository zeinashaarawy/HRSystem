import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TimeManagementController } from './time-management.controller';
import { TimeManagementService } from './time-management.service';
import { Attendance, AttendanceSchema } from '../attendance/attendance.schema';
import { Shift, ShiftSchema } from '../shift/shift.schema';
import { Holiday, HolidaySchema } from '../holiday/holiday.schema';
import { TimeException, TimeExceptionSchema } from '../time-exception/time-exception.schema';
import { Department, DepartmentSchema } from '../organization-structure/schemas/department.schema';
import { Position, PositionSchema } from '../organization-structure/schemas/position.schema';
import { Employee, EmployeeSchema } from '../employee-profile/schemas/employee.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Attendance.name, schema: AttendanceSchema },
      { name: Employee.name, schema: EmployeeSchema },
      { name: Shift.name, schema: ShiftSchema },
      { name: Department.name, schema: DepartmentSchema },
      { name: Holiday.name, schema: HolidaySchema },
      { name: TimeException.name, schema: TimeExceptionSchema },
      { name: Position.name, schema: PositionSchema },
    ]),
  ],
  controllers: [TimeManagementController],
  providers: [TimeManagementService],
  exports: [TimeManagementService],
})
export class TimeManagementModule {}