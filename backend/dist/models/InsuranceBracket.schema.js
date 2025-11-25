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
exports.InsuranceBracketSchema = exports.InsuranceBracket = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let InsuranceBracket = class InsuranceBracket {
    name;
    code;
    insuranceType;
    employeePercentage;
    employerPercentage;
    minSalary;
    maxSalary;
    effectiveFrom;
    effectiveTo;
    status;
    createdBy;
};
exports.InsuranceBracket = InsuranceBracket;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], InsuranceBracket.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], InsuranceBracket.prototype, "code", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: ['health', 'social', 'other'], required: true }),
    __metadata("design:type", String)
], InsuranceBracket.prototype, "insuranceType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true }),
    __metadata("design:type", Number)
], InsuranceBracket.prototype, "employeePercentage", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true }),
    __metadata("design:type", Number)
], InsuranceBracket.prototype, "employerPercentage", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], InsuranceBracket.prototype, "minSalary", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: Infinity }),
    __metadata("design:type", Number)
], InsuranceBracket.prototype, "maxSalary", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: Date.now }),
    __metadata("design:type", Date)
], InsuranceBracket.prototype, "effectiveFrom", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: null }),
    __metadata("design:type", Date)
], InsuranceBracket.prototype, "effectiveTo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'pending', enum: ['pending', 'approved', 'rejected'] }),
    __metadata("design:type", String)
], InsuranceBracket.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], InsuranceBracket.prototype, "createdBy", void 0);
exports.InsuranceBracket = InsuranceBracket = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], InsuranceBracket);
exports.InsuranceBracketSchema = mongoose_1.SchemaFactory.createForClass(InsuranceBracket);
//# sourceMappingURL=InsuranceBracket.schema.js.map