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
exports.LeavePoliciesController = void 0;
const common_1 = require("@nestjs/common");
const leave_policies_service_1 = require("./leave-policies.service");
const create_policy_dto_1 = require("./dto/create-policy.dto");
const update_policy_dto_1 = require("./dto/update-policy.dto");
let LeavePoliciesController = class LeavePoliciesController {
    leavePoliciesService;
    constructor(leavePoliciesService) {
        this.leavePoliciesService = leavePoliciesService;
    }
    create(createPolicyDto) {
        return this.leavePoliciesService.create(createPolicyDto);
    }
    findAll() {
        return this.leavePoliciesService.findAll();
    }
    findActive() {
        return this.leavePoliciesService.findActive();
    }
    findByType(policyType) {
        return this.leavePoliciesService.findByType(policyType);
    }
    findOne(id) {
        return this.leavePoliciesService.findOne(id);
    }
    update(id, updatePolicyDto) {
        return this.leavePoliciesService.update(id, updatePolicyDto);
    }
    remove(id) {
        return this.leavePoliciesService.remove(id);
    }
    deactivate(id) {
        return this.leavePoliciesService.deactivate(id);
    }
    activate(id) {
        return this.leavePoliciesService.activate(id);
    }
};
exports.LeavePoliciesController = LeavePoliciesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_policy_dto_1.CreatePolicyDto]),
    __metadata("design:returntype", void 0)
], LeavePoliciesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LeavePoliciesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('active'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LeavePoliciesController.prototype, "findActive", null);
__decorate([
    (0, common_1.Get)('type/:policyType'),
    __param(0, (0, common_1.Param)('policyType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LeavePoliciesController.prototype, "findByType", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LeavePoliciesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_policy_dto_1.UpdatePolicyDto]),
    __metadata("design:returntype", void 0)
], LeavePoliciesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LeavePoliciesController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/deactivate'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LeavePoliciesController.prototype, "deactivate", null);
__decorate([
    (0, common_1.Patch)(':id/activate'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LeavePoliciesController.prototype, "activate", null);
exports.LeavePoliciesController = LeavePoliciesController = __decorate([
    (0, common_1.Controller)('leave-policies'),
    __metadata("design:paramtypes", [leave_policies_service_1.LeavePoliciesService])
], LeavePoliciesController);
//# sourceMappingURL=leave-policies.controller.js.map