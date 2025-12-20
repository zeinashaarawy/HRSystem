import { Types } from 'mongoose';
export interface TimeManagementData {
    employeeId: Types.ObjectId;
    payrollPeriod: Date;
    regularHours: number;
    overtimeHours: number;
    missingHours: number;
    workingDays: number;
    attendanceRate: number;
}
export interface LeaveData {
    employeeId: Types.ObjectId;
    payrollPeriod: Date;
    paidLeaveDays: number;
    unpaidLeaveDays: number;
    sickLeaveDays: number;
    annualLeaveDays: number;
    accruedLeaveDays: number;
}
export declare class TimeLeaveIntegrationHelper {
    static getTimeManagementData(employeeId: Types.ObjectId, payrollPeriod: Date): Promise<TimeManagementData>;
    static getLeaveData(employeeId: Types.ObjectId, payrollPeriod: Date): Promise<LeaveData>;
    static calculateMissingHoursDeduction(missingHours: number, grossSalary: number, workingHoursPerDay?: number, workingDaysPerMonth?: number): number;
    static calculateUnpaidLeaveDeduction(unpaidLeaveDays: number, grossSalary: number): number;
    static calculateOvertimePay(overtimeHours: number, grossSalary: number, workingHoursPerDay?: number, workingDaysPerMonth?: number): number;
    static validateAttendance(workingDays: number, requiredDays: number, attendanceRate: number): {
        valid: boolean;
        reason?: string;
    };
    static calculateProratedSalary(baseSalary: number, workedDays: number, totalDaysInPeriod: number): number;
}
