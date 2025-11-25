"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationStructureModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const department_schema_1 = require("./schemas/department.schema");
const position_schema_1 = require("./schemas/position.schema");
const department_service_1 = require("./department.service");
const position_service_1 = require("./position.service");
const department_controller_1 = require("./department.controller");
const position_controller_1 = require("./position.controller");
let OrganizationStructureModule = class OrganizationStructureModule {
};
exports.OrganizationStructureModule = OrganizationStructureModule;
exports.OrganizationStructureModule = OrganizationStructureModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: department_schema_1.Department.name, schema: department_schema_1.DepartmentSchema },
                { name: position_schema_1.Position.name, schema: position_schema_1.PositionSchema },
            ]),
        ],
        controllers: [department_controller_1.DepartmentController,
            position_controller_1.PositionController],
        providers: [department_service_1.DepartmentService, position_service_1.PositionService],
        exports: [department_service_1.DepartmentService, position_service_1.PositionService],
    })
], OrganizationStructureModule);
//# sourceMappingURL=organization-structure.module.js.map