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
exports.LeaveTypesController = void 0;
const common_1 = require("@nestjs/common");
const leave_types_service_1 = require("./leave-types.service");
const create_leave_type_dto_1 = require("./dto/create-leave-type.dto");
const update_leave_type_dto_1 = require("./dto/update-leave-type.dto");
let LeaveTypesController = class LeaveTypesController {
    leaveTypesService;
    constructor(leaveTypesService) {
        this.leaveTypesService = leaveTypesService;
    }
    create(createLeaveTypeDto) {
        return this.leaveTypesService.create(createLeaveTypeDto);
    }
    findAll() {
        return this.leaveTypesService.findAll();
    }
    findActive() {
        return this.leaveTypesService.findActive();
    }
    findOne(id) {
        return this.leaveTypesService.findOne(id);
    }
    findByCode(code) {
        return this.leaveTypesService.findByCode(code);
    }
    update(id, updateLeaveTypeDto) {
        return this.leaveTypesService.update(id, updateLeaveTypeDto);
    }
    remove(id) {
        return this.leaveTypesService.remove(id);
    }
    deactivate(id) {
        return this.leaveTypesService.deactivate(id);
    }
    activate(id) {
        return this.leaveTypesService.activate(id);
    }
};
exports.LeaveTypesController = LeaveTypesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_leave_type_dto_1.CreateLeaveTypeDto]),
    __metadata("design:returntype", void 0)
], LeaveTypesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LeaveTypesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('active'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LeaveTypesController.prototype, "findActive", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LeaveTypesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('code/:code'),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LeaveTypesController.prototype, "findByCode", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_leave_type_dto_1.UpdateLeaveTypeDto]),
    __metadata("design:returntype", void 0)
], LeaveTypesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LeaveTypesController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/deactivate'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LeaveTypesController.prototype, "deactivate", null);
__decorate([
    (0, common_1.Patch)(':id/activate'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LeaveTypesController.prototype, "activate", null);
exports.LeaveTypesController = LeaveTypesController = __decorate([
    (0, common_1.Controller)('leave-types'),
    __metadata("design:paramtypes", [leave_types_service_1.LeaveTypesService])
], LeaveTypesController);
//# sourceMappingURL=leave-types.controller.js.map