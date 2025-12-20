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
exports.AvailabilityResponseDto = exports.WorkingHoursDto = exports.UnavailabilityReason = void 0;
const swagger_1 = require("@nestjs/swagger");
var UnavailabilityReason;
(function (UnavailabilityReason) {
    UnavailabilityReason["HOLIDAY"] = "HOLIDAY";
    UnavailabilityReason["REST_DAY"] = "REST_DAY";
    UnavailabilityReason["ON_LEAVE"] = "ON_LEAVE";
    UnavailabilityReason["NO_SHIFT"] = "NO_SHIFT";
})(UnavailabilityReason || (exports.UnavailabilityReason = UnavailabilityReason = {}));
class WorkingHoursDto {
    start;
    end;
}
exports.WorkingHoursDto = WorkingHoursDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '09:00' }),
    __metadata("design:type", String)
], WorkingHoursDto.prototype, "start", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '17:00' }),
    __metadata("design:type", String)
], WorkingHoursDto.prototype, "end", void 0);
class AvailabilityResponseDto {
    employeeId;
    date;
    available;
    workingHours;
    reason;
}
exports.AvailabilityResponseDto = AvailabilityResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '507f1f77bcf86cd799439011' }),
    __metadata("design:type", String)
], AvailabilityResponseDto.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-01-15' }),
    __metadata("design:type", String)
], AvailabilityResponseDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], AvailabilityResponseDto.prototype, "available", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: WorkingHoursDto, required: false }),
    __metadata("design:type", WorkingHoursDto)
], AvailabilityResponseDto.prototype, "workingHours", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: UnavailabilityReason,
        required: false,
        example: UnavailabilityReason.HOLIDAY,
    }),
    __metadata("design:type", String)
], AvailabilityResponseDto.prototype, "reason", void 0);
//# sourceMappingURL=availability-response.dto.js.map