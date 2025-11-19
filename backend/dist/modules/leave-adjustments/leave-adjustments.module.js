"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveAdjustmentsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const leave_adjustments_controller_1 = require("./leave-adjustments.controller");
const leave_adjustments_service_1 = require("./leave-adjustments.service");
const leave_adjustment_schema_1 = require("./schemas/leave-adjustment.schema");
const employee_leave_balance_module_1 = require("../employee-leave-balance/employee-leave-balance.module");
let LeaveAdjustmentsModule = class LeaveAdjustmentsModule {
};
exports.LeaveAdjustmentsModule = LeaveAdjustmentsModule;
exports.LeaveAdjustmentsModule = LeaveAdjustmentsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: leave_adjustment_schema_1.LeaveAdjustment.name, schema: leave_adjustment_schema_1.LeaveAdjustmentSchema }]),
            (0, common_1.forwardRef)(() => employee_leave_balance_module_1.EmployeeLeaveBalanceModule),
        ],
        controllers: [leave_adjustments_controller_1.LeaveAdjustmentsController],
        providers: [leave_adjustments_service_1.LeaveAdjustmentsService],
        exports: [leave_adjustments_service_1.LeaveAdjustmentsService],
    })
], LeaveAdjustmentsModule);
//# sourceMappingURL=leave-adjustments.module.js.map