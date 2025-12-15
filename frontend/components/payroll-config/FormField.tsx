import React from 'react';
import type { FieldDef } from '@/lib/payroll-config/form';

export function FormField({
  field,
  value,
  onChange,
  disabled,
}: {
  field: FieldDef;
  value: any;
  onChange: (next: string) => void;
  disabled?: boolean;
}) {
  const inputClass =
    'w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-white/20';

  return (
    <div className="space-y-2">
      <label className="text-sm text-gray-200">
        {field.label}
        {field.required ? <span className="text-red-400"> *</span> : null}
      </label>

      {field.type === 'textarea' ? (
        <textarea
          disabled={disabled}
          className={`${inputClass} min-h-[120px]`}
          value={value ?? ''}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : field.type === 'select' ? (
        <select
          disabled={disabled}
          className={inputClass}
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="" disabled>
            Select...
          </option>
          {(field.options ?? []).map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          disabled={disabled}
          className={inputClass}
          type={field.type}
          value={value ?? ''}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      )}

      {field.helpText ? (
        <p className="text-xs text-gray-400">{field.helpText}</p>
      ) : null}
    </div>
  );
}
