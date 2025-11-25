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
exports.CreateLeaveTypeDto = void 0;
const class_validator_1 = require("class-validator");
const leave_type_schema_1 = require("../schemas/leave-type.schema");
class CreateLeaveTypeDto {
    code;
    name;
    category;
    requiresDocument;
    documentType;
    maxDaysPerYear;
    maxConsecutiveDays;
    minDaysNotice;
    allowPartialDays;
    gender;
    isActive;
    payrollPayCode;
    description;
}
exports.CreateLeaveTypeDto = CreateLeaveTypeDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50, { message: 'Code must not exceed 50 characters' }),
    __metadata("design:type", String)
], CreateLeaveTypeDto.prototype, "code", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100, { message: 'Name must not exceed 100 characters' }),
    __metadata("design:type", String)
], CreateLeaveTypeDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(leave_type_schema_1.LeaveCategory),
    __metadata("design:type", String)
], CreateLeaveTypeDto.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateLeaveTypeDto.prototype, "requiresDocument", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(100, { message: 'Document type must not exceed 100 characters' }),
    __metadata("design:type", String)
], CreateLeaveTypeDto.prototype, "documentType", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateLeaveTypeDto.prototype, "maxDaysPerYear", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateLeaveTypeDto.prototype, "maxConsecutiveDays", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateLeaveTypeDto.prototype, "minDaysNotice", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateLeaveTypeDto.prototype, "allowPartialDays", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(leave_type_schema_1.Gender),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLeaveTypeDto.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateLeaveTypeDto.prototype, "isActive", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50, { message: 'Payroll pay code must not exceed 50 characters' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLeaveTypeDto.prototype, "payrollPayCode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(500, { message: 'Description must not exceed 500 characters' }),
    __metadata("design:type", String)
], CreateLeaveTypeDto.prototype, "description", void 0);
//# sourceMappingURL=create-leave-type.dto.js.map