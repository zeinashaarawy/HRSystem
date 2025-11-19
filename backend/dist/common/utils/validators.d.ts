export declare class Validators {
    static isValidEmail(email: string): boolean;
    static isValidPhone(phone: string): boolean;
    static isNotPastDate(date: Date): boolean;
    static isValidDateRange(startDate: Date, endDate: Date): boolean;
    static isNotEmptyString(value: string): boolean;
    static isInRange(value: number, min: number, max: number): boolean;
    static isNotEmptyArray<T>(array: T[]): boolean;
    static isValidObjectId(id: string): boolean;
    static isValidPercentage(value: number): boolean;
    static sanitizeString(value: string): string;
    static isInYear(date: Date, year: number): boolean;
    static hasMinimumAdvanceNotice(requestDate: Date, leaveStartDate: Date, minDays: number): boolean;
    static doDatesOverlap(start1: Date, end1: Date, start2: Date, end2: Date): boolean;
}
