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
exports.TaxRuleSchema = exports.TaxRule = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let TaxRule = class TaxRule {
    code;
    taxType;
    bracketMin;
    bracketMax;
    percentage;
    exemptionAmount;
    lawReference;
    effectiveFrom;
    effectiveTo;
    status;
    createdBy;
};
exports.TaxRule = TaxRule;
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], TaxRule.prototype, "code", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: ['income-tax', 'exemption', 'other'], required: true }),
    __metadata("design:type", String)
], TaxRule.prototype, "taxType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], TaxRule.prototype, "bracketMin", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: Infinity }),
    __metadata("design:type", Number)
], TaxRule.prototype, "bracketMax", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true }),
    __metadata("design:type", Number)
], TaxRule.prototype, "percentage", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], TaxRule.prototype, "exemptionAmount", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], TaxRule.prototype, "lawReference", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: Date.now }),
    __metadata("design:type", Date)
], TaxRule.prototype, "effectiveFrom", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: null }),
    __metadata("design:type", Date)
], TaxRule.prototype, "effectiveTo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'pending', enum: ['pending', 'approved', 'rejected'] }),
    __metadata("design:type", String)
], TaxRule.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], TaxRule.prototype, "createdBy", void 0);
exports.TaxRule = TaxRule = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], TaxRule);
exports.TaxRuleSchema = mongoose_1.SchemaFactory.createForClass(TaxRule);
//# sourceMappingURL=TaxRule.schema.js.map