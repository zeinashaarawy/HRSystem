"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validators = void 0;
class Validators {
    static isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    static isValidPhone(phone) {
        const phoneRegex = /^\+?[1-9]\d{1,14}$/;
        return phoneRegex.test(phone.replace(/[\s-]/g, ''));
    }
    static isNotPastDate(date) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date >= today;
    }
    static isValidDateRange(startDate, endDate) {
        return startDate <= endDate;
    }
    static isNotEmptyString(value) {
        return value != null && value.trim().length > 0;
    }
    static isInRange(value, min, max) {
        return value >= min && value <= max;
    }
    static isNotEmptyArray(array) {
        return Array.isArray(array) && array.length > 0;
    }
    static isValidObjectId(id) {
        const objectIdRegex = /^[0-9a-fA-F]{24}$/;
        return objectIdRegex.test(id);
    }
    static isValidPercentage(value) {
        return this.isInRange(value, 0, 100);
    }
    static sanitizeString(value) {
        return value.replace(/[^a-zA-Z0-9\s-_]/g, '');
    }
    static isInYear(date, year) {
        return date.getFullYear() === year;
    }
    static hasMinimumAdvanceNotice(requestDate, leaveStartDate, minDays) {
        const diffTime = leaveStartDate.getTime() - requestDate.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays >= minDays;
    }
    static doDatesOverlap(start1, end1, start2, end2) {
        return start1 <= end2 && start2 <= end1;
    }
}
exports.Validators = Validators;
//# sourceMappingURL=validators.js.map