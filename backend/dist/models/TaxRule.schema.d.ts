import { Types } from 'mongoose';
export declare class TaxRule {
    code: string;
    taxType: string;
    bracketMin: number;
    bracketMax: number;
    percentage: number;
    exemptionAmount: number;
    lawReference: string;
    effectiveFrom: Date;
    effectiveTo: Date;
    status: string;
    createdBy: Types.ObjectId;
}
export declare const TaxRuleSchema: import("mongoose").Schema<TaxRule, import("mongoose").Model<TaxRule, any, any, any, import("mongoose").Document<unknown, any, TaxRule, any, {}> & TaxRule & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, TaxRule, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<TaxRule>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<TaxRule> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
