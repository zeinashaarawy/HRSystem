import { useRouter } from 'next/router';
import React, { useMemo, useState } from 'react';

import { PayrollConfigLayout } from '@/components/payroll-config/PayrollConfigLayout';
import { FormField } from '@/components/payroll-config/FormField';
import {
  getPayrollConfigResourceMeta,
  type PayrollConfigResourceSlug,
} from '@/lib/api/payroll-config/resources';
import {
  coerceValue,
  getIn,
  initialFormState,
  pickFormFields,
  setIn,
} from '@/lib/api/payroll-config/form';
import { createConfig } from '@/lib/api/payroll-config/api';
import {
  getPayrollPermissions,
  normalizeRole,
  type NormalizedSystemRole,
} from '@/lib/api/payroll-config/permissions';

export default function PayrollConfigNewPage() {
  const router = useRouter();
  const resource = router.query.resource as string | undefined;
  const meta = useMemo(() => getPayrollConfigResourceMeta(resource), [resource]);

  const [form, setForm] = useState<Record<string, any>>(() =>
    meta ? initialFormState(meta.slug as PayrollConfigResourceSlug) : {},
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [role, setRole] = useState<NormalizedSystemRole | null>(null);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    const savedRole = localStorage.getItem('role');
    const normalized = normalizeRole(savedRole);

    if (!token) {
      router.push('/login');
      return;
    }

    if (!normalized) {
      router.push('/dashboard');
      return;
    }

    setRole(normalized);

    if (!meta) return;

    const perms = getPayrollPermissions(normalized, meta.slug);
    if (!perms.canCreate) {
      router.push(`/payroll-configuration/${meta.slug}`);
      return;
    }

    setForm(initialFormState(meta.slug));
  }, [router, meta?.slug, meta]);

  if (!meta) {
    return (
      <PayrollConfigLayout
        title="New Configuration"
        subtitle="Invalid resource"
        backHref="/payroll-configuration"
      >
        <div className="rounded-3xl bg-white/5 border border-white/10 p-8 text-gray-300">
          Unknown resource.
        </div>
      </PayrollConfigLayout>
    );
  }

  const fields = pickFormFields(meta.slug);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!meta) return;

    // Clean and validate the form data
    const fields = pickFormFields(meta.slug);
    const cleanedForm: Record<string, any> = {};
    const missingFields: string[] = [];

    console.log('Form validation - starting with form state:', form);

    for (const field of fields) {
      let value = getIn(form, field.path);
      console.log(`Processing field ${field.path}:`, { value, type: typeof value, fieldType: field.type });
      
      // Handle different field types
      if (field.type === 'number') {
        // For numbers, convert string to number
        if (value === '' || value === null || value === undefined) {
          if (field.required) {
            missingFields.push(field.label);
          }
        } else {
          // Convert to number - handle both string and number inputs
          const num = typeof value === 'string' ? parseFloat(value) : Number(value);
          if (!isNaN(num) && isFinite(num)) {
            Object.assign(cleanedForm, setIn(cleanedForm, field.path, num));
            console.log(`Added ${field.path} to cleanedForm:`, num);
          } else if (field.required) {
            missingFields.push(`${field.label} must be a valid number`);
          }
        }
      } else {
        // For text fields, trim whitespace
        if (typeof value === 'string') {
          value = value.trim();
        }
        
        if (value === '' || value === null || value === undefined) {
          if (field.required) {
            missingFields.push(field.label);
            console.log(`Missing required field: ${field.label} (path: ${field.path})`);
          }
        } else {
          Object.assign(cleanedForm, setIn(cleanedForm, field.path, value));
          console.log(`Added ${field.path} to cleanedForm:`, value);
        }
      }
    }

    console.log('Form validation - cleanedForm:', cleanedForm);
    console.log('Form validation - missingFields:', missingFields);

    if (missingFields.length > 0) {
      setError(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    // Prevent double submission
    if (saving) {
      return;
    }

    setSaving(true);
    setError(null);
    
    // Log what we're sending for debugging
    console.log('Submitting form data:', cleanedForm);
    console.log('Original form state:', form);
    console.log('Fields:', fields.map(f => ({ path: f.path, value: getIn(form, f.path), type: f.type })));
    
    try {
      const created = await createConfig(meta.slug, cleanedForm);
      const createdId = created?._id ?? created?.id;
      if (createdId) {
        await router.push(
          `/payroll-configuration/${meta.slug}/${createdId}`,
        );
      } else {
        await router.push(`/payroll-configuration/${meta.slug}`);
      }
    } catch (err: any) {
      // Extract error message from various possible locations
      const errorMessage = 
        err?.response?.data?.message ?? 
        err?.response?.data?.error ?? 
        ((typeof err?.response?.data === 'string' ? err.response.data : null) ||
        err?.message) ?? 
        'Failed to create';
      
      console.error('Create error details:', {
        status: err?.response?.status,
        data: err?.response?.data,
        message: errorMessage,
        payload: cleanedForm
      });
      
      setError(errorMessage);
    } finally {
      setSaving(false);
    }
  }

  return (
    <PayrollConfigLayout
      title={`New ${meta.title}`}
      subtitle={meta.description}
      backHref={`/payroll-configuration/${meta.slug}`}
    >
      <form
        onSubmit={onSubmit}
        className="rounded-3xl bg-white/5 border border-white/10 p-6 lg:p-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {fields.map((f) => (
            <FormField
              key={f.path}
              field={f}
              value={getIn(form, f.path)}
              onChange={(raw) =>
                setForm((prev) =>
                  setIn(prev, f.path, coerceValue(f.type, raw)),
                )
              }
              disabled={saving}
            />
          ))}
        </div>

        {error ? <div className="mt-6 text-red-300">{error}</div> : null}

        <div className="mt-8 flex items-center gap-4">
          <button
            disabled={saving}
            type="submit"
            className="rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-3 text-sm hover:opacity-90 disabled:opacity-60"
          >
            {saving ? 'Saving...' : 'Create'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-2xl bg-white/5 border border-white/10 px-6 py-3 text-sm hover:bg-white/10"
          >
            Cancel
          </button>
        </div>

        <div className="mt-10">
          <p className="text-xs text-gray-400 mb-2">Payload preview</p>
          <pre className="text-xs bg-black/30 border border-white/10 rounded-2xl p-4 overflow-auto">
            {JSON.stringify(form, null, 2)}
          </pre>
        </div>
      </form>
    </PayrollConfigLayout>
  );
}
