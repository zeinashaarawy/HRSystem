import { Model } from 'mongoose';
import { SchedulingRule, SchedulingRuleDocument } from '../schemas/scheduling-rule.schema';
import { CreateSchedulingRuleDto } from '../dto/create-scheduling-rule.dto';
import { UpdateSchedulingRuleDto } from '../dto/update-scheduling-rule.dto';
export declare class SchedulingRuleService {
    private schedulingRuleModel;
    constructor(schedulingRuleModel: Model<SchedulingRuleDocument>);
    create(createDto: CreateSchedulingRuleDto): Promise<SchedulingRule>;
    findAll(): Promise<SchedulingRule[]>;
    findOne(id: string): Promise<SchedulingRule>;
    update(id: string, updateDto: UpdateSchedulingRuleDto): Promise<SchedulingRule>;
    delete(id: string): Promise<void>;
    toggleActive(id: string): Promise<SchedulingRule>;
}
