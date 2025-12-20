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
exports.OrganizationStructureService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const structure_validation_1 = require("./utils/structure.validation");
const mongoose_2 = require("mongoose");
const common_2 = require("@nestjs/common");
const department_schema_1 = require("./models/department.schema");
const position_schema_1 = require("./models/position.schema");
const common_3 = require("@nestjs/common");
const mongoose_3 = require("mongoose");
let OrganizationStructureService = class OrganizationStructureService {
    departmentModel;
    positionModel;
    validation;
    constructor(departmentModel, positionModel, validation) {
        this.departmentModel = departmentModel;
        this.positionModel = positionModel;
        this.validation = validation;
    }
    async createPosition(dto) {
        const department = await this.departmentModel.findById(dto.departmentId);
        if (!department) {
            throw new common_2.NotFoundException('Department does not exist');
        }
        const inserted = await this.positionModel.collection.insertOne({
            ...dto,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        return {
            _id: inserted.insertedId,
            code: dto.code,
            title: dto.title,
            description: dto.description ?? null,
            departmentId: dto.departmentId,
            isActive: true,
        };
    }
    async getPositions() {
        return this.positionModel.find().exec();
    }
    async getPositionById(id) {
        const pos = await this.positionModel.findById(id).exec();
        if (!pos) {
            throw new common_2.NotFoundException('Position not found');
        }
        return pos;
    }
    async updatePosition(id, dto) {
        const updated = await this.positionModel.findByIdAndUpdate(id, dto, { new: true });
        if (!updated) {
            throw new common_2.NotFoundException('Position not found');
        }
        return updated;
    }
    async deactivatePosition(id) {
        const pos = await this.positionModel.findByIdAndUpdate(id, { isActive: false }, { new: true });
        if (!pos) {
            throw new common_2.NotFoundException('Position not found');
        }
        return pos;
    }
    async createDepartment(dto) {
        const exists = await this.departmentModel.findOne({ code: dto.code });
        if (exists) {
            throw new common_3.BadRequestException('Department code must be unique');
        }
        const department = new this.departmentModel(dto);
        return department.save();
    }
    async getAllDepartments() {
        return this.departmentModel.find();
    }
    async getDepartmentById(id) {
        const dep = await this.departmentModel.findById(id);
        if (!dep) {
            throw new common_2.NotFoundException('Department not found');
        }
        return dep;
    }
    async updateDepartment(id, dto) {
        const updated = await this.departmentModel.findByIdAndUpdate(id, dto, { new: true });
        if (!updated) {
            throw new common_2.NotFoundException('Department not found');
        }
        return updated;
    }
    async deactivateDepartment(id) {
        const dep = await this.departmentModel.findById(id);
        if (!dep) {
            throw new common_2.NotFoundException('Department not found');
        }
        dep.isActive = false;
        return dep.save();
    }
    async setReportingLine(positionId, reportsToId) {
        const position = await this.positionModel.findById(positionId);
        if (!position)
            throw new common_2.NotFoundException('Position not found');
        const manager = await this.positionModel.findById(reportsToId);
        if (!manager)
            throw new common_2.NotFoundException('Manager position not found');
        await this.positionModel.collection.updateOne({ _id: new mongoose_3.Types.ObjectId(positionId) }, {
            $set: {
                reportsToPositionId: new mongoose_3.Types.ObjectId(reportsToId),
                updatedAt: new Date(),
            },
        });
        return {
            message: "Reporting line set successfully",
            positionId,
            reportsToId,
        };
    }
    async removeReportingLine(positionId) {
        const position = await this.positionModel.findById(positionId);
        if (!position)
            throw new common_2.NotFoundException('Position not found');
        await this.positionModel.collection.updateOne({ _id: new mongoose_3.Types.ObjectId(positionId) }, {
            $unset: { reportsToPositionId: "" },
            $set: { updatedAt: new Date() },
        });
        return {
            message: "Reporting line removed",
            positionId,
        };
    }
    async getManagerOfPosition(id) {
        const position = await this.positionModel.findById(id);
        if (!position) {
            throw new common_2.NotFoundException('Position not found');
        }
        if (!position.reportsToPositionId) {
            return { manager: null };
        }
        const manager = await this.positionModel.findById(position.reportsToPositionId);
        return { manager };
    }
    async getPositionsInDepartment(departmentId) {
        const dep = await this.departmentModel.findById(departmentId);
        if (!dep) {
            throw new common_2.NotFoundException('Department not found');
        }
        return this.positionModel.find({ departmentId }).exec();
    }
    async validateDepartment(id) {
        if (!mongoose_3.Types.ObjectId.isValid(id)) {
            return { valid: false, reason: 'Invalid ObjectId format' };
        }
        const department = await this.departmentModel.findById(id);
        if (!department) {
            return { valid: false, reason: 'Department does not exist' };
        }
        if (!department.isActive) {
            return { valid: false, reason: 'Department is inactive' };
        }
        return { valid: true, department };
    }
    async validatePosition(id) {
        if (!mongoose_3.Types.ObjectId.isValid(id)) {
            return { valid: false, reason: 'Invalid ObjectId format' };
        }
        const position = await this.positionModel.findById(id);
        if (!position) {
            return { valid: false, reason: 'Position does not exist' };
        }
        if (!position.isActive) {
            return { valid: false, reason: 'Position is inactive' };
        }
        return { valid: true, position };
    }
    async validateReportingLine(sourceId, targetId) {
        if (!mongoose_3.Types.ObjectId.isValid(sourceId)) {
            return { valid: false, reason: 'Invalid source position ObjectId' };
        }
        if (!mongoose_3.Types.ObjectId.isValid(targetId)) {
            return { valid: false, reason: 'Invalid target (manager) ObjectId' };
        }
        const source = await this.positionModel.findById(sourceId);
        const target = await this.positionModel.findById(targetId);
        if (!source)
            return { valid: false, reason: 'Source position does not exist' };
        if (!target)
            return { valid: false, reason: 'Target (manager) position does not exist' };
        if (!source.isActive)
            return { valid: false, reason: 'Source position is inactive' };
        if (!target.isActive)
            return { valid: false, reason: 'Manager position is inactive' };
        if (String(source.departmentId) !== String(target.departmentId)) {
            return { valid: false, reason: 'Positions must belong to the same department' };
        }
        if (sourceId === targetId) {
            return { valid: false, reason: 'A position cannot report to itself' };
        }
        let current = await this.positionModel.findById(target.reportsToPositionId);
        while (current) {
            if (String(current._id) === String(sourceId)) {
                return {
                    valid: false,
                    reason: 'Circular reporting detected (loop)',
                };
            }
            current = await this.positionModel.findById(current.reportsToPositionId);
        }
        return { valid: true, message: 'Reporting line is valid' };
    }
    async activateDepartment(id) {
        const dep = await this.departmentModel.findById(id);
        if (!dep) {
            throw new common_2.NotFoundException('Department not found');
        }
        dep.isActive = true;
        return dep.save();
    }
    async activatePosition(id) {
        if (!mongoose_3.Types.ObjectId.isValid(id)) {
            throw new common_3.BadRequestException('Invalid position ID');
        }
        const pos = await this.positionModel.findById(id);
        if (!pos) {
            throw new common_2.NotFoundException('Position not found');
        }
        await this.positionModel.collection.updateOne({ _id: new mongoose_3.Types.ObjectId(id) }, {
            $set: {
                isActive: true,
                updatedAt: new Date(),
            },
        });
        return {
            message: 'Position activated successfully',
            _id: pos._id,
            code: pos.code,
            title: pos.title,
            isActive: true,
        };
    }
};
exports.OrganizationStructureService = OrganizationStructureService;
exports.OrganizationStructureService = OrganizationStructureService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(department_schema_1.Department.name)),
    __param(1, (0, mongoose_1.InjectModel)(position_schema_1.Position.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        structure_validation_1.StructureValidation])
], OrganizationStructureService);
//# sourceMappingURL=organization-structure.service.js.map