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
exports.PerformanceAppraisalSchema = exports.PerformanceAppraisal = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const employee_schema_1 = require("../../employee-profile/schemas/employee.schema");
const performance_cycle_schema_1 = require("./performance-cycle.schema");
let PerformanceAppraisal = class PerformanceAppraisal extends mongoose_2.Document {
    employee;
    manager;
    cycle;
    ratings;
    overallRating;
    managerComment;
    employeeComment;
    status;
    disputeReason;
    disputeResolution;
};
exports.PerformanceAppraisal = PerformanceAppraisal;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: employee_schema_1.Employee.name, required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], PerformanceAppraisal.prototype, "employee", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: employee_schema_1.Employee.name, required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], PerformanceAppraisal.prototype, "manager", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: performance_cycle_schema_1.PerformanceCycle.name, required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], PerformanceAppraisal.prototype, "cycle", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [
            {
                criterion: String,
                score: Number,
                comment: String,
            },
        ],
        default: [],
    }),
    __metadata("design:type", Array)
], PerformanceAppraisal.prototype, "ratings", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], PerformanceAppraisal.prototype, "overallRating", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], PerformanceAppraisal.prototype, "managerComment", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], PerformanceAppraisal.prototype, "employeeComment", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: ['DRAFT', 'SUBMITTED', 'PUBLISHED', 'DISPUTED', 'CLOSED'], default: 'DRAFT' }),
    __metadata("design:type", String)
], PerformanceAppraisal.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], PerformanceAppraisal.prototype, "disputeReason", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], PerformanceAppraisal.prototype, "disputeResolution", void 0);
exports.PerformanceAppraisal = PerformanceAppraisal = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], PerformanceAppraisal);
exports.PerformanceAppraisalSchema = mongoose_1.SchemaFactory.createForClass(PerformanceAppraisal);
//# sourceMappingURL=performance-appraisal.schema.js.map