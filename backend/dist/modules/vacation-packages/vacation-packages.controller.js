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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VacationPackagesController = void 0;
const common_1 = require("@nestjs/common");
const vacation_packages_service_1 = require("./vacation-packages.service");
const create_vacation_package_dto_1 = require("./dto/create-vacation-package.dto");
const update_vacation_package_dto_1 = require("./dto/update-vacation-package.dto");
let VacationPackagesController = class VacationPackagesController {
    vacationPackagesService;
    constructor(vacationPackagesService) {
        this.vacationPackagesService = vacationPackagesService;
    }
    create(createVacationPackageDto) {
        return this.vacationPackagesService.create(createVacationPackageDto);
    }
    findAll() {
        return this.vacationPackagesService.findAll();
    }
    findActive() {
        return this.vacationPackagesService.findActive();
    }
    findByContractType(contractType) {
        return this.vacationPackagesService.findByContractType(contractType);
    }
    findOne(id) {
        return this.vacationPackagesService.findOne(id);
    }
    findByCode(code) {
        return this.vacationPackagesService.findByCode(code);
    }
    update(id, updateVacationPackageDto) {
        return this.vacationPackagesService.update(id, updateVacationPackageDto);
    }
    remove(id) {
        return this.vacationPackagesService.remove(id);
    }
    deactivate(id) {
        return this.vacationPackagesService.deactivate(id);
    }
    activate(id) {
        return this.vacationPackagesService.activate(id);
    }
};
exports.VacationPackagesController = VacationPackagesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_vacation_package_dto_1.CreateVacationPackageDto]),
    __metadata("design:returntype", void 0)
], VacationPackagesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], VacationPackagesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('active'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], VacationPackagesController.prototype, "findActive", null);
__decorate([
    (0, common_1.Get)('contract-type/:contractType'),
    __param(0, (0, common_1.Param)('contractType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VacationPackagesController.prototype, "findByContractType", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VacationPackagesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('code/:code'),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VacationPackagesController.prototype, "findByCode", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_vacation_package_dto_1.UpdateVacationPackageDto]),
    __metadata("design:returntype", void 0)
], VacationPackagesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VacationPackagesController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/deactivate'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VacationPackagesController.prototype, "deactivate", null);
__decorate([
    (0, common_1.Patch)(':id/activate'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VacationPackagesController.prototype, "activate", null);
exports.VacationPackagesController = VacationPackagesController = __decorate([
    (0, common_1.Controller)('vacation-packages'),
    __metadata("design:paramtypes", [vacation_packages_service_1.VacationPackagesService])
], VacationPackagesController);
//# sourceMappingURL=vacation-packages.controller.js.map