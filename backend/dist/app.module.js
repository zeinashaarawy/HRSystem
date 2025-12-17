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
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./employee-profile/auth/auth.module");
const time_management_module_1 = require("./time-management/time-management.module");
const recruitment_module_1 = require("./recruitment/recruitment.module");
const leaves_module_1 = require("./leaves/leaves.module");
const payroll_tracking_module_1 = require("./payroll-tracking/payroll-tracking.module");
const employee_profile_module_1 = require("./employee-profile/employee-profile.module");
const performance_module_1 = require("./performance/performance.module");
const payroll_configuration_module_1 = require("./payroll-configuration/payroll-configuration.module");
const payroll_execution_module_1 = require("./payroll-execution/payroll-execution.module");
const organization_structure_module_1 = require("./organization-structure/organization-structure.module");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    const mongoUri = configService.get('MONGO_URI') || 'mongodb://localhost:27017/hr_system';
                    return {
                        uri: mongoUri,
                    };
                },
            }),
            auth_module_1.AuthModule,
            time_management_module_1.TimeManagementModule,
            recruitment_module_1.RecruitmentModule,
            leaves_module_1.LeavesModule,
            payroll_execution_module_1.PayrollExecutionModule,
            payroll_configuration_module_1.PayrollConfigurationModule,
            payroll_tracking_module_1.PayrollTrackingModule,
            employee_profile_module_1.EmployeeProfileModule,
            performance_module_1.PerformanceModule,
            organization_structure_module_1.OrganizationStructureModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map