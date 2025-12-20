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
var ShiftExpiryNotificationController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShiftExpiryNotificationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const shift_expiry_service_1 = require("../services/shift-expiry.service");
const shift_expiry_scheduler_service_1 = require("../services/shift-expiry-scheduler.service");
const shift_expiry_notification_response_dto_1 = require("../dto/shift-expiry-notification-response.dto");
const resolve_notification_dto_1 = require("../dto/resolve-notification.dto");
const roles_guard_1 = require("../guards/roles.guard");
const roles_decorator_1 = require("../decorators/roles.decorator");
let ShiftExpiryNotificationController = ShiftExpiryNotificationController_1 = class ShiftExpiryNotificationController {
    shiftExpiryService;
    shiftExpirySchedulerService;
    logger = new common_1.Logger(ShiftExpiryNotificationController_1.name);
    constructor(shiftExpiryService, shiftExpirySchedulerService) {
        this.shiftExpiryService = shiftExpiryService;
        this.shiftExpirySchedulerService = shiftExpirySchedulerService;
    }
    async getNotifications(status) {
        this.logger.log('=== GET NOTIFICATIONS ENDPOINT CALLED ===');
        this.logger.log('Status filter:', status || 'none');
        try {
            this.logger.log('Calling shiftExpiryService.getNotifications...');
            const notifications = await this.shiftExpiryService.getNotifications(status);
            this.logger.log('Service returned notifications count:', notifications?.length || 0);
            if (!Array.isArray(notifications)) {
                this.logger.error('Service did not return an array! Type:', typeof notifications);
                return [];
            }
            try {
                const jsonString = JSON.stringify(notifications);
                this.logger.log('✅ Notifications are JSON-serializable, JSON length:', jsonString.length);
            }
            catch (serializeError) {
                this.logger.error('❌ Notifications are NOT JSON-serializable!');
                this.logger.error('Serialize error message:', serializeError?.message);
                this.logger.error('Serialize error stack:', serializeError?.stack);
                if (notifications.length > 0) {
                    this.logger.error('First notification sample:', JSON.stringify(notifications[0], null, 2));
                }
                return [];
            }
            const result = Array.isArray(notifications) ? notifications : [];
            this.logger.log('✅ Returning notifications count:', result.length);
            this.logger.log('=== GET NOTIFICATIONS ENDPOINT SUCCESS ===');
            return result;
        }
        catch (error) {
            this.logger.error('❌❌❌ CRITICAL ERROR in getNotifications controller ❌❌❌');
            this.logger.error('Error type:', error?.constructor?.name);
            this.logger.error('Error message:', error?.message);
            this.logger.error('Error name:', error?.name);
            this.logger.error('Error stack:', error?.stack);
            this.logger.log('Returning empty array due to error');
            return [];
        }
    }
    async triggerDetection(daysBeforeExpiry) {
        this.logger.log('🚀 triggerDetection endpoint called!');
        this.logger.log(`   Query param daysBeforeExpiry: ${daysBeforeExpiry}`);
        try {
            const days = daysBeforeExpiry
                ? parseInt(daysBeforeExpiry.toString(), 10)
                : 30;
            this.logger.log(`   Using ${days} days before expiry`);
            this.logger.log('   Calling shiftExpirySchedulerService.triggerExpiryDetection...');
            const count = await this.shiftExpirySchedulerService.triggerExpiryDetection(days);
            this.logger.log(`   ✅ Detection completed. Created ${count} notifications`);
            return {
                notificationsCreated: count,
                message: `Expiry detection completed. Created ${count} new notification(s) for shifts/assignments expiring within ${days} days.`,
            };
        }
        catch (error) {
            this.logger.error('   ❌ Error in triggerDetection:', error);
            this.logger.error('   Error message:', error?.message);
            this.logger.error('   Error stack:', error?.stack);
            throw error;
        }
    }
    async resolveNotification(id, resolveDto) {
        return await this.shiftExpiryService.resolveNotification(id, resolveDto.resolutionNotes);
    }
};
exports.ShiftExpiryNotificationController = ShiftExpiryNotificationController;
__decorate([
    (0, common_1.Get)('shifts'),
    (0, roles_decorator_1.Roles)('HR_ADMIN', 'HR Manager', 'SYSTEM_ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all shift expiry notifications' }),
    (0, swagger_1.ApiQuery)({
        name: 'status',
        required: false,
        description: 'Filter by notification status',
        enum: ['pending', 'sent', 'acknowledged', 'resolved'],
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of expiry notifications',
        type: [shift_expiry_notification_response_dto_1.ShiftExpiryNotificationResponseDto],
    }),
    __param(0, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ShiftExpiryNotificationController.prototype, "getNotifications", null);
__decorate([
    (0, common_1.Post)('shifts/detect'),
    (0, roles_decorator_1.Roles)('HR_ADMIN', 'HR Manager', 'SYSTEM_ADMIN'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Manually trigger expiry detection',
        description: 'Manually trigger the expiry detection job to create notifications for shifts/assignments expiring within the specified days. Normally runs automatically at 9 AM daily.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'daysBeforeExpiry',
        required: false,
        description: 'Number of days before expiry to detect (default: 30)',
        type: Number,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Expiry detection completed',
        schema: {
            type: 'object',
            properties: {
                notificationsCreated: { type: 'number' },
                message: { type: 'string' },
            },
        },
    }),
    __param(0, (0, common_1.Query)('daysBeforeExpiry')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ShiftExpiryNotificationController.prototype, "triggerDetection", null);
__decorate([
    (0, common_1.Patch)('shifts/:id/resolve'),
    (0, roles_decorator_1.Roles)('HR_ADMIN', 'HR Manager', 'SYSTEM_ADMIN'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Resolve an expiry notification',
        description: 'Mark an expiry notification as resolved. This is typically done after renewing or replacing the expiring shift/assignment.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Notification ID' }),
    (0, swagger_1.ApiBody)({ type: resolve_notification_dto_1.ResolveNotificationDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Notification resolved successfully',
        type: shift_expiry_notification_response_dto_1.ShiftExpiryNotificationResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Notification not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, resolve_notification_dto_1.ResolveNotificationDto]),
    __metadata("design:returntype", Promise)
], ShiftExpiryNotificationController.prototype, "resolveNotification", null);
exports.ShiftExpiryNotificationController = ShiftExpiryNotificationController = ShiftExpiryNotificationController_1 = __decorate([
    (0, swagger_1.ApiTags)('notifications'),
    (0, common_1.Controller)('time-management/notifications'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [shift_expiry_service_1.ShiftExpiryService,
        shift_expiry_scheduler_service_1.ShiftExpirySchedulerService])
], ShiftExpiryNotificationController);
//# sourceMappingURL=shift-expiry-notification.controller.js.map