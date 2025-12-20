import { ApplicationStatus } from '../enums/application-status.enum';
export declare class AnalyticsQueryDto {
    startDate?: Date;
    endDate?: Date;
    requisitionId?: string;
    status?: ApplicationStatus;
}
