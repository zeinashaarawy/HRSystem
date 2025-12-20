"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = __importStar(require("bcrypt"));
const jwt_1 = require("@nestjs/jwt");
const employee_profile_schema_1 = require("../models/employee-profile.schema");
const candidate_schema_1 = require("../models/candidate.schema");
const employee_profile_enums_1 = require("../enums/employee-profile.enums");
const role_groups_1 = require("../../common/constants/role-groups");
let AuthService = class AuthService {
    employeeModel;
    candidateModel;
    jwtService;
    constructor(employeeModel, candidateModel, jwtService) {
        this.employeeModel = employeeModel;
        this.candidateModel = candidateModel;
        this.jwtService = jwtService;
    }
    async login(dto) {
        const employee = await this.employeeModel.findOne({
            employeeNumber: dto.employeeNumber,
        });
        if (employee) {
            const isMatch = await bcrypt.compare(dto.password, employee.password);
            if (!isMatch)
                throw new common_1.UnauthorizedException('Invalid credentials');
            let role;
            const n = dto.employeeNumber.toUpperCase();
            if (n.startsWith('HRADM'))
                role = employee_profile_enums_1.SystemRole.HR_ADMIN;
            else if (n.startsWith('HRM') || n.startsWith('HRMAN'))
                role = employee_profile_enums_1.SystemRole.HR_MANAGER;
            else if (n.startsWith('HRE'))
                role = employee_profile_enums_1.SystemRole.HR_EMPLOYEE;
            else if (n.startsWith('DH'))
                role = employee_profile_enums_1.SystemRole.DEPARTMENT_HEAD;
            else if (n.startsWith('DEPT'))
                role = employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE;
            else if (n.startsWith('PAYM'))
                role = employee_profile_enums_1.SystemRole.PAYROLL_MANAGER;
            else if (n.startsWith('PAYS'))
                role = employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST;
            else if (n.startsWith('SYS'))
                role = employee_profile_enums_1.SystemRole.SYSTEM_ADMIN;
            else if (n.startsWith('REC'))
                role = employee_profile_enums_1.SystemRole.RECRUITER;
            else if (n.startsWith('FIN'))
                role = employee_profile_enums_1.SystemRole.FINANCE_STAFF;
            else
                role = employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE;
            const payload = {
                id: employee._id.toString(),
                username: employee.firstName + ' ' + employee.lastName,
                role,
                type: 'EMPLOYEE',
                userType: 'EMPLOYEE',
            };
            const token = await this.jwtService.signAsync(payload);
            return {
                access_token: token,
                payload,
                isAdmin: role_groups_1.ADMIN_ROLES.includes(role),
                userType: 'EMPLOYEE',
            };
        }
        const candidate = await this.candidateModel.findOne({
            candidateNumber: dto.employeeNumber,
        });
        if (!candidate)
            throw new common_1.NotFoundException('User not found');
        const isCandidateMatch = await bcrypt.compare(dto.password, candidate.password);
        if (!isCandidateMatch)
            throw new common_1.UnauthorizedException('Invalid credentials');
        const payload = {
            id: candidate._id.toString(),
            username: candidate.firstName + ' ' + candidate.lastName,
            type: 'CANDIDATE',
            userType: 'CANDIDATE',
        };
        const token = await this.jwtService.signAsync(payload);
        return {
            access_token: token,
            payload,
            isAdmin: false,
            userType: 'CANDIDATE',
        };
    }
    async updateUserRoles(userId, roles) {
        return this.employeeModel.findByIdAndUpdate(userId, { $set: { systemRoles: roles } }, { new: true });
    }
    async register(dto) {
        const employeeExists = await this.employeeModel.findOne({
            employeeNumber: dto.candidateNumber,
        });
        if (employeeExists)
            throw new common_1.BadRequestException('This number already belongs to an employee ❌');
        const candidateExists = await this.candidateModel.findOne({
            candidateNumber: dto.candidateNumber,
        });
        if (candidateExists)
            throw new common_1.BadRequestException('Candidate number already exists ❌');
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const candidate = new this.candidateModel({
            candidateNumber: dto.candidateNumber,
            password: hashedPassword,
            firstName: dto.firstName,
            lastName: dto.lastName,
            nationalId: dto.nationalId,
            resumeUrl: dto.resumeUrl,
            applicationDate: new Date(),
        });
        return candidate.save();
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(employee_profile_schema_1.EmployeeProfile.name)),
    __param(1, (0, mongoose_1.InjectModel)(candidate_schema_1.Candidate.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map