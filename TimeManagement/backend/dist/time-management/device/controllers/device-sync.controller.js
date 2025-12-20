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
exports.DeviceSyncController = void 0;
const common_1 = require("@nestjs/common");
const device_sync_service_1 = require("../services/device-sync.service");
const roles_guard_1 = require("../../Shift/guards/roles.guard");
const roles_decorator_1 = require("../../Shift/decorators/roles.decorator");
const swagger_1 = require("@nestjs/swagger");
let DeviceSyncController = class DeviceSyncController {
    deviceSyncService;
    constructor(deviceSyncService) {
        this.deviceSyncService = deviceSyncService;
    }
    async syncDevice(device) {
        return this.deviceSyncService.syncDevicePunches(device);
    }
    async getQueueStatus(device) {
        return this.deviceSyncService.getQueueStatus(device);
    }
    async getDevicesWithQueuedPunches() {
        const devices = this.deviceSyncService.getDevicesWithQueuedPunches();
        return { devices };
    }
};
exports.DeviceSyncController = DeviceSyncController;
__decorate([
    (0, common_1.Post)('sync/:device'),
    (0, roles_decorator_1.Roles)('System Admin', 'HR Admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Sync queued punches for a device (BR-TM-13)' }),
    (0, swagger_1.ApiParam)({ name: 'device', description: 'Device identifier' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Device sync result' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    __param(0, (0, common_1.Param)('device')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DeviceSyncController.prototype, "syncDevice", null);
__decorate([
    (0, common_1.Get)('queue/:device'),
    (0, roles_decorator_1.Roles)('System Admin', 'HR Admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get queue status for a device' }),
    (0, swagger_1.ApiParam)({ name: 'device', description: 'Device identifier' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Queue status' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    __param(0, (0, common_1.Param)('device')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DeviceSyncController.prototype, "getQueueStatus", null);
__decorate([
    (0, common_1.Get)('devices'),
    (0, roles_decorator_1.Roles)('System Admin', 'HR Admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all devices with queued punches' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of devices with queued punches' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DeviceSyncController.prototype, "getDevicesWithQueuedPunches", null);
exports.DeviceSyncController = DeviceSyncController = __decorate([
    (0, swagger_1.ApiTags)('Time Management - Device Sync'),
    (0, common_1.Controller)('time-management/device'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [device_sync_service_1.DeviceSyncService])
], DeviceSyncController);
//# sourceMappingURL=device-sync.controller.js.map