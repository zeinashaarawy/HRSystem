import { Model, Types } from 'mongoose';
import { LeaveRequest, LeaveRequestDocument } from './schemas/leave-request.schema';
import { CreateLeaveRequestDto } from './dto/create-leave-request.dto';
import { UpdateLeaveRequestDto } from './dto/update-leave-request.dto';
export declare class LeaveRequestsService {
    private requestModel;
    constructor(requestModel: Model<LeaveRequestDocument>);
    create(dto: CreateLeaveRequestDto): Promise<import("mongoose").Document<unknown, {}, LeaveRequestDocument, {}, {}> & LeaveRequest & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findAll(): Promise<(import("mongoose").FlattenMaps<LeaveRequestDocument> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    findByEmployee(employeeId: string): Promise<(import("mongoose").FlattenMaps<LeaveRequestDocument> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, LeaveRequestDocument, {}, {}> & LeaveRequest & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(id: string, dto: UpdateLeaveRequestDto): Promise<import("mongoose").Document<unknown, {}, LeaveRequestDocument, {}, {}> & LeaveRequest & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    cancel(id: string, requestedById?: string): Promise<import("mongoose").Document<unknown, {}, LeaveRequestDocument, {}, {}> & LeaveRequest & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    managerApprove(id: string, managerId: string): Promise<import("mongoose").Document<unknown, {}, LeaveRequestDocument, {}, {}> & LeaveRequest & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    managerReject(id: string, managerId: string, reason?: string): Promise<import("mongoose").Document<unknown, {}, LeaveRequestDocument, {}, {}> & LeaveRequest & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
}
