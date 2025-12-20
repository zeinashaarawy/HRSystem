import { HierarchyService } from './hierarchy/hierarchy.service';
import { OrganizationStructureService } from './organization-structure.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
export declare class OrganizationStructureController {
    private readonly orgService;
    private readonly organizationStructureService;
    private readonly hierarchyService;
    constructor(orgService: OrganizationStructureService, organizationStructureService: OrganizationStructureService, hierarchyService: HierarchyService);
    getOrganizationHierarchy(): Promise<import("./hierarchy/hierarchy.service").DepartmentHierarchy[]>;
    getPositionHierarchy(id: string): Promise<import("./hierarchy/hierarchy.service").PositionNode | null>;
    testValidation(id: string): Promise<any>;
    createDepartment(dto: CreateDepartmentDto): Promise<import("mongoose").Document<unknown, {}, import("./models/department.schema").Department, {}, {}> & import("./models/department.schema").Department & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getAllDepartments(): Promise<(import("mongoose").Document<unknown, {}, import("./models/department.schema").Department, {}, {}> & import("./models/department.schema").Department & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getDepartment(id: string): Promise<import("mongoose").Document<unknown, {}, import("./models/department.schema").Department, {}, {}> & import("./models/department.schema").Department & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    updateDepartment(id: string, dto: UpdateDepartmentDto): Promise<import("mongoose").Document<unknown, {}, import("./models/department.schema").Department, {}, {}> & import("./models/department.schema").Department & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    deactivateDepartment(id: string): Promise<import("mongoose").Document<unknown, {}, import("./models/department.schema").Department, {}, {}> & import("./models/department.schema").Department & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    activateDepartment(id: string): Promise<import("mongoose").Document<unknown, {}, import("./models/department.schema").Department, {}, {}> & import("./models/department.schema").Department & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    createPosition(dto: CreatePositionDto): Promise<{
        _id: import("bson").ObjectId;
        code: string;
        title: string;
        description: string | null;
        departmentId: string;
        isActive: boolean;
    }>;
    getPositions(): Promise<(import("mongoose").Document<unknown, {}, import("./models/position.schema").Position, {}, {}> & import("./models/position.schema").Position & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getPosition(id: string): Promise<import("mongoose").Document<unknown, {}, import("./models/position.schema").Position, {}, {}> & import("./models/position.schema").Position & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    updatePosition(id: string, dto: UpdatePositionDto): Promise<import("mongoose").Document<unknown, {}, import("./models/position.schema").Position, {}, {}> & import("./models/position.schema").Position & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    deactivatePosition(id: string): Promise<import("mongoose").Document<unknown, {}, import("./models/position.schema").Position, {}, {}> & import("./models/position.schema").Position & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    activatePosition(id: string): Promise<{
        message: string;
        _id: import("mongoose").Types.ObjectId;
        code: string;
        title: string;
        isActive: boolean;
    }>;
    setReportingLine(id: string, reportsToPositionId: string): Promise<{
        message: string;
        positionId: string;
        reportsToId: string;
    }>;
    removeReportingLine(id: string): Promise<{
        message: string;
        positionId: string;
    }>;
    getManager(id: string): Promise<{
        manager: (import("mongoose").Document<unknown, {}, import("./models/position.schema").Position, {}, {}> & import("./models/position.schema").Position & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }) | null;
    }>;
    getPositionsInDepartment(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./models/position.schema").Position, {}, {}> & import("./models/position.schema").Position & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    validateDepartment(id: string): Promise<{
        valid: boolean;
        reason: string;
        department?: undefined;
    } | {
        valid: boolean;
        department: import("mongoose").Document<unknown, {}, import("./models/department.schema").Department, {}, {}> & import("./models/department.schema").Department & {
            _id: import("mongoose").Types.ObjectId;
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
        position: import("mongoose").Document<unknown, {}, import("./models/position.schema").Position, {}, {}> & import("./models/position.schema").Position & {
            _id: import("mongoose").Types.ObjectId;
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
}
