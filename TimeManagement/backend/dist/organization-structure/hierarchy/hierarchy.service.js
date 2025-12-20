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
exports.HierarchyService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const department_schema_1 = require("../models/department.schema");
const position_schema_1 = require("../models/position.schema");
let HierarchyService = class HierarchyService {
    departmentModel;
    positionModel;
    constructor(departmentModel, positionModel) {
        this.departmentModel = departmentModel;
        this.positionModel = positionModel;
    }
    async getOrgHierarchy() {
        const departments = await this.departmentModel.find().lean();
        const positions = await this.positionModel.find().lean();
        const positionsByDept = new Map();
        positions.forEach((p) => {
            const key = String(p.departmentId);
            if (!positionsByDept.has(key))
                positionsByDept.set(key, []);
            positionsByDept.get(key).push(p);
        });
        const result = [];
        for (const dept of departments) {
            const deptPositions = positionsByDept.get(String(dept._id)) || [];
            const tree = this.buildPositionTree(deptPositions);
            result.push({
                _id: String(dept._id),
                name: dept.name,
                code: dept.code,
                positions: tree,
            });
        }
        return result;
    }
    async getPositionHierarchy(positionId) {
        if (!mongoose_2.Types.ObjectId.isValid(positionId))
            return null;
        const position = await this.positionModel.findById(positionId).lean();
        if (!position)
            return null;
        const deptPositions = await this.positionModel
            .find({ departmentId: position.departmentId })
            .lean();
        const tree = this.buildPositionTree(deptPositions);
        const findNode = (nodes) => {
            for (const node of nodes) {
                if (node._id === String(position._id))
                    return node;
                const found = findNode(node.children);
                if (found)
                    return found;
            }
            return null;
        };
        return findNode(tree);
    }
    buildPositionTree(flatPositions) {
        const nodeMap = new Map();
        flatPositions.forEach((p) => {
            nodeMap.set(String(p._id), {
                _id: String(p._id),
                title: p.title,
                code: p.code,
                payGrade: p.payGrade,
                reportingTo: p.reportingTo ? String(p.reportingTo) : null,
                children: [],
            });
        });
        const roots = [];
        nodeMap.forEach((node) => {
            if (node.reportingTo && nodeMap.has(node.reportingTo)) {
                nodeMap.get(node.reportingTo).children.push(node);
            }
            else {
                roots.push(node);
            }
        });
        return roots;
    }
};
exports.HierarchyService = HierarchyService;
exports.HierarchyService = HierarchyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(department_schema_1.Department.name)),
    __param(1, (0, mongoose_1.InjectModel)(position_schema_1.Position.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], HierarchyService);
//# sourceMappingURL=hierarchy.service.js.map