"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = exports.ROLES_KEY = exports.UserRole = void 0;
const common_1 = require("@nestjs/common");
var UserRole;
(function (UserRole) {
    UserRole["EMPLOYEE"] = "EMPLOYEE";
    UserRole["MANAGER"] = "MANAGER";
    UserRole["HR_ADMIN"] = "HR_ADMIN";
    UserRole["HR_MANAGER"] = "HR_MANAGER";
    UserRole["SYSTEM_ADMIN"] = "SYSTEM_ADMIN";
    UserRole["PAYROLL_OFFICER"] = "PAYROLL_OFFICER";
})(UserRole || (exports.UserRole = UserRole = {}));
exports.ROLES_KEY = 'roles';
const Roles = (...roles) => (0, common_1.SetMetadata)(exports.ROLES_KEY, roles);
exports.Roles = Roles;
//# sourceMappingURL=roles.decorator.js.map