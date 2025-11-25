"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrationService = void 0;
const common_1 = require("@nestjs/common");
const employee_profile_interface_1 = require("./interfaces/employee-profile.interface");
let IntegrationService = class IntegrationService {
    async getEmployeeProfile(request) {
        const mockEmployee = {
            employeeId: request.employeeId,
            personalInfo: {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@company.com',
                phone: '+201234567890',
                hireDate: new Date('2020-01-15'),
                workStartDate: new Date('2020-02-01'),
                gender: 'MALE',
            },
            employment: {
                contractType: employee_profile_interface_1.ContractType.PERMANENT,
                grade: 'Senior',
                departmentId: 'dept_001',
                positionId: 'pos_001',
                managerId: 'emp_manager_001',
                status: employee_profile_interface_1.EmploymentStatus.ACTIVE,
            },
            compensation: {
                baseSalary: 15000,
                currency: 'EGP',
            },
        };
        return {
            success: true,
            data: mockEmployee,
        };
    }
    async getReportingLine(request) {
        const mockReportingLine = {
            employeeId: request.employeeId,
            positionId: 'pos_001',
            departmentId: 'dept_001',
            directManagerId: 'emp_manager_001',
            departmentHeadId: 'emp_head_001',
            approvalChain: [
                {
                    level: 1,
                    roleType: 'DIRECT_MANAGER',
                    userId: 'emp_manager_001',
                    userName: 'Manager One',
                },
                {
                    level: 2,
                    roleType: 'HR_MANAGER',
                    userId: 'emp_hr_001',
                    userName: 'HR Manager',
                },
            ],
        };
        return {
            success: true,
            data: mockReportingLine,
        };
    }
    async blockAttendance(request) {
        const diffTime = request.endDate.getTime() - request.startDate.getTime();
        const blockedDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        return {
            success: true,
            data: {
                blockId: `block_${Date.now()}`,
                employeeId: request.employeeId,
                startDate: request.startDate,
                endDate: request.endDate,
                blockedDays,
            },
        };
    }
    async unblockAttendance(leaveRequestId) {
        return {
            success: true,
            message: `Attendance unblocked for leave request ${leaveRequestId}`,
        };
    }
    async syncLeaveToPayroll(request) {
        return {
            success: true,
            data: {
                employeeId: request.employeeId,
                payrollPeriod: request.payrollPeriod,
                syncedAt: new Date(),
                transactionCount: request.leaveData.leaveTransactions.length,
            },
        };
    }
    async submitLeaveSettlement(settlementData) {
        return {
            success: true,
            data: {
                settlementId: `settlement_${Date.now()}`,
                employeeId: settlementData.employeeId,
                totalAmount: settlementData.totalEncashment,
                status: 'PENDING',
                submittedAt: new Date(),
            },
        };
    }
    async getIntegrationStatus() {
        return {
            success: true,
            data: {
                employeeProfileIntegration: 'READY',
                orgStructureIntegration: 'READY',
                timeManagementIntegration: 'READY',
                payrollIntegration: 'READY',
                lastHealthCheck: new Date(),
            },
        };
    }
};
exports.IntegrationService = IntegrationService;
exports.IntegrationService = IntegrationService = __decorate([
    (0, common_1.Injectable)()
], IntegrationService);
//# sourceMappingURL=integration.service.js.map