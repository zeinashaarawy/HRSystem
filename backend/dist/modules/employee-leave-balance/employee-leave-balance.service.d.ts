import { Model, Types } from 'mongoose';
import { EmployeeLeaveBalance, EmployeeLeaveBalanceDocument } from './schemas/employee-leave-balance.schema';
import { CreateBalanceDto } from './dto/create-balance.dto';
import { UpdateBalanceDto } from './dto/update-balance.dto';
export declare class EmployeeLeaveBalanceService {
    private balanceModel;
    constructor(balanceModel: Model<EmployeeLeaveBalanceDocument>);
    create(createDto: CreateBalanceDto): Promise<import("mongoose").Document<unknown, {}, EmployeeLeaveBalanceDocument, {}, {}> & EmployeeLeaveBalance & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findAll(): Promise<(import("mongoose").FlattenMaps<EmployeeLeaveBalanceDocument> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    findByEmployee(employeeId: string): Promise<import("mongoose").Document<unknown, {}, EmployeeLeaveBalanceDocument, {}, {}> & EmployeeLeaveBalance & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(employeeId: string, updateDto: UpdateBalanceDto): Promise<import("mongoose").Document<unknown, {}, EmployeeLeaveBalanceDocument, {}, {}> & EmployeeLeaveBalance & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    adjustBalance(employeeId: string, leaveType: string, delta: number): Promise<import("mongoose").Document<unknown, {}, EmployeeLeaveBalanceDocument, {}, {}> & EmployeeLeaveBalance & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    removeByEmployee(employeeId: string): Promise<(import("mongoose").Document<unknown, {}, EmployeeLeaveBalanceDocument, {}, {}> & EmployeeLeaveBalance & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
}
