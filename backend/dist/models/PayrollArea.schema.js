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
exports.PayrollAreaSchema = exports.PayrollArea = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let PayrollArea = class PayrollArea {
    name;
    description;
    departments;
    employees;
    payrollSchema;
    payCycle;
    createdBy;
    status;
    isActive;
};
exports.PayrollArea = PayrollArea;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], PayrollArea.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], PayrollArea.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: 'Department' }], default: [] }),
    __metadata("design:type", Array)
], PayrollArea.prototype, "departments", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: 'Employee' }], default: [] }),
    __metadata("design:type", Array)
], PayrollArea.prototype, "employees", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'PayrollSchema' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], PayrollArea.prototype, "payrollSchema", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: ['monthly', 'weekly', 'bi-weekly', 'daily'], default: 'monthly' }),
    __metadata("design:type", String)
], PayrollArea.prototype, "payCycle", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], PayrollArea.prototype, "createdBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'pending', enum: ['pending', 'approved', 'rejected'] }),
    __metadata("design:type", String)
], PayrollArea.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], PayrollArea.prototype, "isActive", void 0);
exports.PayrollArea = PayrollArea = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], PayrollArea);
exports.PayrollAreaSchema = mongoose_1.SchemaFactory.createForClass(PayrollArea);
//# sourceMappingURL=PayrollArea.schema.js.map