import { SchedulingRuleService } from '../services/scheduling-rule.service';
import { CreateSchedulingRuleDto } from '../dto/create-scheduling-rule.dto';
import { UpdateSchedulingRuleDto } from '../dto/update-scheduling-rule.dto';
export declare class SchedulingRuleController {
    private readonly schedulingRuleService;
    constructor(schedulingRuleService: SchedulingRuleService);
    create(createDto: CreateSchedulingRuleDto): Promise<import("../schemas/scheduling-rule.schema").SchedulingRule>;
    findAll(): Promise<import("../schemas/scheduling-rule.schema").SchedulingRule[]>;
    findOne(id: string): Promise<import("../schemas/scheduling-rule.schema").SchedulingRule>;
    update(id: string, updateDto: UpdateSchedulingRuleDto): Promise<import("../schemas/scheduling-rule.schema").SchedulingRule>;
    toggleActive(id: string): Promise<import("../schemas/scheduling-rule.schema").SchedulingRule>;
    delete(id: string): Promise<void>;
}
