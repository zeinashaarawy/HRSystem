"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const device_sync_service_1 = require("./services/device-sync.service");
const device_sync_controller_1 = require("./controllers/device-sync.controller");
const punch_schema_1 = require("../attendance/schemas/punch.schema");
const attendance_record_schema_1 = require("../attendance/schemas/attendance-record.schema");
let DeviceModule = class DeviceModule {
};
exports.DeviceModule = DeviceModule;
exports.DeviceModule = DeviceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: punch_schema_1.Punch.name, schema: punch_schema_1.PunchSchema },
                { name: attendance_record_schema_1.AttendanceRecord.name, schema: attendance_record_schema_1.AttendanceRecordSchema },
            ]),
        ],
        controllers: [device_sync_controller_1.DeviceSyncController],
        providers: [device_sync_service_1.DeviceSyncService],
        exports: [device_sync_service_1.DeviceSyncService],
    })
], DeviceModule);
//# sourceMappingURL=device.module.js.map