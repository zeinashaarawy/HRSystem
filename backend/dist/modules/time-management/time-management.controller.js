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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeManagementController = void 0;
const common_1 = require("@nestjs/common");
const time_management_service_1 = require("./time-management.service");
let TimeManagementController = class TimeManagementController {
    tmService;
    constructor(tmService) {
        this.tmService = tmService;
    }
    async getAttendanceSummary() {
        return await this.tmService.getAttendanceSummary();
    }
    async getAllEmployees() {
        return await this.tmService.getAllEmployees();
    }
    async getAllDepartments() {
        return await this.tmService.getAllDepartments();
    }
    async getAllShifts() {
        return await this.tmService.getAllShifts();
    }
    async getAllHolidays() {
        return await this.tmService.getAllHolidays();
    }
    async getAllPositions() {
        return await this.tmService.getAllPositions();
    }
    async getAllTimeExceptions() {
        return await this.tmService.getAllTimeExceptions();
    }
};
exports.TimeManagementController = TimeManagementController;
__decorate([
    (0, common_1.Get)('attendance-summary'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "getAttendanceSummary", null);
__decorate([
    (0, common_1.Get)('employees'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "getAllEmployees", null);
__decorate([
    (0, common_1.Get)('departments'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "getAllDepartments", null);
__decorate([
    (0, common_1.Get)('shifts'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "getAllShifts", null);
__decorate([
    (0, common_1.Get)('holidays'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "getAllHolidays", null);
__decorate([
    (0, common_1.Get)('positions'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "getAllPositions", null);
__decorate([
    (0, common_1.Get)('time-exceptions'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "getAllTimeExceptions", null);
exports.TimeManagementController = TimeManagementController = __decorate([
    (0, common_1.Controller)('time-management'),
    __metadata("design:paramtypes", [time_management_service_1.TimeManagementService])
], TimeManagementController);
//# sourceMappingURL=time-management.controller.js.map