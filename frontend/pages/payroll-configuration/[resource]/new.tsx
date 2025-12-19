import { useRouter } from 'next/router';
import React, { useMemo, useState } from 'react';

const ALLOWED_ROLES = new Set([
  'DEPARTMENT_EMPLOYEE',
  'HR_MANAGER',
  'DEPARTMENT_HEAD',
  'SYSTEM_ADMIN',
]);

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

export default function PayrollConfigNewPage() {
  const router = useRouter();
  const resource = router.query.resource as string | undefined;
  const meta = useMemo(() => getPayrollConfigResourceMeta(resource), [resource]);

  const [form, setForm] = useState<Record<string, any>>(() =>
    meta ? initialFormState(meta.slug as PayrollConfigResourceSlug) : {},
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    const savedRole = localStorage.getItem('role');
    const normalizedRole = (savedRole || '').toUpperCase().replaceAll(' ', '_');

    if (!token) {
      router.push('/login');
      return;
    }

    if (!ALLOWED_ROLES.has(normalizedRole)) {
      router.push('/dashboard');
      return;
    }

    if (!meta) return;
    setForm(initialFormState(meta.slug));
  }, [router, meta?.slug]);

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

    setSaving(true);
    setError(null);
    try {
      const created = await createConfig(meta.slug, form);
      const createdId = created?._id ?? created?.id;
      if (createdId) {
        await router.push(
          `/payroll-configuration/${meta.slug}/${createdId}`,
        );
      } else {
        await router.push(`/payroll-configuration/${meta.slug}`);
      }
    } catch (err: any) {
      setError(err?.response?.data?.message ?? err?.message ?? 'Failed to create');
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
