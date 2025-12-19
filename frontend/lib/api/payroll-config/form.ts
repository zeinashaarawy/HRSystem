import type { PayrollConfigResourceSlug } from './resources';

export type FieldType = 'text' | 'number' | 'date' | 'textarea' | 'select';

export type FieldDef = {
  path: string; // supports dot notation for nested objects
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  options?: string[];
  helpText?: string;
};

export function getIn(obj: any, path: string) {
  return path.split('.').reduce((acc, key) => (acc ? acc[key] : undefined), obj);
}

export function setIn(obj: any, path: string, value: any) {
  const parts = path.split('.');
  const next = { ...(obj ?? {}) };
  let cur: any = next;

  for (let i = 0; i < parts.length - 1; i++) {
    const p = parts[i];
    cur[p] = cur[p] && typeof cur[p] === 'object' ? { ...cur[p] } : {};
    cur = cur[p];
  }

  cur[parts[parts.length - 1]] = value;
  return next;
}

export function pickFormFields(resource: PayrollConfigResourceSlug): FieldDef[] {
  switch (resource) {
    case 'insurance-brackets':
      return [
        { path: 'name', label: 'Name', type: 'text', required: true, placeholder: 'e.g., Social Insurance' },
        { path: 'minSalary', label: 'Min Salary', type: 'number', required: true },
        { path: 'maxSalary', label: 'Max Salary', type: 'number', required: true },
        { path: 'employeeRate', label: 'Employee Rate (%)', type: 'number', required: true },
        { path: 'employerRate', label: 'Employer Rate (%)', type: 'number', required: true },
      ];

    case 'allowances':
      return [
        { path: 'name', label: 'Name', type: 'text', required: true, placeholder: 'e.g., Housing Allowance' },
        { path: 'amount', label: 'Amount', type: 'number', required: true },
      ];

    case 'pay-grades':
      return [
        { path: 'grade', label: 'Grade', type: 'text', required: true, placeholder: 'e.g., Senior Developer' },
        { path: 'baseSalary', label: 'Base Salary', type: 'number', required: true },
        { path: 'grossSalary', label: 'Gross Salary', type: 'number', required: true },
      ];

    case 'pay-types':
      return [
        { path: 'type', label: 'Type', type: 'text', required: true, placeholder: 'e.g., Basic Salary' },
        { path: 'amount', label: 'Amount', type: 'number', required: true },
      ];

    case 'signing-bonuses':
      return [
        { path: 'positionName', label: 'Position Name', type: 'text', required: true, placeholder: 'e.g., Junior TA' },
        { path: 'amount', label: 'Amount', type: 'number', required: true },
      ];

    case 'termination-resignation-benefits':
      return [
        { path: 'name', label: 'Name', type: 'text', required: true, placeholder: 'e.g., End of Service Gratuity' },
        { path: 'amount', label: 'Amount', type: 'number', required: true },
        { path: 'terms', label: 'Terms', type: 'textarea', placeholder: 'Optional' },
      ];

    case 'tax-rules':
      return [
        { path: 'name', label: 'Name', type: 'text', required: true, placeholder: 'e.g., Income Tax' },
        { path: 'rate', label: 'Rate (%)', type: 'number', required: true },
        { path: 'description', label: 'Description', type: 'textarea', placeholder: 'Optional' },
      ];

    case 'company-wide-settings':
      return [
        { path: 'payDate', label: 'Pay Date', type: 'date', required: true },
        { path: 'timeZone', label: 'Time Zone', type: 'text', required: true, placeholder: 'e.g., Africa/Cairo' },
        { path: 'currency', label: 'Currency', type: 'text', required: true, placeholder: 'e.g., EGP' },
      ];

    case 'payroll-policies':
      return [
        { path: 'policyName', label: 'Policy Name', type: 'text', required: true },
        {
          path: 'policyType',
          label: 'Policy Type',
          type: 'select',
          required: true,
          options: ['Deduction', 'Allowance', 'Benefit', 'Misconduct', 'Leave'],
        },
        { path: 'description', label: 'Description', type: 'textarea', required: true },
        { path: 'effectiveDate', label: 'Effective Date', type: 'date', required: true },
        { path: 'ruleDefinition.percentage', label: 'Rule %', type: 'number', required: true },
        { path: 'ruleDefinition.fixedAmount', label: 'Rule Fixed Amount', type: 'number', required: true },
        { path: 'ruleDefinition.thresholdAmount', label: 'Rule Threshold Amount', type: 'number', required: true },
        {
          path: 'applicability',
          label: 'Applicability',
          type: 'select',
          required: true,
          options: ['All Employees', 'Full Time Employees', 'Part Time Employees', 'Contractors'],
        },
      ];

    default:
      return [];
  }
}

export function initialFormState(resource: PayrollConfigResourceSlug): Record<string, any> {
  const fields = pickFormFields(resource);
  return fields.reduce((acc, f) => setIn(acc, f.path, ''), {} as any);
}

export function coerceValue(type: FieldType, raw: string) {
  if (type === 'number') {
    if (raw === '') return '';
    const n = Number(raw);
    return Number.isFinite(n) ? n : raw;
  }

  return raw;
}
