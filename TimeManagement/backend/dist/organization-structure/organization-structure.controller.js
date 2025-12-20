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
exports.OrganizationStructureController = void 0;
const common_1 = require("@nestjs/common");
const hierarchy_service_1 = require("./hierarchy/hierarchy.service");
const organization_structure_service_1 = require("./organization-structure.service");
const create_department_dto_1 = require("./dto/create-department.dto");
const update_department_dto_1 = require("./dto/update-department.dto");
const create_position_dto_1 = require("./dto/create-position.dto");
const update_position_dto_1 = require("./dto/update-position.dto");
let OrganizationStructureController = class OrganizationStructureController {
    orgService;
    organizationStructureService;
    hierarchyService;
    constructor(orgService, organizationStructureService, hierarchyService) {
        this.orgService = orgService;
        this.organizationStructureService = organizationStructureService;
        this.hierarchyService = hierarchyService;
    }
    getOrganizationHierarchy() {
        return this.hierarchyService.getOrgHierarchy();
    }
    getPositionHierarchy(id) {
        return this.hierarchyService.getPositionHierarchy(id);
    }
    async testValidation(id) {
        try {
            const result = await this.hierarchyService['validation']?.validateObjectId(id);
            return { message: "VALID OBJECT ID", id };
        }
        catch (error) {
            return error;
        }
    }
    createDepartment(dto) {
        return this.orgService.createDepartment(dto);
    }
    getAllDepartments() {
        return this.orgService.getAllDepartments();
    }
    getDepartment(id) {
        return this.orgService.getDepartmentById(id);
    }
    updateDepartment(id, dto) {
        return this.orgService.updateDepartment(id, dto);
    }
    deactivateDepartment(id) {
        return this.orgService.deactivateDepartment(id);
    }
    activateDepartment(id) {
        return this.orgService.activateDepartment(id);
    }
    createPosition(dto) {
        return this.orgService.createPosition(dto);
    }
    getPositions() {
        return this.orgService.getPositions();
    }
    getPosition(id) {
        return this.orgService.getPositionById(id);
    }
    updatePosition(id, dto) {
        return this.orgService.updatePosition(id, dto);
    }
    deactivatePosition(id) {
        return this.orgService.deactivatePosition(id);
    }
    activatePosition(id) {
        return this.orgService.activatePosition(id);
    }
    setReportingLine(id, reportsToPositionId) {
        return this.orgService.setReportingLine(id, reportsToPositionId);
    }
    removeReportingLine(id) {
        return this.orgService.removeReportingLine(id);
    }
    async getManager(id) {
        return this.orgService.getManagerOfPosition(id);
    }
    getPositionsInDepartment(id) {
        return this.orgService.getPositionsInDepartment(id);
    }
    validateDepartment(id) {
        return this.orgService.validateDepartment(id);
    }
    validatePosition(id) {
        return this.orgService.validatePosition(id);
    }
    validateReportingLine(sourceId, targetId) {
        return this.orgService.validateReportingLine(sourceId, targetId);
    }
};
exports.OrganizationStructureController = OrganizationStructureController;
__decorate([
    (0, common_1.Get)('hierarchy'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OrganizationStructureController.prototype, "getOrganizationHierarchy", null);
__decorate([
    (0, common_1.Get)('positions/:id/hierarchy'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrganizationStructureController.prototype, "getPositionHierarchy", null);
__decorate([
    (0, common_1.Get)('validation/test/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrganizationStructureController.prototype, "testValidation", null);
__decorate([
    (0, common_1.Post)('departments'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_department_dto_1.CreateDepartmentDto]),
    __metadata("design:returntype", void 0)
], OrganizationStructureController.prototype, "createDepartment", null);
__decorate([
    (0, common_1.Get)('departments'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OrganizationStructureController.prototype, "getAllDepartments", null);
__decorate([
    (0, common_1.Get)('departments/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrganizationStructureController.prototype, "getDepartment", null);
__decorate([
    (0, common_1.Patch)('departments/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_department_dto_1.UpdateDepartmentDto]),
    __metadata("design:returntype", void 0)
], OrganizationStructureController.prototype, "updateDepartment", null);
__decorate([
    (0, common_1.Patch)('departments/deactivate/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrganizationStructureController.prototype, "deactivateDepartment", null);
__decorate([
    (0, common_1.Patch)('departments/activate/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrganizationStructureController.prototype, "activateDepartment", null);
__decorate([
    (0, common_1.Post)('positions'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_position_dto_1.CreatePositionDto]),
    __metadata("design:returntype", void 0)
], OrganizationStructureController.prototype, "createPosition", null);
__decorate([
    (0, common_1.Get)('positions'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OrganizationStructureController.prototype, "getPositions", null);
__decorate([
    (0, common_1.Get)('positions/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrganizationStructureController.prototype, "getPosition", null);
__decorate([
    (0, common_1.Patch)('positions/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_position_dto_1.UpdatePositionDto]),
    __metadata("design:returntype", void 0)
], OrganizationStructureController.prototype, "updatePosition", null);
__decorate([
    (0, common_1.Patch)('positions/:id/deactivate'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrganizationStructureController.prototype, "deactivatePosition", null);
__decorate([
    (0, common_1.Patch)('positions/activate/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrganizationStructureController.prototype, "activatePosition", null);
__decorate([
    (0, common_1.Patch)('positions/:id/report-to'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('reportsToPositionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], OrganizationStructureController.prototype, "setReportingLine", null);
__decorate([
    (0, common_1.Patch)('positions/:id/remove-report-to'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrganizationStructureController.prototype, "removeReportingLine", null);
__decorate([
    (0, common_1.Get)('positions/:id/manager'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrganizationStructureController.prototype, "getManager", null);
__decorate([
    (0, common_1.Get)('departments/:id/positions'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrganizationStructureController.prototype, "getPositionsInDepartment", null);
__decorate([
    (0, common_1.Get)('validate/department/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrganizationStructureController.prototype, "validateDepartment", null);
__decorate([
    (0, common_1.Get)('validate/position/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrganizationStructureController.prototype, "validatePosition", null);
__decorate([
    (0, common_1.Get)('validate/reporting-line'),
    __param(0, (0, common_1.Query)('source')),
    __param(1, (0, common_1.Query)('target')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], OrganizationStructureController.prototype, "validateReportingLine", null);
exports.OrganizationStructureController = OrganizationStructureController = __decorate([
    (0, common_1.Controller)('organization-structure'),
    __metadata("design:paramtypes", [organization_structure_service_1.OrganizationStructureService,
        organization_structure_service_1.OrganizationStructureService,
        hierarchy_service_1.HierarchyService])
], OrganizationStructureController);
//# sourceMappingURL=organization-structure.controller.js.map