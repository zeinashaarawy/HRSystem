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
exports.LeaveTypesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const leave_type_schema_1 = require("./schemas/leave-type.schema");
let LeaveTypesService = class LeaveTypesService {
    leaveTypeModel;
    constructor(leaveTypeModel) {
        this.leaveTypeModel = leaveTypeModel;
    }
    async create(createLeaveTypeDto) {
        const existingLeaveType = await this.leaveTypeModel.findOne({
            code: createLeaveTypeDto.code,
        });
        if (existingLeaveType) {
            throw new common_1.ConflictException(`Leave type with code '${createLeaveTypeDto.code}' already exists`);
        }
        const createdLeaveType = new this.leaveTypeModel(createLeaveTypeDto);
        return createdLeaveType.save();
    }
    async findAll() {
        return this.leaveTypeModel.find().exec();
    }
    async findActive() {
        return this.leaveTypeModel.find({ isActive: true }).exec();
    }
    async findOne(id) {
        const leaveType = await this.leaveTypeModel.findById(id).exec();
        if (!leaveType) {
            throw new common_1.NotFoundException(`Leave type with ID '${id}' not found`);
        }
        return leaveType;
    }
    async findByCode(code) {
        const leaveType = await this.leaveTypeModel.findOne({ code }).exec();
        if (!leaveType) {
            throw new common_1.NotFoundException(`Leave type with code '${code}' not found`);
        }
        return leaveType;
    }
    async update(id, updateLeaveTypeDto) {
        if (updateLeaveTypeDto.code) {
            const existingLeaveType = await this.leaveTypeModel.findOne({
                code: updateLeaveTypeDto.code,
                _id: { $ne: id },
            });
            if (existingLeaveType) {
                throw new common_1.ConflictException(`Leave type with code '${updateLeaveTypeDto.code}' already exists`);
            }
        }
        const updatedLeaveType = await this.leaveTypeModel
            .findByIdAndUpdate(id, updateLeaveTypeDto, { new: true })
            .exec();
        if (!updatedLeaveType) {
            throw new common_1.NotFoundException(`Leave type with ID '${id}' not found`);
        }
        return updatedLeaveType;
    }
    async remove(id) {
        const result = await this.leaveTypeModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new common_1.NotFoundException(`Leave type with ID '${id}' not found`);
        }
    }
    async deactivate(id) {
        const leaveType = await this.leaveTypeModel
            .findByIdAndUpdate(id, { isActive: false }, { new: true })
            .exec();
        if (!leaveType) {
            throw new common_1.NotFoundException(`Leave type with ID '${id}' not found`);
        }
        return leaveType;
    }
    async activate(id) {
        const leaveType = await this.leaveTypeModel
            .findByIdAndUpdate(id, { isActive: true }, { new: true })
            .exec();
        if (!leaveType) {
            throw new common_1.NotFoundException(`Leave type with ID '${id}' not found`);
        }
        return leaveType;
    }
};
exports.LeaveTypesService = LeaveTypesService;
exports.LeaveTypesService = LeaveTypesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(leave_type_schema_1.LeaveType.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], LeaveTypesService);
//# sourceMappingURL=leave-types.service.js.map