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
exports.AllowanceSchema = exports.Allowance = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Allowance = class Allowance {
    name;
    code;
    type;
    value;
    allowanceType;
    description;
    appliesToContractTypes;
    status;
    createdBy;
};
exports.Allowance = Allowance;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Allowance.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], Allowance.prototype, "code", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['fixed', 'percentage', 'tiered'], required: true }),
    __metadata("design:type", String)
], Allowance.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], Allowance.prototype, "value", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: ['transportation', 'housing', 'meals', 'other'], default: 'other' }),
    __metadata("design:type", String)
], Allowance.prototype, "allowanceType", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Allowance.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: String }], default: [] }),
    __metadata("design:type", Array)
], Allowance.prototype, "appliesToContractTypes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'pending', enum: ['pending', 'approved', 'rejected'] }),
    __metadata("design:type", String)
], Allowance.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Allowance.prototype, "createdBy", void 0);
exports.Allowance = Allowance = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Allowance);
exports.AllowanceSchema = mongoose_1.SchemaFactory.createForClass(Allowance);
//# sourceMappingURL=Allowance.schema.js.map