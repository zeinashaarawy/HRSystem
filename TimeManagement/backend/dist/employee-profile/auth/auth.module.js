"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const employee_profile_schema_1 = require("../models/employee-profile.schema");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const employee_system_role_schema_1 = require("../models/employee-system-role.schema");
const roles_guard_1 = require("../../common/guards/roles.guard");
const candidate_module_1 = require("../../candidate/candidate.module");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            AuthModule,
            mongoose_1.MongooseModule.forFeature([{ name: 'EmployeeProfile', schema: employee_profile_schema_1.EmployeeProfileSchema },
                { name: employee_system_role_schema_1.EmployeeSystemRole.name, schema: employee_system_role_schema_1.EmployeeSystemRoleSchema }
            ]),
            candidate_module_1.CandidateModule,
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET || 'super-secret-key',
                signOptions: { expiresIn: '1d' },
            })
        ],
        controllers: [auth_controller_1.EmployeeProfileController],
        providers: [auth_service_1.AuthService, roles_guard_1.RolesGuard],
        exports: [auth_service_1.AuthService]
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map