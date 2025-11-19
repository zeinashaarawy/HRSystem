"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeManagementModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const time_management_controller_1 = require("./time-management.controller");
const time_management_service_1 = require("./time-management.service");
const attendance_schema_1 = require("../attendance/attendance.schema");
const shift_schema_1 = require("../shift/shift.schema");
const holiday_schema_1 = require("../holiday/holiday.schema");
const time_exception_schema_1 = require("../time-exception/time-exception.schema");
const department_schema_1 = require("../organization-structure/schemas/department.schema");
const position_schema_1 = require("../organization-structure/schemas/position.schema");
const employee_schema_1 = require("../employee-profile/schemas/employee.schema");
let TimeManagementModule = class TimeManagementModule {
};
exports.TimeManagementModule = TimeManagementModule;
exports.TimeManagementModule = TimeManagementModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: attendance_schema_1.Attendance.name, schema: attendance_schema_1.AttendanceSchema },
                { name: employee_schema_1.Employee.name, schema: employee_schema_1.EmployeeSchema },
                { name: shift_schema_1.Shift.name, schema: shift_schema_1.ShiftSchema },
                { name: department_schema_1.Department.name, schema: department_schema_1.DepartmentSchema },
                { name: holiday_schema_1.Holiday.name, schema: holiday_schema_1.HolidaySchema },
                { name: time_exception_schema_1.TimeException.name, schema: time_exception_schema_1.TimeExceptionSchema },
                { name: position_schema_1.Position.name, schema: position_schema_1.PositionSchema },
            ]),
        ],
        controllers: [time_management_controller_1.TimeManagementController],
        providers: [time_management_service_1.TimeManagementService],
        exports: [time_management_service_1.TimeManagementService],
    })
], TimeManagementModule);
//# sourceMappingURL=time-management.module.js.map