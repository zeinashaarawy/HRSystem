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
exports.CreatePolicyDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const leave_policy_schema_1 = require("../schemas/leave-policy.schema");
class AccrualRulesDto {
    frequency;
    pauseDuringUnpaidLeave;
    pauseDuringSuspension;
    criterionDate;
}
__decorate([
    (0, class_validator_1.IsEnum)(leave_policy_schema_1.AccrualFrequency),
    __metadata("design:type", String)
], AccrualRulesDto.prototype, "frequency", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], AccrualRulesDto.prototype, "pauseDuringUnpaidLeave", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], AccrualRulesDto.prototype, "pauseDuringSuspension", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(leave_policy_schema_1.CriterionDate),
    __metadata("design:type", String)
], AccrualRulesDto.prototype, "criterionDate", void 0);
class ApprovalLevelDto {
    sequence;
    role;
    autoEscalateAfterHours;
    canDelegate;
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], ApprovalLevelDto.prototype, "sequence", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ApprovalLevelDto.prototype, "role", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], ApprovalLevelDto.prototype, "autoEscalateAfterHours", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ApprovalLevelDto.prototype, "canDelegate", void 0);
class ApprovalRulesDto {
    levels;
    managerCanOverride;
    hrCanOverride;
}
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ApprovalLevelDto),
    __metadata("design:type", Array)
], ApprovalRulesDto.prototype, "levels", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], ApprovalRulesDto.prototype, "managerCanOverride", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], ApprovalRulesDto.prototype, "hrCanOverride", void 0);
class ValidationRulesDto {
    minAdvanceNoticeDays;
    maxPostLeaveGracePeriodHours;
    blockOverlappingRequests;
    checkTeamAvailability;
    minTeamAvailabilityPercent;
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], ValidationRulesDto.prototype, "minAdvanceNoticeDays", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], ValidationRulesDto.prototype, "maxPostLeaveGracePeriodHours", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ValidationRulesDto.prototype, "blockOverlappingRequests", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ValidationRulesDto.prototype, "checkTeamAvailability", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], ValidationRulesDto.prototype, "minTeamAvailabilityPercent", void 0);
class CalculationRulesDto {
    excludeWeekends;
    excludePublicHolidays;
    allowNegativeBalance;
    autoConvertToUnpaid;
}
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CalculationRulesDto.prototype, "excludeWeekends", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CalculationRulesDto.prototype, "excludePublicHolidays", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CalculationRulesDto.prototype, "allowNegativeBalance", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CalculationRulesDto.prototype, "autoConvertToUnpaid", void 0);
class CreatePolicyDto {
    name;
    policyType;
    accrualRules;
    approvalRules;
    validationRules;
    calculationRules;
    isActive;
    effectiveFrom;
    effectiveTo;
    description;
}
exports.CreatePolicyDto = CreatePolicyDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePolicyDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(leave_policy_schema_1.PolicyType),
    __metadata("design:type", String)
], CreatePolicyDto.prototype, "policyType", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => AccrualRulesDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", AccrualRulesDto)
], CreatePolicyDto.prototype, "accrualRules", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => ApprovalRulesDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", ApprovalRulesDto)
], CreatePolicyDto.prototype, "approvalRules", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => ValidationRulesDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", ValidationRulesDto)
], CreatePolicyDto.prototype, "validationRules", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CalculationRulesDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", CalculationRulesDto)
], CreatePolicyDto.prototype, "calculationRules", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreatePolicyDto.prototype, "isActive", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], CreatePolicyDto.prototype, "effectiveFrom", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], CreatePolicyDto.prototype, "effectiveTo", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePolicyDto.prototype, "description", void 0);
//# sourceMappingURL=create-policy.dto.js.map