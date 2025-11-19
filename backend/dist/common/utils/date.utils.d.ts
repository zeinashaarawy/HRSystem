export declare class DateUtils {
    static diffInDays(startDate: Date, endDate: Date): number;
    static isWeekend(date: Date): boolean;
    static getDayName(date: Date): string;
    static addDays(date: Date, days: number): Date;
    static subtractDays(date: Date, days: number): Date;
    static isSameDay(date1: Date, date2: Date): boolean;
    static getFirstDayOfMonth(date: Date): Date;
    static getLastDayOfMonth(date: Date): Date;
    static formatDate(date: Date): string;
    static isPast(date: Date): boolean;
    static isFuture(date: Date): boolean;
    static monthsDiff(startDate: Date, endDate: Date): number;
    static getDatesBetween(startDate: Date, endDate: Date): Date[];
}
