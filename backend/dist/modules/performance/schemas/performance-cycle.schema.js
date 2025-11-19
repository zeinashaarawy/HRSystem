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
exports.PerformanceCycleSchema = exports.PerformanceCycle = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const performance_template_schema_1 = require("./performance-template.schema");
const department_schema_1 = require("../../organization-structure/schemas/department.schema");
let PerformanceCycle = class PerformanceCycle extends mongoose_2.Document {
    name;
    startDate;
    endDate;
    template;
    status;
    applicableDepartments;
};
exports.PerformanceCycle = PerformanceCycle;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], PerformanceCycle.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, required: true }),
    __metadata("design:type", Date)
], PerformanceCycle.prototype, "startDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, required: true }),
    __metadata("design:type", Date)
], PerformanceCycle.prototype, "endDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: performance_template_schema_1.PerformanceTemplate.name, required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], PerformanceCycle.prototype, "template", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: ['OPEN', 'CLOSED'], default: 'OPEN' }),
    __metadata("design:type", String)
], PerformanceCycle.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: department_schema_1.Department.name }], default: [] }),
    __metadata("design:type", Array)
], PerformanceCycle.prototype, "applicableDepartments", void 0);
exports.PerformanceCycle = PerformanceCycle = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], PerformanceCycle);
exports.PerformanceCycleSchema = mongoose_1.SchemaFactory.createForClass(PerformanceCycle);
//# sourceMappingURL=performance-cycle.schema.js.map