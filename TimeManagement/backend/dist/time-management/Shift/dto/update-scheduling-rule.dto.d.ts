export declare class UpdateSchedulingRuleDto {
    name?: string;
    type?: 'FLEXIBLE' | 'ROTATIONAL' | 'COMPRESSED';
    flexInWindow?: string;
    flexOutWindow?: string;
    rotationalPattern?: string;
    workDaysPerWeek?: number;
    hoursPerDay?: number;
    active?: boolean;
    description?: string;
    departmentIds?: string[];
    shiftTemplateIds?: string[];
}
