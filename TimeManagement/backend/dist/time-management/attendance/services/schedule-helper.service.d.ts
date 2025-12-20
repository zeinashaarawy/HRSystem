import { Model, Types } from 'mongoose';
import { ScheduleAssignmentDocument } from '../../Shift/schemas/schedule-assignment.schema';
import { ShiftTemplateDocument } from '../../Shift/schemas/shift.schema';
export declare class ScheduleHelperService {
    private scheduleAssignmentModel;
    private shiftTemplateModel;
    constructor(scheduleAssignmentModel: Model<ScheduleAssignmentDocument>, shiftTemplateModel: Model<ShiftTemplateDocument>);
    getScheduledTimes(employeeId: Types.ObjectId, date: Date): Promise<{
        startTime?: Date;
        endTime?: Date;
        scheduledMinutes?: number;
        shiftTemplate?: ShiftTemplateDocument;
        punchPolicy?: string;
    }>;
}
