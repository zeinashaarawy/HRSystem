import { Model, Types } from 'mongoose';
import { LeaveType, LeaveTypeDocument } from './models/leave-type.schema';
import { LeaveCategory } from './models/leave-category.schema';
import { LeavePolicy, LeavePolicyDocument } from './models/leave-policy.schema';
import { LeaveRequest, LeaveRequestDocument } from './models/leave-request.schema';
import { Attachment } from './models/attachment.schema';
import { LeaveEntitlement, LeaveEntitlementDocument } from './models/leave-entitlement.schema';
import { LeaveAdjustment, LeaveAdjustmentDocument } from './models/leave-adjustment.schema';
import { Calendar, CalendarDocument } from './models/calendar.schema';
import { HolidayDocument } from '../time-management/holiday/schemas/holiday.schema';
import { CreateLeaveTypeDto } from './dto/create-leave-type.dto';
import { UpdateLeaveTypeDto } from './dto/update-leave-type.dto';
import { CreatePolicyDto } from './dto/create-policy.dto';
import { UpdatePolicyDto } from './dto/update-policy.dto';
import { CreateLeaveRequestDto } from './dto/create-leave-request.dto';
import { UpdateLeaveRequestDto } from './dto/update-leave-request.dto';
import { CreateLeaveEntitlementDto } from './dto/create-leave-entitlement.dto';
import { UpdateLeaveEntitlementDto } from './dto/update-leave-entitlement.dto';
import { CreateAdjustmentDto } from './dto/create-adjustment.dto';
import { ApproveAdjustmentDto } from './dto/approve-adjustment.dto';
import { CreateCalendarDto } from './dto/create-calendar.dto';
import { UpdateCalendarDto } from './dto/update-calendar.dto';
import { CreateBlockedPeriodDto } from './dto/create-blocked-period.dto';
export declare class LeavesService {
    private leaveTypeModel;
    private leaveCategoryModel;
    private leavePolicyModel;
    private requestModel;
    private attachmentModel;
    private entitlementModel;
    private adjustmentModel;
    private calendarModel;
    private holidayModel;
    constructor(leaveTypeModel: Model<LeaveTypeDocument>, leaveCategoryModel: Model<LeaveCategory>, leavePolicyModel: Model<LeavePolicyDocument>, requestModel: Model<LeaveRequestDocument>, attachmentModel: Model<Attachment>, entitlementModel: Model<LeaveEntitlementDocument>, adjustmentModel: Model<LeaveAdjustmentDocument>, calendarModel: Model<CalendarDocument>, holidayModel: Model<HolidayDocument>);
    leaveType: {
        create: (dto: CreateLeaveTypeDto) => Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, LeaveType, {}, {}> & LeaveType & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, LeaveType, {}, {}> & LeaveType & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>>;
        findAll: () => Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, LeaveType, {}, {}> & LeaveType & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, LeaveType, {}, {}> & LeaveType & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>)[]>;
        findActive: () => Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, LeaveType, {}, {}> & LeaveType & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, LeaveType, {}, {}> & LeaveType & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>)[]>;
        findOne: (id: string) => Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, LeaveType, {}, {}> & LeaveType & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, LeaveType, {}, {}> & LeaveType & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>>;
        findByCode: (code: string) => Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, LeaveType, {}, {}> & LeaveType & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, LeaveType, {}, {}> & LeaveType & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>>;
        update: (id: string, dto: UpdateLeaveTypeDto) => Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, LeaveType, {}, {}> & LeaveType & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, LeaveType, {}, {}> & LeaveType & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>>;
        remove: (id: string) => Promise<void>;
    };
    leavePolicy: {
        create: (dto: CreatePolicyDto) => Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, LeavePolicy, {}, {}> & LeavePolicy & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, LeavePolicy, {}, {}> & LeavePolicy & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>>;
        findAll: () => Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, LeavePolicy, {}, {}> & LeavePolicy & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, LeavePolicy, {}, {}> & LeavePolicy & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>)[]>;
        findActive: () => Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, LeavePolicy, {}, {}> & LeavePolicy & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, LeavePolicy, {}, {}> & LeavePolicy & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>)[]>;
        findByType: (policyType: string) => Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, LeavePolicy, {}, {}> & LeavePolicy & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, LeavePolicy, {}, {}> & LeavePolicy & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>)[]>;
        findOne: (id: string) => Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, LeavePolicy, {}, {}> & LeavePolicy & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, LeavePolicy, {}, {}> & LeavePolicy & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>>;
        update: (id: string, dto: UpdatePolicyDto) => Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, LeavePolicy, {}, {}> & LeavePolicy & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, LeavePolicy, {}, {}> & LeavePolicy & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>>;
        remove: (id: string) => Promise<void>;
    };
    leaveRequest: {
        create: (dto: CreateLeaveRequestDto) => Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, LeaveRequest, {}, {}> & LeaveRequest & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, LeaveRequest, {}, {}> & LeaveRequest & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>>;
        findAll: () => Promise<(import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, LeaveRequest, {}, {}> & LeaveRequest & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }> & Required<{
            _id: Types.ObjectId;
        }>)[]>;
        findByEmployee: (employeeId: string) => Promise<(import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, LeaveRequest, {}, {}> & LeaveRequest & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }> & Required<{
            _id: Types.ObjectId;
        }>)[]>;
        findOne: (id: string) => Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, LeaveRequest, {}, {}> & LeaveRequest & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, LeaveRequest, {}, {}> & LeaveRequest & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>>;
        update: (id: string, dto: UpdateLeaveRequestDto) => Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, LeaveRequest, {}, {}> & LeaveRequest & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, LeaveRequest, {}, {}> & LeaveRequest & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>>;
        cancel: (id: string, requestedById?: string) => Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, LeaveRequest, {}, {}> & LeaveRequest & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, LeaveRequest, {}, {}> & LeaveRequest & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>>;
        managerApprove: (id: string, managerId: string) => Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, LeaveRequest, {}, {}> & LeaveRequest & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, LeaveRequest, {}, {}> & LeaveRequest & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>>;
        managerReject: (id: string, managerId: string, reason?: string) => Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, LeaveRequest, {}, {}> & LeaveRequest & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, LeaveRequest, {}, {}> & LeaveRequest & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>>;
    };
    leaveEntitlement: {
        create: (dto: CreateLeaveEntitlementDto) => Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, LeaveEntitlement, {}, {}> & LeaveEntitlement & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, LeaveEntitlement, {}, {}> & LeaveEntitlement & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>>;
        findAll: () => Promise<(import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, LeaveEntitlement, {}, {}> & LeaveEntitlement & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }> & Required<{
            _id: Types.ObjectId;
        }>)[]>;
        findByEmployee: (employeeId: string) => Promise<(import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, LeaveEntitlement, {}, {}> & LeaveEntitlement & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }> & Required<{
            _id: Types.ObjectId;
        }>)[]>;
        update: (employeeId: string, dto: UpdateLeaveEntitlementDto) => Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, LeaveEntitlement, {}, {}> & LeaveEntitlement & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, LeaveEntitlement, {}, {}> & LeaveEntitlement & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>>;
        adjustBalance: (employeeId: string, leaveTypeId: string, deltaDays: number) => Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, LeaveEntitlement, {}, {}> & LeaveEntitlement & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, LeaveEntitlement, {}, {}> & LeaveEntitlement & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>>;
        removeByEmployee: (employeeId: string) => Promise<import("mongodb").DeleteResult>;
    };
    leaveAdjustment: {
        create: (dto: CreateAdjustmentDto) => Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, LeaveAdjustment, {}, {}> & LeaveAdjustment & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, LeaveAdjustment, {}, {}> & LeaveAdjustment & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>>;
        findAll: () => Promise<(import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, LeaveAdjustment, {}, {}> & LeaveAdjustment & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }> & Required<{
            _id: Types.ObjectId;
        }>)[]>;
        findById: (id: string) => Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, LeaveAdjustment, {}, {}> & LeaveAdjustment & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, LeaveAdjustment, {}, {}> & LeaveAdjustment & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>>;
        approve: (id: string, dto: ApproveAdjustmentDto) => Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, LeaveAdjustment, {}, {}> & LeaveAdjustment & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, LeaveAdjustment, {}, {}> & LeaveAdjustment & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>>;
    };
    calendar: {
        create: (dto: CreateCalendarDto) => Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Calendar, {}, {}> & Calendar & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, Calendar, {}, {}> & Calendar & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>>;
        findAll: () => Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Calendar, {}, {}> & Calendar & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, Calendar, {}, {}> & Calendar & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>)[]>;
        findByYear: (year: number) => Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Calendar, {}, {}> & Calendar & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, Calendar, {}, {}> & Calendar & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>>;
        update: (year: number, dto: UpdateCalendarDto) => Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Calendar, {}, {}> & Calendar & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, Calendar, {}, {}> & Calendar & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>>;
        remove: (year: number) => Promise<void>;
        addBlockedPeriod: (year: number, dto: CreateBlockedPeriodDto) => Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Calendar, {}, {}> & Calendar & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, Calendar, {}, {}> & Calendar & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>>;
        removeBlockedPeriod: (year: number, index: number) => Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Calendar, {}, {}> & Calendar & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, Calendar, {}, {}> & Calendar & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>>;
    };
}
