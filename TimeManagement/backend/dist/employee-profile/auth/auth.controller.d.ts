import { AuthService } from './auth.service';
import { RegisterDto } from '../dto/register.dto';
export declare class EmployeeProfileController {
    private readonly authService;
    constructor(authService: AuthService);
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
    register(dto: RegisterDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../models/candidate.schema").Candidate, {}, {}> & import("../models/candidate.schema").Candidate & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("../models/candidate.schema").Candidate, {}, {}> & import("../models/candidate.schema").Candidate & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    updateRoles(id: string, roles: string[]): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../models/employee-profile.schema").EmployeeProfile, {}, {}> & import("../models/employee-profile.schema").EmployeeProfile & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("../models/employee-profile.schema").EmployeeProfile, {}, {}> & import("../models/employee-profile.schema").EmployeeProfile & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
}
