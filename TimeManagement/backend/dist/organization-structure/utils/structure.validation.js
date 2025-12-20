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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StructureValidation = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const department_schema_1 = require("../models/department.schema");
const position_schema_1 = require("../models/position.schema");
let StructureValidation = class StructureValidation {
    departmentModel;
    positionModel;
    constructor(departmentModel, positionModel) {
        this.departmentModel = departmentModel;
        this.positionModel = positionModel;
    }
    validateObjectId(id) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException(`Invalid ID: ${id}`);
        }
    }
    async validateDepartmentExists(deptId) {
        this.validateObjectId(deptId);
        const dept = await this.departmentModel.findById(deptId);
        if (!dept)
            throw new common_1.NotFoundException(`Department not found: ${deptId}`);
        return dept;
    }
    async validateDepartmentActive(deptId) {
        const dept = await this.validateDepartmentExists(deptId);
        if (!dept.isActive) {
            throw new common_1.BadRequestException(`Department is not active: ${deptId}`);
        }
        return dept;
    }
    async validatePositionExists(positionId) {
        this.validateObjectId(positionId);
        const pos = await this.positionModel.findById(positionId);
        if (!pos)
            throw new common_1.NotFoundException(`Position not found: ${positionId}`);
        return pos;
    }
    async validatePositionActive(positionId) {
        const pos = await this.validatePositionExists(positionId);
        const statusVal = pos.status;
        const isActiveFlag = pos.isActive;
        const isActive = (typeof statusVal !== 'undefined' ? String(statusVal) === 'active' : undefined) ??
            (typeof isActiveFlag !== 'undefined' ? Boolean(isActiveFlag) : false);
        if (!isActive) {
            throw new common_1.BadRequestException(`Position is not active: ${positionId}`);
        }
        return pos;
    }
    async validateReportingTo(reportingToId) {
        if (!reportingToId)
            return null;
        const manager = await this.validatePositionActive(reportingToId);
        return manager;
    }
    async checkCircularHierarchy(childId, parentId) {
        if (!parentId)
            return;
        let current = await this.positionModel.findById(parentId).lean();
        while (current) {
            const reportsTo = current.reportsToPositionId ?? current.reportingTo;
            if (reportsTo && String(reportsTo) === childId) {
                throw new common_1.BadRequestException(`Circular reporting detected: position ${childId} cannot report to ${parentId}`);
            }
            if (!reportsTo)
                break;
            current = await this.positionModel.findById(reportsTo).lean();
        }
    }
};
exports.StructureValidation = StructureValidation;
exports.StructureValidation = StructureValidation = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(department_schema_1.Department.name)),
    __param(1, (0, mongoose_1.InjectModel)(position_schema_1.Position.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], StructureValidation);
//# sourceMappingURL=structure.validation.js.map