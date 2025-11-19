import { LeaveAdjustmentsService } from './leave-adjustments.service';
import { CreateAdjustmentDto } from './dto/create-adjustment.dto';
import { ApproveAdjustmentDto } from './dto/approve-adjustment.dto';
export declare class LeaveAdjustmentsController {
    private readonly service;
    constructor(service: LeaveAdjustmentsService);
    create(dto: CreateAdjustmentDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/leave-adjustment.schema").LeaveAdjustmentDocument, {}, {}> & import("./schemas/leave-adjustment.schema").LeaveAdjustment & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findAll(): Promise<(import("mongoose").FlattenMaps<import("./schemas/leave-adjustment.schema").LeaveAdjustmentDocument> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/leave-adjustment.schema").LeaveAdjustmentDocument, {}, {}> & import("./schemas/leave-adjustment.schema").LeaveAdjustment & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    approve(id: string, dto: ApproveAdjustmentDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/leave-adjustment.schema").LeaveAdjustmentDocument, {}, {}> & import("./schemas/leave-adjustment.schema").LeaveAdjustment & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    reject(id: string, dto: ApproveAdjustmentDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/leave-adjustment.schema").LeaveAdjustmentDocument, {}, {}> & import("./schemas/leave-adjustment.schema").LeaveAdjustment & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
}
