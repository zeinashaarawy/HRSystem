import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  BadgeCheck,
  Clock,
  FileText,
  Gift,
  Loader2,
  Receipt,
  RefreshCw,
  Send,
  UserX,
  Download,
  ChevronLeft,
} from "lucide-react";

import {
  API_BASE_URL,
  getApiErrorMessage,
  isMongoObjectId,
  payrollExecutionApi,
  type CalculatePayrollDto,
  type GenerateDraftPayrollDto,
  type ProcessPayrollRunDto,
  type ReviewPayrollRunDto,
} from "../../../lib/payrollExecutionApi";

type Tab = "payrollRuns" | "signingBonuses" | "terminationBenefits" | "payslips";

type PayrollRun = any;

type SigningBonus = any;

type TerminationBenefit = any;

type Payslip = any;

const BONUS_STATUSES = ["pending", "approved", "paid", "rejected"] as const;
const BENEFIT_STATUSES = ["pending", "approved", "paid", "rejected"] as const;

// Convert month input (YYYY-MM) to local ISO datetime (end of month)
function monthToLocalDateTime(month: string): string | undefined {
  // input type="month" yields YYYY-MM
  if (!month) return undefined;
  const [y, m] = month.split("-").map((v) => Number(v));
  if (!y || !m) return undefined;

  // last day of the month at local midnight (matches backend new Date(year, month, day) style)
  const lastDay = new Date(y, m, 0).getDate();
  const mm = String(m).padStart(2, "0");
  const dd = String(lastDay).padStart(2, "0");
  return `${y}-${mm}-${dd}T00:00:00`;
}

function formatMaybeDate(value: any): string {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleDateString();
}

// Normalize API response to an array (supports direct arrays or { items: [] })
function normalizeArrayResponse<T = any>(data: any): T[] {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.items)) return data.items;
  return [];
}

