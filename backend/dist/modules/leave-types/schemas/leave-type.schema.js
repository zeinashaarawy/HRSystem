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
exports.LeaveTypeSchema = exports.LeaveType = exports.Gender = exports.LeaveCategory = void 0;
const mongoose_1 = require("@nestjs/mongoose");
var LeaveCategory;
(function (LeaveCategory) {
    LeaveCategory["PAID"] = "PAID";
    LeaveCategory["UNPAID"] = "UNPAID";
    LeaveCategory["DEDUCTIBLE"] = "DEDUCTIBLE";
    LeaveCategory["NON_DEDUCTIBLE"] = "NON_DEDUCTIBLE";
})(LeaveCategory || (exports.LeaveCategory = LeaveCategory = {}));
var Gender;
(function (Gender) {
    Gender["ALL"] = "ALL";
    Gender["MALE"] = "MALE";
    Gender["FEMALE"] = "FEMALE";
})(Gender || (exports.Gender = Gender = {}));
let LeaveType = class LeaveType {
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
};
exports.LeaveType = LeaveType;
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true, trim: true }),
    __metadata("design:type", String)
], LeaveType.prototype, "code", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], LeaveType.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: LeaveCategory }),
    __metadata("design:type", String)
], LeaveType.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], LeaveType.prototype, "requiresDocument", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], LeaveType.prototype, "documentType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], LeaveType.prototype, "maxDaysPerYear", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], LeaveType.prototype, "maxConsecutiveDays", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], LeaveType.prototype, "minDaysNotice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], LeaveType.prototype, "allowPartialDays", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: Gender, default: Gender.ALL }),
    __metadata("design:type", String)
], LeaveType.prototype, "gender", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], LeaveType.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], LeaveType.prototype, "payrollPayCode", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], LeaveType.prototype, "description", void 0);
exports.LeaveType = LeaveType = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], LeaveType);
exports.LeaveTypeSchema = mongoose_1.SchemaFactory.createForClass(LeaveType);
//# sourceMappingURL=leave-type.schema.js.map