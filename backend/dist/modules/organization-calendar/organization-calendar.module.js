"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationCalendarModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const organization_calendar_service_1 = require("./organization-calendar.service");
const organization_calendar_controller_1 = require("./organization-calendar.controller");
const organization_calendar_schema_1 = require("./schemas/organization-calendar.schema");
let OrganizationCalendarModule = class OrganizationCalendarModule {
};
exports.OrganizationCalendarModule = OrganizationCalendarModule;
exports.OrganizationCalendarModule = OrganizationCalendarModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: organization_calendar_schema_1.OrganizationCalendar.name, schema: organization_calendar_schema_1.OrganizationCalendarSchema },
            ]),
        ],
        controllers: [organization_calendar_controller_1.OrganizationCalendarController],
        providers: [organization_calendar_service_1.OrganizationCalendarService],
        exports: [organization_calendar_service_1.OrganizationCalendarService],
    })
], OrganizationCalendarModule);
//# sourceMappingURL=organization-calendar.module.js.map