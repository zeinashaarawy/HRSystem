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
exports.SchedulingRuleController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const scheduling_rule_service_1 = require("../services/scheduling-rule.service");
const create_scheduling_rule_dto_1 = require("../dto/create-scheduling-rule.dto");
const update_scheduling_rule_dto_1 = require("../dto/update-scheduling-rule.dto");
const roles_guard_1 = require("../guards/roles.guard");
const roles_decorator_1 = require("../decorators/roles.decorator");
let SchedulingRuleController = class SchedulingRuleController {
    schedulingRuleService;
    constructor(schedulingRuleService) {
        this.schedulingRuleService = schedulingRuleService;
    }
    async create(createDto) {
        return this.schedulingRuleService.create(createDto);
    }
    async findAll() {
        return this.schedulingRuleService.findAll();
    }
    async findOne(id) {
        return this.schedulingRuleService.findOne(id);
    }
    async update(id, updateDto) {
        return this.schedulingRuleService.update(id, updateDto);
    }
    async toggleActive(id) {
        return this.schedulingRuleService.toggleActive(id);
    }
    async delete(id) {
        await this.schedulingRuleService.delete(id);
    }
};
exports.SchedulingRuleController = SchedulingRuleController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('HR Manager', 'SYSTEM_ADMIN', 'HR_ADMIN', 'System Admin', 'HR Admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new scheduling rule' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Scheduling rule created successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - insufficient permissions' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_scheduling_rule_dto_1.CreateSchedulingRuleDto]),
    __metadata("design:returntype", Promise)
], SchedulingRuleController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('HR Manager', 'SYSTEM_ADMIN', 'HR_ADMIN', 'System Admin', 'HR Admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all scheduling rules' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of scheduling rules' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SchedulingRuleController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)('HR Manager', 'SYSTEM_ADMIN', 'HR_ADMIN', 'System Admin', 'HR Admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Get scheduling rule by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Scheduling rule found' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Scheduling rule not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SchedulingRuleController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)('HR Manager', 'SYSTEM_ADMIN', 'HR_ADMIN', 'System Admin', 'HR Admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Update scheduling rule' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Scheduling rule updated' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Scheduling rule not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_scheduling_rule_dto_1.UpdateSchedulingRuleDto]),
    __metadata("design:returntype", Promise)
], SchedulingRuleController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/toggle-active'),
    (0, roles_decorator_1.Roles)('HR Manager', 'SYSTEM_ADMIN', 'HR_ADMIN', 'System Admin', 'HR Admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Toggle scheduling rule active status' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Scheduling rule status toggled' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Scheduling rule not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SchedulingRuleController.prototype, "toggleActive", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('HR Manager', 'SYSTEM_ADMIN', 'HR_ADMIN', 'System Admin', 'HR Admin'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Delete scheduling rule' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Scheduling rule deleted' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Scheduling rule not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SchedulingRuleController.prototype, "delete", null);
exports.SchedulingRuleController = SchedulingRuleController = __decorate([
    (0, swagger_1.ApiTags)('scheduling-rules'),
    (0, common_1.Controller)('time-management/scheduling-rules'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [scheduling_rule_service_1.SchedulingRuleService])
], SchedulingRuleController);
//# sourceMappingURL=scheduling-rule.controller.js.map