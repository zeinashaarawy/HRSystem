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
exports.ScheduleInterviewDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const application_stage_enum_1 = require("../enums/application-stage.enum");
const interview_method_enum_1 = require("../enums/interview-method.enum");
class ScheduleInterviewDto {
    applicationId;
    stage;
    scheduledDate;
    method;
    panel;
    videoLink;
    calendarEventId;
}
exports.ScheduleInterviewDto = ScheduleInterviewDto;
__decorate([
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], ScheduleInterviewDto.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(application_stage_enum_1.ApplicationStage),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ScheduleInterviewDto.prototype, "stage", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], ScheduleInterviewDto.prototype, "scheduledDate", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(interview_method_enum_1.InterviewMethod),
    __metadata("design:type", String)
], ScheduleInterviewDto.prototype, "method", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsMongoId)({ each: true }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], ScheduleInterviewDto.prototype, "panel", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ScheduleInterviewDto.prototype, "videoLink", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ScheduleInterviewDto.prototype, "calendarEventId", void 0);
//# sourceMappingURL=schedule-interview.dto.js.map