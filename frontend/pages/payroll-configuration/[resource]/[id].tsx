import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';

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
import {
  approveConfig,
  approveInsuranceBracket,
  deleteConfig,
  deleteInsuranceBracket,
  getConfig,
  rejectConfig,
  rejectInsuranceBracket,
  updateConfig,
} from '@/lib/api/payroll-config/api';
import {
  getPayrollPermissions,
  normalizeRole,
  type NormalizedSystemRole,
} from '@/lib/api/payroll-config/permissions';
import { useAuth } from '@/hooks/useAuth';

function isEditable(doc: any) {
  // Most payroll configs enforce draft-only edits. Company-wide settings has no status.
  if (!doc) return false;
  if (doc.status == null) return true;
  return doc.status === 'draft';
}

export default function PayrollConfigDetailPage() {
  const router = useRouter();
  const resource = router.query.resource as string | undefined;
  const id = router.query.id as string | undefined;
  const meta = useMemo(() => getPayrollConfigResourceMeta(resource), [resource]);
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [doc, setDoc] = useState<any | null>(null);
  const [form, setForm] = useState<Record<string, any>>({});

  const [saving, setSaving] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const [role, setRole] = useState<NormalizedSystemRole | null>(null);

  const fields = useMemo(
    () => (meta ? pickFormFields(meta.slug) : []),
    [meta?.slug],
  );

  async function load() {
    if (!meta || !id) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getConfig(meta.slug as PayrollConfigResourceSlug, id);
      setDoc(data);

      // Seed form from fetched doc (only for known fields)
      let next = initialFormState(meta.slug as PayrollConfigResourceSlug);
      for (const f of fields) {
        const v = getIn(data, f.path);
        if (v !== undefined && v !== null) {
          next = setIn(next, f.path, v);
        }
      }
      setForm(next);
    } catch (e: any) {
      setError(e?.response?.data?.message ?? e?.message ?? 'Failed to load');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
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

    if (!router.isReady) return;
    if (!meta || !id) return;

    const perms = getPayrollPermissions(normalized, meta.slug as PayrollConfigResourceSlug);
    if (!perms.canSeeResource) {
      router.push('/dashboard');
      return;
    }

    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, router.isReady, meta?.slug, id]);

  if (!meta || !id) {
    return (
      <PayrollConfigLayout
        title="Payroll Configuration"
        subtitle="Invalid route"
        backHref="/payroll-configuration"
      >
        <div className="rounded-3xl bg-white/5 border border-white/10 p-8 text-gray-300">
          Invalid route.
        </div>
      </PayrollConfigLayout>
    );
  }

  const perms = getPayrollPermissions(role, meta.slug as PayrollConfigResourceSlug);
  const editable = perms.canEdit && isEditable(doc);

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    if (!meta) return;
    if (!id) return;
    if (!editable) return;

    setSaving(true);
    setActionError(null);
    try {
      const updated = await updateConfig(meta.slug, id, form);
      setDoc(updated);
    } catch (err: any) {
      setActionError(
        err?.response?.data?.message ?? err?.message ?? 'Failed to save',
      );
    } finally {
      setSaving(false);
    }
  }

  async function onApprove() {
    if (!meta) return;
    if (!id) return;
    if (!user?.id) {
      setActionError('You must be logged in to approve');
      return;
    }
    if (!perms.canApproveReject) return;
    if (doc?.status === 'approved') {
      setActionError('This item is already approved');
      return;
    }
    setSaving(true);
    setActionError(null);
    try {
      let updated: any;
      if (meta.slug === 'insurance-brackets') {
        updated = await approveInsuranceBracket(id, user.id);
      } else {
        updated = await approveConfig(
          meta.slug as PayrollConfigResourceSlug,
          id,
          user.id,
        );
      }
      setDoc(updated);
    } catch (err: any) {
      setActionError(
        err?.response?.data?.message ?? err?.message ?? 'Failed to approve',
      );
    } finally {
      setSaving(false);
    }
  }

  async function onReject() {
    if (!meta) return;
    if (!id) return;
    if (!user?.id) {
      setActionError('You must be logged in to reject');
      return;
    }
    if (!perms.canApproveReject) return;
    if (doc?.status === 'rejected') {
      setActionError('This item is already rejected');
      return;
    }
    setSaving(true);
    setActionError(null);
    try {
      let updated: any;
      if (meta.slug === 'insurance-brackets') {
        updated = await rejectInsuranceBracket(id, user.id);
      } else {
        updated = await rejectConfig(
          meta.slug as PayrollConfigResourceSlug,
          id,
          user.id,
        );
      }
      setDoc(updated);
    } catch (err: any) {
      setActionError(
        err?.response?.data?.message ?? err?.message ?? 'Failed to reject',
      );
    } finally {
      setSaving(false);
    }
  }

  async function onDelete() {
    if (!meta) return;
    if (!id) return;
    if (!perms.canDelete) return;

    const confirmMsg = meta.slug === 'insurance-brackets'
      ? 'Delete this insurance bracket?'
      : `Delete this ${meta.title.toLowerCase()}?`;

    if (!confirm(confirmMsg)) return;

    setSaving(true);
    setActionError(null);
    try {
      if (meta.slug === 'insurance-brackets') {
        await deleteInsuranceBracket(id);
      } else {
        await deleteConfig(meta.slug as PayrollConfigResourceSlug, id);
      }
      await router.push(`/payroll-configuration/${meta.slug}`);
    } catch (err: any) {
      setActionError(
        err?.response?.data?.message ?? err?.message ?? 'Failed to delete',
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <PayrollConfigLayout
      title={`${meta.title} Details`}
      subtitle={meta.description}
      backHref={`/payroll-configuration/${meta.slug}`}
    >
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="rounded-3xl bg-white/5 border border-white/10 p-6 lg:p-10">
          {loading ? (
            <div className="text-gray-300">Loading...</div>
          ) : error ? (
            <div className="text-red-300">{error}</div>
          ) : (
            <>
              <div className="flex items-center justify-between gap-4">
                <div className="text-sm text-gray-300">
                  <div>
                    <span className="text-gray-500">ID:</span>{' '}
                    <span className="font-mono text-xs">{id}</span>
                  </div>
                  {'status' in (doc ?? {}) ? (
                    <div>
                      <span className="text-gray-500">Status:</span>{' '}
                      <span className="text-gray-200">{doc?.status ?? '—'}</span>
                    </div>
                  ) : null}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => void load()}
                    className="rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-sm hover:bg-white/10"
                  >
                    Reload
                  </button>
                </div>
              </div>

              {!editable ? (
                <div className="mt-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 p-4 text-sm text-amber-200">
                  Editing is only allowed when status is <b>draft</b>.
                </div>
              ) : null}

              <form onSubmit={onSave} className="mt-6">
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
                      disabled={!editable || saving}
                    />
                  ))}
                </div>

                {actionError ? (
                  <div className="mt-6 text-red-300">{actionError}</div>
                ) : null}

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <button
                    disabled={!editable || saving}
                    type="submit"
                    className="rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-3 text-sm hover:opacity-90 disabled:opacity-60"
                  >
                    {saving ? 'Saving...' : 'Save'}
                  </button>

                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="rounded-2xl bg-white/5 border border-white/10 px-6 py-3 text-sm hover:bg-white/10"
                  >
                    Back
                  </button>
                </div>

                {(perms.canApproveReject || perms.canDelete) ? (
                  <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {perms.canApproveReject ? (
                      <>
                        <button
                          type="button"
                          className="w-full rounded-xl bg-emerald-600/80 hover:bg-emerald-600 px-4 py-3 text-sm disabled:opacity-60 disabled:cursor-not-allowed font-medium text-emerald-100"
                          onClick={() => void onApprove()}
                          disabled={saving || doc?.status === 'approved' || doc?.status === 'rejected'}
                          title={doc?.status === 'approved' ? 'Already approved' : doc?.status === 'rejected' ? 'Cannot approve a rejected item' : 'Approve this item'}
                        >
                          Approve
                        </button>

                        <button
                          type="button"
                          className="w-full rounded-xl bg-amber-600/80 hover:bg-amber-600 px-4 py-3 text-sm disabled:opacity-60 disabled:cursor-not-allowed font-medium text-amber-100"
                          onClick={() => void onReject()}
                          disabled={saving || doc?.status === 'rejected' || doc?.status === 'approved'}
                          title={doc?.status === 'rejected' ? 'Already rejected' : doc?.status === 'approved' ? 'Cannot reject an approved item' : 'Reject this item'}
                        >
                          Reject
                        </button>
                      </>
                    ) : null}

                    {perms.canDelete ? (
                      <div className="relative">
                        <button
                          type="button"
                          className="w-full rounded-xl bg-red-600/80 hover:bg-red-600 px-4 py-3 text-sm disabled:opacity-60 font-medium text-red-100"
                          onClick={() => void onDelete()}
                          disabled={saving}
                        >
                          Delete
                        </button>
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </form>
            </>
          )}
        </div>

        <div className="rounded-3xl bg-white/5 border border-white/10 p-6 lg:p-10">
          <p className="text-sm text-gray-200 mb-3">Raw JSON</p>
          <pre className="text-xs bg-black/30 border border-white/10 rounded-2xl p-4 overflow-auto">
            {JSON.stringify(doc ?? {}, null, 2)}
          </pre>
        </div>
      </div>
    </PayrollConfigLayout>
  );
}
