import { LeavesService } from './leaves.service';
import { CreateLeaveTypeDto } from './dto/create-leave-type.dto';
import { UpdateLeaveTypeDto } from './dto/update-leave-type.dto';
import { CreatePolicyDto } from './dto/create-policy.dto';
import { UpdatePolicyDto } from './dto/update-policy.dto';
import { CreateLeaveRequestDto } from './dto/create-leave-request.dto';
import { UpdateLeaveRequestDto } from './dto/update-leave-request.dto';
import { ApproveRequestDto } from './dto/approve-request.dto';
import { CreateLeaveEntitlementDto } from './dto/create-leave-entitlement.dto';
import { UpdateLeaveEntitlementDto } from './dto/update-leave-entitlement.dto';
import { CreateAdjustmentDto } from './dto/create-adjustment.dto';
import { ApproveAdjustmentDto } from './dto/approve-adjustment.dto';
import { CreateCalendarDto } from './dto/create-calendar.dto';
import { UpdateCalendarDto } from './dto/update-calendar.dto';
import { CreateBlockedPeriodDto } from './dto/create-blocked-period.dto';
export declare class LeavesController {
    private readonly service;
    constructor(service: LeavesService);
    createLeaveType(dto: CreateLeaveTypeDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/leave-type.schema").LeaveType, {}, {}> & import("./models/leave-type.schema").LeaveType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/leave-type.schema").LeaveType, {}, {}> & import("./models/leave-type.schema").LeaveType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    findAllLeaveTypes(): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/leave-type.schema").LeaveType, {}, {}> & import("./models/leave-type.schema").LeaveType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/leave-type.schema").LeaveType, {}, {}> & import("./models/leave-type.schema").LeaveType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    findLeaveType(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/leave-type.schema").LeaveType, {}, {}> & import("./models/leave-type.schema").LeaveType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/leave-type.schema").LeaveType, {}, {}> & import("./models/leave-type.schema").LeaveType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    findLeaveTypeByCode(code: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/leave-type.schema").LeaveType, {}, {}> & import("./models/leave-type.schema").LeaveType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/leave-type.schema").LeaveType, {}, {}> & import("./models/leave-type.schema").LeaveType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    updateLeaveType(id: string, dto: UpdateLeaveTypeDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/leave-type.schema").LeaveType, {}, {}> & import("./models/leave-type.schema").LeaveType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/leave-type.schema").LeaveType, {}, {}> & import("./models/leave-type.schema").LeaveType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    removeLeaveType(id: string): Promise<void>;
    createPolicy(dto: CreatePolicyDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/leave-policy.schema").LeavePolicy, {}, {}> & import("./models/leave-policy.schema").LeavePolicy & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/leave-policy.schema").LeavePolicy, {}, {}> & import("./models/leave-policy.schema").LeavePolicy & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    findAllPolicies(): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/leave-policy.schema").LeavePolicy, {}, {}> & import("./models/leave-policy.schema").LeavePolicy & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/leave-policy.schema").LeavePolicy, {}, {}> & import("./models/leave-policy.schema").LeavePolicy & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    findPolicy(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/leave-policy.schema").LeavePolicy, {}, {}> & import("./models/leave-policy.schema").LeavePolicy & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/leave-policy.schema").LeavePolicy, {}, {}> & import("./models/leave-policy.schema").LeavePolicy & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    updatePolicy(id: string, dto: UpdatePolicyDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/leave-policy.schema").LeavePolicy, {}, {}> & import("./models/leave-policy.schema").LeavePolicy & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/leave-policy.schema").LeavePolicy, {}, {}> & import("./models/leave-policy.schema").LeavePolicy & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    removePolicy(id: string): Promise<void>;
    createRequest(dto: CreateLeaveRequestDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/leave-request.schema").LeaveRequest, {}, {}> & import("./models/leave-request.schema").LeaveRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/leave-request.schema").LeaveRequest, {}, {}> & import("./models/leave-request.schema").LeaveRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    findAllRequests(): Promise<(import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("./models/leave-request.schema").LeaveRequest, {}, {}> & import("./models/leave-request.schema").LeaveRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    findRequest(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/leave-request.schema").LeaveRequest, {}, {}> & import("./models/leave-request.schema").LeaveRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/leave-request.schema").LeaveRequest, {}, {}> & import("./models/leave-request.schema").LeaveRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    updateRequest(id: string, dto: UpdateLeaveRequestDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/leave-request.schema").LeaveRequest, {}, {}> & import("./models/leave-request.schema").LeaveRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/leave-request.schema").LeaveRequest, {}, {}> & import("./models/leave-request.schema").LeaveRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    approveReq(id: string, dto: ApproveRequestDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/leave-request.schema").LeaveRequest, {}, {}> & import("./models/leave-request.schema").LeaveRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/leave-request.schema").LeaveRequest, {}, {}> & import("./models/leave-request.schema").LeaveRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    rejectReq(id: string, dto: ApproveRequestDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/leave-request.schema").LeaveRequest, {}, {}> & import("./models/leave-request.schema").LeaveRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/leave-request.schema").LeaveRequest, {}, {}> & import("./models/leave-request.schema").LeaveRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    createEntitlement(dto: CreateLeaveEntitlementDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/leave-entitlement.schema").LeaveEntitlement, {}, {}> & import("./models/leave-entitlement.schema").LeaveEntitlement & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/leave-entitlement.schema").LeaveEntitlement, {}, {}> & import("./models/leave-entitlement.schema").LeaveEntitlement & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getEmployeeEnt(employeeId: string): Promise<(import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("./models/leave-entitlement.schema").LeaveEntitlement, {}, {}> & import("./models/leave-entitlement.schema").LeaveEntitlement & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    updateEnt(employeeId: string, dto: UpdateLeaveEntitlementDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/leave-entitlement.schema").LeaveEntitlement, {}, {}> & import("./models/leave-entitlement.schema").LeaveEntitlement & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/leave-entitlement.schema").LeaveEntitlement, {}, {}> & import("./models/leave-entitlement.schema").LeaveEntitlement & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    removeEnt(employeeId: string): Promise<import("mongodb").DeleteResult>;
    createAdjustment(dto: CreateAdjustmentDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/leave-adjustment.schema").LeaveAdjustment, {}, {}> & import("./models/leave-adjustment.schema").LeaveAdjustment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/leave-adjustment.schema").LeaveAdjustment, {}, {}> & import("./models/leave-adjustment.schema").LeaveAdjustment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    approveAdjustment(id: string, dto: ApproveAdjustmentDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/leave-adjustment.schema").LeaveAdjustment, {}, {}> & import("./models/leave-adjustment.schema").LeaveAdjustment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/leave-adjustment.schema").LeaveAdjustment, {}, {}> & import("./models/leave-adjustment.schema").LeaveAdjustment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    createCalendar(dto: CreateCalendarDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/calendar.schema").Calendar, {}, {}> & import("./models/calendar.schema").Calendar & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/calendar.schema").Calendar, {}, {}> & import("./models/calendar.schema").Calendar & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    findCalendar(year: number): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/calendar.schema").Calendar, {}, {}> & import("./models/calendar.schema").Calendar & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/calendar.schema").Calendar, {}, {}> & import("./models/calendar.schema").Calendar & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    updateCalendar(year: number, dto: UpdateCalendarDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/calendar.schema").Calendar, {}, {}> & import("./models/calendar.schema").Calendar & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/calendar.schema").Calendar, {}, {}> & import("./models/calendar.schema").Calendar & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    addBlocked(year: number, dto: CreateBlockedPeriodDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/calendar.schema").Calendar, {}, {}> & import("./models/calendar.schema").Calendar & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/calendar.schema").Calendar, {}, {}> & import("./models/calendar.schema").Calendar & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    removeBlockedPeriod(year: number, index: number): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/calendar.schema").Calendar, {}, {}> & import("./models/calendar.schema").Calendar & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/calendar.schema").Calendar, {}, {}> & import("./models/calendar.schema").Calendar & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
}
