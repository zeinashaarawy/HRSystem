"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, History as HistoryIcon, Filter } from "lucide-react";
import {
  HistoricalRecordResponse,
  listHistoricalRecordsByEmployee,
} from "@/lib/payrollTracking";

export default function HistoryPage() {
  const [records, setRecords] = useState<HistoricalRecordResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  async function fetchHistory(params?: { startDate?: string; endDate?: string }) {
    try {
      setLoading(true);
      const userId = localStorage.getItem("userId");
      if (!userId) throw new Error("User not authenticated");

      const data = await listHistoricalRecordsByEmployee(userId, params);
      setRecords(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to load history");
      setRecords([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatCurrency = (value?: number) =>
    typeof value === "number"
      ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(value)
      : "-";

  const formatDateTime = (value?: string) =>
    value ? new Date(value).toLocaleString() : "-";

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    fetchHistory({
      startDate: startDate || undefined,
      endDate: endDate || undefined,
    });
  };

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
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <HistoryIcon className="w-6 h-6" />
              History
            </h1>
          </div>
        </div>

        {/* Filters */}
        <form
          onSubmit={handleFilter}
          className="mb-6 bg-slate-900/60 border border-slate-800 rounded-lg p-4 flex flex-col md:flex-row gap-4 md:items-end"
        >
          <div className="flex-1">
            <label className="block text-xs uppercase tracking-wide text-slate-400 mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs uppercase tracking-wide text-slate-400 mb-1">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-sm font-medium transition-colors"
          >
            <Filter className="w-4 h-4" />
            Apply Filters
          </button>
        </form>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-slate-400">Loading history...</p>
          </div>
        ) : error ? (
          <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-red-400">
            <p>Error: {error}</p>
          </div>
        ) : records.length === 0 ? (
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-12 text-center">
            <HistoryIcon className="w-16 h-16 mx-auto mb-4 text-slate-400" />
            <h2 className="text-2xl font-semibold mb-2">No Historical Records</h2>
            <p className="text-slate-400">
              Once payroll runs are generated for this employee, their history
              will appear here.
            </p>
          </div>
        ) : (
          <div className="bg-slate-900/60 border border-slate-800 rounded-lg overflow-hidden">
            <div className="grid grid-cols-5 gap-4 px-6 py-3 text-sm font-medium text-slate-400 border-b border-slate-800">
              <span>Created</span>
              <span>Payroll Run</span>
              <span>Gross</span>
              <span>Net Pay</span>
              <span>Payment Status</span>
            </div>
            <div className="divide-y divide-slate-800">
              {records.map((r) => (
                <div
                  key={r._id || `${r.employeeId}-${r.payrollRunId}-${r.createdAt}`}
                  className="grid grid-cols-5 gap-4 px-6 py-4 text-sm items-center hover:bg-slate-800/60 transition-colors"
                >
                  <span>{formatDateTime(r.createdAt)}</span>
                  <span className="truncate">
                    {typeof r.payrollRunId === "string"
                      ? r.payrollRunId
                      : (r as any).payrollRunId?._id ||
                      (r as any).payrollRunId?.name ||
                      "-"}
                  </span>
                  <span>{formatCurrency(r.totalGrossSalary)}</span>
                  <span>{formatCurrency(r.netPay)}</span>
                  <span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-slate-800 border border-slate-700 text-slate-200">
                      {r.paymentStatus || "N/A"}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


