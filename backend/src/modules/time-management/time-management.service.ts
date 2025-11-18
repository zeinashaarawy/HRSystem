import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { Attendance, AttendanceDocument } from '../attendance/attendance.schema';
import { Employee } from '../employee-profile/schemas/employee.schema';
import { Department } from '../organization-structure/schemas/department.schema';
import { Shift, ShiftDocument } from '../shift/shift.schema';
import { Holiday, HolidayDocument } from '../holiday/holiday.schema';
import { Position } from '../organization-structure/schemas/position.schema';
import { TimeException, TimeExceptionDocument } from '../time-exception/time-exception.schema';

@Injectable()
export class TimeManagementService {
  constructor(
    @InjectModel(Attendance.name) private attendanceModel: Model<AttendanceDocument>,
    @InjectModel(Employee.name) private employeeModel: Model<Employee & Document>,
    @InjectModel(Department.name) private departmentModel: Model<Department & Document>,
    @InjectModel(Shift.name) private shiftModel: Model<ShiftDocument>,
    @InjectModel(Holiday.name) private holidayModel: Model<HolidayDocument>,
    @InjectModel(Position.name) private positionModel: Model<Position & Document>,
    @InjectModel(TimeException.name) private timeExceptionModel: Model<TimeExceptionDocument>
  ) {}

  async getAttendanceSummary() {
    return this.attendanceModel.find().exec();
  }

  async getAllEmployees() {
    return this.employeeModel.find().exec();
  }

  async getAllDepartments() {
    return this.departmentModel.find().exec();
  }

  async getAllShifts() {
    return this.shiftModel.find().exec();
  }

  async getAllHolidays() {
    return this.holidayModel.find().exec();
  }

  async getAllPositions() {
    return this.positionModel.find().exec();
  }

  async getAllTimeExceptions() {
    return this.timeExceptionModel.find().exec();
  }
}
