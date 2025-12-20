import { AppraisalTemplateType, AppraisalRatingScaleType } from '../enums/performance.enums';
export declare class CreateAppraisalTemplateDto {
    name: string;
    description?: string;
    type: AppraisalTemplateType;
    applicableDepartmentIds?: string[];
    applicablePositionIds?: string[];
    ratingScaleType: AppraisalRatingScaleType;
    ratingScaleDefinition?: {
        label: string;
        minScore?: number;
        maxScore?: number;
        description?: string;
    }[];
    criteria: CriterionDto[];
    isActive?: boolean;
}
declare class CriterionDto {
    key: string;
    title: string;
    description?: string;
    weight: number;
    isMandatory?: boolean;
}
export {};
