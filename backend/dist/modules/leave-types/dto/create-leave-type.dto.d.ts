import { LeaveCategory, Gender } from '../schemas/leave-type.schema';
export declare class CreateLeaveTypeDto {
    code: string;
    name: string;
    category: LeaveCategory;
    requiresDocument?: boolean;
    documentType?: string;
    maxDaysPerYear?: number;
    maxConsecutiveDays?: number;
    minDaysNotice?: number;
    allowPartialDays?: boolean;
    gender?: Gender;
    isActive?: boolean;
    payrollPayCode?: string;
    description?: string;
}
