export declare enum UnavailabilityReason {
    HOLIDAY = "HOLIDAY",
    REST_DAY = "REST_DAY",
    ON_LEAVE = "ON_LEAVE",
    NO_SHIFT = "NO_SHIFT"
}
export declare class WorkingHoursDto {
    start: string;
    end: string;
}
export declare class AvailabilityResponseDto {
    employeeId: string;
    date: string;
    available: boolean;
    workingHours?: WorkingHoursDto;
    reason?: UnavailabilityReason;
}
