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
exports.VacationPackagesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const vacation_package_schema_1 = require("./schemas/vacation-package.schema");
let VacationPackagesService = class VacationPackagesService {
    vacationPackageModel;
    constructor(vacationPackageModel) {
        this.vacationPackageModel = vacationPackageModel;
    }
    async create(createVacationPackageDto) {
        const existingPackage = await this.vacationPackageModel.findOne({
            code: createVacationPackageDto.code,
        });
        if (existingPackage) {
            throw new common_1.ConflictException(`Vacation package with code '${createVacationPackageDto.code}' already exists`);
        }
        const createdPackage = new this.vacationPackageModel(createVacationPackageDto);
        return createdPackage.save();
    }
    async findAll() {
        return this.vacationPackageModel
            .find()
            .populate('customEntitlements.leaveTypeId')
            .exec();
    }
    async findActive() {
        return this.vacationPackageModel
            .find({ isActive: true })
            .populate('customEntitlements.leaveTypeId')
            .exec();
    }
    async findOne(id) {
        const vacationPackage = await this.vacationPackageModel
            .findById(id)
            .populate('customEntitlements.leaveTypeId')
            .exec();
        if (!vacationPackage) {
            throw new common_1.NotFoundException(`Vacation package with ID '${id}' not found`);
        }
        return vacationPackage;
    }
    async findByCode(code) {
        const vacationPackage = await this.vacationPackageModel
            .findOne({ code })
            .populate('customEntitlements.leaveTypeId')
            .exec();
        if (!vacationPackage) {
            throw new common_1.NotFoundException(`Vacation package with code '${code}' not found`);
        }
        return vacationPackage;
    }
    async findByContractType(contractType) {
        return this.vacationPackageModel
            .find({ contractType, isActive: true })
            .populate('customEntitlements.leaveTypeId')
            .exec();
    }
    async update(id, updateVacationPackageDto) {
        if (updateVacationPackageDto.code) {
            const existingPackage = await this.vacationPackageModel.findOne({
                code: updateVacationPackageDto.code,
                _id: { $ne: id },
            });
            if (existingPackage) {
                throw new common_1.ConflictException(`Vacation package with code '${updateVacationPackageDto.code}' already exists`);
            }
        }
        const updatedPackage = await this.vacationPackageModel
            .findByIdAndUpdate(id, updateVacationPackageDto, { new: true })
            .populate('customEntitlements.leaveTypeId')
            .exec();
        if (!updatedPackage) {
            throw new common_1.NotFoundException(`Vacation package with ID '${id}' not found`);
        }
        return updatedPackage;
    }
    async remove(id) {
        const result = await this.vacationPackageModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new common_1.NotFoundException(`Vacation package with ID '${id}' not found`);
        }
    }
    async deactivate(id) {
        const vacationPackage = await this.vacationPackageModel
            .findByIdAndUpdate(id, { isActive: false }, { new: true })
            .exec();
        if (!vacationPackage) {
            throw new common_1.NotFoundException(`Vacation package with ID '${id}' not found`);
        }
        return vacationPackage;
    }
    async activate(id) {
        const vacationPackage = await this.vacationPackageModel
            .findByIdAndUpdate(id, { isActive: true }, { new: true })
            .exec();
        if (!vacationPackage) {
            throw new common_1.NotFoundException(`Vacation package with ID '${id}' not found`);
        }
        return vacationPackage;
    }
};
exports.VacationPackagesService = VacationPackagesService;
exports.VacationPackagesService = VacationPackagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(vacation_package_schema_1.VacationPackage.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], VacationPackagesService);
//# sourceMappingURL=vacation-packages.service.js.map