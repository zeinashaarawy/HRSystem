import axios, { AxiosError } from "axios";

// Use relative path in browser to leverage Next.js proxy, full URL server-side
const getApiBaseUrl = () => {
  if (typeof window !== "undefined") {
    return "/api/v1";
  }
  return process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api/v1";
};

const API_BASE_URL = getApiBaseUrl();

const client = axios.create({
  baseURL: `${API_BASE_URL}/payroll-execution`,
});

export function isMongoObjectId(value: string): boolean {
  return /^[a-fA-F0-9]{24}$/.test(value);
}

export function getApiErrorMessage(err: unknown): string {
  if (!err) return "Unknown error";

  if (axios.isAxiosError(err)) {
    const axErr = err as AxiosError<any>;
    const data = axErr.response?.data;

    // Nest can return: { message: string | string[], error: string, statusCode: number }
    const message = data?.message;
    const error = data?.error;

    if (Array.isArray(message)) return message.join("; ");
    if (typeof message === "string" && message.trim()) return message;
    if (typeof error === "string" && error.trim()) return error;

    if (typeof axErr.message === "string" && axErr.message.trim()) {
      return axErr.message;
    }

    return `Request failed (${axErr.response?.status ?? "no status"})`;
  }

  if (err instanceof Error) return err.message;

  return String(err);
}

export type PayrollRunReviewFilter = {
  status?: string;
  payrollPeriod?: string;
};

export type ProcessPayrollRunDto = {
  payrollSpecialistId?: string;
  payrollPeriod: string; // ISO date string
  entity: string;
};

export type CalculatePayrollDto = {
  employeeIds?: string[];
  payrollPeriod: string; // ISO date string
  payrollRunId?: string;
  payrollSpecialistId?: string;
  entity: string;
  includeAllowances?: boolean;
  includeInsurance?: boolean;
  includeTaxes?: boolean;
};

export type GenerateDraftPayrollDto = {
  entity: string;
  payrollSpecialistId?: string;
  payrollPeriod?: string; // ISO date string
};

export type ReviewPayrollRunDto = {
  action: "approve" | "reject";
  reviewerId?: string;
  comment?: string;
  rejectionReason?: string;
};

export type ApproveSigningBonusDto = {
  approverId?: string;
  comment?: string;
  paymentDate?: string;
};

export type ManualOverrideSigningBonusDto = {
  authorizedBy: string;
  comment?: string;
  paymentDate?: string;
  status?: string;
};

export type ApproveTerminationBenefitDto = {
  approverId?: string;
  comment?: string;
};

export type ManualOverrideTerminationBenefitDto = {
  authorizedBy: string;
  comment?: string;
  status?: string;
};

export const payrollExecutionApi = {
  // Payroll runs
  getPayrollRunsForReview: (filter: PayrollRunReviewFilter = {}) =>
    client.get("/payroll-runs/review", { params: filter }).then((r) => r.data),

  processPayrollRunAutomatic: (body: ProcessPayrollRunDto) =>
    client.post("/payroll-runs/process-automatic", body).then((r) => r.data),

  calculatePayrollAutomatic: (body: CalculatePayrollDto) =>
    client.post("/payroll-runs/calculate-automatic", body).then((r) => r.data),

  generateDraftAutomatic: (body: GenerateDraftPayrollDto) =>
    client.post("/draft/generate-automatic", body).then((r) => r.data),

  reviewPayrollRun: (payrollRunId: string, body: ReviewPayrollRunDto) =>
    client.post(`/payroll-runs/${payrollRunId}/review`, body).then((r) => r.data),

  editPayrollRun: (payrollRunId: string, body: any) =>
    client.patch(`/payroll-runs/${payrollRunId}/edit`, body).then((r) => r.data),

  getPreview: (payrollRunId: string) =>
    client.get(`/preview/${payrollRunId}`).then((r) => r.data),

  // Signing bonuses
  getProcessedSigningBonuses: (filter: { employeeId?: string; status?: string } = {}) =>
    client.get("/signing-bonuses/processed", { params: filter }).then((r) => r.data),

  approveSigningBonus: (signingBonusId: string, body: ApproveSigningBonusDto = {}) =>
    client.post(`/signing-bonuses/${signingBonusId}/approve`, body).then((r) => r.data),

  manualOverrideSigningBonus: (signingBonusId: string, body: ManualOverrideSigningBonusDto) =>
    client.patch(`/signing-bonuses/${signingBonusId}/manual-override`, body).then((r) => r.data),

  // Termination benefits
  getProcessedTerminationBenefits: (filter: { employeeId?: string; status?: string } = {}) =>
    client.get("/termination-benefits/processed", { params: filter }).then((r) => r.data),

  approveTerminationBenefit: (terminationBenefitId: string, body: ApproveTerminationBenefitDto = {}) =>
    client.post(`/termination-benefits/${terminationBenefitId}/approve`, body).then((r) => r.data),

  manualOverrideTerminationBenefit: (terminationBenefitId: string, body: ManualOverrideTerminationBenefitDto) =>
    client.patch(`/termination-benefits/${terminationBenefitId}/manual-override`, body).then((r) => r.data),

  // Payslips
  getPayslipsForPayrollRun: (payrollRunId: string) =>
    client.get(`/payslips/payroll-run/${payrollRunId}`).then((r) => r.data),

  generatePayslip: (body: { employeeId: string; payrollRunId: string }) =>
    client.post("/payslips/generate", body).then((r) => r.data),

  generatePayslipsBatch: (payrollRunId: string) =>
    client.post(`/payslips/generate-batch/${payrollRunId}`).then((r) => r.data),

  resendPayslip: (payslipId: string, body: { distributionMethod: "email" | "portal" }) =>
    client.post(`/payslips/${payslipId}/resend`, body).then((r) => r.data),
};
