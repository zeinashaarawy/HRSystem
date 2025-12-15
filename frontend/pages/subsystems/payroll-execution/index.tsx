import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  Loader2,
  RefreshCw,
  Send,
  ShieldCheck,
  TrendingUp,
  XCircle,
} from "lucide-react";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3001";

type PayrollRun = any;
type Payslip = any;

type DraftFormState = {
  entity: string;
  payrollSpecialistId?: string;
  payrollPeriod?: string;
};

type ReviewFilterState = {
  status?: string;
  payrollPeriod?: string;
};

export default function PayrollExecution() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [draftForm, setDraftForm] = useState<DraftFormState>({
    entity: "",
    payrollSpecialistId: "",
    payrollPeriod: "",
  });

  const [reviewFilters, setReviewFilters] = useState<ReviewFilterState>({
    status: "",
    payrollPeriod: "",
  });

  const [payrollRuns, setPayrollRuns] = useState<PayrollRun[]>([]);
  const [selectedRun, setSelectedRun] = useState<PayrollRun | null>(null);
  const [previewData, setPreviewData] = useState<any | null>(null);
  const [payslips, setPayslips] = useState<Payslip[]>([]);

  const [secondaryLoading, setSecondaryLoading] = useState(false);

  const api = axios.create({
    baseURL: `${API_BASE_URL}/payroll-execution`,
  });

  const handleError = (e: unknown, friendlyMessage: string) => {
    console.error(e);
    if (axios.isAxiosError(e)) {
      const backendMessage =
        e.response?.data?.message || e.response?.data?.error;
      setError(
        backendMessage
          ? `${friendlyMessage}: ${backendMessage}`
          : friendlyMessage
      );
    } else if (e instanceof Error) {
      setError(`${friendlyMessage}: ${e.message}`);
    } else {
      setError(friendlyMessage);
    }
  };

  const fetchPayrollRunsForReview = async () => {
    setLoading(true);
    setError(null);
    try {
      const params: Record<string, string> = {};
      if (reviewFilters.status) params.status = reviewFilters.status;
      if (reviewFilters.payrollPeriod)
        params.payrollPeriod = reviewFilters.payrollPeriod;

      const { data } = await api.get("/payroll-runs/review", { params });
      setPayrollRuns(Array.isArray(data) ? data : data?.items ?? []);
    } catch (e) {
      handleError(e, "Failed to load payroll runs for review");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial load of payroll runs
    fetchPayrollRunsForReview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGenerateDraft = async (e: React.FormEvent) => {
    e.preventDefault();
    setSecondaryLoading(true);
    setError(null);
    try {
      const payload: DraftFormState = {
        entity: draftForm.entity,
      };
      if (draftForm.payrollSpecialistId) {
        payload.payrollSpecialistId = draftForm.payrollSpecialistId;
      }
      if (draftForm.payrollPeriod) {
        payload.payrollPeriod = draftForm.payrollPeriod;
      }

      const { data } = await api.post("/draft/generate-automatic", payload);
      // If backend returns the created run, optimistically add it
      if (data) {
        setPayrollRuns((prev) => [data, ...prev]);
      }
    } catch (e) {
      handleError(e, "Failed to generate draft payroll");
    } finally {
      setSecondaryLoading(false);
    }
  };

  const loadPreviewDashboard = async (payrollRunId: string) => {
    setSecondaryLoading(true);
    setError(null);
    try {
      const { data } = await api.get(`/preview/${payrollRunId}`);
      setPreviewData(data);
    } catch (e) {
      handleError(e, "Failed to load payroll preview");
    } finally {
      setSecondaryLoading(false);
    }
  };

  const loadPayslipsForRun = async (payrollRunId: string) => {
    setSecondaryLoading(true);
    setError(null);
    try {
      const { data } = await api.get(`/payslips/payroll-run/${payrollRunId}`);
      setPayslips(Array.isArray(data) ? data : data?.items ?? []);
    } catch (e) {
      handleError(e, "Failed to load payslips for payroll run");
    } finally {
      setSecondaryLoading(false);
    }
  };

  const simpleAction = async (
    path: string,
    friendlyMessage: string,
    body?: any
  ) => {
    setSecondaryLoading(true);
    setError(null);
    try {
      await api.post(path, body ?? {});
      await fetchPayrollRunsForReview();
    } catch (e) {
      handleError(e, friendlyMessage);
    } finally {
      setSecondaryLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white px-4 py-8 lg:px-8 lg:py-12">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-light flex items-center gap-3">
              <Clock className="w-8 h-8 text-blue-400" />
              Payroll Execution
            </h1>
            <p className="text-sm md:text-base text-gray-300 mt-2 max-w-xl">
              Generate draft payrolls, review runs, trigger approvals, and
              manage payslip generation — all in one streamlined workspace.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs md:text-sm text-gray-300">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <span>Execution Status Console</span>
          </div>
        </header>

        {error && (
          <div className="flex items-start gap-3 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-100">
            <XCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-medium">Something went wrong</p>
              <p className="text-xs mt-1 opacity-90">{error}</p>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-xs text-red-200 hover:text-red-50"
            >
              Dismiss
            </button>
          </div>
        )}

        <div className="grid lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-6">
          {/* Left column: Draft generation + filters */}
          <div className="space-y-6">
            <section className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 lg:p-6">
              <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-blue-600/20 via-cyan-500/10 to-transparent blur-3xl" />
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-blue-600/20 border border-blue-400/40">
                  <Calendar className="w-5 h-5 text-blue-300" />
                </div>
                <div>
                  <h2 className="text-lg font-medium">
                    Generate Draft Payroll
                  </h2>
                  <p className="text-xs text-gray-300 mt-0.5">
                    Create a draft payroll run for a specific entity and period.
                  </p>
                </div>
              </div>

              <form
                onSubmit={handleGenerateDraft}
                className="space-y-3 text-sm"
              >
                <div className="space-y-1.5">
                  <label className="text-xs text-gray-300">
                    Entity <span className="text-red-400">*</span>
                  </label>
                  <input
                    required
                    value={draftForm.entity}
                    onChange={(e) =>
                      setDraftForm((prev) => ({
                        ...prev,
                        entity: e.target.value,
                      }))
                    }
                    placeholder="e.g. HQ, Factory, Branch-01"
                    className="w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-300">
                      Payroll Specialist ID
                    </label>
                    <input
                      value={draftForm.payrollSpecialistId ?? ""}
                      onChange={(e) =>
                        setDraftForm((prev) => ({
                          ...prev,
                          payrollSpecialistId: e.target.value,
                        }))
                      }
                      placeholder="Optional"
                      className="w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-300">
                      Payroll Period
                    </label>
                    <input
                      value={draftForm.payrollPeriod ?? ""}
                      onChange={(e) =>
                        setDraftForm((prev) => ({
                          ...prev,
                          payrollPeriod: e.target.value,
                        }))
                      }
                      placeholder="e.g. 2025-12 or 2025-Q4"
                      className="w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <p className="text-[11px] text-gray-400 max-w-xs">
                    A draft run will be created and appear in the review list
                    below for validation and approvals.
                  </p>
                  <button
                    type="submit"
                    disabled={secondaryLoading || !draftForm.entity.trim()}
                    className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2 text-xs font-medium shadow-lg shadow-blue-900/40 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {secondaryLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4" />
                    )}
                    Generate Draft
                  </button>
                </div>
              </form>
            </section>

            <section className="rounded-2xl border border-white/10 bg-slate-950/60 backdrop-blur-xl p-5 lg:p-6">
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-cyan-300" />
                  <h2 className="text-sm font-medium">Review Filters</h2>
                </div>
                <button
                  type="button"
                  onClick={fetchPayrollRunsForReview}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-[11px] text-gray-200 hover:bg-white/10"
                >
                  <RefreshCw
                    className={`w-3 h-3 ${
                      loading ? "animate-spin text-cyan-300" : ""
                    }`}
                  />
                  Refresh
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 text-xs">
                <div className="space-y-1.5">
                  <label className="text-[11px] text-gray-300">
                    Status (optional)
                  </label>
                  <input
                    value={reviewFilters.status ?? ""}
                    onChange={(e) =>
                      setReviewFilters((prev) => ({
                        ...prev,
                        status: e.target.value,
                      }))
                    }
                    placeholder="e.g. draft, in-review, approved"
                    className="w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] text-gray-300">
                    Payroll Period (optional)
                  </label>
                  <input
                    value={reviewFilters.payrollPeriod ?? ""}
                    onChange={(e) =>
                      setReviewFilters((prev) => ({
                        ...prev,
                        payrollPeriod: e.target.value,
                      }))
                    }
                    placeholder="e.g. 2025-12"
                    className="w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  />
                </div>
              </div>

              <p className="mt-3 text-[11px] text-gray-400">
                Filters are applied when you refresh the review list.
              </p>
            </section>
          </div>

          {/* Right column: Runs list + details */}
          <section className="rounded-2xl border border-white/10 bg-slate-950/70 backdrop-blur-xl p-5 lg:p-6 space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-300" />
                <div>
                  <h2 className="text-sm font-medium">
                    Payroll Runs for Review
                  </h2>
                  <p className="text-[11px] text-gray-400">
                    Select a run to see preview data and available actions.
                  </p>
                </div>
              </div>
              {loading && (
                <div className="flex items-center gap-1.5 text-[11px] text-gray-300">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Loading
                </div>
              )}
            </div>

            <div className="grid lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1.6fr)] gap-4">
              <div className="space-y-2">
                <div className="max-h-72 overflow-y-auto pr-1 space-y-2">
                  {payrollRuns.length === 0 && !loading && (
                    <div className="rounded-xl border border-dashed border-white/15 bg-slate-900/40 px-3 py-4 text-[11px] text-gray-300">
                      No payroll runs found. Generate a draft or adjust the
                      filters, then refresh.
                    </div>
                  )}

                  {payrollRuns.map((run: any) => {
                    const isSelected = selectedRun && selectedRun.id === run.id;

                    return (
                      <button
                        key={run.id ?? run._id ?? Math.random()}
                        type="button"
                        onClick={() => {
                          setSelectedRun(run);
                          setPreviewData(null);
                          setPayslips([]);
                          if (run.id || run._id) {
                            const id = run.id ?? run._id;
                            loadPreviewDashboard(id);
                            loadPayslipsForRun(id);
                          }
                        }}
                        className={`w-full text-left rounded-xl border px-3 py-2.5 text-xs transition-all ${
                          isSelected
                            ? "border-cyan-400 bg-cyan-500/10 shadow-lg shadow-cyan-900/40"
                            : "border-white/10 bg-slate-900/40 hover:border-cyan-400/60 hover:bg-slate-900/80"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-medium">
                            {run.name ?? run.label ?? `Run ${run.id ?? ""}`}
                          </span>
                          <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wide">
                            {run.status ?? "N/A"}
                          </span>
                        </div>
                        <div className="mt-1 flex flex-wrap items-center gap-2 text-[10px] text-gray-300">
                          {run.payrollPeriod && (
                            <span>{run.payrollPeriod}</span>
                          )}
                          {run.entity && (
                            <span className="text-gray-400">
                              • {run.entity}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3 text-xs">
                {!selectedRun && (
                  <div className="rounded-xl border border-dashed border-white/15 bg-slate-900/40 px-3 py-4 text-[11px] text-gray-300">
                    Select a payroll run on the left to view preview data,
                    available actions, and generated payslips.
                  </div>
                )}

                {selectedRun && (
                  <>
                    <div className="rounded-xl border border-white/10 bg-slate-900/60 px-3 py-3 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-blue-300" />
                          <span className="font-medium">
                            {selectedRun.name ??
                              selectedRun.label ??
                              `Run ${selectedRun.id ?? ""}`}
                          </span>
                        </div>
                        <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wide">
                          {selectedRun.status ?? "N/A"}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-300 mt-1">
                        {selectedRun.payrollPeriod && (
                          <div>
                            <span className="text-gray-400 block">
                              Payroll Period
                            </span>
                            <span>{selectedRun.payrollPeriod}</span>
                          </div>
                        )}
                        {selectedRun.entity && (
                          <div>
                            <span className="text-gray-400 block">Entity</span>
                            <span>{selectedRun.entity}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        disabled={secondaryLoading}
                        onClick={() =>
                          simpleAction(
                            `/payroll-runs/${selectedRun.id}/send-for-manager-approval`,
                            "Failed to send for manager approval"
                          )
                        }
                        className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-blue-600/90 px-2.5 py-2 text-[11px] font-medium hover:bg-blue-500 disabled:opacity-60"
                      >
                        <Send className="w-3 h-3" />
                        Manager Approval
                      </button>

                      <button
                        type="button"
                        disabled={secondaryLoading}
                        onClick={() =>
                          simpleAction(
                            `/payroll-runs/${selectedRun.id}/send-for-finance-approval`,
                            "Failed to send for finance approval"
                          )
                        }
                        className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-indigo-600/90 px-2.5 py-2 text-[11px] font-medium hover:bg-indigo-500 disabled:opacity-60"
                      >
                        <ShieldCheck className="w-3 h-3" />
                        Finance Approval
                      </button>

                      <button
                        type="button"
                        disabled={secondaryLoading}
                        onClick={() =>
                          simpleAction(
                            `/payroll-runs/${selectedRun.id}/final-approval`,
                            "Failed to perform final approval"
                          )
                        }
                        className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-emerald-600/90 px-2.5 py-2 text-[11px] font-medium hover:bg-emerald-500 disabled:opacity-60"
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        Final Approval
                      </button>

                      <button
                        type="button"
                        disabled={secondaryLoading}
                        onClick={() =>
                          simpleAction(
                            `/payroll-runs/${selectedRun.id}/lock`,
                            "Failed to lock payroll",
                            {
                              payrollManagerId: "",
                              comment: "Lock from UI",
                            }
                          )
                        }
                        className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-red-600/90 px-2.5 py-2 text-[11px] font-medium hover:bg-red-500 disabled:opacity-60"
                      >
                        <FileText className="w-3 h-3" />
                        Lock Run
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        disabled={secondaryLoading}
                        onClick={() =>
                          simpleAction(
                            `/payroll-runs/${selectedRun.id}/unlock`,
                            "Failed to unlock payroll",
                            {
                              payrollManagerId: "",
                              unlockReason: "Unlock from UI",
                            }
                          )
                        }
                        className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-white/15 bg-slate-900/80 px-2.5 py-2 text-[11px] font-medium hover:bg-slate-800 disabled:opacity-60"
                      >
                        <RefreshCw className="w-3 h-3" />
                        Unlock
                      </button>

                      <button
                        type="button"
                        disabled={secondaryLoading}
                        onClick={() =>
                          simpleAction(
                            `/payslips/generate-batch/${selectedRun.id}`,
                            "Failed to generate payslips for run"
                          )
                        }
                        className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-2 text-[11px] font-medium text-emerald-100 hover:bg-emerald-500/20 disabled:opacity-60"
                      >
                        <FileText className="w-3 h-3" />
                        Generate Payslips
                      </button>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-slate-900/60 p-3 space-y-2 max-h-40 overflow-y-auto">
                      <div className="flex items-center justify-between text-[11px] text-gray-300">
                        <span>Preview Snapshot</span>
                        {secondaryLoading && (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        )}
                      </div>
                      <pre className="text-[10px] whitespace-pre-wrap text-gray-200/90 max-h-28 overflow-y-auto">
                        {previewData
                          ? JSON.stringify(previewData, null, 2)
                          : "Preview data will appear here once loaded from the backend."}
                      </pre>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-slate-900/60 p-3 space-y-2 max-h-40 overflow-y-auto">
                      <div className="flex items-center justify-between text-[11px] text-gray-300">
                        <span>Generated Payslips</span>
                      </div>
                      {payslips.length === 0 ? (
                        <p className="text-[10px] text-gray-400">
                          No payslips loaded yet for this payroll run.
                        </p>
                      ) : (
                        <ul className="space-y-1 text-[10px] text-gray-200/90">
                          {payslips.map((p: any) => (
                            <li
                              key={p.id ?? p._id ?? Math.random()}
                              className="flex items-center justify-between gap-2 rounded-lg bg-slate-950/80 px-2 py-1"
                            >
                              <span className="truncate">
                                {p.employeeName ?? p.employeeId ?? "Employee"}
                              </span>
                              <span className="text-gray-400">
                                {p.status ?? "generated"}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
