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
exports.SchedulingRuleService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const scheduling_rule_schema_1 = require("../schemas/scheduling-rule.schema");
let SchedulingRuleService = class SchedulingRuleService {
    schedulingRuleModel;
    constructor(schedulingRuleModel) {
        this.schedulingRuleModel = schedulingRuleModel;
    }
    async create(createDto) {
        if (createDto.type === 'FLEXIBLE') {
            if (!createDto.flexInWindow || !createDto.flexOutWindow) {
                throw new common_1.BadRequestException('Flexible rules require flexInWindow and flexOutWindow');
            }
        }
        else if (createDto.type === 'ROTATIONAL') {
            if (!createDto.rotationalPattern) {
                throw new common_1.BadRequestException('Rotational rules require rotationalPattern');
            }
        }
        else if (createDto.type === 'COMPRESSED') {
            if (!createDto.workDaysPerWeek || !createDto.hoursPerDay) {
                throw new common_1.BadRequestException('Compressed rules require workDaysPerWeek and hoursPerDay');
            }
        }
        const schedulingRule = new this.schedulingRuleModel({
            ...createDto,
            active: createDto.active ?? true,
        });
        return schedulingRule.save();
    }
    async findAll() {
        return this.schedulingRuleModel
            .find()
            .populate('departmentIds', 'name code')
            .populate('shiftTemplateIds', 'name type')
            .sort({ createdAt: -1 })
            .exec();
    }
    async findOne(id) {
        const rule = await this.schedulingRuleModel
            .findById(id)
            .populate('departmentIds', 'name code')
            .populate('shiftTemplateIds', 'name type')
            .exec();
        if (!rule) {
            throw new common_1.NotFoundException(`Scheduling rule with ID ${id} not found`);
        }
        return rule;
    }
    async update(id, updateDto) {
        const rule = await this.schedulingRuleModel
            .findByIdAndUpdate(id, updateDto, { new: true })
            .populate('departmentIds', 'name code')
            .populate('shiftTemplateIds', 'name type')
            .exec();
        if (!rule) {
            throw new common_1.NotFoundException(`Scheduling rule with ID ${id} not found`);
        }
        return rule;
    }
    async delete(id) {
        const result = await this.schedulingRuleModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new common_1.NotFoundException(`Scheduling rule with ID ${id} not found`);
        }
    }
    async toggleActive(id) {
        const rule = await this.schedulingRuleModel.findById(id).exec();
        if (!rule) {
            throw new common_1.NotFoundException(`Scheduling rule with ID ${id} not found`);
        }
        const updated = await this.schedulingRuleModel
            .findByIdAndUpdate(id, { active: !rule.active }, { new: true })
            .populate('departmentIds', 'name code')
            .populate('shiftTemplateIds', 'name type')
            .exec();
        if (!updated) {
            throw new common_1.NotFoundException(`Scheduling rule with ID ${id} not found`);
        }
        return updated;
    }
};
exports.SchedulingRuleService = SchedulingRuleService;
exports.SchedulingRuleService = SchedulingRuleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(scheduling_rule_schema_1.SchedulingRule.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SchedulingRuleService);
//# sourceMappingURL=scheduling-rule.service.js.map