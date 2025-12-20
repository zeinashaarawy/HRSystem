"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var EmployeeProfileServiceAdapter_1, OrganizationStructureServiceAdapter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationStructureServiceAdapter = exports.EmployeeProfileServiceAdapter = void 0;
const common_1 = require("@nestjs/common");
const employee_profile_service_1 = require("../../employee-profile/employee-profile.service");
const organization_structure_service_1 = require("../../organization-structure/organization-structure.service");
let EmployeeProfileServiceAdapter = EmployeeProfileServiceAdapter_1 = class EmployeeProfileServiceAdapter {
    logger = new common_1.Logger(EmployeeProfileServiceAdapter_1.name);
    realService;
    constructor(employeeProfileService) {
        if (!employeeProfileService) {
            throw new Error('EmployeeProfileService is required. Ensure EmployeeProfileModule exports EmployeeProfileService.');
        }
        this.realService = employeeProfileService;
        this.logger.log('✓ Using REAL EmployeeProfileService');
    }
    async createEmployeeFromCandidate(candidateId, offerDetails) {
        const nameParts = offerDetails.fullName.trim().split(/\s+/);
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';
        const employeeNumber = `EMP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const createEmployeeDto = {
            firstName,
            lastName,
            nationalId: `NID-${candidateId}`,
            address: { street: 'TBD', city: 'TBD', country: 'TBD' },
            phone: 'TBD',
            personalEmail: offerDetails.email,
            password: 'TempPassword123!',
            employeeNumber,
            dateOfHire: offerDetails.startDate.toISOString(),
            workEmail: offerDetails.email,
            primaryDepartmentId: offerDetails.department,
        };
        this.logger.log(`Creating employee profile from candidate ${candidateId}`);
        const employee = await this.realService.create(createEmployeeDto);
        this.logger.log(`Employee profile created: ${employee._id.toString()}`);
        return { employeeId: employee._id.toString() };
    }
};
exports.EmployeeProfileServiceAdapter = EmployeeProfileServiceAdapter;
exports.EmployeeProfileServiceAdapter = EmployeeProfileServiceAdapter = EmployeeProfileServiceAdapter_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(employee_profile_service_1.EmployeeProfileService)),
    __metadata("design:paramtypes", [employee_profile_service_1.EmployeeProfileService])
], EmployeeProfileServiceAdapter);
let OrganizationStructureServiceAdapter = OrganizationStructureServiceAdapter_1 = class OrganizationStructureServiceAdapter {
    logger = new common_1.Logger(OrganizationStructureServiceAdapter_1.name);
    realService;
    constructor(organizationStructureService) {
        if (!organizationStructureService) {
            throw new Error('OrganizationStructureService is required. Ensure OrganizationStructureModule exports OrganizationStructureService.');
        }
        this.realService = organizationStructureService;
        this.logger.log('✓ Using REAL OrganizationStructureService');
    }
    async validateDepartment(departmentId) {
        try {
            const result = await this.realService.validateDepartment(departmentId);
            return result.valid === true;
        }
        catch (error) {
            this.logger.error(`Error validating department ${departmentId}:`, error);
            return false;
        }
    }
    async getDepartment(departmentId) {
        try {
            const department = await this.realService.getDepartmentById(departmentId);
            if (!department)
                return null;
            return {
                id: department._id.toString(),
                name: department.name,
                managerId: department.headPositionId?.toString(),
            };
        }
        catch (error) {
            this.logger.error(`Error getting department ${departmentId}:`, error);
            return null;
        }
    }
};
exports.OrganizationStructureServiceAdapter = OrganizationStructureServiceAdapter;
exports.OrganizationStructureServiceAdapter = OrganizationStructureServiceAdapter = OrganizationStructureServiceAdapter_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(organization_structure_service_1.OrganizationStructureService)),
    __metadata("design:paramtypes", [organization_structure_service_1.OrganizationStructureService])
], OrganizationStructureServiceAdapter);
//# sourceMappingURL=adapter-services.js.map