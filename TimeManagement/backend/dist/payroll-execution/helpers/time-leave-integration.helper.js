"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeLeaveIntegrationHelper = void 0;
class TimeLeaveIntegrationHelper {
    static async getTimeManagementData(employeeId, payrollPeriod) {
        return {
            employeeId,
            payrollPeriod,
            regularHours: 0,
            overtimeHours: 0,
            missingHours: 0,
            workingDays: 0,
            attendanceRate: 100,
        };
    }
    static async getLeaveData(employeeId, payrollPeriod) {
        return {
            employeeId,
            payrollPeriod,
            paidLeaveDays: 0,
            unpaidLeaveDays: 0,
            sickLeaveDays: 0,
            annualLeaveDays: 0,
            accruedLeaveDays: 0,
        };
    }
    static calculateMissingHoursDeduction(missingHours, grossSalary, workingHoursPerDay = 8, workingDaysPerMonth = 30) {
        if (missingHours <= 0)
            return 0;
        const hourlyRate = grossSalary / workingDaysPerMonth / workingHoursPerDay;
        const deduction = missingHours * hourlyRate;
        return Math.round(deduction * 100) / 100;
    }
    static calculateUnpaidLeaveDeduction(unpaidLeaveDays, grossSalary) {
        if (unpaidLeaveDays <= 0)
            return 0;
        const dailyRate = grossSalary / 30;
        const deduction = unpaidLeaveDays * dailyRate;
        return Math.round(deduction * 100) / 100;
    }
    static calculateOvertimePay(overtimeHours, grossSalary, workingHoursPerDay = 8, workingDaysPerMonth = 30) {
        if (overtimeHours <= 0)
            return 0;
        const hourlyRate = grossSalary / workingDaysPerMonth / workingHoursPerDay;
        let overtimePay = 0;
        if (overtimeHours <= 2) {
            overtimePay = overtimeHours * hourlyRate * 1.25;
        }
        else {
            overtimePay =
                2 * hourlyRate * 1.25 + (overtimeHours - 2) * hourlyRate * 1.5;
        }
        return Math.round(overtimePay * 100) / 100;
    }
    static validateAttendance(workingDays, requiredDays, attendanceRate) {
        const minimumAttendanceRate = 80;
        if (attendanceRate < minimumAttendanceRate) {
            return {
                valid: false,
                reason: `Attendance rate ${attendanceRate}% is below minimum ${minimumAttendanceRate}%`,
            };
        }
        if (workingDays < requiredDays * 0.5) {
            return {
                valid: false,
                reason: `Working days ${workingDays} is significantly below required ${requiredDays}`,
            };
        }
        return { valid: true };
    }
    static calculateProratedSalary(baseSalary, workedDays, totalDaysInPeriod) {
        if (workedDays <= 0)
            return 0;
        if (workedDays >= totalDaysInPeriod)
            return baseSalary;
        const prorateFactor = workedDays / totalDaysInPeriod;
        const proratedAmount = baseSalary * prorateFactor;
        return Math.round(proratedAmount * 100) / 100;
    }
}
exports.TimeLeaveIntegrationHelper = TimeLeaveIntegrationHelper;
//# sourceMappingURL=time-leave-integration.helper.js.map