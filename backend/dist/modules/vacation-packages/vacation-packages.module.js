"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VacationPackagesModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const vacation_packages_service_1 = require("./vacation-packages.service");
const vacation_packages_controller_1 = require("./vacation-packages.controller");
const vacation_package_schema_1 = require("./schemas/vacation-package.schema");
let VacationPackagesModule = class VacationPackagesModule {
};
exports.VacationPackagesModule = VacationPackagesModule;
exports.VacationPackagesModule = VacationPackagesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: vacation_package_schema_1.VacationPackage.name, schema: vacation_package_schema_1.VacationPackageSchema },
            ]),
        ],
        controllers: [vacation_packages_controller_1.VacationPackagesController],
        providers: [vacation_packages_service_1.VacationPackagesService],
        exports: [vacation_packages_service_1.VacationPackagesService],
    })
], VacationPackagesModule);
//# sourceMappingURL=vacation-packages.module.js.map