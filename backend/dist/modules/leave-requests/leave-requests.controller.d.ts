import { LeaveRequestsService } from './leave-requests.service';
import { CreateLeaveRequestDto } from './dto/create-leave-request.dto';
import { UpdateLeaveRequestDto } from './dto/update-leave-request.dto';
import { ApproveRequestDto } from './dto/approve-request.dto';
export declare class LeaveRequestsController {
    private readonly service;
    constructor(service: LeaveRequestsService);
    create(dto: CreateLeaveRequestDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/leave-request.schema").LeaveRequestDocument, {}, {}> & import("./schemas/leave-request.schema").LeaveRequest & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findAll(): Promise<(import("mongoose").FlattenMaps<import("./schemas/leave-request.schema").LeaveRequestDocument> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    findByEmployee(employeeId: string): Promise<(import("mongoose").FlattenMaps<import("./schemas/leave-request.schema").LeaveRequestDocument> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/leave-request.schema").LeaveRequestDocument, {}, {}> & import("./schemas/leave-request.schema").LeaveRequest & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(id: string, dto: UpdateLeaveRequestDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/leave-request.schema").LeaveRequestDocument, {}, {}> & import("./schemas/leave-request.schema").LeaveRequest & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    cancel(id: string, requestedBy: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/leave-request.schema").LeaveRequestDocument, {}, {}> & import("./schemas/leave-request.schema").LeaveRequest & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    managerApprove(id: string, dto: ApproveRequestDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/leave-request.schema").LeaveRequestDocument, {}, {}> & import("./schemas/leave-request.schema").LeaveRequest & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    managerReject(id: string, dto: ApproveRequestDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/leave-request.schema").LeaveRequestDocument, {}, {}> & import("./schemas/leave-request.schema").LeaveRequest & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/leave-request.schema").LeaveRequestDocument, {}, {}> & import("./schemas/leave-request.schema").LeaveRequest & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
}
