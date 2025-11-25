"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveRequestsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const leave_requests_controller_1 = require("./leave-requests.controller");
const leave_requests_service_1 = require("./leave-requests.service");
const leave_request_schema_1 = require("./schemas/leave-request.schema");
let LeaveRequestsModule = class LeaveRequestsModule {
};
exports.LeaveRequestsModule = LeaveRequestsModule;
exports.LeaveRequestsModule = LeaveRequestsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: leave_request_schema_1.LeaveRequest.name, schema: leave_request_schema_1.LeaveRequestSchema }]),
        ],
        controllers: [leave_requests_controller_1.LeaveRequestsController],
        providers: [leave_requests_service_1.LeaveRequestsService],
        exports: [leave_requests_service_1.LeaveRequestsService],
    })
], LeaveRequestsModule);
//# sourceMappingURL=leave-requests.module.js.map