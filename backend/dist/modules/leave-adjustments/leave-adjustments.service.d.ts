import { Model, Types } from 'mongoose';
import { LeaveAdjustment, LeaveAdjustmentDocument } from './schemas/leave-adjustment.schema';
import { CreateAdjustmentDto } from './dto/create-adjustment.dto';
import { ApproveAdjustmentDto } from './dto/approve-adjustment.dto';
import { EmployeeLeaveBalanceService } from '../employee-leave-balance/employee-leave-balance.service';
export declare class LeaveAdjustmentsService {
    private adjModel;
    private readonly balanceService?;
    constructor(adjModel: Model<LeaveAdjustmentDocument>, balanceService?: EmployeeLeaveBalanceService | undefined);
    create(dto: CreateAdjustmentDto): Promise<import("mongoose").Document<unknown, {}, LeaveAdjustmentDocument, {}, {}> & LeaveAdjustment & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findAll(): Promise<(import("mongoose").FlattenMaps<LeaveAdjustmentDocument> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    findById(id: string): Promise<import("mongoose").Document<unknown, {}, LeaveAdjustmentDocument, {}, {}> & LeaveAdjustment & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    approve(id: string, dto: ApproveAdjustmentDto): Promise<import("mongoose").Document<unknown, {}, LeaveAdjustmentDocument, {}, {}> & LeaveAdjustment & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    reject(id: string, approverId: string, reason?: string): Promise<import("mongoose").Document<unknown, {}, LeaveAdjustmentDocument, {}, {}> & LeaveAdjustment & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
}
