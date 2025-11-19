import { Model } from 'mongoose';
import { LeaveType, LeaveTypeDocument } from './schemas/leave-type.schema';
import { CreateLeaveTypeDto } from './dto/create-leave-type.dto';
import { UpdateLeaveTypeDto } from './dto/update-leave-type.dto';
export declare class LeaveTypesService {
    private leaveTypeModel;
    constructor(leaveTypeModel: Model<LeaveTypeDocument>);
    create(createLeaveTypeDto: CreateLeaveTypeDto): Promise<LeaveType>;
    findAll(): Promise<LeaveType[]>;
    findActive(): Promise<LeaveType[]>;
    findOne(id: string): Promise<LeaveType>;
    findByCode(code: string): Promise<LeaveType>;
    update(id: string, updateLeaveTypeDto: UpdateLeaveTypeDto): Promise<LeaveType>;
    remove(id: string): Promise<void>;
    deactivate(id: string): Promise<LeaveType>;
    activate(id: string): Promise<LeaveType>;
}
