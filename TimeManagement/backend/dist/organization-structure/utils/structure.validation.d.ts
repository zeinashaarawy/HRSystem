import { Model, Types } from 'mongoose';
import { Department } from '../models/department.schema';
import { Position } from '../models/position.schema';
export declare class StructureValidation {
    private readonly departmentModel;
    private readonly positionModel;
    constructor(departmentModel: Model<Department>, positionModel: Model<Position>);
    validateObjectId(id: string): void;
    validateDepartmentExists(deptId: string): Promise<import("mongoose").Document<unknown, {}, Department, {}, {}> & Department & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    validateDepartmentActive(deptId: string): Promise<import("mongoose").Document<unknown, {}, Department, {}, {}> & Department & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    validatePositionExists(positionId: string): Promise<import("mongoose").Document<unknown, {}, Position, {}, {}> & Position & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    validatePositionActive(positionId: string): Promise<import("mongoose").Document<unknown, {}, Position, {}, {}> & Position & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    validateReportingTo(reportingToId: string): Promise<(import("mongoose").Document<unknown, {}, Position, {}, {}> & Position & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    checkCircularHierarchy(childId: string, parentId: string): Promise<void>;
}
