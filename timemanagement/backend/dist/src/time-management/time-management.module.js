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
const config_1 = require("@nestjs/config");
const time_management_controller_1 = require("./time-management.controller");
const time_management_service_1 = require("./time-management.service");
const mongoose_1 = require("@nestjs/mongoose");
const schedule_1 = require("@nestjs/schedule");
const notification_log_schema_1 = require("./notifications/schemas/notification-log.schema");
const attendance_correction_request_schema_1 = require("./attendance/schemas/attendance-correction-request.schema");
const shift_type_schema_1 = require("./schedule/schemas/shift-type.schema");
const schedule_rule_schema_1 = require("./schedule/schemas/schedule-rule.schema");
const attendance_record_schema_1 = require("./attendance/schemas/attendance-record.schema");
const time_exception_schema_1 = require("./attendance/schemas/time-exception.schema");
const overtime_rule_schema_1 = require("./schedule/schemas/overtime-rule.schema");
const shift_schema_1 = require("./schedule/schemas/shift.schema");
const shift_assignment_schema_1 = require("./schedule/schemas/shift-assignment.schema");
const lateness_rule_schema_1 = require("./schedule/schemas/lateness-rule.schema");
const holiday_schema_1 = require("./holiday/schemas/holiday.schema");
const shift_module_1 = require("./Shift/shift.module");
const attendance_module_1 = require("./attendance/attendance.module");
const time_policy_schema_1 = require("./policy/schemas/time-policy.schema");
const penalty_record_schema_1 = require("./policy/schemas/penalty-record.schema");
const overtime_record_schema_1 = require("./policy/schemas/overtime-record.schema");
const policy_service_1 = require("./policy/services/policy.service");
const policy_engine_service_1 = require("./policy/services/policy-engine.service");
const policy_controller_1 = require("./policy/controllers/policy.controller");
const reporting_service_1 = require("./reporting/services/reporting.service");
const reporting_controller_1 = require("./reporting/controllers/reporting.controller");
const payroll_sync_log_schema_1 = require("./payroll/schemas/payroll-sync-log.schema");
const payroll_service_1 = require("./payroll/services/payroll.service");
const pre_payroll_service_1 = require("./payroll/services/pre-payroll.service");
const payroll_controller_1 = require("./payroll/controllers/payroll.controller");
let TimeManagementModule = class TimeManagementModule {
};
exports.TimeManagementModule = TimeManagementModule;
exports.TimeManagementModule = TimeManagementModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    const mongoUri = configService.get('MONGO_URI') || 'mongodb://localhost:27017';
                    return {
                        uri: mongoUri.trim(),
                        dbName: 'hr_system',
                        useNewUrlParser: true,
                        useUnifiedTopology: true,
                    };
                },
            }),
            schedule_1.ScheduleModule.forRoot(),
            mongoose_1.MongooseModule.forFeature([
                { name: shift_type_schema_1.ShiftType.name, schema: shift_type_schema_1.ShiftTypeSchema },
                { name: schedule_rule_schema_1.ScheduleRule.name, schema: schedule_rule_schema_1.ScheduleRuleSchema },
                { name: shift_schema_1.Shift.name, schema: shift_schema_1.ShiftSchema },
                { name: shift_assignment_schema_1.ShiftAssignment.name, schema: shift_assignment_schema_1.ShiftAssignmentSchema },
                { name: overtime_rule_schema_1.OvertimeRule.name, schema: overtime_rule_schema_1.OvertimeRuleSchema },
                { name: lateness_rule_schema_1.LatenessRule.name, schema: lateness_rule_schema_1.latenessRuleSchema },
                { name: holiday_schema_1.Holiday.name, schema: holiday_schema_1.HolidaySchema },
                { name: attendance_record_schema_1.AttendanceRecord.name, schema: attendance_record_schema_1.AttendanceRecordSchema },
                { name: time_exception_schema_1.TimeException.name, schema: time_exception_schema_1.TimeExceptionSchema },
                {
                    name: attendance_correction_request_schema_1.AttendanceCorrectionRequest.name,
                    schema: attendance_correction_request_schema_1.AttendanceCorrectionRequestSchema,
                },
                { name: time_policy_schema_1.TimePolicy.name, schema: time_policy_schema_1.TimePolicySchema },
                { name: penalty_record_schema_1.PenaltyRecord.name, schema: penalty_record_schema_1.PenaltyRecordSchema },
                { name: overtime_record_schema_1.OvertimeRecord.name, schema: overtime_record_schema_1.OvertimeRecordSchema },
                { name: payroll_sync_log_schema_1.PayrollSyncLog.name, schema: payroll_sync_log_schema_1.PayrollSyncLogSchema },
                { name: notification_log_schema_1.NotificationLog.name, schema: notification_log_schema_1.NotificationLogSchema },
            ]),
            shift_module_1.ShiftModule,
            attendance_module_1.AttendanceModule,
        ],
        controllers: [
            time_management_controller_1.TimeManagementController,
            policy_controller_1.PolicyController,
            reporting_controller_1.ReportingController,
            payroll_controller_1.PayrollController,
        ],
        providers: [
            time_management_service_1.TimeManagementService,
            policy_service_1.PolicyService,
            policy_engine_service_1.PolicyEngineService,
            reporting_service_1.ReportingService,
            payroll_service_1.PayrollService,
            pre_payroll_service_1.PrePayrollService,
        ],
        exports: [
            time_management_service_1.TimeManagementService,
            policy_service_1.PolicyService,
            policy_engine_service_1.PolicyEngineService,
            reporting_service_1.ReportingService,
            payroll_service_1.PayrollService,
            pre_payroll_service_1.PrePayrollService,
        ],
    })
], TimeManagementModule);
//# sourceMappingURL=time-management.module.js.map