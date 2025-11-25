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
exports.PerformanceTemplateSchema = exports.PerformanceTemplate = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let PerformanceTemplate = class PerformanceTemplate extends mongoose_2.Document {
    name;
    type;
    description;
    isActive;
    criteria;
};
exports.PerformanceTemplate = PerformanceTemplate;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], PerformanceTemplate.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], PerformanceTemplate.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], PerformanceTemplate.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], PerformanceTemplate.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [
            {
                name: String,
                weight: Number,
                description: String,
            },
        ],
        default: [],
    }),
    __metadata("design:type", Array)
], PerformanceTemplate.prototype, "criteria", void 0);
exports.PerformanceTemplate = PerformanceTemplate = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], PerformanceTemplate);
exports.PerformanceTemplateSchema = mongoose_1.SchemaFactory.createForClass(PerformanceTemplate);
//# sourceMappingURL=performance-template.schema.js.map