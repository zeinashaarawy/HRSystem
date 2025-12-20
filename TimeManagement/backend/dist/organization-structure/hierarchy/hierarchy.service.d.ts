import { Model } from 'mongoose';
import { Department } from '../models/department.schema';
import { Position } from '../models/position.schema';
export interface PositionNode {
    _id: string;
    title: string;
    code?: string;
    payGrade?: string;
    reportingTo?: string | null;
    children: PositionNode[];
}
export interface DepartmentHierarchy {
    _id: string;
    name: string;
    code?: string;
    positions: PositionNode[];
}
export declare class HierarchyService {
    private readonly departmentModel;
    private readonly positionModel;
    constructor(departmentModel: Model<Department>, positionModel: Model<Position>);
    getOrgHierarchy(): Promise<DepartmentHierarchy[]>;
    getPositionHierarchy(positionId: string): Promise<PositionNode | null>;
    private buildPositionTree;
}
