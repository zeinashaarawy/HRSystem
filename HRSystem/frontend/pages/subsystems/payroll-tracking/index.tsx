"use client";

import Link from "next/link";
import {
  FileText,
  AlertCircle,
  RefreshCw,
  Receipt,
  Plus,
  ArrowRight,
  History,
  ArrowLeft
} from "lucide-react";

import { useHRMode } from "../../../lib/hooks/useHRMode";

export default function PayrollTracking() {
  const { isHRManager } = useHRMode();

  const features = [
    {
      name: "Claims",
      description: "Submit and track payroll claims",
      icon: <FileText className="w-6 h-6" />,
      gradient: "from-blue-500 to-cyan-500",
      route: "/subsystems/payroll-tracking/claims",
      actions: [
        { label: "New Claim", route: "/subsystems/payroll-tracking/claims/new" },
        { label: "View Claims", route: "/subsystems/payroll-tracking/claims" },
      ],
    },
    {
      name: "Disputes",
      description: "Manage payroll disputes and resolutions",
      icon: <AlertCircle className="w-6 h-6" />,
      gradient: "from-orange-500 to-red-500",
      route: "/subsystems/payroll-tracking/disputes",
      actions: [
        { label: "New Dispute", route: "/subsystems/payroll-tracking/disputes/new" },
        { label: "View Disputes", route: "/subsystems/payroll-tracking/disputes" },
      ],
    },
    {
      name: "Refunds",
      description: "Track refund requests and processing",
      icon: <RefreshCw className="w-6 h-6" />,
      gradient: "from-green-500 to-emerald-500",
      route: "/subsystems/payroll-tracking/refunds",
      actions: [
        { label: "New Refund", route: "/subsystems/payroll-tracking/refunds/new" },
        { label: "View Refunds", route: "/subsystems/payroll-tracking/refunds" },
      ],
    },
    {
      name: "Pay Slips",
      description: "View and download pay slips",
      icon: <Receipt className="w-6 h-6" />,
      gradient: "from-purple-500 to-pink-500",
      route: "/subsystems/payroll-tracking/payslips",
      actions: [
        { label: "View Pay Slips", route: "/subsystems/payroll-tracking/payslips" },
      ],
    },
    {
      name: "History",
      description: "View payroll history and audit logs",
      icon: <History className="w-6 h-6" />,
      gradient: "from-indigo-500 to-blue-500",
      route: "/subsystems/payroll-tracking/history",
      actions: [
        { label: "View History", route: "/subsystems/payroll-tracking/history" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
            </div>
            <h1 className="text-4xl font-bold mb-2">Payroll Tracking</h1>
            <p className="text-slate-300">
              Manage claims, disputes, refunds, and track your payroll history
            </p>
          </div>

          {/* Role Indicator (Optional: only show if HR) */}
          {isHRManager && (
            <div className="px-4 py-2 rounded-lg border text-sm font-medium bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-500/20">
              Role: HR Manager
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/subsystems/payroll-tracking/claims/new"
            className="bg-gradient-to-r from-blue-600 to-cyan-600 p-4 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all flex items-center gap-3 group"
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">New Claim</span>
            <ArrowRight className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/subsystems/payroll-tracking/disputes/new"
            className="bg-gradient-to-r from-orange-600 to-red-600 p-4 rounded-lg hover:from-orange-700 hover:to-red-700 transition-all flex items-center gap-3 group"
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">New Dispute</span>
            <ArrowRight className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/subsystems/payroll-tracking/refunds/new"
            className="bg-gradient-to-r from-green-600 to-emerald-600 p-4 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all flex items-center gap-3 group"
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">New Refund</span>
            <ArrowRight className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition-all"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 text-white`}>
                {feature.icon}
              </div>

              <h3 className="text-xl font-semibold mb-2">{feature.name}</h3>
              <p className="text-slate-400 text-sm mb-4">{feature.description}</p>

              <div className="space-y-2">
                {feature.actions.map((action, actionIndex) => (
                  <Link
                    key={actionIndex}
                    href={action.route}
                    className="block w-full bg-slate-700/50 hover:bg-slate-700 px-4 py-2 rounded text-sm transition-all flex items-center justify-between group"
                  >
                    <span>{action.label}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
