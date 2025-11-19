export declare class CreatePerformanceTemplateDto {
    name: string;
    type: string;
    description?: string;
    criteria?: {
        name: string;
        weight?: number;
        description?: string;
    }[];
}
