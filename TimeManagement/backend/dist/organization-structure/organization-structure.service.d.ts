import { StructureValidation } from './utils/structure.validation';
import { Model } from 'mongoose';
import { Department } from './models/department.schema';
import { Position } from './models/position.schema';
import { Types } from 'mongoose';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
export declare class OrganizationStructureService {
    private readonly departmentModel;
    private readonly positionModel;
    private readonly validation;
    constructor(departmentModel: Model<Department>, positionModel: Model<Position>, validation: StructureValidation);
    createPosition(dto: CreatePositionDto): Promise<{
        _id: import("bson").ObjectId;
        code: string;
        title: string;
        description: string | null;
        departmentId: string;
        isActive: boolean;
    }>;
    getPositions(): Promise<(import("mongoose").Document<unknown, {}, Position, {}, {}> & Position & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getPositionById(id: string): Promise<import("mongoose").Document<unknown, {}, Position, {}, {}> & Position & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    updatePosition(id: string, dto: UpdatePositionDto): Promise<import("mongoose").Document<unknown, {}, Position, {}, {}> & Position & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    deactivatePosition(id: string): Promise<import("mongoose").Document<unknown, {}, Position, {}, {}> & Position & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    createDepartment(dto: CreateDepartmentDto): Promise<import("mongoose").Document<unknown, {}, Department, {}, {}> & Department & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    getAllDepartments(): Promise<(import("mongoose").Document<unknown, {}, Department, {}, {}> & Department & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getDepartmentById(id: string): Promise<import("mongoose").Document<unknown, {}, Department, {}, {}> & Department & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    updateDepartment(id: string, dto: UpdateDepartmentDto): Promise<import("mongoose").Document<unknown, {}, Department, {}, {}> & Department & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    deactivateDepartment(id: string): Promise<import("mongoose").Document<unknown, {}, Department, {}, {}> & Department & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    setReportingLine(positionId: string, reportsToId: string): Promise<{
        message: string;
        positionId: string;
        reportsToId: string;
    }>;
    removeReportingLine(positionId: string): Promise<{
        message: string;
        positionId: string;
    }>;
    getManagerOfPosition(id: string): Promise<{
        manager: (import("mongoose").Document<unknown, {}, Position, {}, {}> & Position & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }) | null;
    }>;
    getPositionsInDepartment(departmentId: string): Promise<(import("mongoose").Document<unknown, {}, Position, {}, {}> & Position & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    validateDepartment(id: string): Promise<{
        valid: boolean;
        reason: string;
        department?: undefined;
    } | {
        valid: boolean;
        department: import("mongoose").Document<unknown, {}, Department, {}, {}> & Department & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        };
        reason?: undefined;
    }>;
    validatePosition(id: string): Promise<{
        valid: boolean;
        reason: string;
        position?: undefined;
    } | {
        valid: boolean;
        position: import("mongoose").Document<unknown, {}, Position, {}, {}> & Position & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        };
        reason?: undefined;
    }>;
    validateReportingLine(sourceId: string, targetId: string): Promise<{
        valid: boolean;
        reason: string;
        message?: undefined;
    } | {
        valid: boolean;
        message: string;
        reason?: undefined;
    }>;
    activateDepartment(id: string): Promise<import("mongoose").Document<unknown, {}, Department, {}, {}> & Department & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    activatePosition(id: string): Promise<{
        message: string;
        _id: Types.ObjectId;
        code: string;
        title: string;
        isActive: boolean;
    }>;
}
