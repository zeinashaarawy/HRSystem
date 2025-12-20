import { Model } from 'mongoose';
import { TimeExceptionDocument } from '../../attendance/schemas/time-exception.schema';
import { TimeManagementService } from '../../time-management.service';
export declare class ExceptionEscalationSchedulerService {
    private exceptionModel;
    private timeManagementService;
    private readonly logger;
    constructor(exceptionModel: Model<TimeExceptionDocument>, timeManagementService: TimeManagementService);
    handleAutoEscalation(): Promise<void>;
    triggerEscalation(): Promise<number>;
}
