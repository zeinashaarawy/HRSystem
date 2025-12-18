/** Helper: integrate Time Management and Leave data for payroll. */

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

export class TimeLeaveIntegrationHelper {
  /** Get time management data for an employee. TODO: integrate with Time subsystem. */
  static async getTimeManagementData(
    employeeId: Types.ObjectId,
    payrollPeriod: Date,
  ): Promise<TimeManagementData> {
    // Placeholder: replace with actual Time Management API call
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

  /** Get leave data for an employee. TODO: integrate with Leave subsystem. */
  static async getLeaveData(
    employeeId: Types.ObjectId,
    payrollPeriod: Date,
  ): Promise<LeaveData> {
    // Placeholder: replace with actual Leave Management API call
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

  /** Calculate deduction for missing hours. Uses hourlyRate = gross / days / hours. */
  static calculateMissingHoursDeduction(
    missingHours: number,
    grossSalary: number,
    workingHoursPerDay: number = 8,
    workingDaysPerMonth: number = 30,
  ): number {
    if (missingHours <= 0) return 0;

    // Calculate hourly rate: (Monthly Salary / Working Days / Working Hours per Day)
    const hourlyRate = grossSalary / workingDaysPerMonth / workingHoursPerDay;

    // Deduction = Missing Hours × Hourly Rate
    const deduction = missingHours * hourlyRate;

    return Math.round(deduction * 100) / 100;
  }

  /** Calculate deduction for unpaid leave days (daily rate = gross / 30). */
  static calculateUnpaidLeaveDeduction(
    unpaidLeaveDays: number,
    grossSalary: number,
  ): number {
    if (unpaidLeaveDays <= 0) return 0;

    // Egyptian Labor Law: Daily rate = Monthly salary / 30
    const dailyRate = grossSalary / 30;

    // Deduction = Unpaid Leave Days × Daily Rate
    const deduction = unpaidLeaveDays * dailyRate;

    return Math.round(deduction * 100) / 100;
  }

  /** Calculate overtime pay. First 2h at 1.25x, remaining at 1.5x. */
  static calculateOvertimePay(
    overtimeHours: number,
    grossSalary: number,
    workingHoursPerDay: number = 8,
    workingDaysPerMonth: number = 30,
  ): number {
    if (overtimeHours <= 0) return 0;

    // Calculate hourly rate
    const hourlyRate = grossSalary / workingDaysPerMonth / workingHoursPerDay;

    let overtimePay = 0;

    // Egyptian Labor Law 2025:
    // First 2 hours: 1.25x hourly rate
    // Additional hours: 1.5x hourly rate
    if (overtimeHours <= 2) {
      overtimePay = overtimeHours * hourlyRate * 1.25;
    } else {
      overtimePay = (2 * hourlyRate * 1.25) + ((overtimeHours - 2) * hourlyRate * 1.5);
    }

    return Math.round(overtimePay * 100) / 100;
  }

  /** Validate attendance against minimum thresholds. */
  static validateAttendance(
    workingDays: number,
    requiredDays: number,
    attendanceRate: number,
  ): { valid: boolean; reason?: string } {
    // Egyptian Labor Law: Minimum attendance threshold
    const minimumAttendanceRate = 80; // 80% minimum attendance

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

  /** Calculate prorated salary based on days worked. */
  static calculateProratedSalary(
    baseSalary: number,
    workedDays: number,
    totalDaysInPeriod: number,
  ): number {
    if (workedDays <= 0) return 0;
    if (workedDays >= totalDaysInPeriod) return baseSalary;

    const prorateFactor = workedDays / totalDaysInPeriod;
    const proratedAmount = baseSalary * prorateFactor;

    return Math.round(proratedAmount * 100) / 100;
  }
}
