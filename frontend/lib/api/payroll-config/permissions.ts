import type { PayrollConfigResourceSlug } from './resources';

export type NormalizedSystemRole =
  | 'DEPARTMENT_EMPLOYEE'
  | 'DEPARTMENT_HEAD'
  | 'HR_MANAGER'
  | 'SYSTEM_ADMIN';

export type PayrollRolePermissions = {
  canAccessModule: boolean;
  canSeeResource: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canApproveReject: boolean;
};

export function normalizeRole(rawRole: string | null): NormalizedSystemRole | null {
  if (!rawRole) return null;
  const normalized = rawRole.toUpperCase().replace(/\s+/g, '_');

  switch (normalized) {
    case 'DEPARTMENT_EMPLOYEE':
    case 'DEPARTMENT_HEAD':
    case 'HR_MANAGER':
    case 'SYSTEM_ADMIN':
      return normalized;
    default:
      return null;
  }
}

export function getPayrollPermissions(
  role: NormalizedSystemRole | null,
  resource: PayrollConfigResourceSlug,
): PayrollRolePermissions {
  // Default: no access
  if (!role) {
    return {
      canAccessModule: false,
      canSeeResource: false,
      canCreate: false,
      canEdit: false,
      canDelete: false,
      canApproveReject: false,
    };
  }

  // All four core roles can open the Payroll Configuration module itself
  const base: PayrollRolePermissions = {
    canAccessModule: true,
    canSeeResource: false,
    canCreate: false,
    canEdit: false,
    canDelete: false,
    canApproveReject: false,
  };

  switch (resource) {
    case 'pay-grades': {
      // Employee: read-only view
      // Department Head: read-only view
      // HR Manager: full CRUD (within what the UI/backend expose) + approve/reject
      // System Admin: read-only (system, not HR policy)
      return {
        ...base,
        canSeeResource: true,
        canCreate: role === 'HR_MANAGER',
        canEdit: role === 'HR_MANAGER',
        canDelete: false,
        canApproveReject: role === 'HR_MANAGER',
      };
    }

    case 'pay-types': {
      // Employee: read-only view
      // Department Head: read-only view
      // HR Manager: full CRUD + approve/reject
      // System Admin: read-only
      return {
        ...base,
        canSeeResource: true,
        canCreate: role === 'HR_MANAGER',
        canEdit: role === 'HR_MANAGER',
        canDelete: false,
        canApproveReject: role === 'HR_MANAGER',
      };
    }

    case 'allowances': {
      // Employee: read-only view
      // Department Head: create/edit draft proposals
      // HR Manager: full CRUD + approve/reject
      // System Admin: read-only (should not manage day-to-day allowances)
      return {
        ...base,
        canSeeResource: true,
        canCreate: role === 'DEPARTMENT_HEAD' || role === 'HR_MANAGER',
        canEdit: role === 'DEPARTMENT_HEAD' || role === 'HR_MANAGER',
        canDelete: false,
        canApproveReject: role === 'HR_MANAGER',
      };
    }

    case 'tax-rules': {
      // Employee: read-only summary
      // Department Head: read-only
      // HR Manager: read-only
      // System Admin: system-level full control
      return {
        ...base,
        canSeeResource: true,
        canCreate: role === 'SYSTEM_ADMIN',
        canEdit: role === 'SYSTEM_ADMIN',
        canDelete: false,
        canApproveReject: false,
      };
    }

    case 'payroll-policies': {
      // Department Head: view only
      // HR Manager: main owner (create/edit + approve/reject)
      // System Admin: may view but not edit business rules
      const canSee = role === 'DEPARTMENT_HEAD' || role === 'HR_MANAGER' || role === 'SYSTEM_ADMIN';
      return {
        ...base,
        canSeeResource: canSee,
        canCreate: role === 'HR_MANAGER',
        canEdit: role === 'HR_MANAGER',
        canDelete: false,
        canApproveReject: role === 'HR_MANAGER',
      };
    }

    case 'signing-bonuses': {
      // Department Head: propose (create/edit draft)
      // HR Manager: full CRUD + approve/reject
      // System Admin: should not touch day-to-day signing bonuses (view only)
      return {
        ...base,
        canSeeResource:
          role === 'DEPARTMENT_HEAD' || role === 'HR_MANAGER' || role === 'SYSTEM_ADMIN',
        canCreate: role === 'DEPARTMENT_HEAD' || role === 'HR_MANAGER',
        canEdit: role === 'DEPARTMENT_HEAD' || role === 'HR_MANAGER',
        canDelete: false,
        canApproveReject: role === 'HR_MANAGER',
      };
    }

    case 'termination-resignation-benefits': {
      // Department Head: propose
      // HR Manager: full CRUD + approve/reject
      // System Admin: view only
      return {
        ...base,
        canSeeResource:
          role === 'DEPARTMENT_HEAD' || role === 'HR_MANAGER' || role === 'SYSTEM_ADMIN',
        canCreate: role === 'DEPARTMENT_HEAD' || role === 'HR_MANAGER',
        canEdit: role === 'DEPARTMENT_HEAD' || role === 'HR_MANAGER',
        canDelete: false,
        canApproveReject: role === 'HR_MANAGER',
      };
    }

    case 'insurance-brackets': {
      // Department Head: view only
      // HR Manager: edit/content + approve/reject + delete
      // System Admin: system-level control + override (same as HR + emergency)
      const canSee =
        role === 'DEPARTMENT_HEAD' || role === 'HR_MANAGER' || role === 'SYSTEM_ADMIN';
      const canManage = role === 'HR_MANAGER' || role === 'SYSTEM_ADMIN';
      return {
        ...base,
        canSeeResource: canSee,
        canCreate: canManage,
        canEdit: canManage,
        canDelete: canManage,
        canApproveReject: canManage,
      };
    }

    case 'company-wide-settings': {
      // System Admin only (global settings card)
      const canSee = role === 'SYSTEM_ADMIN';
      const canManage = role === 'SYSTEM_ADMIN';
      return {
        ...base,
        canSeeResource: canSee,
        canCreate: canManage,
        canEdit: canManage,
        canDelete: false,
        canApproveReject: false,
      };
    }

    default:
      return base;
  }
}
