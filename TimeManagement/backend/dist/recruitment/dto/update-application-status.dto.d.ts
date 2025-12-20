import { ApplicationStage } from '../enums/application-stage.enum';
import { ApplicationStatus } from '../enums/application-status.enum';
export declare class UpdateApplicationStatusDto {
    currentStage?: ApplicationStage;
    status?: ApplicationStatus;
    comment?: string;
    reason?: string;
}
