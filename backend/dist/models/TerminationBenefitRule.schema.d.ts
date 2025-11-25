import { Types } from 'mongoose';
export declare class TerminationBenefitRule {
    name: string;
    condition: string;
    formula: string;
    status: string;
    createdBy: Types.ObjectId;
}
export declare const TerminationBenefitRuleSchema: import("mongoose").Schema<TerminationBenefitRule, import("mongoose").Model<TerminationBenefitRule, any, any, any, import("mongoose").Document<unknown, any, TerminationBenefitRule, any, {}> & TerminationBenefitRule & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, TerminationBenefitRule, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<TerminationBenefitRule>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<TerminationBenefitRule> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
