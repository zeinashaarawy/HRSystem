"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, RefreshCw } from "lucide-react";
import { getRefundsByEmployee, RefundResponse } from "@/lib/payrollTracking";
import RefundsList from "../components/Payroll/RefundsList";

export default function RefundsPage() {
  const [refunds, setRefunds] = useState<RefundResponse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchRefunds = async () => {
    try {
      setLoading(true);
      const userId = localStorage.getItem("userId");
      if (!userId) throw new Error("User not authenticated");

      const data = await getRefundsByEmployee(userId);
      setRefunds(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to load refunds");
      setRefunds([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRefunds();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <p className="text-slate-400">Loading refunds...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/subsystems/payroll-tracking"
              className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
            <h1 className="text-3xl font-bold">Refunds</h1>
          </div>
          <Link
            href="/subsystems/payroll-tracking/refunds/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-lg transition-all"
          >
            <Plus className="w-4 h-4" />
            New Refund
          </Link>
        </div>

        {/* Content */}
        {error ? (
          <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-red-400">
            <p>Error: {error}</p>
          </div>
        ) : refunds.length === 0 ? (
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-12 text-center">
            <RefreshCw className="w-16 h-16 mx-auto mb-4 text-slate-400" />
            <h2 className="text-2xl font-semibold mb-2">No Refunds Found</h2>
            <p className="text-slate-400 mb-6">
              You haven't created any refund requests yet.
            </p>
            <Link
              href="/subsystems/payroll-tracking/refunds/new"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-lg transition-all"
            >
              <Plus className="w-5 h-5" />
              Create Your First Refund Request
            </Link>
          </div>
        ) : (
          <RefundsList refunds={refunds} onUpdate={fetchRefunds} />
        )}
      </div>
    </div>
  );
}
