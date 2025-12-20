import { PunchType } from '../../enums';
export declare class CreatePunchDto {
    employeeId: string;
    timestamp: Date;
    type: PunchType;
    device?: string;
    location?: string;
    rawMetadata?: Record<string, any>;
}
