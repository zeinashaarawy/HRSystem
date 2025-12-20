import { PerformanceService } from './performance.service';
import { CreateAppraisalRecordDto } from './dto/create-appraisal-record.dto';
import { UpdateAppraisalRecordDto } from './dto/update-appraisal-record.dto';
import { UpdateAppraisalStatusDto } from './dto/update-appraisal-status.dto';
import { CreateDisputeDto } from './dto/create-dispute.dto';
import { ResolveDisputeDto } from './dto/resolve-dispute.dto';
export declare class PerformanceController {
    private readonly performanceService;
    constructor(performanceService: PerformanceService);
    createTemplate(body: any): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/appraisal-template.schema").AppraisalTemplate, {}, {}> & import("./models/appraisal-template.schema").AppraisalTemplate & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/appraisal-template.schema").AppraisalTemplate, {}, {}> & import("./models/appraisal-template.schema").AppraisalTemplate & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getAllTemplates(): Promise<(import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("./models/appraisal-template.schema").AppraisalTemplate, {}, {}> & import("./models/appraisal-template.schema").AppraisalTemplate & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    getTemplateById(id: string): Promise<import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("./models/appraisal-template.schema").AppraisalTemplate, {}, {}> & import("./models/appraisal-template.schema").AppraisalTemplate & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    updateTemplate(id: string, body: any): Promise<import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("./models/appraisal-template.schema").AppraisalTemplate, {}, {}> & import("./models/appraisal-template.schema").AppraisalTemplate & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    deleteTemplate(id: string): Promise<{
        message: string;
        id: string;
    }>;
    createCycle(body: any): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/appraisal-cycle.schema").AppraisalCycle, {}, {}> & import("./models/appraisal-cycle.schema").AppraisalCycle & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/appraisal-cycle.schema").AppraisalCycle, {}, {}> & import("./models/appraisal-cycle.schema").AppraisalCycle & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getAllCycles(): Promise<(import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("./models/appraisal-cycle.schema").AppraisalCycle, {}, {}> & import("./models/appraisal-cycle.schema").AppraisalCycle & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    getCycleById(id: string): Promise<import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("./models/appraisal-cycle.schema").AppraisalCycle, {}, {}> & import("./models/appraisal-cycle.schema").AppraisalCycle & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    updateCycle(id: string, body: any): Promise<import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("./models/appraisal-cycle.schema").AppraisalCycle, {}, {}> & import("./models/appraisal-cycle.schema").AppraisalCycle & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    activateCycle(id: string): Promise<import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("./models/appraisal-cycle.schema").AppraisalCycle, {}, {}> & import("./models/appraisal-cycle.schema").AppraisalCycle & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    closeCycle(id: string): Promise<import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("./models/appraisal-cycle.schema").AppraisalCycle, {}, {}> & import("./models/appraisal-cycle.schema").AppraisalCycle & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    archiveCycle(id: string): Promise<import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("./models/appraisal-cycle.schema").AppraisalCycle, {}, {}> & import("./models/appraisal-cycle.schema").AppraisalCycle & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    createAppraisal(dto: CreateAppraisalRecordDto, req: any): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/appraisal-record.schema").AppraisalRecord, {}, {}> & import("./models/appraisal-record.schema").AppraisalRecord & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/appraisal-record.schema").AppraisalRecord, {}, {}> & import("./models/appraisal-record.schema").AppraisalRecord & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    updateAppraisal(id: string, dto: UpdateAppraisalRecordDto, req: any): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/appraisal-record.schema").AppraisalRecord, {}, {}> & import("./models/appraisal-record.schema").AppraisalRecord & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/appraisal-record.schema").AppraisalRecord, {}, {}> & import("./models/appraisal-record.schema").AppraisalRecord & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    updateAppraisalStatus(id: string, dto: UpdateAppraisalStatusDto, req: any): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/appraisal-record.schema").AppraisalRecord, {}, {}> & import("./models/appraisal-record.schema").AppraisalRecord & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/appraisal-record.schema").AppraisalRecord, {}, {}> & import("./models/appraisal-record.schema").AppraisalRecord & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    publishAppraisal(id: string, dto: UpdateAppraisalStatusDto, req: any): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/appraisal-record.schema").AppraisalRecord, {}, {}> & import("./models/appraisal-record.schema").AppraisalRecord & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/appraisal-record.schema").AppraisalRecord, {}, {}> & import("./models/appraisal-record.schema").AppraisalRecord & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getAppraisalById(id: string): Promise<import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("./models/appraisal-record.schema").AppraisalRecord, {}, {}> & import("./models/appraisal-record.schema").AppraisalRecord & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getCycleAppraisals(cycleId: string): Promise<(import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("./models/appraisal-record.schema").AppraisalRecord, {}, {}> & import("./models/appraisal-record.schema").AppraisalRecord & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    getMyAppraisals(req: any): Promise<(import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("./models/appraisal-record.schema").AppraisalRecord, {}, {}> & import("./models/appraisal-record.schema").AppraisalRecord & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    getMyAppraisalById(id: string, req: any): Promise<import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("./models/appraisal-record.schema").AppraisalRecord, {}, {}> & import("./models/appraisal-record.schema").AppraisalRecord & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    acknowledgeAppraisal(id: string, body: any, req: any): Promise<{
        message: string;
        id: import("mongoose").Types.ObjectId;
    }>;
    publishCycleResults(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/appraisal-cycle.schema").AppraisalCycle, {}, {}> & import("./models/appraisal-cycle.schema").AppraisalCycle & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/appraisal-cycle.schema").AppraisalCycle, {}, {}> & import("./models/appraisal-cycle.schema").AppraisalCycle & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    deleteDispute(id: string): Promise<{
        message: string;
        id: string;
    }>;
    createDispute(appraisalId: string, dto: CreateDisputeDto, req: any): Promise<{
        message: string;
    }>;
    listDisputes(status?: string): Promise<(import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("./models/appraisal-dispute.schema").AppraisalDispute, {}, {}> & import("./models/appraisal-dispute.schema").AppraisalDispute & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    resolveDispute(id: string, dto: ResolveDisputeDto, req: any): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/appraisal-dispute.schema").AppraisalDispute, {}, {}> & import("./models/appraisal-dispute.schema").AppraisalDispute & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/appraisal-dispute.schema").AppraisalDispute, {}, {}> & import("./models/appraisal-dispute.schema").AppraisalDispute & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    getDisputeById(id: string): Promise<import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("./models/appraisal-dispute.schema").AppraisalDispute, {}, {}> & import("./models/appraisal-dispute.schema").AppraisalDispute & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
}
