import { Document } from 'mongoose';
export declare class PerformanceTemplate extends Document {
    name: string;
    type: string;
    description?: string;
    isActive: boolean;
    criteria: {
        name: string;
        weight: number;
        description?: string;
    }[];
}
export declare const PerformanceTemplateSchema: import("mongoose").Schema<PerformanceTemplate, import("mongoose").Model<PerformanceTemplate, any, any, any, Document<unknown, any, PerformanceTemplate, any, {}> & PerformanceTemplate & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PerformanceTemplate, Document<unknown, {}, import("mongoose").FlatRecord<PerformanceTemplate>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<PerformanceTemplate> & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}>;
