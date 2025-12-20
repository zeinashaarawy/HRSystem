import { Model, Types } from 'mongoose';
import { CreateAppraisalRecordDto } from './dto/create-appraisal-record.dto';
import { UpdateAppraisalRecordDto } from './dto/update-appraisal-record.dto';
import { UpdateAppraisalStatusDto } from './dto/update-appraisal-status.dto';
import { CreateDisputeDto } from './dto/create-dispute.dto';
import { ResolveDisputeDto } from './dto/resolve-dispute.dto';
import { AppraisalTemplate, AppraisalTemplateDocument } from './models/appraisal-template.schema';
import { AppraisalCycle, AppraisalCycleDocument } from './models/appraisal-cycle.schema';
import { AppraisalRecord, AppraisalRecordDocument } from './models/appraisal-record.schema';
import { AppraisalDispute, AppraisalDisputeDocument } from './models/appraisal-dispute.schema';
import { EmployeeProfileDocument } from '../employee-profile/models/employee-profile.schema';
import { CreateAppraisalTemplateDto } from './dto/create-appraisal-template.dto';
export declare class PerformanceService {
    private readonly templateModel;
    private readonly cycleModel;
    private readonly recordModel;
    private readonly disputeModel;
    private readonly employeeModel;
    constructor(templateModel: Model<AppraisalTemplateDocument>, cycleModel: Model<AppraisalCycleDocument>, recordModel: Model<AppraisalRecordDocument>, disputeModel: Model<AppraisalDisputeDocument>, employeeModel: Model<EmployeeProfileDocument>);
    createTemplate(dto: CreateAppraisalTemplateDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, AppraisalTemplate, {}, {}> & AppraisalTemplate & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, AppraisalTemplate, {}, {}> & AppraisalTemplate & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    getAllTemplates(): Promise<(import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, AppraisalTemplate, {}, {}> & AppraisalTemplate & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: Types.ObjectId;
    }>)[]>;
    getTemplateById(id: string): Promise<import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, AppraisalTemplate, {}, {}> & AppraisalTemplate & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: Types.ObjectId;
    }>>;
    updateTemplate(id: string, body: any): Promise<import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, AppraisalTemplate, {}, {}> & AppraisalTemplate & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: Types.ObjectId;
    }>>;
    deleteTemplate(id: string): Promise<{
        message: string;
        id: string;
    }>;
    createCycle(body: any): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, AppraisalCycle, {}, {}> & AppraisalCycle & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, AppraisalCycle, {}, {}> & AppraisalCycle & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    getAllCycles(): Promise<(import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, AppraisalCycle, {}, {}> & AppraisalCycle & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: Types.ObjectId;
    }>)[]>;
    getCycleById(id: string): Promise<import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, AppraisalCycle, {}, {}> & AppraisalCycle & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: Types.ObjectId;
    }>>;
    updateCycle(id: string, body: any): Promise<import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, AppraisalCycle, {}, {}> & AppraisalCycle & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: Types.ObjectId;
    }>>;
    activateCycle(id: string): Promise<import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, AppraisalCycle, {}, {}> & AppraisalCycle & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: Types.ObjectId;
    }>>;
    closeCycle(id: string): Promise<import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, AppraisalCycle, {}, {}> & AppraisalCycle & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: Types.ObjectId;
    }>>;
    archiveCycle(id: string): Promise<import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, AppraisalCycle, {}, {}> & AppraisalCycle & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: Types.ObjectId;
    }>>;
    createAppraisal(dto: CreateAppraisalRecordDto, managerId: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, AppraisalRecord, {}, {}> & AppraisalRecord & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, AppraisalRecord, {}, {}> & AppraisalRecord & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    updateAppraisal(id: string, dto: UpdateAppraisalRecordDto, managerId: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, AppraisalRecord, {}, {}> & AppraisalRecord & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, AppraisalRecord, {}, {}> & AppraisalRecord & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    updateAppraisalStatus(id: string, dto: UpdateAppraisalStatusDto, managerId: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, AppraisalRecord, {}, {}> & AppraisalRecord & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, AppraisalRecord, {}, {}> & AppraisalRecord & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    publishAppraisal(id: string, hrId: string, dto: UpdateAppraisalStatusDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, AppraisalRecord, {}, {}> & AppraisalRecord & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, AppraisalRecord, {}, {}> & AppraisalRecord & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    findCycleAppraisals(cycleId: string): Promise<(import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, AppraisalRecord, {}, {}> & AppraisalRecord & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: Types.ObjectId;
    }>)[]>;
    findMyAppraisals(employeeId: string): Promise<(import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, AppraisalRecord, {}, {}> & AppraisalRecord & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: Types.ObjectId;
    }>)[]>;
    findMyAppraisalById(employeeId: string, recordId: string): Promise<import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, AppraisalRecord, {}, {}> & AppraisalRecord & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: Types.ObjectId;
    }>>;
    getAppraisalById(id: string): Promise<import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, AppraisalRecord, {}, {}> & AppraisalRecord & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: Types.ObjectId;
    }>>;
    employeeAcknowledgeAppraisal(appraisalId: string, employeeId: string, comment: string): Promise<{
        message: string;
        id: Types.ObjectId;
    }>;
    createDispute(appraisalId: string, dto: CreateDisputeDto, employeeId: string): Promise<{
        message: string;
    }>;
    canRaiseDispute(cycleId: string): Promise<boolean>;
    listDisputes(status?: string): Promise<(import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, AppraisalDispute, {}, {}> & AppraisalDispute & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }> & Required<{
        _id: Types.ObjectId;
    }>)[]>;
    publishCycleResults(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, AppraisalCycle, {}, {}> & AppraisalCycle & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, AppraisalCycle, {}, {}> & AppraisalCycle & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    deleteDispute(id: string): Promise<{
        message: string;
        id: string;
    }>;
    resolveDispute(id: string, dto: ResolveDisputeDto, hrId: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, AppraisalDispute, {}, {}> & AppraisalDispute & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, AppraisalDispute, {}, {}> & AppraisalDispute & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    getDisputeById(id: string): Promise<(import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, AppraisalDispute, {}, {}> & AppraisalDispute & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }> & Required<{
        _id: Types.ObjectId;
    }>) | null>;
}
