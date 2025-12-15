import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import { Plus, RefreshCw } from 'lucide-react';

import {
  getPayrollConfigResourceMeta,
  isConfigStatus,
  type ConfigStatus,
  type PayrollConfigResourceSlug,
} from '@/lib/payroll-config/resources';
import { listConfigs } from '@/lib/payroll-config/api';
import { PayrollConfigLayout } from '@/components/payroll-config/PayrollConfigLayout';

function formatDate(v: any) {
  if (!v) return '—';
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return String(v);
  return d.toLocaleString();
}

export default function PayrollConfigResourceListPage() {
  const router = useRouter();
  const resource = router.query.resource as string | undefined;
  const meta = useMemo(() => getPayrollConfigResourceMeta(resource), [resource]);

  const [status, setStatus] = useState<ConfigStatus | ''>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    if (!router.isReady) return;
    if (!meta) return;

    const s = router.query.status;
    if (typeof s === 'string' && isConfigStatus(s)) {
      setStatus(s);
    }
  }, [router.isReady, router.query.status, meta]);

  async function load() {
    if (!meta) return;
    setLoading(true);
    setError(null);
    try {
      const data = await listConfigs(
        meta.slug as PayrollConfigResourceSlug,
        meta.capabilities.statusFilterMode === 'optional' && status
          ? { status }
          : {},
      );
      setItems(Array.isArray(data) ? data : []);
    } catch (e: any) {
      setError(e?.response?.data?.message ?? e?.message ?? 'Failed to load');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!meta) return;
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meta?.slug, status]);

  if (!meta) {
    return (
      <PayrollConfigLayout
        title="Payroll Configuration"
        subtitle="Invalid resource"
        backHref="/subsystems/payroll-configuration"
      >
        <div className="rounded-3xl bg-white/5 border border-white/10 p-8 text-gray-300">
          Unknown resource.
        </div>
      </PayrollConfigLayout>
    );
  }

  return (
    <PayrollConfigLayout
      title={meta.title}
      subtitle={meta.description}
      backHref="/subsystems/payroll-configuration"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {meta.capabilities.statusFilterMode === 'optional' ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-300">Status</span>
              <select
                className="rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-sm"
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
              >
                <option value="">All</option>
                <option value="draft">Draft</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          ) : null}

          <button
            onClick={() => void load()}
            className="inline-flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-sm hover:bg-white/10 transition"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>

        {meta.capabilities.canCreate ? (
          <Link
            href={`/subsystems/payroll-configuration/${meta.slug}/new`}
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 px-5 py-3 text-sm hover:opacity-90 transition"
          >
            <Plus className="w-4 h-4" />
            New {meta.title}
          </Link>
        ) : null}
      </div>

      <div className="mt-6 rounded-3xl bg-white/5 border border-white/10 overflow-hidden">
        {error ? (
          <div className="p-6 text-red-300">{error}</div>
        ) : null}

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-white/5">
              <tr className="text-left text-gray-300">
                <th className="px-6 py-4 font-medium">ID</th>
                <th className="px-6 py-4 font-medium">Name / Key</th>
                {meta.capabilities.statusFilterMode === 'optional' ? (
                  <th className="px-6 py-4 font-medium">Status</th>
                ) : null}
                <th className="px-6 py-4 font-medium">Created</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td className="px-6 py-6 text-gray-300" colSpan={4}>
                    Loading...
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td className="px-6 py-6 text-gray-400" colSpan={4}>
                    No records.
                  </td>
                </tr>
              ) : (
                items.map((it) => {
                  const id = it?._id ?? it?.id;
                  const key =
                    it?.name ??
                    it?.policyName ??
                    it?.grade ??
                    it?.type ??
                    it?.positionName ??
                    '—';

                  return (
                    <tr
                      key={String(id)}
                      className="border-t border-white/10 hover:bg-white/5 transition"
                    >
                      <td className="px-6 py-4 font-mono text-xs text-gray-200">
                        <Link
                          className="hover:text-cyan-300"
                          href={`/subsystems/payroll-configuration/${meta.slug}/${id}`}
                        >
                          {String(id)}
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-gray-100">{String(key)}</td>
                      {meta.capabilities.statusFilterMode === 'optional' ? (
                        <td className="px-6 py-4 text-gray-200">
                          {it?.status ?? '—'}
                        </td>
                      ) : null}
                      <td className="px-6 py-4 text-gray-400">
                        {formatDate(it?.createdAt)}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </PayrollConfigLayout>
  );
}
