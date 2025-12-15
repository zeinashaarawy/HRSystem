import Link from 'next/link';
import type { ReactNode } from 'react';
import { ChevronLeft, Settings2 } from 'lucide-react';

export function PayrollConfigLayout({
  title,
  subtitle,
  children,
  backHref,
}: {
  title: string;
  subtitle?: string;
  backHref?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="flex items-center gap-3">
              {backHref ? (
                <Link
                  href={backHref}
                  className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </Link>
              ) : null}
            </div>
            <h1 className="mt-3 text-3xl lg:text-4xl font-light">{title}</h1>
            {subtitle ? (
              <p className="mt-2 text-gray-300 max-w-3xl">{subtitle}</p>
            ) : null}
          </div>

          <div className="hidden sm:flex items-center gap-2 rounded-2xl bg-white/5 border border-white/10 px-4 py-3">
            <Settings2 className="w-4 h-4 text-cyan-300" />
            <span className="text-sm text-gray-200">Payroll Configuration</span>
          </div>
        </div>

        <div className="mt-10">{children}</div>
      </div>
    </div>
  );
}
