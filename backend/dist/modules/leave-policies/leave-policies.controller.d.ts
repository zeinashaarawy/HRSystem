import { LeavePoliciesService } from './leave-policies.service';
import { CreatePolicyDto } from './dto/create-policy.dto';
import { UpdatePolicyDto } from './dto/update-policy.dto';
export declare class LeavePoliciesController {
    private readonly leavePoliciesService;
    constructor(leavePoliciesService: LeavePoliciesService);
    create(createPolicyDto: CreatePolicyDto): Promise<import("./schemas/leave-policy.schema").LeavePolicy>;
    findAll(): Promise<import("./schemas/leave-policy.schema").LeavePolicy[]>;
    findActive(): Promise<import("./schemas/leave-policy.schema").LeavePolicy[]>;
    findByType(policyType: string): Promise<import("./schemas/leave-policy.schema").LeavePolicy[]>;
    findOne(id: string): Promise<import("./schemas/leave-policy.schema").LeavePolicy>;
    update(id: string, updatePolicyDto: UpdatePolicyDto): Promise<import("./schemas/leave-policy.schema").LeavePolicy>;
    remove(id: string): Promise<void>;
    deactivate(id: string): Promise<import("./schemas/leave-policy.schema").LeavePolicy>;
    activate(id: string): Promise<import("./schemas/leave-policy.schema").LeavePolicy>;
}
