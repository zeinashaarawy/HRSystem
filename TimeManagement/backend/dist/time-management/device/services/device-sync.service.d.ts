import { Model } from 'mongoose';
import { PunchDocument } from '../../attendance/schemas/punch.schema';
import { AttendanceRecordDocument } from '../../attendance/schemas/attendance-record.schema';
export declare class DeviceSyncService {
    private punchModel;
    private attendanceModel;
    private readonly logger;
    private offlinePunchQueue;
    constructor(punchModel: Model<PunchDocument>, attendanceModel: Model<AttendanceRecordDocument>);
    queueOfflinePunch(employeeId: string, timestamp: Date, type: 'in' | 'out', device: string, location?: string, rawMetadata?: Record<string, any>): Promise<void>;
    syncDevicePunches(device: string): Promise<{
        synced: number;
        failed: number;
        errors: string[];
    }>;
    private syncPunch;
    private calculateWorkedMinutes;
    getQueueStatus(device: string): {
        queued: number;
    };
    getDevicesWithQueuedPunches(): string[];
}
