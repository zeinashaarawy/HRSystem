import { Document, Types } from 'mongoose';
export declare class Position extends Document {
    code: string;
    title: string;
    department: Types.ObjectId;
    reportsTo?: Types.ObjectId;
    payGrade?: string;
    isManager: boolean;
    isActive: boolean;
}
export declare const PositionSchema: import("mongoose").Schema<Position, import("mongoose").Model<Position, any, any, any, Document<unknown, any, Position, any, {}> & Position & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Position, Document<unknown, {}, import("mongoose").FlatRecord<Position>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Position> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
