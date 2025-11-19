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
exports.PayrollRunSchema = exports.PayrollRun = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let PayrollRun = class PayrollRun extends mongoose_2.Document {
    period;
    status;
    initiatedBy;
    initiatedAt;
    managerApprovedAt;
    managerApprovedBy;
    financeApprovedAt;
    financeApprovedBy;
    isFrozen;
    unfreezeReason;
};
exports.PayrollRun = PayrollRun;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], PayrollRun.prototype, "period", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        enum: [
            'PreRun',
            'Initiated',
            'DraftGenerated',
            'UnderReview',
            'PendingManagerApproval',
            'PendingFinanceApproval',
            'Locked',
            'Unfrozen',
            'Executed'
        ],
        default: 'PreRun'
    }),
    __metadata("design:type", String)
], PayrollRun.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], PayrollRun.prototype, "initiatedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], PayrollRun.prototype, "initiatedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], PayrollRun.prototype, "managerApprovedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], PayrollRun.prototype, "managerApprovedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], PayrollRun.prototype, "financeApprovedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], PayrollRun.prototype, "financeApprovedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], PayrollRun.prototype, "isFrozen", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], PayrollRun.prototype, "unfreezeReason", void 0);
exports.PayrollRun = PayrollRun = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], PayrollRun);
exports.PayrollRunSchema = mongoose_1.SchemaFactory.createForClass(PayrollRun);
//# sourceMappingURL=PayrollRun.js.map