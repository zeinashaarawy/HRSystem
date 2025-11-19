import { PositionService } from './position.service';
export declare class PositionController {
    private readonly positionService;
    constructor(positionService: PositionService);
    getDummyPosition(): {
        id: string;
        code: string;
        title: string;
        department: {
            id: string;
            code: string;
            name: string;
            costCenter: string;
            isActive: boolean;
        };
        reportsTo: null;
        payGrade: string;
        isActive: boolean;
    };
}
