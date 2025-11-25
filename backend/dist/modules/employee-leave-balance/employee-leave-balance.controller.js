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
exports.EmployeeLeaveBalanceController = void 0;
const common_1 = require("@nestjs/common");
const employee_leave_balance_service_1 = require("./employee-leave-balance.service");
const create_balance_dto_1 = require("./dto/create-balance.dto");
const update_balance_dto_1 = require("./dto/update-balance.dto");
let EmployeeLeaveBalanceController = class EmployeeLeaveBalanceController {
    balanceService;
    constructor(balanceService) {
        this.balanceService = balanceService;
    }
    create(dto) {
        return this.balanceService.create(dto);
    }
    findAll() {
        return this.balanceService.findAll();
    }
    findByEmployee(employeeId) {
        return this.balanceService.findByEmployee(employeeId);
    }
    update(employeeId, dto) {
        return this.balanceService.update(employeeId, dto);
    }
    remove(employeeId) {
        return this.balanceService.removeByEmployee(employeeId);
    }
};
exports.EmployeeLeaveBalanceController = EmployeeLeaveBalanceController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_balance_dto_1.CreateBalanceDto]),
    __metadata("design:returntype", void 0)
], EmployeeLeaveBalanceController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EmployeeLeaveBalanceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':employeeId'),
    __param(0, (0, common_1.Param)('employeeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EmployeeLeaveBalanceController.prototype, "findByEmployee", null);
__decorate([
    (0, common_1.Put)(':employeeId'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    __param(0, (0, common_1.Param)('employeeId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_balance_dto_1.UpdateBalanceDto]),
    __metadata("design:returntype", void 0)
], EmployeeLeaveBalanceController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':employeeId'),
    __param(0, (0, common_1.Param)('employeeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EmployeeLeaveBalanceController.prototype, "remove", null);
exports.EmployeeLeaveBalanceController = EmployeeLeaveBalanceController = __decorate([
    (0, common_1.Controller)('employee-leave-balance'),
    __metadata("design:paramtypes", [employee_leave_balance_service_1.EmployeeLeaveBalanceService])
], EmployeeLeaveBalanceController);
exports.default = EmployeeLeaveBalanceController;
//# sourceMappingURL=employee-leave-balance.controller.js.map