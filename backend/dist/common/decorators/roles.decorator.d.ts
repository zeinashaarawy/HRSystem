export declare enum UserRole {
    EMPLOYEE = "EMPLOYEE",
    MANAGER = "MANAGER",
    HR_ADMIN = "HR_ADMIN",
    HR_MANAGER = "HR_MANAGER",
    SYSTEM_ADMIN = "SYSTEM_ADMIN",
    PAYROLL_OFFICER = "PAYROLL_OFFICER"
}
export declare const ROLES_KEY = "roles";
export declare const Roles: (...roles: UserRole[]) => import("@nestjs/common").CustomDecorator<string>;
