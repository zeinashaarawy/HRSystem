"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerformanceModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const performance_service_1 = require("./performance.service");
const performance_controller_1 = require("./performance.controller");
const performance_template_schema_1 = require("./schemas/performance-template.schema");
const performance_cycle_schema_1 = require("./schemas/performance-cycle.schema");
const performance_appraisal_schema_1 = require("./schemas/performance-appraisal.schema");
const employee_profile_module_1 = require("../employee-profile/employee-profile.module");
let PerformanceModule = class PerformanceModule {
};
exports.PerformanceModule = PerformanceModule;
exports.PerformanceModule = PerformanceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: performance_template_schema_1.PerformanceTemplate.name, schema: performance_template_schema_1.PerformanceTemplateSchema },
                { name: performance_cycle_schema_1.PerformanceCycle.name, schema: performance_cycle_schema_1.PerformanceCycleSchema },
                { name: performance_appraisal_schema_1.PerformanceAppraisal.name, schema: performance_appraisal_schema_1.PerformanceAppraisalSchema },
            ]),
            (0, common_1.forwardRef)(() => employee_profile_module_1.EmployeeProfileModule),
        ],
        controllers: [performance_controller_1.PerformanceController],
        providers: [performance_service_1.PerformanceService],
    })
], PerformanceModule);
//# sourceMappingURL=performance.module.js.map