"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeManagementService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const attendance_schema_1 = require("../attendance/attendance.schema");
const employee_schema_1 = require("../employee-profile/schemas/employee.schema");
const department_schema_1 = require("../organization-structure/schemas/department.schema");
const shift_schema_1 = require("../shift/shift.schema");
const holiday_schema_1 = require("../holiday/holiday.schema");
const position_schema_1 = require("../organization-structure/schemas/position.schema");
const time_exception_schema_1 = require("../time-exception/time-exception.schema");
let TimeManagementService = class TimeManagementService {
    attendanceModel;
    employeeModel;
    departmentModel;
    shiftModel;
    holidayModel;
    positionModel;
    timeExceptionModel;
    constructor(attendanceModel, employeeModel, departmentModel, shiftModel, holidayModel, positionModel, timeExceptionModel) {
        this.attendanceModel = attendanceModel;
        this.employeeModel = employeeModel;
        this.departmentModel = departmentModel;
        this.shiftModel = shiftModel;
        this.holidayModel = holidayModel;
        this.positionModel = positionModel;
        this.timeExceptionModel = timeExceptionModel;
    }
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
};
exports.TimeManagementService = TimeManagementService;
exports.TimeManagementService = TimeManagementService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(attendance_schema_1.Attendance.name)),
    __param(1, (0, mongoose_1.InjectModel)(employee_schema_1.Employee.name)),
    __param(2, (0, mongoose_1.InjectModel)(department_schema_1.Department.name)),
    __param(3, (0, mongoose_1.InjectModel)(shift_schema_1.Shift.name)),
    __param(4, (0, mongoose_1.InjectModel)(holiday_schema_1.Holiday.name)),
    __param(5, (0, mongoose_1.InjectModel)(position_schema_1.Position.name)),
    __param(6, (0, mongoose_1.InjectModel)(time_exception_schema_1.TimeException.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], TimeManagementService);
//# sourceMappingURL=time-management.service.js.map