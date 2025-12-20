import { DeviceSyncService } from '../services/device-sync.service';
export declare class DeviceSyncController {
    private readonly deviceSyncService;
    constructor(deviceSyncService: DeviceSyncService);
    syncDevice(device: string): Promise<{
        synced: number;
        failed: number;
        errors: string[];
    }>;
    getQueueStatus(device: string): Promise<{
        queued: number;
    }>;
    getDevicesWithQueuedPunches(): Promise<{
        devices: string[];
    }>;
}
