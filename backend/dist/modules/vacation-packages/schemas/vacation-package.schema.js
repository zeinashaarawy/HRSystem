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
exports.VacationPackageSchema = exports.VacationPackage = exports.AccrualFrequency = exports.ContractType = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
var ContractType;
(function (ContractType) {
    ContractType["PERMANENT"] = "PERMANENT";
    ContractType["CONTRACT"] = "CONTRACT";
    ContractType["PART_TIME"] = "PART_TIME";
})(ContractType || (exports.ContractType = ContractType = {}));
var AccrualFrequency;
(function (AccrualFrequency) {
    AccrualFrequency["MONTHLY"] = "MONTHLY";
    AccrualFrequency["QUARTERLY"] = "QUARTERLY";
    AccrualFrequency["ANNUALLY"] = "ANNUALLY";
})(AccrualFrequency || (exports.AccrualFrequency = AccrualFrequency = {}));
let VacationPackage = class VacationPackage {
    name;
    code;
    grade;
    contractType;
    annualLeaveDays;
    sickLeaveDays;
    customEntitlements;
    accrualFrequency;
    carryOverEnabled;
    maxCarryOverDays;
    isActive;
    description;
};
exports.VacationPackage = VacationPackage;
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], VacationPackage.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true, trim: true }),
    __metadata("design:type", String)
], VacationPackage.prototype, "code", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], VacationPackage.prototype, "grade", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ContractType }),
    __metadata("design:type", String)
], VacationPackage.prototype, "contractType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Number, min: 0 }),
    __metadata("design:type", Number)
], VacationPackage.prototype, "annualLeaveDays", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, min: 0, default: 0 }),
    __metadata("design:type", Number)
], VacationPackage.prototype, "sickLeaveDays", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [
            {
                leaveTypeId: { type: mongoose_2.Types.ObjectId, ref: 'LeaveType' },
                days: { type: Number, min: 0 },
            },
        ],
        default: [],
    }),
    __metadata("design:type", Array)
], VacationPackage.prototype, "customEntitlements", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: AccrualFrequency }),
    __metadata("design:type", String)
], VacationPackage.prototype, "accrualFrequency", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], VacationPackage.prototype, "carryOverEnabled", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, min: 0, default: 0 }),
    __metadata("design:type", Number)
], VacationPackage.prototype, "maxCarryOverDays", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], VacationPackage.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], VacationPackage.prototype, "description", void 0);
exports.VacationPackage = VacationPackage = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], VacationPackage);
exports.VacationPackageSchema = mongoose_1.SchemaFactory.createForClass(VacationPackage);
//# sourceMappingURL=vacation-package.schema.js.map