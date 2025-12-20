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
exports.TimeExceptionSchema = exports.TimeException = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const index_1 = require("../../enums/index");
let TimeException = class TimeException {
    employeeId;
    type;
    attendanceRecordId;
    assignedTo;
    status;
    reason;
    permissionType;
    durationMinutes;
    requestedDate;
    contractStartDateValidated;
    financialCalendarValidated;
    probationDateValidated;
    affectsPayroll;
    affectsBenefits;
    payrollImpactType;
    benefitsImpactType;
    payrollImpactAmount;
    benefitsImpactAmount;
};
exports.TimeException = TimeException;
__decorate([
    (0, mongoose_2.Prop)({ type: mongoose_1.Types.ObjectId, ref: 'EmployeeProfile', required: true }),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], TimeException.prototype, "employeeId", void 0);
__decorate([
    (0, mongoose_2.Prop)({ enum: index_1.TimeExceptionType, required: true }),
    __metadata("design:type", String)
], TimeException.prototype, "type", void 0);
__decorate([
    (0, mongoose_2.Prop)({ type: mongoose_1.Types.ObjectId, ref: 'AttendanceRecord', required: true }),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], TimeException.prototype, "attendanceRecordId", void 0);
__decorate([
    (0, mongoose_2.Prop)({ type: mongoose_1.Types.ObjectId, ref: 'EmployeeProfile', required: true }),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], TimeException.prototype, "assignedTo", void 0);
__decorate([
    (0, mongoose_2.Prop)({ enum: index_1.TimeExceptionStatus, default: index_1.TimeExceptionStatus.OPEN }),
    __metadata("design:type", String)
], TimeException.prototype, "status", void 0);
__decorate([
    (0, mongoose_2.Prop)(),
    __metadata("design:type", String)
], TimeException.prototype, "reason", void 0);
__decorate([
    (0, mongoose_2.Prop)({ enum: index_1.PermissionType, required: false }),
    __metadata("design:type", String)
], TimeException.prototype, "permissionType", void 0);
__decorate([
    (0, mongoose_2.Prop)({ type: Number, required: false }),
    __metadata("design:type", Number)
], TimeException.prototype, "durationMinutes", void 0);
__decorate([
    (0, mongoose_2.Prop)({ type: Date, required: false }),
    __metadata("design:type", Date)
], TimeException.prototype, "requestedDate", void 0);
__decorate([
    (0, mongoose_2.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], TimeException.prototype, "contractStartDateValidated", void 0);
__decorate([
    (0, mongoose_2.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], TimeException.prototype, "financialCalendarValidated", void 0);
__decorate([
    (0, mongoose_2.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], TimeException.prototype, "probationDateValidated", void 0);
__decorate([
    (0, mongoose_2.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], TimeException.prototype, "affectsPayroll", void 0);
__decorate([
    (0, mongoose_2.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], TimeException.prototype, "affectsBenefits", void 0);
__decorate([
    (0, mongoose_2.Prop)({ type: String, required: false }),
    __metadata("design:type", String)
], TimeException.prototype, "payrollImpactType", void 0);
__decorate([
    (0, mongoose_2.Prop)({ type: String, required: false }),
    __metadata("design:type", String)
], TimeException.prototype, "benefitsImpactType", void 0);
__decorate([
    (0, mongoose_2.Prop)({ type: Number, required: false }),
    __metadata("design:type", Number)
], TimeException.prototype, "payrollImpactAmount", void 0);
__decorate([
    (0, mongoose_2.Prop)({ type: Number, required: false }),
    __metadata("design:type", Number)
], TimeException.prototype, "benefitsImpactAmount", void 0);
exports.TimeException = TimeException = __decorate([
    (0, mongoose_2.Schema)()
], TimeException);
exports.TimeExceptionSchema = mongoose_2.SchemaFactory.createForClass(TimeException);
//# sourceMappingURL=time-exception.schema.js.map