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
exports.EmployeeLeaveBalanceService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const employee_leave_balance_schema_1 = require("./schemas/employee-leave-balance.schema");
let EmployeeLeaveBalanceService = class EmployeeLeaveBalanceService {
    balanceModel;
    constructor(balanceModel) {
        this.balanceModel = balanceModel;
    }
    async create(createDto) {
        const doc = new this.balanceModel({
            employeeId: new mongoose_2.Types.ObjectId(createDto.employeeId),
            balances: createDto.balances ?? {},
            pending: {},
            accrued: {},
            auditTrail: [{ action: 'created', at: new Date() }],
        });
        return doc.save();
    }
    async findAll() {
        return this.balanceModel.find().lean();
    }
    async findByEmployee(employeeId) {
        const doc = await this.balanceModel.findOne({
            employeeId: new mongoose_2.Types.ObjectId(employeeId),
        });
        if (!doc)
            throw new common_1.NotFoundException('Balance not found for employee');
        return doc;
    }
    async update(employeeId, updateDto) {
        const doc = await this.balanceModel.findOneAndUpdate({ employeeId: new mongoose_2.Types.ObjectId(employeeId) }, {
            $set: {
                ...(updateDto.balances ? { balances: updateDto.balances } : {}),
                ...(updateDto.pending ? { pending: updateDto.pending } : {}),
                ...(updateDto.accrued ? { accrued: updateDto.accrued } : {}),
            },
            $push: { auditTrail: { action: 'update', at: new Date() } },
        }, { new: true, upsert: false });
        if (!doc)
            throw new common_1.NotFoundException('Balance not found for employee');
        return doc;
    }
    async adjustBalance(employeeId, leaveType, delta) {
        const doc = await this.balanceModel.findOne({
            employeeId: new mongoose_2.Types.ObjectId(employeeId),
        });
        if (!doc)
            throw new common_1.NotFoundException('Balance not found');
        const current = doc.balances.get(leaveType) ?? 0;
        doc.balances.set(leaveType, current + delta);
        doc.auditTrail.push({ action: 'adjust', leaveType, delta, at: new Date() });
        return doc.save();
    }
    async removeByEmployee(employeeId) {
        return this.balanceModel.findOneAndDelete({
            employeeId: new mongoose_2.Types.ObjectId(employeeId),
        });
    }
};
exports.EmployeeLeaveBalanceService = EmployeeLeaveBalanceService;
exports.EmployeeLeaveBalanceService = EmployeeLeaveBalanceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(employee_leave_balance_schema_1.EmployeeLeaveBalance.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], EmployeeLeaveBalanceService);
//# sourceMappingURL=employee-leave-balance.service.js.map