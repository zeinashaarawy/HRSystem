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
exports.PayrollApprovalSchema = exports.PayrollApproval = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let PayrollApproval = class PayrollApproval extends mongoose_2.Document {
    payrollRunId;
    role;
    status;
    reason;
    decidedBy;
    decidedAt;
};
exports.PayrollApproval = PayrollApproval;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'PayrollRun', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], PayrollApproval.prototype, "payrollRunId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        enum: ['PayrollSpecialist', 'PayrollManager', 'FinanceStaff'],
        required: true
    }),
    __metadata("design:type", String)
], PayrollApproval.prototype, "role", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    }),
    __metadata("design:type", String)
], PayrollApproval.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], PayrollApproval.prototype, "reason", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], PayrollApproval.prototype, "decidedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], PayrollApproval.prototype, "decidedAt", void 0);
exports.PayrollApproval = PayrollApproval = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], PayrollApproval);
exports.PayrollApprovalSchema = mongoose_1.SchemaFactory.createForClass(PayrollApproval);
//# sourceMappingURL=PayrollApproval.js.map