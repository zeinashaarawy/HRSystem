export type ConfigStatus = 'draft' | 'approved' | 'rejected';

export type PayrollConfigResourceSlug =
  | 'insurance-brackets'
  | 'payroll-policies'
  | 'pay-grades'
  | 'pay-types'
  | 'allowances'
  | 'signing-bonuses'
  | 'termination-resignation-benefits'
  | 'company-wide-settings'
  | 'tax-rules';

export type ResourceStatusFilterMode = 'none' | 'optional';

export type ResourceCapabilities = {
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canApproveReject: boolean;
  statusFilterMode: ResourceStatusFilterMode;
};

export type PayrollConfigResourceMeta = {
  slug: PayrollConfigResourceSlug;
  title: string;
  description: string;
  capabilities: ResourceCapabilities;
};

export const PAYROLL_CONFIG_RESOURCES: PayrollConfigResourceMeta[] = [
  {
    slug: 'insurance-brackets',
    title: 'Insurance Brackets',
    description: 'Salary ranges with employee/employer insurance contribution rates.',
    capabilities: {
      canCreate: true,
      canEdit: true,
      canDelete: true,
      canApproveReject: true,
      statusFilterMode: 'optional',
    },
  },
  {
    slug: 'payroll-policies',
    title: 'Payroll Policies',
    description: 'Policy rules (allowances/deductions/benefits/etc.) applied during payroll.',
    capabilities: {
      canCreate: true,
      canEdit: true,
      canDelete: true,
      canApproveReject: true,
      statusFilterMode: 'optional',
    },
  },
  {
    slug: 'pay-grades',
    title: 'Pay Grades',
    description: 'Grades with base and gross salary ranges.',
    capabilities: {
      canCreate: true,
      canEdit: true,
      canDelete: true,
      canApproveReject: true,
      statusFilterMode: 'optional',
    },
  },
  {
    slug: 'pay-types',
    title: 'Pay Types',
    description: 'Pay types with fixed amounts (e.g., salary type).',
    capabilities: {
      canCreate: true,
      canEdit: true,
      canDelete: true,
      canApproveReject: true,
      statusFilterMode: 'optional',
    },
  },
  {
    slug: 'allowances',
    title: 'Allowances',
    description: 'Allowance definitions (name + amount).',
    capabilities: {
      canCreate: true,
      canEdit: true,
      canDelete: true,
      canApproveReject: true,
      statusFilterMode: 'optional',
    },
  },
  {
    slug: 'signing-bonuses',
    title: 'Signing Bonuses',
    description: 'Position-based onboarding bonuses.',
    capabilities: {
      canCreate: true,
      canEdit: true,
      canDelete: true,
      canApproveReject: true,
      statusFilterMode: 'optional',
    },
  },
  {
    slug: 'termination-resignation-benefits',
    title: 'Termination / Resignation Benefits',
    description: 'End-of-service gratuity / resignation benefits definitions.',
    capabilities: {
      canCreate: true,
      canEdit: true,
      canDelete: true,
      canApproveReject: true,
      statusFilterMode: 'optional',
    },
  },
  {
    slug: 'company-wide-settings',
    title: 'Company-wide Settings',
    description: 'Global payroll settings like pay date, currency, and time zone.',
    capabilities: {
      canCreate: true,
      canEdit: true,
      canDelete: true,
      canApproveReject: false,
      statusFilterMode: 'none',
    },
  },
  {
    slug: 'tax-rules',
    title: 'Tax Rules',
    description: 'Tax rule definitions with rates.',
    capabilities: {
      canCreate: true,
      canEdit: true,
      canDelete: true,
      canApproveReject: true,
      statusFilterMode: 'optional',
    },
  },
];

export function getPayrollConfigResourceMeta(
  slug: string | undefined,
): PayrollConfigResourceMeta | undefined {
  if (!slug) return undefined;
  return PAYROLL_CONFIG_RESOURCES.find((r) => r.slug === slug);
}

export function isConfigStatus(value: string): value is ConfigStatus {
  return value === 'draft' || value === 'approved' || value === 'rejected';
}
