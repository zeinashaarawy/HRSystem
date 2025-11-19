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
exports.CreateVacationPackageDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const vacation_package_schema_1 = require("../schemas/vacation-package.schema");
class CustomEntitlementDto {
    leaveTypeId;
    days;
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CustomEntitlementDto.prototype, "leaveTypeId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CustomEntitlementDto.prototype, "days", void 0);
class CreateVacationPackageDto {
    name;
    code;
    grade;
    contractType;
    annualLeaveDays;
    sickLeaveDays;
    customEntitlements;
    accrualFrequency;
    carryOverEnabled;
    maxCarryOverDays;
    isActive;
    description;
}
exports.CreateVacationPackageDto = CreateVacationPackageDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateVacationPackageDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateVacationPackageDto.prototype, "code", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateVacationPackageDto.prototype, "grade", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(vacation_package_schema_1.ContractType),
    __metadata("design:type", String)
], CreateVacationPackageDto.prototype, "contractType", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateVacationPackageDto.prototype, "annualLeaveDays", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateVacationPackageDto.prototype, "sickLeaveDays", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CustomEntitlementDto),
    __metadata("design:type", Array)
], CreateVacationPackageDto.prototype, "customEntitlements", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(vacation_package_schema_1.AccrualFrequency),
    __metadata("design:type", String)
], CreateVacationPackageDto.prototype, "accrualFrequency", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateVacationPackageDto.prototype, "carryOverEnabled", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateVacationPackageDto.prototype, "maxCarryOverDays", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateVacationPackageDto.prototype, "isActive", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], CreateVacationPackageDto.prototype, "description", void 0);
//# sourceMappingURL=create-vacation-package.dto.js.map