// Small alert component for error / success / info messages
function PageAlert({
  kind,
  title,
  message,
  onDismiss,
}: {
  kind: "error" | "success" | "info";
  title: string;
  message: string;
  onDismiss?: () => void;
}) {
  const styles =
    kind === "error"
      ? "border-red-500/40 bg-red-500/10 text-red-100"
      : kind === "success"
        ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-50"
        : "border-white/10 bg-white/5 text-gray-100";

  const icon =
    kind === "error" ? (
      <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" />
    ) : kind === "success" ? (
      <BadgeCheck className="w-5 h-5 mt-0.5 flex-shrink-0" />
    ) : (
      <FileText className="w-5 h-5 mt-0.5 flex-shrink-0" />
    );

  return (
    <div className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-sm ${styles}`}>
      {icon}
      <div className="flex-1">
        <p className="font-medium">{title}</p>
        <p className="text-xs mt-1 opacity-90 whitespace-pre-wrap">{message}</p>
      </div>
      {onDismiss && (
        <button onClick={onDismiss} className="text-xs opacity-80 hover:opacity-100">
          Dismiss
        </button>
      )}
    </div>
  );
}

// Reusable card wrapper used across the page
function Card({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-slate-950/70 backdrop-blur-xl p-5 lg:p-6">
      <div className="mb-4">
        <h2 className="text-sm font-medium">{title}</h2>
        {subtitle && <p className="text-[11px] text-gray-400 mt-1">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

export default function PayrollExecution() {
  const [activeTab, setActiveTab] = useState<Tab>("payrollRuns");

  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Shared selection across tabs
  const [activePayrollRunId, setActivePayrollRunId] = useState<string>("");

  // Payroll runs state
  const [payrollRuns, setPayrollRuns] = useState<PayrollRun[]>([]);
  const [selectedPayrollRun, setSelectedPayrollRun] = useState<PayrollRun | null>(null);
  const [payrollRunPreview, setPayrollRunPreview] = useState<any | null>(null);

  const [payrollRunFilters, setPayrollRunFilters] = useState({
    status: "",
    payrollPeriodMonth: "",
  });

  const [draftForm, setDraftForm] = useState({
    entity: "",
    payrollSpecialistId: "",
    payrollPeriodMonth: "",
  });

  const [processRunForm, setProcessRunForm] = useState({
    entity: "",
    payrollSpecialistId: "",
    payrollPeriodMonth: "",
  });

  const [calculateForm, setCalculateForm] = useState({
    entity: "",
    payrollSpecialistId: "",
    payrollPeriodMonth: "",
    payrollRunId: "",
    employeeIdsCsv: "",
    includeAllowances: true,
    includeInsurance: true,
    includeTaxes: true,
  });

  const [reviewForm, setReviewForm] = useState({
    reviewerId: "",
    comment: "",
    rejectionReason: "",
  });

  const [editRunForm, setEditRunForm] = useState({
    authorizedBy: "",
    comment: "",
    totalnetpay: "",
  });

  // Signing bonuses state
  const [signingBonuses, setSigningBonuses] = useState<SigningBonus[]>([]);
  const [selectedSigningBonusId, setSelectedSigningBonusId] = useState<string>("");
  const [signingBonusFilters, setSigningBonusFilters] = useState({
    employeeId: "",
    status: "",
  });
  const [signingBonusApproveForm, setSigningBonusApproveForm] = useState({
    approverId: "",
    comment: "",
    paymentDate: "",
  });
  const [signingBonusOverrideForm, setSigningBonusOverrideForm] = useState({
    authorizedBy: "",
    comment: "",
    paymentDate: "",
    status: "",
  });

  // Termination benefits state
  const [terminationBenefits, setTerminationBenefits] = useState<TerminationBenefit[]>([]);
  const [selectedTerminationBenefitId, setSelectedTerminationBenefitId] = useState<string>("");
  const [terminationBenefitFilters, setTerminationBenefitFilters] = useState({
    employeeId: "",
    status: "",
  });
  const [terminationBenefitApproveForm, setTerminationBenefitApproveForm] = useState({
    approverId: "",
    comment: "",
  });
  const [terminationBenefitOverrideForm, setTerminationBenefitOverrideForm] = useState({
    authorizedBy: "",
    comment: "",
    status: "",
  });

  // Payslips state
  const [payslipsPayrollRunId, setPayslipsPayrollRunId] = useState<string>("");
  const [payslips, setPayslips] = useState<Payslip[]>([]);
  const [selectedPayslipId, setSelectedPayslipId] = useState<string>("");
  const [resendForm, setResendForm] = useState<{ distributionMethod: "email" | "portal" }>(
    {
      distributionMethod: "email",
    },
  );

  const selectedPayrollRunId = useMemo(() => {
    return selectedPayrollRun?.id ?? selectedPayrollRun?._id ?? "";
  }, [selectedPayrollRun]);

  useEffect(() => {
    // keep a single "active" payrollRunId for other tabs
    const id = selectedPayrollRunId;
    if (id && isMongoObjectId(id)) {
      setActivePayrollRunId(id);
      setPayslipsPayrollRunId(id);
      setCalculateForm((p) => ({ ...p, payrollRunId: id }));
    }
  }, [selectedPayrollRunId]);

  // Fetch payroll runs for review with current filters
  async function loadPayrollRuns() {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const payrollPeriod = monthToLocalDateTime(payrollRunFilters.payrollPeriodMonth);
      const data = await payrollExecutionApi.getPayrollRunsForReview({
        status: payrollRunFilters.status || undefined,
        payrollPeriod: payrollPeriod || undefined,
      });
      setPayrollRuns(normalizeArrayResponse(data));
    } catch (e) {
      setError(`Failed to load payroll runs: ${getApiErrorMessage(e)}`);
    } finally {
      setLoading(false);
    }
  }

  async function loadPayrollPreview(payrollRunId: string) {
    if (!isMongoObjectId(payrollRunId)) {
      setError("Payroll run id must be a valid Mongo ObjectId (24 hex chars).");
      return;
    }

    setActionLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const data = await payrollExecutionApi.getPreview(payrollRunId);
      setPayrollRunPreview(data);
    } catch (e) {
      setError(`Failed to load payroll preview: ${getApiErrorMessage(e)}`);
    } finally {
      setActionLoading(false);
    }
  }

  async function onGenerateDraft(e: React.FormEvent) {
    e.preventDefault();

    setActionLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const payload: GenerateDraftPayrollDto = {
        entity: draftForm.entity.trim(),
        payrollSpecialistId: draftForm.payrollSpecialistId.trim() || undefined,
        payrollPeriod: monthToLocalDateTime(draftForm.payrollPeriodMonth),
      };

      await payrollExecutionApi.generateDraftAutomatic(payload);
      setSuccess("Draft payroll generated. Refresh the review list to see it.");
      await loadPayrollRuns();
    } catch (e2) {
      setError(`Failed to generate draft payroll: ${getApiErrorMessage(e2)}`);
    } finally {
      setActionLoading(false);
    }
  }

  async function onProcessAutomatic(e: React.FormEvent) {
    e.preventDefault();

    setActionLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const payrollPeriod = monthToLocalDateTime(processRunForm.payrollPeriodMonth);
      if (!payrollPeriod) {
        setError("Payroll period month is required.");
        return;
      }

      const payload: ProcessPayrollRunDto = {
        entity: processRunForm.entity.trim(),
        payrollSpecialistId: processRunForm.payrollSpecialistId.trim() || undefined,
        payrollPeriod,
      };

      await payrollExecutionApi.processPayrollRunAutomatic(payload);
      setSuccess("Payroll run created (DRAFT). Refresh the review list to see it.");
      await loadPayrollRuns();
    } catch (e2) {
      setError(`Failed to process payroll run: ${getApiErrorMessage(e2)}`);
    } finally {
      setActionLoading(false);
    }
  }

  async function onCalculateAutomatic(e: React.FormEvent) {
    e.preventDefault();

    setActionLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const payrollPeriod = monthToLocalDateTime(calculateForm.payrollPeriodMonth);
      if (!payrollPeriod) {
        setError("Payroll period month is required.");
        return;
      }

      const employeeIds = calculateForm.employeeIdsCsv
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const payrollRunId = calculateForm.payrollRunId.trim() || undefined;
      if (payrollRunId && !isMongoObjectId(payrollRunId)) {
        setError("Payroll run id must be a valid Mongo ObjectId (24 hex chars).");
        return;
      }

      const payload: CalculatePayrollDto = {
        entity: calculateForm.entity.trim(),
        payrollSpecialistId: calculateForm.payrollSpecialistId.trim() || undefined,
        payrollPeriod,
        payrollRunId,
        employeeIds: employeeIds.length ? employeeIds : undefined,
        includeAllowances: calculateForm.includeAllowances,
        includeInsurance: calculateForm.includeInsurance,
        includeTaxes: calculateForm.includeTaxes,
      };

      const updatedRun = await payrollExecutionApi.calculatePayrollAutomatic(payload);
      setSuccess("Payroll calculation completed.");

      // If backend returned a run object, select it.
      if (updatedRun?.id) {
        setSelectedPayrollRun(updatedRun);
      }

      await loadPayrollRuns();
    } catch (e2) {
      setError(`Failed to calculate payroll: ${getApiErrorMessage(e2)}`);
    } finally {
      setActionLoading(false);
    }
  }

  async function onReviewPayrollRun(action: "approve" | "reject") {
    const payrollRunId = selectedPayrollRunId;
    if (!isMongoObjectId(payrollRunId)) {
      setError("Select a payroll run with a valid id first.");
      return;
    }

    setActionLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const payload: ReviewPayrollRunDto = {
        action,
        reviewerId: reviewForm.reviewerId.trim() || undefined,
        comment: reviewForm.comment.trim() || undefined,
        rejectionReason: action === "reject" ? reviewForm.rejectionReason.trim() || undefined : undefined,
      };

      const updatedRun = await payrollExecutionApi.reviewPayrollRun(payrollRunId, payload);
      setSuccess(`Payroll run ${action}d.`);
      setSelectedPayrollRun(updatedRun);
      await loadPayrollRuns();
    } catch (e2) {
      setError(`Failed to ${action} payroll run: ${getApiErrorMessage(e2)}`);
    } finally {
      setActionLoading(false);
    }
  }

  async function onEditPayrollRun() {
    const payrollRunId = selectedPayrollRunId;
    if (!isMongoObjectId(payrollRunId)) {
      setError("Select a payroll run with a valid id first.");
      return;
    }

    // Default to 'Manual_Override' if not specified, to avoid blocking the user
    const authorizedBy = editRunForm.authorizedBy.trim() || "Manual_Override";

    setActionLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const payload: any = {
        authorizedBy,
        comment: editRunForm.comment.trim() || undefined,
        totalnetpay: editRunForm.totalnetpay ? Number(editRunForm.totalnetpay) : undefined,
      };

      const updatedRun = await payrollExecutionApi.editPayrollRun(payrollRunId, payload);
      setSuccess("Payroll run updated.");
      setSelectedPayrollRun(updatedRun);
      await loadPayrollRuns();
    } catch (e2) {
      setError(`Failed to update payroll run: ${getApiErrorMessage(e2)}`);
    } finally {
      setActionLoading(false);
    }
  }

  async function loadSigningBonuses() {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const employeeId = signingBonusFilters.employeeId.trim() || undefined;
      if (employeeId && !isMongoObjectId(employeeId)) {
        setError("Signing bonus filter employeeId must be a Mongo ObjectId (24 hex chars).");
        return;
      }

      const data = await payrollExecutionApi.getProcessedSigningBonuses({
        employeeId,
        status: signingBonusFilters.status || undefined,
      });
      setSigningBonuses(normalizeArrayResponse(data));
    } catch (e) {
      setError(`Failed to load signing bonuses: ${getApiErrorMessage(e)}`);
    } finally {
      setLoading(false);
    }
  }

  async function approveSigningBonus() {
    const id = selectedSigningBonusId;
    if (!isMongoObjectId(id)) {
      setError("Select a signing bonus record with a valid id first.");
      return;
    }

    setActionLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await payrollExecutionApi.approveSigningBonus(id, {
        approverId: signingBonusApproveForm.approverId.trim() || undefined,
        comment: signingBonusApproveForm.comment.trim() || undefined,
        paymentDate: signingBonusApproveForm.paymentDate || undefined,
      });
      setSuccess("Signing bonus approved.");
      await loadSigningBonuses();
    } catch (e) {
      setError(`Failed to approve signing bonus: ${getApiErrorMessage(e)}`);
    } finally {
      setActionLoading(false);
    }
  }

  async function overrideSigningBonus() {
    const id = selectedSigningBonusId;
    if (!isMongoObjectId(id)) {
      setError("Select a signing bonus record with a valid id first.");
      return;
    }

    if (!signingBonusOverrideForm.authorizedBy.trim()) {
      setError("authorizedBy is required for manual override.");
      return;
    }

    setActionLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await payrollExecutionApi.manualOverrideSigningBonus(id, {
        authorizedBy: signingBonusOverrideForm.authorizedBy.trim(),
        comment: signingBonusOverrideForm.comment.trim() || undefined,
        paymentDate: signingBonusOverrideForm.paymentDate || undefined,
        status: signingBonusOverrideForm.status || undefined,
      });
      setSuccess("Signing bonus overridden.");
      await loadSigningBonuses();
    } catch (e) {
      setError(`Failed to override signing bonus: ${getApiErrorMessage(e)}`);
    } finally {
      setActionLoading(false);
    }
  }

  async function loadTerminationBenefits() {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const employeeId = terminationBenefitFilters.employeeId.trim() || undefined;
      if (employeeId && !isMongoObjectId(employeeId)) {
        setError("Termination benefit filter employeeId must be a Mongo ObjectId (24 hex chars).");
        return;
      }

      const data = await payrollExecutionApi.getProcessedTerminationBenefits({
        employeeId,
        status: terminationBenefitFilters.status || undefined,
      });
      setTerminationBenefits(normalizeArrayResponse(data));
    } catch (e) {
      setError(`Failed to load termination benefits: ${getApiErrorMessage(e)}`);
    } finally {
      setLoading(false);
    }
  }

  async function approveTerminationBenefit() {
    const id = selectedTerminationBenefitId;
    if (!isMongoObjectId(id)) {
      setError("Select a termination benefit record with a valid id first.");
      return;
    }

    setActionLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await payrollExecutionApi.approveTerminationBenefit(id, {
        approverId: terminationBenefitApproveForm.approverId.trim() || undefined,
        comment: terminationBenefitApproveForm.comment.trim() || undefined,
      });
      setSuccess("Termination benefit approved.");
      await loadTerminationBenefits();
    } catch (e) {
      setError(`Failed to approve termination benefit: ${getApiErrorMessage(e)}`);
    } finally {
      setActionLoading(false);
    }
  }

  async function overrideTerminationBenefit() {
    const id = selectedTerminationBenefitId;
    if (!isMongoObjectId(id)) {
      setError("Select a termination benefit record with a valid id first.");
      return;
    }

    // Default to 'Manual_Override' if not specified, to avoid blocking the user
    const authorizedBy = terminationBenefitOverrideForm.authorizedBy.trim() || "Manual_Override";

    setActionLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await payrollExecutionApi.manualOverrideTerminationBenefit(id, {
        authorizedBy,
        comment: terminationBenefitOverrideForm.comment.trim() || undefined,
        status: terminationBenefitOverrideForm.status || undefined,
      });
      setSuccess("Termination benefit overridden.");
      await loadTerminationBenefits();
    } catch (e) {
      setError(`Failed to override termination benefit: ${getApiErrorMessage(e)}`);
    } finally {
      setActionLoading(false);
    }
  }

  async function loadPayslips() {
    const payrollRunId = payslipsPayrollRunId.trim();
    if (!isMongoObjectId(payrollRunId)) {
      setError("Payroll run id must be a valid Mongo ObjectId (24 hex chars).");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const data = await payrollExecutionApi.getPayslipsForPayrollRun(payrollRunId);
      setPayslips(normalizeArrayResponse(data));
      setSuccess("Payslips loaded.");
    } catch (e) {
      setError(`Failed to load payslips: ${getApiErrorMessage(e)}`);
    } finally {
      setLoading(false);
    }
  }

  async function generatePayslipsBatch() {
    const payrollRunId = payslipsPayrollRunId.trim();
    if (!isMongoObjectId(payrollRunId)) {
      setError("Payroll run id must be a valid Mongo ObjectId (24 hex chars).");
      return;
    }

    setActionLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await payrollExecutionApi.generatePayslipsBatch(payrollRunId);
      setSuccess("Payslip batch generated. Reload payslips to see results.");
    } catch (e) {
      setError(`Failed to generate payslips batch: ${getApiErrorMessage(e)}`);
    } finally {
      setActionLoading(false);
    }
  }

  async function resendPayslip() {
    const id = selectedPayslipId.trim();
    if (!isMongoObjectId(id)) {
      setError("Select a payslip with a valid id first.");
      return;
    }

    setActionLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await payrollExecutionApi.resendPayslip(id, resendForm);
      setSuccess("Payslip resend requested.");
    } catch (e) {
      setError(`Failed to resend payslip: ${getApiErrorMessage(e)}`);
    } finally {
      setActionLoading(false);
    }
  }

  useEffect(() => {
    // initial load
    loadPayrollRuns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Main UI layout and tabs
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white px-4 py-8 lg:px-8 lg:py-12">
      <div className="max-w-7xl mx-auto space-y-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white mb-4"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </Link>
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-light flex items-center gap-3">
              <Clock className="w-8 h-8 text-blue-400" />
              Payroll Execution
            </h1>
            <p className="text-sm md:text-base text-gray-300 mt-2 max-w-2xl">
              Frontend console for Payroll Runs, Signing Bonuses, Termination Benefits, and Payslips.
              All requests are sent to <span className="text-gray-100">{API_BASE_URL}/payroll-execution</span>.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            {(
              [
                { key: "payrollRuns", label: "Payroll Runs", icon: <FileText className="w-4 h-4" /> },
                { key: "signingBonuses", label: "Signing Bonuses", icon: <Gift className="w-4 h-4" /> },
                { key: "terminationBenefits", label: "Termination Benefits", icon: <UserX className="w-4 h-4" /> },
                { key: "payslips", label: "Payslips", icon: <Receipt className="w-4 h-4" /> },
              ] as const
            ).map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setActiveTab(t.key)}
                className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 transition-all ${activeTab === t.key
                  ? "border-cyan-400 bg-cyan-500/10"
                  : "border-white/10 bg-white/5 hover:bg-white/10"
                  }`}
              >
                {t.icon}
                {t.label}
              </button>
            ))}
          </div>
        </header>

        {error && (
          <PageAlert kind="error" title="Something went wrong" message={error} onDismiss={() => setError(null)} />
        )}
        {success && (
          <PageAlert kind="success" title="Success" message={success} onDismiss={() => setSuccess(null)} />
        )}

        {(loading || actionLoading) && (
          <div className="flex items-center gap-2 text-xs text-gray-300">
            <Loader2 className="w-4 h-4 animate-spin" />
            Working...
          </div>
        )}

        {activeTab === "payrollRuns" && (
          <div className="grid lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-6">
            <div className="space-y-6">
              <Card
                title="Generate Draft Payroll"
                subtitle='POST /payroll-execution/draft/generate-automatic'
              >
                <form onSubmit={onGenerateDraft} className="space-y-3 text-sm">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs text-gray-300">
                        Entity <span className="text-red-400">*</span>
                      </label>
                      <input
                        required
                        value={draftForm.entity}
                        onChange={(e) => setDraftForm((p) => ({ ...p, entity: e.target.value }))}
                        className="w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2"
                        placeholder="e.g. HQ"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-gray-300">Payroll Period (month)</label>
                      <input
                        type="month"
                        value={draftForm.payrollPeriodMonth}
                        onChange={(e) =>
                          setDraftForm((p) => ({ ...p, payrollPeriodMonth: e.target.value }))
                        }
                        className="w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-300">Payroll Specialist ID (optional)</label>
                    <input
                      value={draftForm.payrollSpecialistId}
                      onChange={(e) =>
                        setDraftForm((p) => ({ ...p, payrollSpecialistId: e.target.value }))
                      }
                      className="w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2"
                      placeholder="Mongo ObjectId"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2 text-xs font-medium disabled:opacity-60"
                  >
                    <Send className="w-4 h-4" />
                    Generate Draft
                  </button>
                </form>
              </Card>

              <Card
                title="Process Payroll Run (Automatic)"
                subtitle='POST /payroll-execution/payroll-runs/process-automatic'
              >
                <form onSubmit={onProcessAutomatic} className="space-y-3 text-sm">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs text-gray-300">
                        Entity <span className="text-red-400">*</span>
                      </label>
                      <input
                        required
                        value={processRunForm.entity}
                        onChange={(e) => setProcessRunForm((p) => ({ ...p, entity: e.target.value }))}
                        className="w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2"
                        placeholder="e.g. HQ"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-gray-300">
                        Payroll Period (month) <span className="text-red-400">*</span>
                      </label>
                      <input
                        required
                        type="month"
                        value={processRunForm.payrollPeriodMonth}
                        onChange={(e) =>
                          setProcessRunForm((p) => ({ ...p, payrollPeriodMonth: e.target.value }))
                        }
                        className="w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-300">Payroll Specialist ID (optional)</label>
                    <input
                      value={processRunForm.payrollSpecialistId}
                      onChange={(e) =>
                        setProcessRunForm((p) => ({ ...p, payrollSpecialistId: e.target.value }))
                      }
                      className="w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2"
                      placeholder="Mongo ObjectId"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium hover:bg-blue-500 disabled:opacity-60"
                  >
                    <Send className="w-4 h-4" />
                    Create Run
                  </button>
                </form>
              </Card>

              <Card
                title="Calculate Payroll (Automatic)"
                subtitle='POST /payroll-execution/payroll-runs/calculate-automatic'
              >
                <form onSubmit={onCalculateAutomatic} className="space-y-3 text-sm">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs text-gray-300">
                        Entity <span className="text-red-400">*</span>
                      </label>
                      <input
                        required
                        value={calculateForm.entity}
                        onChange={(e) => setCalculateForm((p) => ({ ...p, entity: e.target.value }))}
                        className="w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2"
                        placeholder="e.g. HQ"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-gray-300">
                        Payroll Period (month) <span className="text-red-400">*</span>
                      </label>
                      <input
                        required
                        type="month"
                        value={calculateForm.payrollPeriodMonth}
                        onChange={(e) =>
                          setCalculateForm((p) => ({ ...p, payrollPeriodMonth: e.target.value }))
                        }
                        className="w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs text-gray-300">Payroll Run ID (optional)</label>
                      <input
                        value={calculateForm.payrollRunId}
                        onChange={(e) => setCalculateForm((p) => ({ ...p, payrollRunId: e.target.value }))}
                        className="w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2"
                        placeholder="Defaults to selected run"
                      />
                      {activePayrollRunId && (
                        <p className="text-[11px] text-gray-400 mt-1">
                          Selected run: <span className="text-gray-200">{activePayrollRunId}</span>
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs text-gray-300">Payroll Specialist ID (optional)</label>
                      <input
                        value={calculateForm.payrollSpecialistId}
                        onChange={(e) =>
                          setCalculateForm((p) => ({ ...p, payrollSpecialistId: e.target.value }))
                        }
                        className="w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2"
                        placeholder="Mongo ObjectId"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-300">Employee IDs (optional, comma-separated)</label>
                    <input
                      value={calculateForm.employeeIdsCsv}
                      onChange={(e) =>
                        setCalculateForm((p) => ({ ...p, employeeIdsCsv: e.target.value }))
                      }
                      className="w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2"
                      placeholder="Leave empty to calculate for all eligible employees"
                    />
                  </div>

                  <div className="flex flex-wrap gap-3 text-[11px] text-gray-300">
                    <label className="inline-flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={calculateForm.includeAllowances}
                        onChange={(e) =>
                          setCalculateForm((p) => ({ ...p, includeAllowances: e.target.checked }))
                        }
                      />
                      Include allowances
                    </label>
                    <label className="inline-flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={calculateForm.includeInsurance}
                        onChange={(e) =>
                          setCalculateForm((p) => ({ ...p, includeInsurance: e.target.checked }))
                        }
                      />
                      Include insurance
                    </label>
                    <label className="inline-flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={calculateForm.includeTaxes}
                        onChange={(e) =>
                          setCalculateForm((p) => ({ ...p, includeTaxes: e.target.checked }))
                        }
                      />
                      Include taxes
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-medium hover:bg-indigo-500 disabled:opacity-60"
                  >
                    <Send className="w-4 h-4" />
                    Calculate Payroll
                  </button>
                </form>
              </Card>

              <Card title="Review List Filters" subtitle='GET /payroll-execution/payroll-runs/review'>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 text-xs">
                  <div className="space-y-1.5">
                    <label className="text-[11px] text-gray-300">Status (optional)</label>
                    <input
                      value={payrollRunFilters.status}
                      onChange={(e) => setPayrollRunFilters((p) => ({ ...p, status: e.target.value }))}
                      className="w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2"
                      placeholder="draft, under review, pending finance approval"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] text-gray-300">Payroll period (month, optional)</label>
                    <input
                      type="month"
                      value={payrollRunFilters.payrollPeriodMonth}
                      onChange={(e) =>
                        setPayrollRunFilters((p) => ({ ...p, payrollPeriodMonth: e.target.value }))
                      }
                      className="w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={loadPayrollRuns}
                  disabled={loading}
                  className="mt-3 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs hover:bg-white/10 disabled:opacity-60"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                  Refresh Review List
                </button>
              </Card>
            </div>

            <div className="space-y-6">
              <Card
                title="Payroll Runs For Review"
                subtitle="Select a run to load preview and take actions. Empty [] means no matching data (not a routing error)."
              >
                {payrollRuns.length === 0 && !loading ? (
                  <div className="rounded-xl border border-dashed border-white/15 bg-slate-900/40 px-3 py-4 text-[11px] text-gray-300">
                    No payroll runs found.
                  </div>
                ) : (
                  <div className="max-h-[22rem] overflow-y-auto space-y-2 pr-1">
                    {payrollRuns.map((run: any) => {
                      const id = run?.id ?? run?._id;
                      const selected = (selectedPayrollRun?.id ?? selectedPayrollRun?._id) === id;

                      return (
                        <button
                          key={id ?? Math.random()}
                          type="button"
                          onClick={() => {
                            setSelectedPayrollRun(run);
                            setPayrollRunPreview(null);
                          }}
                          className={`w-full text-left rounded-xl border px-3 py-2.5 text-xs transition-all ${selected
                            ? "border-cyan-400 bg-cyan-500/10"
                            : "border-white/10 bg-slate-900/40 hover:bg-slate-900/70"
                            }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-medium">
                              {run.runId ?? run.name ?? id ?? "(no id)"}
                            </span>
                            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wide">
                              {run.status ?? "n/a"}
                            </span>
                          </div>
                          <div className="mt-1 text-[10px] text-gray-300 flex flex-wrap gap-2">
                            {run.entity && <span>{run.entity}</span>}
                            {run.payrollPeriod && (
                              <span className="text-gray-400">• {formatMaybeDate(run.payrollPeriod)}</span>
                            )}
                            {typeof run.employees === "number" && (
                              <span className="text-gray-400">• employees: {run.employees}</span>
                            )}
                            {typeof run.exceptions === "number" && (
                              <span className="text-gray-400">• exceptions: {run.exceptions}</span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </Card>

              <Card
                title="Selected Run"
                subtitle="Preview and review actions"
              >
                {!selectedPayrollRunId ? (
                  <div className="rounded-xl border border-dashed border-white/15 bg-slate-900/40 px-3 py-4 text-[11px] text-gray-300">
                    Select a payroll run from the list.
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="rounded-xl border border-white/10 bg-slate-900/60 px-3 py-3 text-[11px] text-gray-200 space-y-1">
                      <div>
                        <span className="text-gray-400">id:</span> {selectedPayrollRunId}
                      </div>
                      <div>
                        <span className="text-gray-400">runId:</span> {selectedPayrollRun?.runId ?? "(n/a)"}
                      </div>
                      <div>
                        <span className="text-gray-400">status:</span> {selectedPayrollRun?.status ?? "(n/a)"}
                      </div>
                      <div>
                        <span className="text-gray-400">payrollPeriod:</span> {formatMaybeDate(selectedPayrollRun?.payrollPeriod)}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => loadPayrollPreview(selectedPayrollRunId)}
                        disabled={actionLoading}
                        className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs hover:bg-white/10 disabled:opacity-60"
                      >
                        <FileText className="w-4 h-4" />
                        Load Preview
                      </button>

                      <button
                        type="button"
                        onClick={() => onReviewPayrollRun("approve")}
                        disabled={actionLoading}
                        className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-medium hover:bg-emerald-500 disabled:opacity-60"
                      >
                        <BadgeCheck className="w-4 h-4" />
                        Approve
                      </button>

                      <button
                        type="button"
                        onClick={() => onReviewPayrollRun("reject")}
                        disabled={actionLoading}
                        className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-xs font-medium hover:bg-red-500 disabled:opacity-60"
                      >
                        <AlertTriangle className="w-4 h-4" />
                        Reject
                      </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 text-xs">
                      <div className="space-y-1.5">
                        <label className="text-[11px] text-gray-300">Reviewer Id (optional)</label>
                        <input
                          value={reviewForm.reviewerId}
                          onChange={(e) => setReviewForm((p) => ({ ...p, reviewerId: e.target.value }))}
                          className="w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2"
                          placeholder="Mongo ObjectId"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] text-gray-300">Comment (optional)</label>
                        <input
                          value={reviewForm.comment}
                          onChange={(e) => setReviewForm((p) => ({ ...p, comment: e.target.value }))}
                          className="w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5 text-xs">
                      <label className="text-[11px] text-gray-300">Rejection Reason (used when rejecting)</label>
                      <input
                        value={reviewForm.rejectionReason}
                        onChange={(e) => setReviewForm((p) => ({ ...p, rejectionReason: e.target.value }))}
                        className="w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2"
                      />
                    </div>

                    <div className="border-t border-white/10 pt-3 mt-3">
                      <p className="text-xs text-gray-200 font-medium mb-2">Edit / Manual Override</p>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 text-xs mb-3">
                        <div className="space-y-1.5">
                          <label className="text-[11px] text-gray-300">Authorized By (required)</label>
                          <input
                            value={editRunForm.authorizedBy}
                            onChange={(e) => setEditRunForm((p) => ({ ...p, authorizedBy: e.target.value }))}
                            className="w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2"
                            placeholder="Specialist ID"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[11px] text-gray-300">Edit Comment</label>
                          <input
                            value={editRunForm.comment}
                            onChange={(e) => setEditRunForm((p) => ({ ...p, comment: e.target.value }))}
                            className="w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2"
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5 text-xs mb-3">
                        <label className="text-[11px] text-gray-300">Override Total Net Pay (optional)</label>
                        <input
                          type="number"
                          value={editRunForm.totalnetpay}
                          onChange={(e) => setEditRunForm((p) => ({ ...p, totalnetpay: e.target.value }))}
                          className="w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2"
                          placeholder="Enter new amount"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={onEditPayrollRun}
                        disabled={actionLoading}
                        className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-medium hover:bg-indigo-500 disabled:opacity-60"
                      >
                        <RefreshCw className="w-4 h-4" />
                        Update
                      </button>
                    </div>


                    <div className="rounded-xl border border-white/10 bg-slate-900/60 p-3">
                      <div className="flex items-center justify-between text-[11px] text-gray-300 mb-2">
                        <span>Preview JSON</span>
                      </div>
                      <pre className="text-[10px] whitespace-pre-wrap text-gray-200/90 max-h-64 overflow-y-auto">
                        {payrollRunPreview ? JSON.stringify(payrollRunPreview, null, 2) : "(no preview loaded)"}
                      </pre>
                    </div>
                  </div>
                )}
              </Card>
            </div>
          </div>
        )}

        {activeTab === "signingBonuses" && (
          <div className="grid lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-6">
            <div className="space-y-6">
              <Card
                title="Processed Signing Bonuses"
                subtitle='GET /payroll-execution/signing-bonuses/processed'
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 text-xs">
                  <div className="space-y-1.5">
                    <label className="text-[11px] text-gray-300">Employee Id (optional)</label>
                    <input
                      value={signingBonusFilters.employeeId}
                      onChange={(e) =>
                        setSigningBonusFilters((p) => ({ ...p, employeeId: e.target.value }))
                      }
                      className="w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2"
                      placeholder="Mongo ObjectId"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] text-gray-300">Status (optional)</label>
                    <select
                      value={signingBonusFilters.status}
                      onChange={(e) =>
                        setSigningBonusFilters((p) => ({ ...p, status: e.target.value }))
                      }
                      className="w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2"
                    >
                      <option value="">(any)</option>
                      {BONUS_STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={loadSigningBonuses}
                  disabled={loading}
                  className="mt-3 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs hover:bg-white/10 disabled:opacity-60"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                  Load Signing Bonuses
                </button>

                <p className="mt-3 text-[11px] text-gray-400">
                  Note: This endpoint intentionally returns <code>[]</code> when there is no seeded data.
                </p>
              </Card>

              <Card title="Selected Signing Bonus Actions">
                <div className="space-y-2 text-xs">
                  <label className="text-[11px] text-gray-300">Selected record id</label>
                  <input
                    value={selectedSigningBonusId}
                    onChange={(e) => setSelectedSigningBonusId(e.target.value)}
                    className="w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2"
                    placeholder="Pick from list (or paste id)"
                  />
                </div>

                <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-xs text-gray-200 font-medium">Approve</p>
                    <p className="text-[11px] text-gray-400">
                      POST /signing-bonuses/:id/approve
                    </p>

                    <input
                      value={signingBonusApproveForm.approverId}
                      onChange={(e) =>
                        setSigningBonusApproveForm((p) => ({ ...p, approverId: e.target.value }))
                      }
                      className="w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2 text-xs"
                      placeholder="approverId (optional)"
                    />
                    <input
                      value={signingBonusApproveForm.comment}
                      onChange={(e) =>
                        setSigningBonusApproveForm((p) => ({ ...p, comment: e.target.value }))
                      }
                      className="w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2 text-xs"
                      placeholder="comment (optional)"
                    />
                    <input
                      type="datetime-local"
                      value={signingBonusApproveForm.paymentDate}
                      onChange={(e) =>
                        setSigningBonusApproveForm((p) => ({ ...p, paymentDate: e.target.value }))
                      }
                      className="w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2 text-xs"
                      placeholder="paymentDate (optional)"
                    />

                    <button
                      type="button"
                      onClick={approveSigningBonus}
                      disabled={actionLoading}
                      className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-medium hover:bg-emerald-500 disabled:opacity-60"
                    >
                      <BadgeCheck className="w-4 h-4" />
                      Approve
                    </button>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs text-gray-200 font-medium">Manual Override</p>
                    <p className="text-[11px] text-gray-400">
                      PATCH /signing-bonuses/:id/manual-override
                    </p>

                    <input
                      value={signingBonusOverrideForm.authorizedBy}
                      onChange={(e) =>
                        setSigningBonusOverrideForm((p) => ({ ...p, authorizedBy: e.target.value }))
                      }
                      className="w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2 text-xs"
                      placeholder="authorizedBy (required)"
                    />
                    <input
                      value={signingBonusOverrideForm.comment}
                      onChange={(e) =>
                        setSigningBonusOverrideForm((p) => ({ ...p, comment: e.target.value }))
                      }
                      className="w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2 text-xs"
                      placeholder="comment (optional)"
                    />
                    <input
                      type="datetime-local"
                      value={signingBonusOverrideForm.paymentDate}
                      onChange={(e) =>
                        setSigningBonusOverrideForm((p) => ({ ...p, paymentDate: e.target.value }))
                      }
                      className="w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2 text-xs"
                      placeholder="paymentDate (optional)"
                    />
                    <select
                      value={signingBonusOverrideForm.status}
                      onChange={(e) =>
                        setSigningBonusOverrideForm((p) => ({ ...p, status: e.target.value }))
                      }
                      className="w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2 text-xs"
                    >
                      <option value="">(no status change)</option>
                      {BONUS_STATUSES.filter((s) => s !== "approved").map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>

                    <button
                      type="button"
                      onClick={overrideSigningBonus}
                      disabled={actionLoading}
                      className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-medium hover:bg-indigo-500 disabled:opacity-60"
                    >
                      <Send className="w-4 h-4" />
                      Apply Override
                    </button>
                  </div>
                </div>
              </Card>
            </div>

            <div className="space-y-6">
              <Card
                title="Signing Bonus Records"
                subtitle="Click a row to select. If you see empty [], seed data first."
              >
                {signingBonuses.length === 0 && !loading ? (
                  <div className="rounded-xl border border-dashed border-white/15 bg-slate-900/40 px-3 py-4 text-[11px] text-gray-300">
                    No signing bonuses.
                  </div>
                ) : (
                  <div className="max-h-[34rem] overflow-y-auto space-y-2 pr-1">
                    {signingBonuses.map((b: any) => (
                      <button
                        key={b.id ?? b._id ?? Math.random()}
                        type="button"
                        onClick={() => setSelectedSigningBonusId(b.id ?? b._id ?? "")}
                        className={`w-full text-left rounded-xl border px-3 py-2.5 text-xs transition-all ${selectedSigningBonusId === (b.id ?? b._id)
                          ? "border-cyan-400 bg-cyan-500/10"
                          : "border-white/10 bg-slate-900/40 hover:bg-slate-900/70"
                          }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-medium">{b.employeeName ?? b.employeeId ?? "Employee"}</span>
                          <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wide">
                            {b.status ?? "n/a"}
                          </span>
                        </div>
                        <div className="mt-1 text-[10px] text-gray-300 flex flex-wrap gap-2">
                          <span className="text-gray-400">id:</span> {b.id ?? b._id}
                          {b.paymentDate && <span className="text-gray-400">• {formatMaybeDate(b.paymentDate)}</span>}
                          {typeof b.signingBonusAmount === "number" && (
                            <span className="text-gray-400">• amount: {b.signingBonusAmount}</span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </Card>
            </div>
          </div>
        )}

        {activeTab === "terminationBenefits" && (
          <div className="grid lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-6">
            <div className="space-y-6">
              <Card
                title="Processed Termination Benefits"
                subtitle='GET /payroll-execution/termination-benefits/processed'
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 text-xs">
                  <div className="space-y-1.5">
                    <label className="text-[11px] text-gray-300">Employee Id (optional)</label>
                    <input
                      value={terminationBenefitFilters.employeeId}
                      onChange={(e) =>
                        setTerminationBenefitFilters((p) => ({ ...p, employeeId: e.target.value }))
                      }
                      className="w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2"
                      placeholder="Mongo ObjectId"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] text-gray-300">Status (optional)</label>
                    <select
                      value={terminationBenefitFilters.status}
                      onChange={(e) =>
                        setTerminationBenefitFilters((p) => ({ ...p, status: e.target.value }))
                      }
                      className="w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2"
                    >
                      <option value="">(any)</option>
                      {BENEFIT_STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={loadTerminationBenefits}
                  disabled={loading}
                  className="mt-3 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs hover:bg-white/10 disabled:opacity-60"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                  Load Termination Benefits
                </button>
              </Card>

              <Card title="Selected Termination Benefit Actions">
                <div className="space-y-2 text-xs">
                  <label className="text-[11px] text-gray-300">Selected record id</label>
                  <input
                    value={selectedTerminationBenefitId}
                    onChange={(e) => setSelectedTerminationBenefitId(e.target.value)}
                    className="w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2"
                    placeholder="Pick from list (or paste id)"
                  />
                </div>

                <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-xs text-gray-200 font-medium">Approve</p>
                    <p className="text-[11px] text-gray-400">POST /termination-benefits/:id/approve</p>

                    <input
                      value={terminationBenefitApproveForm.approverId}
                      onChange={(e) =>
                        setTerminationBenefitApproveForm((p) => ({ ...p, approverId: e.target.value }))
                      }
                      className="w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2 text-xs"
                      placeholder="approverId (optional)"
                    />
                    <input
                      value={terminationBenefitApproveForm.comment}
                      onChange={(e) =>
                        setTerminationBenefitApproveForm((p) => ({ ...p, comment: e.target.value }))
                      }
                      className="w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2 text-xs"
                      placeholder="comment (optional)"
                    />

                    <button
                      type="button"
                      onClick={approveTerminationBenefit}
                      disabled={actionLoading}
                      className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-medium hover:bg-emerald-500 disabled:opacity-60"
                    >
                      <BadgeCheck className="w-4 h-4" />
                      Approve
                    </button>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs text-gray-200 font-medium">Manual Override</p>
                    <p className="text-[11px] text-gray-400">PATCH /termination-benefits/:id/manual-override</p>

                    <input
                      value={terminationBenefitOverrideForm.authorizedBy}
                      onChange={(e) =>
                        setTerminationBenefitOverrideForm((p) => ({ ...p, authorizedBy: e.target.value }))
                      }
                      className="w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2 text-xs"
                      placeholder="authorizedBy (required)"
                    />
                    <input
                      value={terminationBenefitOverrideForm.comment}
                      onChange={(e) =>
                        setTerminationBenefitOverrideForm((p) => ({ ...p, comment: e.target.value }))
                      }
                      className="w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2 text-xs"
                      placeholder="comment (optional)"
                    />
                    <select
                      value={terminationBenefitOverrideForm.status}
                      onChange={(e) =>
                        setTerminationBenefitOverrideForm((p) => ({ ...p, status: e.target.value }))
                      }
                      className="w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2 text-xs"
                    >
                      <option value="">(no status change)</option>
                      {BENEFIT_STATUSES.filter((s) => s !== "approved").map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>

                    <button
                      type="button"
                      onClick={overrideTerminationBenefit}
                      disabled={actionLoading}
                      className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-medium hover:bg-indigo-500 disabled:opacity-60"
                    >
                      <Send className="w-4 h-4" />
                      Apply Override
                    </button>
                  </div>
                </div>
              </Card>
            </div>

            <div className="space-y-6">
              <Card title="Termination Benefit Records" subtitle="Click a row to select.">
                {terminationBenefits.length === 0 && !loading ? (
                  <div className="rounded-xl border border-dashed border-white/15 bg-slate-900/40 px-3 py-4 text-[11px] text-gray-300">
                    No termination benefits.
                  </div>
                ) : (
                  <div className="max-h-[34rem] overflow-y-auto space-y-2 pr-1">
                    {terminationBenefits.map((b: any) => (
                      <button
                        key={b.id ?? b._id ?? Math.random()}
                        type="button"
                        onClick={() => setSelectedTerminationBenefitId(b.id ?? b._id ?? "")}
                        className={`w-full text-left rounded-xl border px-3 py-2.5 text-xs transition-all ${selectedTerminationBenefitId === (b.id ?? b._id)
                          ? "border-cyan-400 bg-cyan-500/10"
                          : "border-white/10 bg-slate-900/40 hover:bg-slate-900/70"
                          }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-medium">{b.employeeName ?? b.employeeId ?? "Employee"}</span>
                          <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wide">
                            {b.status ?? "n/a"}
                          </span>
                        </div>
                        <div className="mt-1 text-[10px] text-gray-300 flex flex-wrap gap-2">
                          <span className="text-gray-400">id:</span> {b.id ?? b._id}
                          {b.benefitName && <span className="text-gray-400">• {b.benefitName}</span>}
                          {typeof b.benefitAmount === "number" && (
                            <span className="text-gray-400">• amount: {b.benefitAmount}</span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </Card>
            </div>
          </div>
        )}

        {activeTab === "payslips" && (
          <div className="grid lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-6">
            <div className="space-y-6">
              <Card
                title="Payslips For Payroll Run"
                subtitle='GET /payroll-execution/payslips/payroll-run/:payrollRunId'
              >
                <div className="space-y-1.5 text-xs">
                  <label className="text-[11px] text-gray-300">Payroll run id</label>
                  <input
                    value={payslipsPayrollRunId}
                    onChange={(e) => setPayslipsPayrollRunId(e.target.value)}
                    className="w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2"
                    placeholder="Mongo ObjectId"
                  />
                  {activePayrollRunId && (
                    <p className="text-[11px] text-gray-400 mt-1">
                      Active run from Payroll Runs tab: <span className="text-gray-200">{activePayrollRunId}</span>
                    </p>
                  )}
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={loadPayslips}
                    disabled={loading}
                    className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs hover:bg-white/10 disabled:opacity-60"
                  >
                    <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                    Load Payslips
                  </button>
                  <button
                    type="button"
                    onClick={generatePayslipsBatch}
                    disabled={actionLoading}
                    className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-medium hover:bg-emerald-500 disabled:opacity-60"
                  >
                    <Send className="w-4 h-4" />
                    Generate Batch
                  </button>
                </div>

                <p className="mt-3 text-[11px] text-gray-400">
                  Note: Batch generation requires the payroll run status to be <code>approved</code>.
                </p>
              </Card>

              <Card title="Payslip Actions" subtitle="Download / resend">
                <div className="space-y-2 text-xs">
                  <label className="text-[11px] text-gray-300">Selected payslip id</label>
                  <input
                    value={selectedPayslipId}
                    onChange={(e) => setSelectedPayslipId(e.target.value)}
                    className="w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2"
                    placeholder="Pick from list (or paste id)"
                  />
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    disabled={!selectedPayslipId || !isMongoObjectId(selectedPayslipId)}
                    onClick={() => {
                      const id = selectedPayslipId.trim();
                      if (!isMongoObjectId(id)) {
                        setError("Payslip id must be a Mongo ObjectId (24 hex chars).");
                        return;
                      }
                      window.open(
                        `${API_BASE_URL}/payroll-execution/payslips/${id}/download`,
                        "_blank",
                        "noopener,noreferrer",
                      );
                    }}
                    className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs hover:bg-white/10 disabled:opacity-60"
                  >
                    <Download className="w-4 h-4" />
                    Download PDF
                  </button>

                  <div className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs">
                    <span className="text-gray-300">Resend via</span>
                    <select
                      value={resendForm.distributionMethod}
                      onChange={(e) =>
                        setResendForm({
                          distributionMethod: e.target.value as "email" | "portal",
                        })
                      }
                      className="rounded bg-slate-900/60 border border-white/10 px-2 py-1"
                    >
                      <option value="email">email</option>
                      <option value="portal">portal</option>
                    </select>
                    <button
                      type="button"
                      onClick={resendPayslip}
                      disabled={actionLoading}
                      className="inline-flex items-center gap-2 rounded bg-indigo-600 px-3 py-1.5 text-[11px] font-medium hover:bg-indigo-500 disabled:opacity-60"
                    >
                      <Send className="w-3 h-3" />
                      Resend
                    </button>
                  </div>
                </div>
              </Card>
            </div>

            <div className="space-y-6">
              <Card title="Payslips" subtitle="Click a row to select.">
                {payslips.length === 0 && !loading ? (
                  <div className="rounded-xl border border-dashed border-white/15 bg-slate-900/40 px-3 py-4 text-[11px] text-gray-300">
                    No payslips.
                  </div>
                ) : (
                  <div className="max-h-[40rem] overflow-y-auto space-y-2 pr-1">
                    {payslips.map((p: any) => {
                      const id = p._id ?? p.id;
                      const employee = p.employeeId?.fullName ?? p.employeeId?.employeeNumber ?? p.employeeId ?? "Employee";

                      return (
                        <button
                          key={id ?? Math.random()}
                          type="button"
                          onClick={() => setSelectedPayslipId(id ?? "")}
                          className={`w-full text-left rounded-xl border px-3 py-2.5 text-xs transition-all ${selectedPayslipId === id
                            ? "border-cyan-400 bg-cyan-500/10"
                            : "border-white/10 bg-slate-900/40 hover:bg-slate-900/70"
                            }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-medium">{employee}</span>
                            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wide">
                              {p.paymentStatus ?? p.status ?? "n/a"}
                            </span>
                          </div>
                          <div className="mt-1 text-[10px] text-gray-300 flex flex-wrap gap-2">
                            <span className="text-gray-400">id:</span> {id}
                            {typeof p.netPay === "number" && (
                              <span className="text-gray-400">• netPay: {p.netPay}</span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
