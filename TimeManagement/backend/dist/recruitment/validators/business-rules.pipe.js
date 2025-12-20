"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferralValidationPipe = exports.AnalyticsQueryPipe = exports.OfferApprovalPipe = exports.InterviewSchedulePipe = exports.ApplicationStatusPipe = exports.ParseObjectIdPipe = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
let ParseObjectIdPipe = class ParseObjectIdPipe {
    transform(value, metadata) {
        if (!mongoose_1.Types.ObjectId.isValid(value)) {
            throw new common_1.BadRequestException(`Invalid ObjectId: ${value}`);
        }
        return new mongoose_1.Types.ObjectId(value);
    }
};
exports.ParseObjectIdPipe = ParseObjectIdPipe;
exports.ParseObjectIdPipe = ParseObjectIdPipe = __decorate([
    (0, common_1.Injectable)()
], ParseObjectIdPipe);
let ApplicationStatusPipe = class ApplicationStatusPipe {
    validTransitions = {
        submitted: ['in_process', 'rejected'],
        in_process: ['offer', 'rejected'],
        offer: ['hired', 'rejected'],
        hired: [],
        rejected: [],
    };
    transform(value, metadata) {
        if (metadata.type !== 'body') {
            return value;
        }
        const { status, currentStage } = value;
        if (status && !this.isValidStatus(status)) {
            throw new common_1.BadRequestException(`Invalid application status: ${status} (BR9)`);
        }
        return value;
    }
    isValidStatus(status) {
        return ['submitted', 'in_process', 'offer', 'hired', 'rejected'].includes(status);
    }
};
exports.ApplicationStatusPipe = ApplicationStatusPipe;
exports.ApplicationStatusPipe = ApplicationStatusPipe = __decorate([
    (0, common_1.Injectable)()
], ApplicationStatusPipe);
let InterviewSchedulePipe = class InterviewSchedulePipe {
    transform(value, metadata) {
        if (metadata.type !== 'body') {
            return value;
        }
        const { scheduledDate, panel, method } = value;
        if (scheduledDate && new Date(scheduledDate) <= new Date()) {
            throw new common_1.BadRequestException('Interview must be scheduled for a future date (BR19)');
        }
        if (!panel || panel.length === 0) {
            throw new common_1.BadRequestException('At least one panel member is required (BR19)');
        }
        if (method === 'video' && !value.videoLink) {
            throw new common_1.BadRequestException('Video link is required for video interviews (BR19)');
        }
        return value;
    }
};
exports.InterviewSchedulePipe = InterviewSchedulePipe;
exports.InterviewSchedulePipe = InterviewSchedulePipe = __decorate([
    (0, common_1.Injectable)()
], InterviewSchedulePipe);
let OfferApprovalPipe = class OfferApprovalPipe {
    transform(value, metadata) {
        if (metadata.type !== 'body') {
            return value;
        }
        const { status, role } = value;
        const validRoles = [
            'HR Manager',
            'Financial Approver',
            'Department Head',
            'CEO',
        ];
        if (!validRoles.includes(role)) {
            throw new common_1.BadRequestException(`Invalid approver role. Must be one of: ${validRoles.join(', ')} (BR26)`);
        }
        return value;
    }
};
exports.OfferApprovalPipe = OfferApprovalPipe;
exports.OfferApprovalPipe = OfferApprovalPipe = __decorate([
    (0, common_1.Injectable)()
], OfferApprovalPipe);
let AnalyticsQueryPipe = class AnalyticsQueryPipe {
    transform(value, metadata) {
        if (metadata.type !== 'query') {
            return value;
        }
        const { startDate, endDate } = value;
        if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
            throw new common_1.BadRequestException('Start date must be before end date (BR33)');
        }
        if (startDate && endDate) {
            const daysDiff = Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) /
                (1000 * 60 * 60 * 24));
            if (daysDiff > 365) {
                throw new common_1.BadRequestException('Date range cannot exceed 365 days (BR33)');
            }
        }
        return value;
    }
};
exports.AnalyticsQueryPipe = AnalyticsQueryPipe;
exports.AnalyticsQueryPipe = AnalyticsQueryPipe = __decorate([
    (0, common_1.Injectable)()
], AnalyticsQueryPipe);
let ReferralValidationPipe = class ReferralValidationPipe {
    transform(value, metadata) {
        if (metadata.type !== 'body') {
            return value;
        }
        const { referringEmployeeId, candidateId } = value;
        if (!referringEmployeeId || !mongoose_1.Types.ObjectId.isValid(referringEmployeeId)) {
            throw new common_1.BadRequestException('Valid referring employee ID is required (BR14)');
        }
        if (!candidateId || !mongoose_1.Types.ObjectId.isValid(candidateId)) {
            throw new common_1.BadRequestException('Valid candidate ID is required (BR14)');
        }
        return value;
    }
};
exports.ReferralValidationPipe = ReferralValidationPipe;
exports.ReferralValidationPipe = ReferralValidationPipe = __decorate([
    (0, common_1.Injectable)()
], ReferralValidationPipe);
//# sourceMappingURL=business-rules.pipe.js.map