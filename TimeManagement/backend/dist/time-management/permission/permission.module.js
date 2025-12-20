"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const permission_validation_service_1 = require("./services/permission-validation.service");
const permission_validation_controller_1 = require("./controllers/permission-validation.controller");
const employee_profile_schema_1 = require("../../employee-profile/models/employee-profile.schema");
const time_policy_schema_1 = require("../policy/schemas/time-policy.schema");
const time_exception_schema_1 = require("../attendance/schemas/time-exception.schema");
let PermissionModule = class PermissionModule {
};
exports.PermissionModule = PermissionModule;
exports.PermissionModule = PermissionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: employee_profile_schema_1.EmployeeProfile.name, schema: employee_profile_schema_1.EmployeeProfileSchema },
                { name: time_policy_schema_1.TimePolicy.name, schema: time_policy_schema_1.TimePolicySchema },
                { name: time_exception_schema_1.TimeException.name, schema: time_exception_schema_1.TimeExceptionSchema },
            ]),
        ],
        controllers: [permission_validation_controller_1.PermissionValidationController],
        providers: [permission_validation_service_1.PermissionValidationService],
        exports: [permission_validation_service_1.PermissionValidationService],
    })
], PermissionModule);
//# sourceMappingURL=permission.module.js.map