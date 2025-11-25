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
exports.PositionService = void 0;
const common_1 = require("@nestjs/common");
const department_service_1 = require("./department.service");
let PositionService = class PositionService {
    departmentService;
    constructor(departmentService) {
        this.departmentService = departmentService;
    }
    getDummyPosition() {
        const dept = this.departmentService.getDummyDepartment();
        return {
            id: 'pos-001',
            code: 'POS-HR-1',
            title: 'HR Specialist',
            department: dept,
            reportsTo: null,
            payGrade: 'PG5',
            isActive: true,
        };
    }
};
exports.PositionService = PositionService;
exports.PositionService = PositionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [department_service_1.DepartmentService])
], PositionService);
//# sourceMappingURL=position.service.js.map