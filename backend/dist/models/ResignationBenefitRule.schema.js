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
exports.ResignationBenefitRuleSchema = exports.ResignationBenefitRule = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ResignationBenefitRule = class ResignationBenefitRule {
    name;
    contractType;
    yearsOfServiceMin;
    yearsOfServiceMax;
    formula;
    status;
    createdBy;
};
exports.ResignationBenefitRule = ResignationBenefitRule;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ResignationBenefitRule.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ResignationBenefitRule.prototype, "contractType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], ResignationBenefitRule.prototype, "yearsOfServiceMin", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 999 }),
    __metadata("design:type", Number)
], ResignationBenefitRule.prototype, "yearsOfServiceMax", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ResignationBenefitRule.prototype, "formula", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'pending', enum: ['pending', 'approved', 'rejected'] }),
    __metadata("design:type", String)
], ResignationBenefitRule.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], ResignationBenefitRule.prototype, "createdBy", void 0);
exports.ResignationBenefitRule = ResignationBenefitRule = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], ResignationBenefitRule);
exports.ResignationBenefitRuleSchema = mongoose_1.SchemaFactory.createForClass(ResignationBenefitRule);
//# sourceMappingURL=ResignationBenefitRule.schema.js.map