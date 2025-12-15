import Link from 'next/link';
import type { ReactNode } from 'react';
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
import { PAYROLL_CONFIG_RESOURCES } from '@/lib/payroll-config/resources';

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
  return (
    <PayrollConfigLayout
      title="Payroll Configuration"
      subtitle="Manage payroll setup data like pay grades, allowances, tax rules, insurance brackets, and more."
      backHref="/"
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PAYROLL_CONFIG_RESOURCES.map((r) => (
          <Link
            key={r.slug}
            href={`/subsystems/payroll-configuration/${r.slug}`}
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
        ))}
      </div>
    </PayrollConfigLayout>
  );
}
