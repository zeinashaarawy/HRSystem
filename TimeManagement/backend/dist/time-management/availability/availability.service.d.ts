import { Model } from 'mongoose';
import { HolidayDocument } from '../holiday/schemas/holiday.schema';
import { ScheduleHelperService } from '../attendance/services/schedule-helper.service';
import { VacationIntegrationService } from '../attendance/services/vacation-integration.service';
import { AvailabilityResponseDto } from './dto/availability-response.dto';
export declare class AvailabilityService {
    private holidayModel;
    private scheduleHelperService;
    private vacationIntegrationService;
    constructor(holidayModel: Model<HolidayDocument>, scheduleHelperService: ScheduleHelperService, vacationIntegrationService: VacationIntegrationService);
    checkAvailability(employeeId: string, date: string): Promise<AvailabilityResponseDto>;
    private checkHoliday;
    private checkRestDay;
    private formatTime;
}
