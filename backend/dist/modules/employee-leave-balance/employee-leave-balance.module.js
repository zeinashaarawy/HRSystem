"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeLeaveBalanceModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const employee_leave_balance_schema_1 = require("./schemas/employee-leave-balance.schema");
const employee_leave_balance_controller_1 = require("./employee-leave-balance.controller");
const employee_leave_balance_service_1 = require("./employee-leave-balance.service");
let EmployeeLeaveBalanceModule = class EmployeeLeaveBalanceModule {
};
exports.EmployeeLeaveBalanceModule = EmployeeLeaveBalanceModule;
exports.EmployeeLeaveBalanceModule = EmployeeLeaveBalanceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: employee_leave_balance_schema_1.EmployeeLeaveBalance.name, schema: employee_leave_balance_schema_1.EmployeeLeaveBalanceSchema },
            ]),
        ],
        controllers: [employee_leave_balance_controller_1.EmployeeLeaveBalanceController],
        providers: [employee_leave_balance_service_1.EmployeeLeaveBalanceService],
        exports: [employee_leave_balance_service_1.EmployeeLeaveBalanceService],
    })
], EmployeeLeaveBalanceModule);
//# sourceMappingURL=employee-leave-balance.module.js.map