import { LeaveTypesService } from './leave-types.service';
import { CreateLeaveTypeDto } from './dto/create-leave-type.dto';
import { UpdateLeaveTypeDto } from './dto/update-leave-type.dto';
export declare class LeaveTypesController {
    private readonly leaveTypesService;
    constructor(leaveTypesService: LeaveTypesService);
    create(createLeaveTypeDto: CreateLeaveTypeDto): Promise<import("./schemas/leave-type.schema").LeaveType>;
    findAll(): Promise<import("./schemas/leave-type.schema").LeaveType[]>;
    findActive(): Promise<import("./schemas/leave-type.schema").LeaveType[]>;
    findOne(id: string): Promise<import("./schemas/leave-type.schema").LeaveType>;
    findByCode(code: string): Promise<import("./schemas/leave-type.schema").LeaveType>;
    update(id: string, updateLeaveTypeDto: UpdateLeaveTypeDto): Promise<import("./schemas/leave-type.schema").LeaveType>;
    remove(id: string): Promise<void>;
    deactivate(id: string): Promise<import("./schemas/leave-type.schema").LeaveType>;
    activate(id: string): Promise<import("./schemas/leave-type.schema").LeaveType>;
}
