import { Types, Schema as MongooseSchema } from 'mongoose';
export declare class SystemSetting {
    key: string;
    label: string;
    value: any;
    createdBy: Types.ObjectId;
    status: string;
}
export declare const SystemSettingSchema: MongooseSchema<SystemSetting, import("mongoose").Model<SystemSetting, any, any, any, import("mongoose").Document<unknown, any, SystemSetting, any, {}> & SystemSetting & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, SystemSetting, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<SystemSetting>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<SystemSetting> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
