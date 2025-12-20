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
exports.CreateSchedulingRuleDto = void 0;
const class_validator_1 = require("class-validator");
class CreateSchedulingRuleDto {
    name;
    type;
    flexInWindow;
    flexOutWindow;
    rotationalPattern;
    workDaysPerWeek;
    hoursPerDay;
    active;
    description;
    departmentIds;
    shiftTemplateIds;
}
exports.CreateSchedulingRuleDto = CreateSchedulingRuleDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSchedulingRuleDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(['FLEXIBLE', 'ROTATIONAL', 'COMPRESSED']),
    __metadata("design:type", String)
], CreateSchedulingRuleDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSchedulingRuleDto.prototype, "flexInWindow", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSchedulingRuleDto.prototype, "flexOutWindow", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSchedulingRuleDto.prototype, "rotationalPattern", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(7),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateSchedulingRuleDto.prototype, "workDaysPerWeek", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(24),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateSchedulingRuleDto.prototype, "hoursPerDay", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateSchedulingRuleDto.prototype, "active", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSchedulingRuleDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateSchedulingRuleDto.prototype, "departmentIds", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateSchedulingRuleDto.prototype, "shiftTemplateIds", void 0);
//# sourceMappingURL=create-scheduling-rule.dto.js.map