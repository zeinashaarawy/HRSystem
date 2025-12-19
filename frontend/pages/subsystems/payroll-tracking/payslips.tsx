"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, FileText, Download } from "lucide-react";
import {
  PayslipResponse,
  listPayslipsByEmployee,
} from "@/lib/payrollTracking";

export default function PayslipsPage() {
  const [payslips, setPayslips] = useState<PayslipResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPayslips() {
      try {
        setLoading(true);
        setError(null);

        const userId = localStorage.getItem("userId");
        if (!userId) {
          throw new Error("User not authenticated");
        }

        console.log("Fetching payslips for employee:", userId);
        const data = await listPayslipsByEmployee(userId);
        console.log("Payslips response:", data);
        setPayslips(Array.isArray(data) ? data : []);
      } catch (err: any) {
        console.error("Error fetching payslips:", err);
        setError(err.message || "Failed to load pay slips");
        setPayslips([]);
      } finally {
        setLoading(false);
      }
    }

    fetchPayslips();
  }, []);

  const formatCurrency = (value?: number) =>
    typeof value === "number"
      ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(value)
      : "-";

  const formatDate = (value?: string) =>
    value ? new Date(value).toLocaleDateString() : "-";

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white p-8">
        <div className="max-w-6xl mx-auto flex items-center justify-center h-64">
          <p className="text-slate-400">Loading pay slips...</p>
        </div>
      </div>
    );
  }

  const handleDownload = (payslip: PayslipResponse) => {
    try {

      const lines = [
        "PAYSLIP DETAILS",
        "===============",
        `Payroll Run: ${typeof payslip.payrollRunId === 'string' ? payslip.payrollRunId : (payslip as any).payrollRunId?.name || (payslip as any).payrollRunId?._id || 'N/A'}`,
        `Date: ${formatDate(payslip.createdAt)}`,
        `Employee ID: ${payslip.employeeId}`,
        "",
        "EARNINGS",
        "--------",
        `Base Salary: ${formatCurrency(payslip.earningsDetails?.baseSalary)}`,
        ...(payslip.earningsDetails?.allowances || []).map((a: any) => `Allowance (${a.name}): ${formatCurrency(a.amount)}`),
        `Total Gross: ${formatCurrency(payslip.totalGrossSalary)}`,
        "",
        "DEDUCTIONS",
        "----------",
        ...(payslip.deductionsDetails?.taxes || []).map((t: any) => `Tax (${t.name}): ${formatCurrency(t.amount)}`),
        ...(payslip.deductionsDetails?.insurances || []).map((i: any) => `Insurance (${i.name}): ${formatCurrency(i.amount)}`),
        `Total Deductions: ${formatCurrency(payslip.totaDeductions)}`,
        "",
        "SUMMARY",
        "-------",
        `NET PAY: ${formatCurrency(payslip.netPay)}`,
        `Status: ${payslip.paymentStatus}`
      ];

      const dataStr = lines.join("\n");
      const dataUri = 'data:text/plain;charset=utf-8,' + encodeURIComponent(dataStr);

      const exportFileDefaultName = `payslip-${payslip.payrollRunId || 'unknown'}-${payslip.employeeId}.txt`;

      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      linkElement.remove();
    } catch (e) {
      console.error("Download failed", e);
      alert("Failed to download payslip");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/subsystems/payroll-tracking"
              className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
            <h1 className="text-3xl font-bold">Pay Slips</h1>
          </div>
        </div>

        {error ? (
          <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-red-400">
            <p className="font-semibold mb-2">Error loading pay slips:</p>
            <p>{error}</p>
            <p className="mt-2 text-sm text-red-300">
              Please log in to view payslips.
            </p>
          </div>
        ) : payslips.length === 0 ? (
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-12 text-center">
            <FileText className="w-16 h-16 mx-auto mb-4 text-slate-400" />
            <h2 className="text-2xl font-semibold mb-2">No Pay Slips Found</h2>
            <p className="text-slate-400 mb-4">
              Once payroll runs are executed, your pay slips will appear here.
            </p>
          </div>
        ) : (
          <div className="bg-slate-900/60 border border-slate-800 rounded-lg overflow-hidden">
            <div className="grid grid-cols-5 gap-4 px-6 py-3 text-sm font-medium text-slate-400 border-b border-slate-800">
              <span>Date</span>
              <span>Payroll Run</span>
              <span>Gross</span>
              <span>Net Pay</span>
              <span className="text-right">Status / Actions</span>
            </div>
            <div className="divide-y divide-slate-800">
              {payslips.map((p) => (
                <div
                  key={p._id || `${p.employeeId}-${p.payrollRunId}`}
                  className="grid grid-cols-5 gap-4 px-6 py-4 text-sm items-center hover:bg-slate-800/60 transition-colors"
                >
                  <span>{formatDate(p.createdAt)}</span>
                  <span className="truncate">
                    {typeof p.payrollRunId === "string"
                      ? p.payrollRunId
                      : (p as any).payrollRunId?._id ||
                      (p as any).payrollRunId?.name ||
                      "-"}
                  </span>
                  <span>{formatCurrency(p.totalGrossSalary)}</span>
                  <span>{formatCurrency(p.netPay)}</span>
                  <span className="flex items-center justify-end gap-3">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-slate-800 border border-slate-700 text-slate-200">
                      {p.paymentStatus || "N/A"}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDownload(p)}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-blue-600 hover:bg-blue-700 text-xs transition-colors"
                    >
                      <Download className="w-3 h-3" />
                      Download
                    </button>
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


