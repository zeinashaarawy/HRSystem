import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { EmployeeProfile, EmployeeProfileDocument } from '../models/employee-profile.schema';
import { Candidate, CandidateDocument } from '../models/candidate.schema';
import { RegisterDto } from '../dto/register.dto';
export declare class AuthService {
    private readonly employeeModel;
    private readonly candidateModel;
    private readonly jwtService;
    constructor(employeeModel: Model<EmployeeProfileDocument>, candidateModel: Model<CandidateDocument>, jwtService: JwtService);
    login(dto: {
        employeeNumber: string;
        password: string;
    }): Promise<{
        access_token: string;
        payload: {
            id: string;
            username: string;
            type: string;
            userType: string;
        };
        isAdmin: boolean;
        userType: string;
    }>;
    updateUserRoles(userId: string, roles: string[]): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, EmployeeProfile, {}, {}> & EmployeeProfile & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, EmployeeProfile, {}, {}> & EmployeeProfile & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
    register(dto: RegisterDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Candidate, {}, {}> & Candidate & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Candidate, {}, {}> & Candidate & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
}
