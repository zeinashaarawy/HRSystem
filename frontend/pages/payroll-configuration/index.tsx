import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState, type ReactNode } from 'react';
import {
  BadgePercent,
  Building2,
  FileText,
  HandCoins,
  Layers,
  Shield,
  Wallet,
  Waypoints,
  Sparkles,
} from 'lucide-react';

import { PayrollConfigLayout } from '@/components/payroll-config/PayrollConfigLayout';
import { PAYROLL_CONFIG_RESOURCES } from '@/lib/api/payroll-config/resources';
import {
  getPayrollPermissions,
  normalizeRole,
  type NormalizedSystemRole,
} from '@/lib/api/payroll-config/permissions';

const ICONS: Record<string, ReactNode> = {
  'insurance-brackets': <Shield className="w-6 h-6" />,
  'payroll-policies': <FileText className="w-6 h-6" />,
  'pay-grades': <Layers className="w-6 h-6" />,
  'pay-types': <Wallet className="w-6 h-6" />,
  allowances: <HandCoins className="w-6 h-6" />,
  'signing-bonuses': <Sparkles className="w-6 h-6" />,
  'termination-resignation-benefits': <Waypoints className="w-6 h-6" />,
  'company-wide-settings': <Building2 className="w-6 h-6" />,
  'tax-rules': <BadgePercent className="w-6 h-6" />,
};

export default function PayrollConfiguration() {
  const router = useRouter();
  const [role, setRole] = useState<NormalizedSystemRole | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedRole = localStorage.getItem('role');
    
    console.log('[PayrollConfig] Checking access. Role from localStorage:', savedRole);

    if (!token) {
      router.push('/login');
      return;
    }

    // Always allow access to the page - permissions will determine what resources are visible
    // If role can't be normalized, user will just see limited/no resources
    const normalized = normalizeRole(savedRole);
    console.log('[PayrollConfig] Normalized role:', normalized);
    
    if (normalized) {
      setRole(normalized);
    } else if (savedRole) {
      console.warn(`[PayrollConfig] Role "${savedRole}" could not be normalized. Showing page with limited permissions.`);
      setRole(null);
    } else {
      console.warn('[PayrollConfig] No role found. Showing page with limited permissions.');
      setRole(null);
    }
  }, [router]);

  return (
    <PayrollConfigLayout
      title="Payroll Configuration"
      subtitle="Manage payroll setup data like pay grades, allowances, tax rules, insurance brackets, and more."
      backHref="/"
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PAYROLL_CONFIG_RESOURCES.map((r) => {
          const perms = getPayrollPermissions(role, r.slug);

          if (!perms.canSeeResource) {
            return null;
          }

          return (
            <Link
              key={r.slug}
              href={`/payroll-configuration/${r.slug}`}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-cyan-600/20 blur-xl rounded-3xl opacity-0 group-hover:opacity-100 transition-all" />
              <div className="relative rounded-3xl bg-white/5 border border-white/10 p-6 backdrop-blur-xl hover:border-white/20 transition-all hover:-translate-y-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-2xl bg-white/5 border border-white/10 px-3 py-2">
                      <span className="text-cyan-300">{ICONS[r.slug]}</span>
                      <span className="text-sm text-gray-200">{r.title}</span>
                    </div>

                    <p className="mt-4 text-sm text-gray-400 leading-relaxed">
                      {r.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {r.capabilities.statusFilterMode === 'optional' ? (
                    <span className="text-xs rounded-full bg-white/5 border border-white/10 px-3 py-1 text-gray-300">
                      Status workflow
                    </span>
                  ) : (
                    <span className="text-xs rounded-full bg-white/5 border border-white/10 px-3 py-1 text-gray-300">
                      Global settings
                    </span>
                  )}

                  {r.capabilities.canApproveReject ? (
                    <span className="text-xs rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-emerald-200">
                      Approve/Reject
                    </span>
                  ) : null}

                  {r.capabilities.canDelete ? (
                    <span className="text-xs rounded-full bg-red-500/10 border border-red-500/20 px-3 py-1 text-red-200">
                      Delete
                    </span>
                  ) : null}
                </div>
              </div>
            </Link>
          );
        })}
        {PAYROLL_CONFIG_RESOURCES.filter((r) => {
          const perms = getPayrollPermissions(role, r.slug);
          return perms.canSeeResource;
        }).length === 0 && (
          <div className="col-span-full rounded-3xl bg-white/5 border border-white/10 p-8 text-center">
            <p className="text-gray-300 mb-2">
              {role
                ? 'You do not have permission to view any payroll configuration resources.'
                : 'Unable to determine your role. Please contact your administrator for access.'}
            </p>
            {!role && (
              <p className="text-sm text-gray-400 mt-2">
                Your role from localStorage: {localStorage.getItem('role') || 'Not found'}
              </p>
            )}
          </div>
        )}
      </div>
    </PayrollConfigLayout>
  );
}
