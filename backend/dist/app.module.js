"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const attendance_module_1 = require("./modules/attendance/attendance.module");
const employee_profile_module_1 = require("./modules/employee-profile/employee-profile.module");
const employee_leave_balance_module_1 = require("./modules/employee-leave-balance/employee-leave-balance.module");
const holiday_module_1 = require("./modules/holiday/holiday.module");
const integration_module_1 = require("./modules/integration/integration.module");
const leave_adjustments_module_1 = require("./modules/leave-adjustments/leave-adjustments.module");
const leave_policies_module_1 = require("./modules/leave-policies/leave-policies.module");
const leave_requests_module_1 = require("./modules/leave-requests/leave-requests.module");
const leave_types_module_1 = require("./modules/leave-types/leave-types.module");
const offboarding_module_1 = require("./modules/offboarding/models/offboarding.module");
const onboarding_module_1 = require("./modules/onboarding/models/onboarding.module");
const organization_calendar_module_1 = require("./modules/organization-calendar/organization-calendar.module");
const organization_structure_module_1 = require("./modules/organization-structure/organization-structure.module");
const performance_module_1 = require("./modules/performance/performance.module");
const recruitment_module_1 = require("./modules/recruitment/models/recruitment.module");
const shift_module_1 = require("./modules/shift/shift.module");
const shift_assignment_module_1 = require("./modules/shift-assignment/shift-assignment.module");
const time_exception_module_1 = require("./modules/time-exception/time-exception.module");
const time_management_module_1 = require("./modules/time-management/time-management.module");
const vacation_packages_module_1 = require("./modules/vacation-packages/vacation-packages.module");
const payroll_module_1 = require("./modules/payroll/payroll.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/hr-system'),
            attendance_module_1.AttendanceModule,
            employee_profile_module_1.EmployeeProfileModule,
            employee_leave_balance_module_1.EmployeeLeaveBalanceModule,
            holiday_module_1.HolidayModule,
            integration_module_1.IntegrationModule,
            leave_adjustments_module_1.LeaveAdjustmentsModule,
            leave_policies_module_1.LeavePoliciesModule,
            leave_requests_module_1.LeaveRequestsModule,
            leave_types_module_1.LeaveTypesModule,
            offboarding_module_1.OffboardingModule,
            onboarding_module_1.OnboardingModule,
            organization_calendar_module_1.OrganizationCalendarModule,
            organization_structure_module_1.OrganizationStructureModule,
            performance_module_1.PerformanceModule,
            recruitment_module_1.RecruitmentModule,
            shift_module_1.ShiftModule,
            shift_assignment_module_1.ShiftAssignmentModule,
            time_exception_module_1.TimeExceptionModule,
            time_management_module_1.TimeManagementModule,
            vacation_packages_module_1.VacationPackagesModule,
            payroll_module_1.PayrollModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map