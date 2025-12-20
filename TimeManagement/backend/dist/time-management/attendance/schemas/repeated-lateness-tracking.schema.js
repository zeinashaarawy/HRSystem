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
exports.RepeatedLatenessTrackingSchema = exports.RepeatedLatenessTracking = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let RepeatedLatenessTracking = class RepeatedLatenessTracking {
    employeeId;
    periodStart;
    periodEnd;
    periodType;
    totalLatenessIncidents;
    totalLatenessMinutes;
    thresholdExceeded;
    thresholdExceededAt;
    escalated;
    escalatedAt;
    escalatedTo;
    disciplinaryFlag;
    disciplinaryFlaggedAt;
    lateExceptionIds;
    metadata;
};
exports.RepeatedLatenessTracking = RepeatedLatenessTracking;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'EmployeeProfile', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], RepeatedLatenessTracking.prototype, "employeeId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], RepeatedLatenessTracking.prototype, "periodStart", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], RepeatedLatenessTracking.prototype, "periodEnd", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ['WEEK', 'MONTH'] }),
    __metadata("design:type", String)
], RepeatedLatenessTracking.prototype, "periodType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], RepeatedLatenessTracking.prototype, "totalLatenessIncidents", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], RepeatedLatenessTracking.prototype, "totalLatenessMinutes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], RepeatedLatenessTracking.prototype, "thresholdExceeded", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], RepeatedLatenessTracking.prototype, "thresholdExceededAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], RepeatedLatenessTracking.prototype, "escalated", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], RepeatedLatenessTracking.prototype, "escalatedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'EmployeeProfile' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], RepeatedLatenessTracking.prototype, "escalatedTo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], RepeatedLatenessTracking.prototype, "disciplinaryFlag", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], RepeatedLatenessTracking.prototype, "disciplinaryFlaggedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [mongoose_2.Types.ObjectId], ref: 'TimeException', default: [] }),
    __metadata("design:type", Array)
], RepeatedLatenessTracking.prototype, "lateExceptionIds", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, default: {} }),
    __metadata("design:type", Object)
], RepeatedLatenessTracking.prototype, "metadata", void 0);
exports.RepeatedLatenessTracking = RepeatedLatenessTracking = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], RepeatedLatenessTracking);
exports.RepeatedLatenessTrackingSchema = mongoose_1.SchemaFactory.createForClass(RepeatedLatenessTracking);
exports.RepeatedLatenessTrackingSchema.index({ employeeId: 1, periodStart: -1 });
exports.RepeatedLatenessTrackingSchema.index({ thresholdExceeded: 1, escalated: -1 });
//# sourceMappingURL=repeated-lateness-tracking.schema.js.map