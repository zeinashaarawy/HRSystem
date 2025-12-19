const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';


export interface CreateClaimData {
  claimId: string;
  claimType: string;
  description: string;
  employeeId: string;
  amount: number;
  financeStaffId?: string;
}

export interface ClaimResponse {
  _id?: string;
  claimId: string;
  claimType: string;
  description: string;
  employeeId: string;
  amount: number;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}

export async function createClaim(data: CreateClaimData): Promise<ClaimResponse> {
  const url = `${API_BASE_URL}/payroll-tracking/claims`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      let errorMessage = `Failed to create claim: ${response.status} ${response.statusText}`;

      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch {
      }

      throw new Error(errorMessage);
    }

    return response.json();
  } catch (error: any) {
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      throw new Error(`Cannot connect to backend at ${API_BASE_URL}. Is the server running?`);
    }
    throw error;
  }
}

export async function getClaimById(id: string): Promise<ClaimResponse> {
  const response = await fetch(`${API_BASE_URL}/payroll-tracking/claims/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch claim: ${response.statusText}`);
  }

  return response.json();
}

export async function listClaimsByEmployee(employeeId: string): Promise<ClaimResponse[]> {
  const response = await fetch(
    `${API_BASE_URL}/payroll-tracking/employees/${employeeId}/claims`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch claims: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Update claim status
 */
export async function updateClaimStatus(id: string, status: string, rejectionReason?: string): Promise<ClaimResponse> {
  const response = await fetch(`${API_BASE_URL}/payroll-tracking/claims/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status, rejectionReason }),
  });

  if (!response.ok) {
    throw new Error(`Failed to update claim status: ${response.statusText}`);
  }

  return response.json();
}

// DISPUTES
export interface CreateDisputeData {
  disputeId: string;
  description: string;
  employeeId: string;
  payslipId: string;
  financeStaffId?: string;
}

export interface DisputeResponse {
  _id?: string;
  disputeId: string;
  description: string;
  employeeId: string;
  payslipId: string;
  status: string;
  rejectionReason?: string;
  resolutionComment?: string;
  createdAt?: string;
  updatedAt?: string;
}

export async function createDispute(data: CreateDisputeData): Promise<DisputeResponse> {
  const response = await fetch(`${API_BASE_URL}/payroll-tracking/disputes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Failed to create dispute: ${response.statusText}`);
  }

  return response.json();
}

export async function getDisputeById(id: string): Promise<DisputeResponse> {
  const response = await fetch(`${API_BASE_URL}/payroll-tracking/disputes/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch dispute: ${response.statusText}`);
  }

  return response.json();
}

export async function listDisputesByEmployee(employeeId: string): Promise<DisputeResponse[]> {
  const response = await fetch(
    `${API_BASE_URL}/payroll-tracking/employees/${employeeId}/disputes`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch disputes: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Update dispute status
 */
export async function updateDisputeStatus(id: string, status: string, rejectionReason?: string): Promise<DisputeResponse> {
  const response = await fetch(`${API_BASE_URL}/payroll-tracking/disputes/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status, rejectionReason }),
  });

  if (!response.ok) {
    throw new Error(`Failed to update dispute status: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Get disputes by employee ID (alias for listDisputesByEmployee)
 */
export async function getDisputesByEmployee(employeeId: string): Promise<DisputeResponse[]> {
  return listDisputesByEmployee(employeeId);
}

export interface RefundDetails {
  description: string;
  amount: number;
}

export interface CreateRefundData {
  claimId?: string;
  disputeId?: string;
  employeeId: string;
  financeStaffId?: string;
  refundDetails: RefundDetails;
}

export interface RefundResponse {
  _id?: string;
  claimId?: string;
  disputeId?: string;
  employeeId: string;
  refundDetails: RefundDetails;
  status: string;
  paidInPayrollRunId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export async function createRefund(data: CreateRefundData): Promise<RefundResponse> {
  const response = await fetch(`${API_BASE_URL}/payroll-tracking/refunds`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Failed to create refund: ${response.statusText}`);
  }

  return response.json();
}

export async function getRefundById(id: string): Promise<RefundResponse> {
  const response = await fetch(`${API_BASE_URL}/payroll-tracking/refunds/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch refund: ${response.statusText}`);
  }

  return response.json();
}

export async function listRefundsByEmployee(employeeId: string): Promise<RefundResponse[]> {
  const response = await fetch(
    `${API_BASE_URL}/payroll-tracking/employees/${employeeId}/refunds`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch refunds: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Update refund status
 */
export async function updateRefundStatus(id: string, status: string): Promise<RefundResponse> {
  const response = await fetch(`${API_BASE_URL}/payroll-tracking/refunds/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error(`Failed to update refund status: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Get refunds by employee ID (alias for listRefundsByEmployee)
 */
export async function getRefundsByEmployee(employeeId: string): Promise<RefundResponse[]> {
  return listRefundsByEmployee(employeeId);
}

export interface PayslipResponse {
  _id?: string;
  employeeId: string;
  payrollRunId: string;
  earningsDetails?: {
    baseSalary: number;
    allowances?: any[];
    bonuses?: any[];
    benefits?: any[];
    refunds?: any[];
  };
  deductionsDetails?: {
    taxes?: any[];
    insurances?: any[];
    penalties?: any;
  };
  totalGrossSalary: number;
  totaDeductions?: number;
  netPay: number;
  paymentStatus: string;
  createdAt?: string;
  updatedAt?: string;
}

export async function listPayslipsByEmployee(employeeId: string): Promise<PayslipResponse[]> {
  const response = await fetch(
    `${API_BASE_URL}/payroll-tracking/employees/${employeeId}/payslips`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch payslips: ${response.statusText}`);
  }

  return response.json();
}

export interface HistoricalRecordResponse extends PayslipResponse { }

export async function listHistoricalRecordsByEmployee(
  employeeId: string,
  params?: { startDate?: string; endDate?: string }
): Promise<HistoricalRecordResponse[]> {
  const url = new URL(`${API_BASE_URL}/payroll-tracking/employees/${employeeId}/historical-records`);

  if (params?.startDate) url.searchParams.append('startDate', params.startDate);
  if (params?.endDate) url.searchParams.append('endDate', params.endDate);

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`Failed to fetch historical records: ${response.statusText}`);
  }

  return response.json();
}