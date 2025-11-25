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
exports.LeavePoliciesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const leave_policy_schema_1 = require("./schemas/leave-policy.schema");
let LeavePoliciesService = class LeavePoliciesService {
    policyModel;
    constructor(policyModel) {
        this.policyModel = policyModel;
    }
    async create(createPolicyDto) {
        const createdPolicy = new this.policyModel(createPolicyDto);
        return createdPolicy.save();
    }
    async findAll() {
        return this.policyModel.find().exec();
    }
    async findActive() {
        const now = new Date();
        return this.policyModel
            .find({
            isActive: true,
            $or: [
                { effectiveFrom: { $lte: now }, effectiveTo: { $gte: now } },
                { effectiveFrom: { $lte: now }, effectiveTo: null },
                { effectiveFrom: null, effectiveTo: null },
            ],
        })
            .exec();
    }
    async findByType(policyType) {
        return this.policyModel.find({ policyType, isActive: true }).exec();
    }
    async findOne(id) {
        const policy = await this.policyModel.findById(id).exec();
        if (!policy) {
            throw new common_1.NotFoundException(`Policy with ID '${id}' not found`);
        }
        return policy;
    }
    async update(id, updatePolicyDto) {
        const updatedPolicy = await this.policyModel
            .findByIdAndUpdate(id, updatePolicyDto, { new: true })
            .exec();
        if (!updatedPolicy) {
            throw new common_1.NotFoundException(`Policy with ID '${id}' not found`);
        }
        return updatedPolicy;
    }
    async remove(id) {
        const result = await this.policyModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new common_1.NotFoundException(`Policy with ID '${id}' not found`);
        }
    }
    async deactivate(id) {
        const policy = await this.policyModel
            .findByIdAndUpdate(id, { isActive: false }, { new: true })
            .exec();
        if (!policy) {
            throw new common_1.NotFoundException(`Policy with ID '${id}' not found`);
        }
        return policy;
    }
    async activate(id) {
        const policy = await this.policyModel
            .findByIdAndUpdate(id, { isActive: true }, { new: true })
            .exec();
        if (!policy) {
            throw new common_1.NotFoundException(`Policy with ID '${id}' not found`);
        }
        return policy;
    }
};
exports.LeavePoliciesService = LeavePoliciesService;
exports.LeavePoliciesService = LeavePoliciesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(leave_policy_schema_1.LeavePolicy.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], LeavePoliciesService);
//# sourceMappingURL=leave-policies.service.js.map