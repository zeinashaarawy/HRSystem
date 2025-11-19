import { Model } from 'mongoose';
import { LeavePolicy, LeavePolicyDocument } from './schemas/leave-policy.schema';
import { CreatePolicyDto } from './dto/create-policy.dto';
import { UpdatePolicyDto } from './dto/update-policy.dto';
export declare class LeavePoliciesService {
    private policyModel;
    constructor(policyModel: Model<LeavePolicyDocument>);
    create(createPolicyDto: CreatePolicyDto): Promise<LeavePolicy>;
    findAll(): Promise<LeavePolicy[]>;
    findActive(): Promise<LeavePolicy[]>;
    findByType(policyType: string): Promise<LeavePolicy[]>;
    findOne(id: string): Promise<LeavePolicy>;
    update(id: string, updatePolicyDto: UpdatePolicyDto): Promise<LeavePolicy>;
    remove(id: string): Promise<void>;
    deactivate(id: string): Promise<LeavePolicy>;
    activate(id: string): Promise<LeavePolicy>;
}
