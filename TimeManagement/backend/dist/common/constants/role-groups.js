"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ADMIN_ROLES = exports.HR_ROLES = exports.MANAGER_ROLES = exports.EMPLOYEE_ROLES = void 0;
const employee_profile_enums_1 = require("../../employee-profile/enums/employee-profile.enums");
exports.EMPLOYEE_ROLES = [employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE];
exports.MANAGER_ROLES = [
    employee_profile_enums_1.SystemRole.DEPARTMENT_HEAD,
];
exports.HR_ROLES = [
    employee_profile_enums_1.SystemRole.HR_MANAGER,
    employee_profile_enums_1.SystemRole.HR_EMPLOYEE,
    employee_profile_enums_1.SystemRole.HR_ADMIN,
];
exports.ADMIN_ROLES = [
    employee_profile_enums_1.SystemRole.SYSTEM_ADMIN,
    employee_profile_enums_1.SystemRole.LEGAL_POLICY_ADMIN,
    employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST,
    employee_profile_enums_1.SystemRole.FINANCE_STAFF,
];
//# sourceMappingURL=role-groups.js.map