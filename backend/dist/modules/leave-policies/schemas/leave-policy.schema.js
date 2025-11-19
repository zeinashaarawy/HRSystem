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
exports.LeavePolicySchema = exports.LeavePolicy = exports.CriterionDate = exports.AccrualFrequency = exports.PolicyType = void 0;
const mongoose_1 = require("@nestjs/mongoose");
var PolicyType;
(function (PolicyType) {
    PolicyType["ACCRUAL"] = "ACCRUAL";
    PolicyType["APPROVAL"] = "APPROVAL";
    PolicyType["VALIDATION"] = "VALIDATION";
    PolicyType["CALCULATION"] = "CALCULATION";
})(PolicyType || (exports.PolicyType = PolicyType = {}));
var AccrualFrequency;
(function (AccrualFrequency) {
    AccrualFrequency["MONTHLY"] = "MONTHLY";
    AccrualFrequency["QUARTERLY"] = "QUARTERLY";
    AccrualFrequency["ANNUALLY"] = "ANNUALLY";
})(AccrualFrequency || (exports.AccrualFrequency = AccrualFrequency = {}));
var CriterionDate;
(function (CriterionDate) {
    CriterionDate["HIRE_DATE"] = "HIRE_DATE";
    CriterionDate["WORK_START_DATE"] = "WORK_START_DATE";
})(CriterionDate || (exports.CriterionDate = CriterionDate = {}));
let LeavePolicy = class LeavePolicy {
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
};
exports.LeavePolicy = LeavePolicy;
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], LeavePolicy.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: PolicyType }),
    __metadata("design:type", String)
], LeavePolicy.prototype, "policyType", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            frequency: { type: String, enum: AccrualFrequency },
            pauseDuringUnpaidLeave: { type: Boolean, default: true },
            pauseDuringSuspension: { type: Boolean, default: true },
            criterionDate: { type: String, enum: CriterionDate },
        },
    }),
    __metadata("design:type", Object)
], LeavePolicy.prototype, "accrualRules", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            levels: [
                {
                    sequence: { type: Number },
                    role: { type: String },
                    autoEscalateAfterHours: { type: Number },
                    canDelegate: { type: Boolean },
                },
            ],
            managerCanOverride: { type: Boolean, default: false },
            hrCanOverride: { type: Boolean, default: true },
        },
    }),
    __metadata("design:type", Object)
], LeavePolicy.prototype, "approvalRules", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            minAdvanceNoticeDays: { type: Number, default: 0 },
            maxPostLeaveGracePeriodHours: { type: Number, default: 48 },
            blockOverlappingRequests: { type: Boolean, default: true },
            checkTeamAvailability: { type: Boolean, default: true },
            minTeamAvailabilityPercent: { type: Number, default: 70 },
        },
    }),
    __metadata("design:type", Object)
], LeavePolicy.prototype, "validationRules", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            excludeWeekends: { type: Boolean, default: true },
            excludePublicHolidays: { type: Boolean, default: true },
            allowNegativeBalance: { type: Boolean, default: false },
            autoConvertToUnpaid: { type: Boolean, default: false },
        },
    }),
    __metadata("design:type", Object)
], LeavePolicy.prototype, "calculationRules", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], LeavePolicy.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], LeavePolicy.prototype, "effectiveFrom", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], LeavePolicy.prototype, "effectiveTo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], LeavePolicy.prototype, "description", void 0);
exports.LeavePolicy = LeavePolicy = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], LeavePolicy);
exports.LeavePolicySchema = mongoose_1.SchemaFactory.createForClass(LeavePolicy);
//# sourceMappingURL=leave-policy.schema.js.map