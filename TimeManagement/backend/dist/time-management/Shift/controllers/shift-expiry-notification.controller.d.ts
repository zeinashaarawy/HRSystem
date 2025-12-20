import { ShiftExpiryService } from '../services/shift-expiry.service';
import { ShiftExpirySchedulerService } from '../services/shift-expiry-scheduler.service';
import { ResolveNotificationDto } from '../dto/resolve-notification.dto';
export declare class ShiftExpiryNotificationController {
    private readonly shiftExpiryService;
    private readonly shiftExpirySchedulerService;
    private readonly logger;
    constructor(shiftExpiryService: ShiftExpiryService, shiftExpirySchedulerService: ShiftExpirySchedulerService);
    getNotifications(status?: string): Promise<any[]>;
    triggerDetection(daysBeforeExpiry?: number): Promise<{
        notificationsCreated: number;
        message: string;
    }>;
    resolveNotification(id: string, resolveDto: ResolveNotificationDto): Promise<import("../schemas/shift-expiry-notification.schema").ShiftExpiryNotificationDocument>;
}
