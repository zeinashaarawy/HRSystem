import { Types } from 'mongoose';
export declare class SigningBonus {
    name: string;
    code: string;
    type: string;
    value: number;
    validFrom: Date;
    validTo: Date;
    appliesToPayGrade: Types.ObjectId;
    status: string;
    createdBy: Types.ObjectId;
}
export declare const SigningBonusSchema: import("mongoose").Schema<SigningBonus, import("mongoose").Model<SigningBonus, any, any, any, import("mongoose").Document<unknown, any, SigningBonus, any, {}> & SigningBonus & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, SigningBonus, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<SigningBonus>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<SigningBonus> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
