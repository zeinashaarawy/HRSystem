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
exports.AvailabilityController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const roles_guard_1 = require("../Shift/guards/roles.guard");
const roles_decorator_1 = require("../Shift/decorators/roles.decorator");
const availability_service_1 = require("./availability.service");
const check_availability_dto_1 = require("./dto/check-availability.dto");
const availability_response_dto_1 = require("./dto/availability-response.dto");
let AvailabilityController = class AvailabilityController {
    availabilityService;
    constructor(availabilityService) {
        this.availabilityService = availabilityService;
    }
    async checkAvailability(query) {
        if (!query.employeeId || !query.date) {
            throw new common_1.BadRequestException('Both employeeId and date query parameters are required');
        }
        return this.availabilityService.checkAvailability(query.employeeId, query.date);
    }
};
exports.AvailabilityController = AvailabilityController;
__decorate([
    (0, common_1.Get)('availability'),
    (0, roles_decorator_1.Roles)('HR Manager', 'HR Admin', 'HR_ADMIN', 'System Admin', 'SYSTEM_ADMIN', 'Manager', 'department head'),
    (0, swagger_1.ApiOperation)({
        summary: 'Check employee availability for a specific date',
        description: 'Returns availability status and working hours if available. Checks holidays, rest days, leaves, and shift assignments.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'employeeId',
        required: true,
        description: 'Employee ID (MongoDB ObjectId)',
        example: '507f1f77bcf86cd799439011',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'date',
        required: true,
        description: 'Date in YYYY-MM-DD format',
        example: '2025-01-15',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Availability information',
        type: availability_response_dto_1.AvailabilityResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Invalid employee ID or date format',
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Access denied - Employee role not allowed',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [check_availability_dto_1.CheckAvailabilityDto]),
    __metadata("design:returntype", Promise)
], AvailabilityController.prototype, "checkAvailability", null);
exports.AvailabilityController = AvailabilityController = __decorate([
    (0, swagger_1.ApiTags)('availability'),
    (0, common_1.Controller)('time-management'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [availability_service_1.AvailabilityService])
], AvailabilityController);
//# sourceMappingURL=availability.controller.js.map