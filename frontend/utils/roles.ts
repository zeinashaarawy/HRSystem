import { SystemRole } from "@/enums/SystemRole";

/**
 * Check if a user has admin privileges
 * @param roles - Array of user roles
 * @returns true if user has any admin role
 */
export function isAdmin(roles?: SystemRole[]): boolean {
  if (!roles || roles.length === 0) {
    return false;
  }

  const adminRoles = [
    SystemRole.SYSTEM_ADMIN,
    SystemRole.HR_ADMIN,
    SystemRole.HR_MANAGER,
    SystemRole.PAYROLL_MANAGER,
    SystemRole.LEGAL_POLICY_ADMIN,
  ];

  return roles.some((role) => adminRoles.includes(role));
}

/**
 * Check if a user has HR privileges
 * @param roles - Array of user roles
 * @returns true if user has any HR role
 */
export function isHR(roles?: SystemRole[]): boolean {
  if (!roles || roles.length === 0) {
    return false;
  }

  const hrRoles = [
    SystemRole.HR_ADMIN,
    SystemRole.HR_MANAGER,
    SystemRole.HR_EMPLOYEE,
  ];

  return roles.some((role) => hrRoles.includes(role));
}

/**
 * Check if a user has payroll privileges
 * @param roles - Array of user roles
 * @returns true if user has any payroll role
 */
export function isPayroll(roles?: SystemRole[]): boolean {
  if (!roles || roles.length === 0) {
    return false;
  }

  const payrollRoles = [
    SystemRole.PAYROLL_MANAGER,
    SystemRole.PAYROLL_SPECIALIST,
  ];

  return roles.some((role) => payrollRoles.includes(role));
}
