import { EmployeeLeaveBalanceService } from './employee-leave-balance.service';
import { CreateBalanceDto } from './dto/create-balance.dto';
import { UpdateBalanceDto } from './dto/update-balance.dto';
export declare class EmployeeLeaveBalanceController {
    private readonly balanceService;
    constructor(balanceService: EmployeeLeaveBalanceService);
    create(dto: CreateBalanceDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/employee-leave-balance.schema").EmployeeLeaveBalanceDocument, {}, {}> & import("./schemas/employee-leave-balance.schema").EmployeeLeaveBalance & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findAll(): Promise<(import("mongoose").FlattenMaps<import("./schemas/employee-leave-balance.schema").EmployeeLeaveBalanceDocument> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    findByEmployee(employeeId: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/employee-leave-balance.schema").EmployeeLeaveBalanceDocument, {}, {}> & import("./schemas/employee-leave-balance.schema").EmployeeLeaveBalance & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(employeeId: string, dto: UpdateBalanceDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/employee-leave-balance.schema").EmployeeLeaveBalanceDocument, {}, {}> & import("./schemas/employee-leave-balance.schema").EmployeeLeaveBalance & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    remove(employeeId: string): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/employee-leave-balance.schema").EmployeeLeaveBalanceDocument, {}, {}> & import("./schemas/employee-leave-balance.schema").EmployeeLeaveBalance & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
}
export default EmployeeLeaveBalanceController;
