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
exports.EmployeeProfileService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const employee_profile_schema_1 = require("./models/employee-profile.schema");
const ep_change_request_schema_1 = require("./models/ep-change-request.schema");
const employee_profile_enums_1 = require("./enums/employee-profile.enums");
const employee_profile_enums_2 = require("./enums/employee-profile.enums");
const employee_profile_enums_3 = require("./enums/employee-profile.enums");
const crypto_1 = require("crypto");
const bcrypt = __importStar(require("bcrypt"));
const employee_system_role_schema_1 = require("./models/employee-system-role.schema");
let EmployeeProfileService = class EmployeeProfileService {
    employeeModel;
    employeeSystemRoleModel;
    roleModel;
    changeRequestModel;
    constructor(employeeModel, employeeSystemRoleModel, roleModel, changeRequestModel) {
        this.employeeModel = employeeModel;
        this.employeeSystemRoleModel = employeeSystemRoleModel;
        this.roleModel = roleModel;
        this.changeRequestModel = changeRequestModel;
    }
    async findByEmployeeId(employeeId) {
        if (!mongoose_2.Types.ObjectId.isValid(employeeId)) {
            throw new common_1.BadRequestException('Invalid employeeId');
        }
        const doc = await this.roleModel.findOne({ employeeProfileId: employeeId }).lean();
        if (!doc)
            throw new common_1.NotFoundException('Role document not found');
        return doc;
    }
    async updateRoles(employeeId, dto) {
        return this.roleModel.findOneAndUpdate({ employeeProfileId: new mongoose_2.Types.ObjectId(employeeId) }, { roles: dto.roles }, { new: true, upsert: true });
    }
    async create(createDto) {
        if (createDto.password) {
            const salt = await bcrypt.genSalt(10);
            createDto.password = await bcrypt.hash(createDto.password, salt);
        }
        const role = createDto.role &&
            Object.values(employee_profile_enums_3.SystemRole).includes(createDto.role)
            ? createDto.role
            : employee_profile_enums_3.SystemRole.DEPARTMENT_EMPLOYEE;
        const employee = await this.employeeModel.create({
            firstName: createDto.firstName,
            lastName: createDto.lastName,
            nationalId: createDto.nationalId,
            password: createDto.password,
            employeeNumber: createDto.employeeNumber,
            dateOfHire: new Date(createDto.dateOfHire),
            primaryDepartmentId: createDto.primaryDepartmentId,
            primaryPositionId: createDto.primaryPositionId,
            workEmail: createDto.workEmail,
            biography: createDto.biography,
            contractType: createDto.contractType,
            workType: createDto.workType,
            status: createDto.status,
            address: createDto.address,
        });
        await this.employeeSystemRoleModel.create({
            employeeProfileId: employee._id,
            roles: [role],
            isActive: true,
        });
        return employee;
    }
    async findAll(page, limit, role) {
        const skip = (page - 1) * limit;
        let employeeFilter = {};
        if (role) {
            const roleDocs = await this.employeeSystemRoleModel
                .find({ roles: role, isActive: true })
                .lean();
            const employeeIds = roleDocs.map(r => r.employeeProfileId);
            if (employeeIds.length === 0) {
                return { items: [], total: 0 };
            }
            employeeFilter = { _id: { $in: employeeIds } };
        }
        const employees = await this.employeeModel
            .find(employeeFilter)
            .populate("primaryDepartmentId", "name")
            .populate("primaryPositionId", "title name")
            .skip(skip)
            .limit(limit)
            .lean();
        const total = await this.employeeModel.countDocuments(employeeFilter);
        const employeeIds = employees.map(e => e._id);
        const rolesDocs = await this.employeeSystemRoleModel
            .find({
            employeeProfileId: { $in: employeeIds },
            isActive: true,
        })
            .lean();
        const roleMap = new Map();
        rolesDocs.forEach(r => {
            roleMap.set(r.employeeProfileId.toString(), r.roles[0]);
        });
        const items = employees.map(e => ({
            ...e,
            role: roleMap.get(e._id.toString()) || "—",
        }));
        return { items, total };
    }
    async getAllManagers() {
        const managerRoles = await this.employeeModel
            .find({
            roles: { $in: ['DEPARTMENT_HEAD'] },
            isActive: true,
        })
            .lean();
        const managerIds = managerRoles.map((r) => r._id);
        return this.employeeModel
            .find({ _id: { $in: managerIds } })
            .lean();
    }
    async getDepartmentManagers(departmentId) {
        const roleRecords = await this.employeeSystemRoleModel
            .find({
            roles: employee_profile_enums_3.SystemRole.DEPARTMENT_HEAD,
            isActive: true,
        })
            .lean();
        const dhIds = roleRecords.map((r) => r.employeeProfileId);
        if (dhIds.length === 0)
            return [];
        return this.employeeModel
            .find({
            _id: { $in: dhIds },
            primaryDepartmentId: departmentId,
        })
            .select('firstName lastName employeeNumber primaryDepartmentId')
            .lean();
    }
    async createManager(dto) {
        const exists = await this.employeeModel.findOne({
            employeeNumber: dto.employeeNumber,
        });
        if (exists) {
            throw new common_1.ConflictException(`Employee number ${dto.employeeNumber} already exists`);
        }
        return this.employeeModel.create({
            ...dto,
            systemRole: 'MANAGER',
        });
    }
    async findOne(id) {
        const employee = await this.employeeModel
            .findById(id)
            .populate({
            path: 'primaryDepartmentId',
            select: 'name',
        })
            .populate({
            path: 'primaryPositionId',
            select: 'title',
        })
            .populate({
            path: 'supervisorPositionId',
            select: 'title',
        })
            .lean();
        if (!employee) {
            throw new common_1.NotFoundException('Employee not found');
        }
        return employee;
    }
    async setPassword(id, password) {
        const employee = await this.employeeModel.findById(id);
        if (!employee) {
            throw new common_1.NotFoundException('Employee not found 🧑‍🏫');
        }
        const hashed = await bcrypt.hash(password, 10);
        await this.employeeModel.findByIdAndUpdate(id, { password: hashed }, { new: true });
        return { message: 'Password updated successfully 🔐', id };
    }
    async update(id, updateDto) {
        const payload = { ...updateDto };
        if (updateDto.dateOfHire) {
            payload.dateOfHire = new Date(updateDto.dateOfHire);
        }
        if (updateDto.contractStartDate) {
            payload.contractStartDate = new Date(updateDto.contractStartDate);
        }
        if (updateDto.contractEndDate) {
            payload.contractEndDate = new Date(updateDto.contractEndDate);
        }
        const updated = await this.employeeModel
            .findByIdAndUpdate(id, payload, { new: true })
            .lean();
        if (!updated) {
            throw new common_1.NotFoundException('Employee not found');
        }
        return updated;
    }
    async deactivate(id) {
        const employee = await this.employeeModel.findById(id);
        if (!employee) {
            throw new common_1.NotFoundException('Employee not found 🧑‍🏫');
        }
        const oldStatus = employee.status;
        const updated = await this.employeeModel
            .findByIdAndUpdate(id, { status: employee_profile_enums_2.EmployeeStatus.INACTIVE }, { new: true })
            .lean();
        return {
            message: 'Employee is now deactivated 😴',
            id,
            oldStatus,
            newStatus: employee_profile_enums_2.EmployeeStatus.INACTIVE,
            updatedEmployee: updated,
        };
    }
    async selfUpdate(employeeId, dto) {
        const allowed = [
            'phone',
            'personalEmail',
            'workEmail',
            'biography',
            'address',
        ];
        const payload = {};
        for (const key of allowed) {
            if (dto[key] !== undefined) {
                payload[key] = dto[key];
            }
        }
        const updated = await this.employeeModel.findByIdAndUpdate(employeeId, { $set: payload }, {
            new: true,
            strict: false,
        }).lean();
        if (!updated) {
            throw new common_1.NotFoundException('Employee not found');
        }
        return updated;
    }
    async createChangeRequest(employeeId, dto) {
        if (!dto) {
            throw new common_1.UnauthorizedException('Request body is empty ❌');
        }
        const employee = await this.employeeModel.findById(employeeId);
        if (!employee) {
            throw new common_1.NotFoundException('Employee not found ❌');
        }
        const profileId = dto.employeeProfileId;
        if (!profileId) {
            throw new common_1.ForbiddenException('employeeProfileId is required in body ❌');
        }
        const ALLOWED_FIELDS = [
            'firstName',
            'lastName',
            'lastName',
            'nationalId',
            'primaryPositionId',
            'primaryDepartmentId',
            'contractType',
            'workType',
        ];
        if (!ALLOWED_FIELDS.includes(dto.field)) {
            throw new common_1.ForbiddenException(`Invalid field '${dto.field}' ❌`);
        }
        const requestId = (0, crypto_1.randomUUID)();
        const requestDescription = JSON.stringify({
            field: dto.field,
            newValue: dto.newValue,
            reason: dto.reason ?? '',
        });
        const created = new this.changeRequestModel({
            requestId,
            employeeProfileId: profileId,
            field: dto.field,
            newValue: dto.newValue,
            reason: dto.reason ?? '',
            requestDescription,
            status: employee_profile_enums_1.ProfileChangeStatus.PENDING,
            submittedAt: new Date(),
        });
        return created.save();
    }
    async getEmployeeChangeRequests(employeeProfileId) {
        return this.changeRequestModel
            .find({ employeeProfileId })
            .sort({ submittedAt: -1 })
            .lean();
    }
    async approveChangeRequest(changeRequestMongoId) {
        const request = await this.changeRequestModel.findById(changeRequestMongoId);
        if (!request) {
            throw new common_1.NotFoundException('Change request not found ❌');
        }
        const raw = request.requestDescription;
        let data;
        if (typeof raw === 'string') {
            if (raw.trim().startsWith('{')) {
                data = JSON.parse(raw);
            }
            else {
                data = {
                    field: request.field,
                    newValue: request.newValue,
                    reason: raw,
                };
            }
        }
        else {
            data = raw;
        }
        if (!data.field || !data.newValue) {
            throw new common_1.BadRequestException('Change request is missing field/newValue ❌');
        }
        const employeeProfileId = request.employeeProfileId;
        const employee = await this.employeeModel.findById(employeeProfileId);
        if (!employee) {
            throw new common_1.NotFoundException('Employee not found ❌');
        }
        await this.employeeModel.findByIdAndUpdate(employeeProfileId, {
            [data.field]: data.newValue,
        });
        await this.changeRequestModel.findByIdAndUpdate(changeRequestMongoId, { status: employee_profile_enums_1.ProfileChangeStatus.APPROVED });
        return { message: 'Change request approved and employee updated ✅' };
    }
    async rejectChangeRequest(id, reason) {
        const request = await this.changeRequestModel.findById(id);
        if (!request)
            throw new common_1.NotFoundException('Request not found');
        request.status = employee_profile_enums_1.ProfileChangeStatus.REJECTED;
        request.processedAt = new Date();
        request.reason = reason;
        return request.save();
    }
    async getTeamSummaryForManager(managerId) {
        return this.employeeModel
            .find({ supervisorPositionId: managerId })
            .populate('primaryDepartmentId', 'name')
            .populate('primaryPositionId', 'title name')
            .select('firstName lastName employeeNumber status dateOfHire primaryDepartmentId primaryPositionId')
            .lean();
    }
    async getTeamEmployeeSummary(managerId, employeeId) {
        return this.employeeModel
            .findById(employeeId)
            .populate("primaryDepartmentId", "name")
            .populate("primaryPositionId", "title name")
            .select("firstName lastName employeeNumber status dateOfHire workEmail personalEmail primaryDepartmentId primaryPositionId")
            .lean();
    }
    async getAllChangeRequests() {
        return this.changeRequestModel
            .find()
            .sort({ submittedAt: -1 })
            .lean();
    }
    async findChangeRequestByUUID(requestId) {
        const request = await this.changeRequestModel
            .findOne({ requestId })
            .lean();
        if (!request) {
            throw new common_1.NotFoundException('Request not found');
        }
        return request;
    }
    async submitDispute(dto) {
        const requestId = (0, crypto_1.randomUUID)();
        const created = new this.changeRequestModel({
            requestId,
            employeeProfileId: dto.employeeProfileId,
            requestDescription: `disputeFor:${dto.originalRequestId}`,
            reason: dto.dispute,
            status: employee_profile_enums_1.ProfileChangeStatus.PENDING,
            submittedAt: new Date(),
        });
        return created.save();
    }
    async withdrawChangeRequest(id) {
        const request = await this.changeRequestModel.findById(id);
        if (!request)
            throw new common_1.NotFoundException('Request not found');
        if (request.status !== employee_profile_enums_1.ProfileChangeStatus.PENDING) {
            throw new Error('Only pending requests can be withdrawn');
        }
        request.status = employee_profile_enums_1.ProfileChangeStatus.REJECTED;
        request.reason = 'Withdrawn by employee';
        request.processedAt = new Date();
        await request.save();
        return {
            message: 'Change request withdrawn successfully',
            requestId: request.requestId,
            status: request.status,
        };
    }
    async resolveDispute(id, resolution) {
        const dispute = await this.changeRequestModel.findById(id);
        if (!dispute)
            throw new common_1.NotFoundException('Dispute not found');
        dispute.status = employee_profile_enums_1.ProfileChangeStatus.REJECTED;
        dispute.reason = resolution;
        dispute.processedAt = new Date();
        return dispute.save();
    }
    async approveDispute(id, resolution) {
        const dispute = await this.changeRequestModel.findById(id);
        if (!dispute)
            throw new common_1.NotFoundException('Dispute not found');
        dispute.status = employee_profile_enums_1.ProfileChangeStatus.APPROVED;
        dispute.reason = resolution;
        dispute.processedAt = new Date();
        return dispute.save();
    }
    async getMyProfile(userId) {
        const me = await this.employeeModel
            .findById(userId)
            .populate('primaryDepartmentId', 'name')
            .populate('primaryPositionId', 'title name')
            .lean();
        if (!me)
            throw new common_1.NotFoundException('Profile not found');
        return me;
    }
    async getDepartmentHeads() {
        const roleDocs = await this.employeeModel
            .find({
            roles: 'DEPARTMENT_HEAD',
            isActive: true,
        })
            .lean();
        const employeeIds = roleDocs.map((r) => r._id);
        return this.employeeModel
            .find({ _id: { $in: employeeIds } })
            .lean();
    }
    async assignManager(employeeId, managerId) {
        if (!mongoose_2.Types.ObjectId.isValid(employeeId)) {
            throw new common_1.BadRequestException('Invalid employeeId');
        }
        if (!mongoose_2.Types.ObjectId.isValid(managerId)) {
            throw new common_1.BadRequestException('Invalid managerId');
        }
        return this.employeeModel.findByIdAndUpdate(employeeId, { supervisorPositionId: managerId }, { new: true });
    }
};
exports.EmployeeProfileService = EmployeeProfileService;
exports.EmployeeProfileService = EmployeeProfileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(employee_profile_schema_1.EmployeeProfile.name)),
    __param(1, (0, mongoose_1.InjectModel)(employee_system_role_schema_1.EmployeeSystemRole.name)),
    __param(2, (0, mongoose_1.InjectModel)(employee_system_role_schema_1.EmployeeSystemRole.name)),
    __param(3, (0, mongoose_1.InjectModel)(ep_change_request_schema_1.EmployeeProfileChangeRequest.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], EmployeeProfileService);
//# sourceMappingURL=employee-profile.service.js.map