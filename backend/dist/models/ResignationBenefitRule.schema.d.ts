import { Types } from 'mongoose';
export declare class ResignationBenefitRule {
    name: string;
    contractType: string;
    yearsOfServiceMin: number;
    yearsOfServiceMax: number;
    formula: string;
    status: string;
    createdBy: Types.ObjectId;
}
export declare const ResignationBenefitRuleSchema: import("mongoose").Schema<ResignationBenefitRule, import("mongoose").Model<ResignationBenefitRule, any, any, any, import("mongoose").Document<unknown, any, ResignationBenefitRule, any, {}> & ResignationBenefitRule & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ResignationBenefitRule, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<ResignationBenefitRule>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<ResignationBenefitRule> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
