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
exports.PayrollSchemaSchema = exports.PayrollSchema = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let PayrollSchema = class PayrollSchema {
    name;
    description;
    taxRules;
    insuranceBrackets;
    allowances;
    deductions;
    status;
    createdBy;
};
exports.PayrollSchema = PayrollSchema;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], PayrollSchema.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], PayrollSchema.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: 'TaxRule' }], default: [] }),
    __metadata("design:type", Array)
], PayrollSchema.prototype, "taxRules", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: 'InsuranceBracket' }], default: [] }),
    __metadata("design:type", Array)
], PayrollSchema.prototype, "insuranceBrackets", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: 'Allowance' }], default: [] }),
    __metadata("design:type", Array)
], PayrollSchema.prototype, "allowances", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: 'Deduction' }], default: [] }),
    __metadata("design:type", Array)
], PayrollSchema.prototype, "deductions", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'pending', enum: ['pending', 'approved', 'rejected'] }),
    __metadata("design:type", String)
], PayrollSchema.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], PayrollSchema.prototype, "createdBy", void 0);
exports.PayrollSchema = PayrollSchema = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], PayrollSchema);
exports.PayrollSchemaSchema = mongoose_1.SchemaFactory.createForClass(PayrollSchema);
//# sourceMappingURL=PayrollSchema.schema.js.map