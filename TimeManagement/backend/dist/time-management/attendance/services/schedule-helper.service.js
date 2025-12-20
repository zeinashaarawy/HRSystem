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
exports.ScheduleHelperService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const schedule_assignment_schema_1 = require("../../Shift/schemas/schedule-assignment.schema");
const shift_schema_1 = require("../../Shift/schemas/shift.schema");
let ScheduleHelperService = class ScheduleHelperService {
    scheduleAssignmentModel;
    shiftTemplateModel;
    constructor(scheduleAssignmentModel, shiftTemplateModel) {
        this.scheduleAssignmentModel = scheduleAssignmentModel;
        this.shiftTemplateModel = shiftTemplateModel;
    }
    async getScheduledTimes(employeeId, date) {
        const dateOnly = new Date(date);
        dateOnly.setHours(0, 0, 0, 0);
        const dateEnd = new Date(date);
        dateEnd.setHours(23, 59, 59, 999);
        const assignment = await this.scheduleAssignmentModel
            .findOne({
            employeeId,
            status: 'Active',
            effectiveFrom: { $lte: dateEnd },
            $or: [
                { effectiveTo: null },
                { effectiveTo: { $gte: dateOnly } },
            ],
        })
            .populate('shiftTemplateId')
            .sort({ effectiveFrom: -1 })
            .exec();
        if (!assignment || !assignment.shiftTemplateId) {
            return {};
        }
        let shiftTemplate = null;
        if (assignment.shiftTemplateId instanceof mongoose_2.Types.ObjectId) {
            shiftTemplate = await this.shiftTemplateModel.findById(assignment.shiftTemplateId).exec();
        }
        else {
            shiftTemplate = assignment.shiftTemplateId;
        }
        if (!shiftTemplate) {
            return {};
        }
        let startTime;
        let endTime;
        let scheduledMinutes;
        if (shiftTemplate.startTime && shiftTemplate.endTime) {
            const [startHour, startMin] = shiftTemplate.startTime.split(':').map(Number);
            const [endHour, endMin] = shiftTemplate.endTime.split(':').map(Number);
            startTime = new Date(dateOnly);
            startTime.setHours(startHour, startMin, 0, 0);
            endTime = new Date(dateOnly);
            endTime.setHours(endHour, endMin, 0, 0);
            if (shiftTemplate.isOvernight && endTime <= startTime) {
                endTime.setDate(endTime.getDate() + 1);
            }
            scheduledMinutes = Math.floor((endTime.getTime() - startTime.getTime()) / (1000 * 60));
        }
        else if (shiftTemplate.type === 'flexible' && shiftTemplate.requiredHours) {
            scheduledMinutes = shiftTemplate.requiredHours * 60;
        }
        else if (shiftTemplate.type === 'compressed' &&
            shiftTemplate.hoursPerDay) {
            scheduledMinutes = shiftTemplate.hoursPerDay * 60;
        }
        return {
            startTime,
            endTime,
            scheduledMinutes,
            shiftTemplate,
            punchPolicy: 'FIRST_LAST',
        };
    }
};
exports.ScheduleHelperService = ScheduleHelperService;
exports.ScheduleHelperService = ScheduleHelperService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schedule_assignment_schema_1.ScheduleAssignment.name)),
    __param(1, (0, mongoose_1.InjectModel)(shift_schema_1.ShiftTemplate.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], ScheduleHelperService);
//# sourceMappingURL=schedule-helper.service.js.map