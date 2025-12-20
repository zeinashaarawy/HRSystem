import { Document, Types } from 'mongoose';
export type SchedulingRuleDocument = SchedulingRule & Document;
export declare class SchedulingRule {
    name: string;
    type: string;
    flexInWindow?: string;
    flexOutWindow?: string;
    rotationalPattern?: string;
    workDaysPerWeek?: number;
    hoursPerDay?: number;
    active: boolean;
    description?: string;
    departmentIds?: Types.ObjectId[];
    shiftTemplateIds?: Types.ObjectId[];
}
export declare const SchedulingRuleSchema: import("mongoose").Schema<SchedulingRule, import("mongoose").Model<SchedulingRule, any, any, any, Document<unknown, any, SchedulingRule, any, {}> & SchedulingRule & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, SchedulingRule, Document<unknown, {}, import("mongoose").FlatRecord<SchedulingRule>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<SchedulingRule> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
