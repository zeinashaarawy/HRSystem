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
exports.SchedulingRuleSchema = exports.SchedulingRule = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let SchedulingRule = class SchedulingRule {
    name;
    type;
    flexInWindow;
    flexOutWindow;
    rotationalPattern;
    workDaysPerWeek;
    hoursPerDay;
    active;
    description;
    departmentIds;
    shiftTemplateIds;
};
exports.SchedulingRule = SchedulingRule;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], SchedulingRule.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ['FLEXIBLE', 'ROTATIONAL', 'COMPRESSED'] }),
    __metadata("design:type", String)
], SchedulingRule.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: false }),
    __metadata("design:type", String)
], SchedulingRule.prototype, "flexInWindow", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: false }),
    __metadata("design:type", String)
], SchedulingRule.prototype, "flexOutWindow", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: false }),
    __metadata("design:type", String)
], SchedulingRule.prototype, "rotationalPattern", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: false }),
    __metadata("design:type", Number)
], SchedulingRule.prototype, "workDaysPerWeek", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: false }),
    __metadata("design:type", Number)
], SchedulingRule.prototype, "hoursPerDay", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], SchedulingRule.prototype, "active", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: false }),
    __metadata("design:type", String)
], SchedulingRule.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [{ type: mongoose_2.Types.ObjectId, ref: 'Department' }],
        required: false,
    }),
    __metadata("design:type", Array)
], SchedulingRule.prototype, "departmentIds", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [{ type: mongoose_2.Types.ObjectId, ref: 'ShiftTemplate' }],
        required: false,
    }),
    __metadata("design:type", Array)
], SchedulingRule.prototype, "shiftTemplateIds", void 0);
exports.SchedulingRule = SchedulingRule = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], SchedulingRule);
exports.SchedulingRuleSchema = mongoose_1.SchemaFactory.createForClass(SchedulingRule);
//# sourceMappingURL=scheduling-rule.schema.js.map