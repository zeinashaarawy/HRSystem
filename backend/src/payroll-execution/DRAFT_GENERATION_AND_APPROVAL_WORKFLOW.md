# Draft Generation & Approval Workflow Documentation

## Overview

This document describes the automatic draft payroll generation, irregularity detection, preview dashboard, and multi-step approval workflow features implemented in the payroll execution system.

## Table of Contents

1. [Automatic Draft Generation](#automatic-draft-generation)
2. [Irregularity Detection](#irregularity-detection)
3. [Payroll Preview Dashboard](#payroll-preview-dashboard)
4. [Multi-Step Approval Workflow](#multi-step-approval-workflow)
5. [API Endpoints](#api-endpoints)
6. [User Stories Implementation](#user-stories-implementation)

---

## Automatic Draft Generation

### Feature Description

The system automatically generates draft payroll runs at the end of each payroll cycle. This eliminates manual initiation and ensures payroll specialists only need to review pre-calculated payrolls.

### How It Works

1. **Trigger**: Call the automatic draft generation endpoint (can be scheduled via cron/scheduler)
2. **Period Calculation**: Uses end of current month if no period specified
3. **Duplicate Prevention**: Checks if draft already exists for the period/entity
4. **Employee Selection**: Automatically includes all ACTIVE and PROBATION employees
5. **Salary Calculation**: Calculates all salaries with proper deductions
6. **Preview Generation**: Returns complete preview dashboard with irregularities

### Benefits

- ✅ No manual payroll initiation required
- ✅ Consistent timing across payroll cycles
- ✅ Immediate irregularity detection
- ✅ Ready-to-review draft available at cycle end

### Example Request

```http
POST /payroll-execution/draft/generate-automatic
Content-Type: application/json

{
  "entity": "TechCorp Inc",
  "payrollSpecialistId": "65f1234567890abcdef12345",
  "payrollPeriod": "2025-01-31"
}
```

### Example Response

Returns complete `PayrollPreviewDashboard` object with:
- Summary statistics
- Employee breakdown
- Detected irregularities
- Approval workflow state

---

## Irregularity Detection

### Feature Description

The system automatically flags irregularities in payroll runs to help payroll specialists identify issues before approval. This ensures data quality and prevents payment errors.

### Irregularity Types

#### 1. **Missing Bank Account** (High Severity)
- **Detection**: `bankStatus === 'missing'`
- **Impact**: Employee cannot receive payment
- **Action Required**: Update employee bank details before approval

#### 2. **Negative Net Pay** (High Severity)
- **Detection**: `netPay < 0`
- **Cause**: Excessive deductions (penalties, recoveries) exceed gross salary
- **Action Required**: Review deductions, adjust penalties, or handle manually

#### 3. **Salary Spike** (High/Medium Severity)
- **Detection**: More than 30% change from previous month
- **Severity**: High if > 50% change, Medium if 30-50%
- **Cause**: Promotion, allowance changes, proration issues, or data error
- **Action Required**: Verify reason for change

#### 4. **Unusual Deductions** (High/Medium Severity)
- **Detection**: Deductions > 40% of gross salary
- **Severity**: High if > 60%, Medium if 40-60%
- **Cause**: High penalties, excessive insurance, or calculation error
- **Action Required**: Review deduction breakdown

#### 5. **Zero Salary** (Medium Severity)
- **Detection**: `netPay === 0` but `baseSalary > 0`
- **Cause**: All salary deducted (unpaid leave, penalties, recoveries)
- **Action Required**: Verify employee work status and deductions

#### 6. **Processing Exceptions** (Low Severity)
- **Detection**: `exceptions` field not empty
- **Cause**: Validation errors during calculation
- **Action Required**: Review exception message and resolve

### Detection Logic

```typescript
// Salary spike detection
const threshold = 0.3; // 30%
const percentageChange = Math.abs(
  (currentNetPay - previousNetPay) / previousNetPay
);

if (percentageChange > threshold) {
  // Flag as irregularity
}
```

### Irregularity Object Structure

```typescript
interface PayrollIrregularity {
  type: 'salary_spike' | 'missing_bank' | 'negative_net_pay' |
        'unusual_deduction' | 'zero_salary' | 'excessive_overtime';
  severity: 'high' | 'medium' | 'low';
  employeeId: string;
  employeeName: string;
  message: string;
  currentValue?: number;
  previousValue?: number;
  threshold?: number;
}
```

### Prevention of Approval with High Irregularities

When sending payroll for manager approval, the system:
1. Detects all irregularities
2. Filters high-severity items
3. **Blocks approval** if high-severity irregularities exist
4. Returns error message with count

```typescript
// Validation before approval
if (highSeverityIrregularities.length > 0) {
  throw new BadRequestException(
    `Cannot send for approval: ${highSeverityIrregularities.length} high-severity irregularities detected.`
  );
}
```

---

## Payroll Preview Dashboard

### Feature Description

Comprehensive dashboard view that provides payroll specialists with all information needed to review and validate payroll before approval.

### Dashboard Components

#### 1. Summary Statistics

```typescript
summary: {
  totalEmployees: number;          // Total employees in payroll
  processedEmployees: number;       // Successfully processed
  exceptions: number;               // Employees with errors
  totalGrossPay: number;           // Sum of all gross salaries
  totalDeductions: number;          // Sum of all deductions
  totalNetPay: number;              // Sum of all net pay
  totalTaxes: number;               // Sum of all taxes
  totalInsurance: number;           // Sum of all insurance
}
```

#### 2. Irregularities List

Array of all detected irregularities with:
- Type and severity
- Employee identification
- Descriptive message
- Current/previous values for comparison

#### 3. Employee Breakdown

Detailed per-employee view:

```typescript
employeeBreakdown: [{
  employeeId: string;
  employeeName: string;
  employeeNumber: string;
  baseSalary: number;
  allowances: number;
  grossSalary: number;
  deductions: number;
  netSalary: number;
  netPay: number;
  bankStatus: string;
  hasIrregularities: boolean;     // Quick flag
}]
```

#### 4. Approval Workflow State

Shows current step and status:

```typescript
approvalWorkflow: {
  currentStep: 'specialist' | 'manager' | 'finance' | 'completed';
  specialist: { id?: string; date?: Date; status?: string };
  manager: { id?: string; date?: Date; status?: string };
  finance: { id?: string; date?: Date; status?: string };
}
```

#### 5. Action Permissions

```typescript
{
  canEdit: boolean;        // Can edit payroll details
  canApprove: boolean;     // Can approve/send for approval
  canReject: boolean;      // Can reject payroll
}
```

### Example Request

```http
GET /payroll-execution/preview/:payrollRunId
```

### Example Response

```json
{
  "payrollRunId": "65f1234567890abcdef12345",
  "runId": "PR-2025-0001",
  "status": "draft",
  "payrollPeriod": "2025-01-31T00:00:00.000Z",
  "entity": "TechCorp Inc",
  "summary": {
    "totalEmployees": 150,
    "processedEmployees": 148,
    "exceptions": 2,
    "totalGrossPay": 1875000,
    "totalDeductions": 468750,
    "totalNetPay": 1406250,
    "totalTaxes": 187500,
    "totalInsurance": 206250
  },
  "irregularities": [
    {
      "type": "missing_bank",
      "severity": "high",
      "employeeId": "65f999...",
      "employeeName": "John Doe",
      "message": "Employee John Doe has missing bank account details"
    },
    {
      "type": "salary_spike",
      "severity": "medium",
      "employeeId": "65f888...",
      "employeeName": "Jane Smith",
      "message": "Employee Jane Smith has sudden salary increase: 35% change",
      "currentValue": 13500,
      "previousValue": 10000,
      "threshold": 30
    }
  ],
  "employeeBreakdown": [ /* ... */ ],
  "approvalWorkflow": {
    "currentStep": "specialist",
    "specialist": {
      "id": "65f123...",
      "date": "2025-01-31T10:00:00.000Z",
      "status": "pending"
    },
    "manager": {
      "status": "pending"
    },
    "finance": {
      "status": "pending"
    }
  },
  "canEdit": true,
  "canApprove": true,
  "canReject": false
}
```

---

## Multi-Step Approval Workflow

### Feature Description

Implements a three-level approval process ensuring proper validation before payroll finalization and payment.

### Workflow Steps

```
DRAFT → UNDER_REVIEW → PENDING_FINANCE_APPROVAL → APPROVED
   ↓         ↓                    ↓
   └─────────┴────────────────────┴─→ REJECTED (can return to DRAFT)
```

### Step 1: Payroll Specialist Review (DRAFT)

**Role**: Payroll Specialist

**Actions**:
- Review system-generated draft payroll
- Check preview dashboard for irregularities
- Resolve high-severity irregularities
- Edit payroll if needed
- Send for manager approval

**Validation**:
- No high-severity irregularities allowed
- All employees must have calculated salaries

**Endpoint**:
```http
POST /payroll-execution/payroll-runs/:id/send-for-manager-approval
Body: { "payrollSpecialistId": "..." }
```

**State Transition**: `DRAFT → UNDER_REVIEW`

### Step 2: Payroll Manager Approval (UNDER_REVIEW)

**Role**: Payroll Manager

**Actions**:
- Review payroll summary and breakdown
- Validate irregularities have been addressed
- Can reject (returns to DRAFT) or approve
- Send for finance approval

**Validation**:
- Payroll must be in UNDER_REVIEW status
- Manager ID recorded

**Endpoint**:
```http
POST /payroll-execution/payroll-runs/:id/send-for-finance-approval
Body: { "payrollManagerId": "..." }
```

**State Transition**: `UNDER_REVIEW → PENDING_FINANCE_APPROVAL`

**Records**:
- Manager ID
- Manager approval date

### Step 3: Finance Department Approval (PENDING_FINANCE_APPROVAL)

**Role**: Finance Staff

**Actions**:
- Final validation of payroll amounts
- Budget verification
- Payment authorization
- Final approval

**Validation**:
- Payroll must be in PENDING_FINANCE_APPROVAL status
- Finance staff ID recorded

**Endpoint**:
```http
POST /payroll-execution/payroll-runs/:id/final-approval
Body: { "financeStaffId": "..." }
```

**State Transition**: `PENDING_FINANCE_APPROVAL → APPROVED`

**Records**:
- Finance staff ID
- Finance approval date
- Payment status set to "PAID"

### Rejection Handling

At any step, the payroll can be rejected:

```http
POST /payroll-execution/payroll-runs/:id/review
Body: {
  "action": "reject",
  "reviewerId": "...",
  "rejectionReason": "Reason for rejection"
}
```

**State Transition**: `Any State → REJECTED`

**Recovery**: Use edit endpoint to fix issues, then resubmit

```http
PATCH /payroll-execution/payroll-runs/:id/edit
```

This returns payroll to DRAFT status.

### Approval Workflow Benefits

✅ **Segregation of Duties**: Different roles validate different aspects
✅ **Audit Trail**: Complete history of approvals and approvers
✅ **Error Prevention**: Multiple review points catch issues
✅ **Compliance**: Meets financial control requirements
✅ **Accountability**: Each step has named responsible party

---

## API Endpoints

### Draft Generation

#### Generate Draft Automatically
```http
POST /payroll-execution/draft/generate-automatic
Content-Type: application/json

{
  "entity": "Company Name",
  "payrollSpecialistId": "optional-specialist-id",
  "payrollPeriod": "optional-YYYY-MM-DD" // defaults to end of current month
}

Response: PayrollPreviewDashboard object
```

### Preview Dashboard

#### Get Payroll Preview
```http
GET /payroll-execution/preview/:payrollRunId

Response: PayrollPreviewDashboard object
```

### Approval Workflow

#### Send for Manager Approval
```http
POST /payroll-execution/payroll-runs/:id/send-for-manager-approval
Content-Type: application/json

{
  "payrollSpecialistId": "optional-specialist-id"
}

Response: PayrollRunReviewItem
```

#### Send for Finance Approval
```http
POST /payroll-execution/payroll-runs/:id/send-for-finance-approval
Content-Type: application/json

{
  "payrollManagerId": "optional-manager-id"
}

Response: PayrollRunReviewItem
```

#### Final Approval by Finance
```http
POST /payroll-execution/payroll-runs/:id/final-approval
Content-Type: application/json

{
  "financeStaffId": "optional-finance-id"
}

Response: PayrollRunReviewItem
```

---

## User Stories Implementation

### ✅ Story 1: Automatic Draft Generation

**User Story**: As a Payroll Specialist, I want the system to generate draft payroll runs automatically at the end of each cycle so that I only need to review.

**Implementation**:
- `generateDraftPayrollAutomatically()` method
- Auto-calculates all employee salaries
- Creates draft with DRAFT status
- Returns preview dashboard immediately

**Endpoint**: `POST /payroll-execution/draft/generate-automatic`

### ✅ Story 2: Payroll Structure Support

**User Story**: Payroll Structure must support base pay, allowances, deductions, and other variable pay elements.

**Implementation**:
- Base salary from contracts/pay grades
- Allowances from payroll configuration
- Multiple deduction types (taxes, insurance, penalties, unpaid leave, recoveries)
- Variable elements (bonuses, benefits, refunds)
- Complete breakdown in preview dashboard

**Evidence**: `employeeBreakdown` structure in preview dashboard

### ✅ Story 3: Flag Irregularities

**User Story**: As a Payroll Specialist, I want the system to flag irregularities (e.g., sudden salary spikes, missing bank accounts, negative net pay) so that I can take required action.

**Implementation**:
- 6 types of irregularity detection
- Severity levels (high, medium, low)
- Comparison with previous payroll
- High-severity blocks approval
- Detailed messages with values

**Method**: `detectPayrollIrregularities()`

### ✅ Story 4: Preview Dashboard

**User Story**: As a Payroll Specialist, I want to review system-generated payroll results in a preview dashboard so that I can confirm accuracy before finalization.

**Implementation**:
- Comprehensive dashboard with 5 sections
- Summary statistics
- Per-employee breakdown
- Irregularities list
- Approval workflow state
- Action permissions

**Endpoint**: `GET /payroll-execution/preview/:payrollRunId`

### ✅ Story 5: Send for Approval

**User Story**: As a Payroll Specialist, I want to send the payroll run for approval to Manager and Finance before finalization so that payments are not made without validation.

**Implementation**:
- `sendForManagerApproval()` method
- `sendForFinanceApproval()` method
- `finalApprovalByFinance()` method
- State validation at each step
- Irregularity check before sending

**Endpoints**:
- `/send-for-manager-approval`
- `/send-for-finance-approval`
- `/final-approval`

### ✅ Story 6: Multi-Step Approval Workflow

**User Story**: Payroll processing must support multi-step approval workflow: Payroll Specialist → Payroll Manager → Finance Department.

**Implementation**:
- 3-step workflow with state transitions
- Role-based approval methods
- Audit trail (IDs and dates)
- Rejection handling with reasons
- Cannot skip steps

**State Machine**: `DRAFT → UNDER_REVIEW → PENDING_FINANCE_APPROVAL → APPROVED`

---

## Best Practices

### For Payroll Specialists

1. **Review Irregularities First**: Always check the irregularities list before sending for approval
2. **Resolve High-Severity Issues**: System blocks approval if high-severity irregularities exist
3. **Verify Calculations**: Use employee breakdown to spot-check calculations
4. **Document Rejections**: Provide clear rejection reasons for audit trail

### For Payroll Managers

1. **Validate Summary**: Check totals match expected payroll budget
2. **Review Exceptions**: Investigate all employees with processing exceptions
3. **Compare Periods**: Look for unusual trends in total payroll costs

### For Finance Staff

1. **Budget Verification**: Ensure payroll amount fits within approved budget
2. **Cash Flow Check**: Confirm funds available for payment date
3. **Final Validation**: Last opportunity to catch any issues

### For System Administrators

1. **Schedule Draft Generation**: Set up automatic generation at cycle end (e.g., last day of month)
2. **Monitor Irregularities**: Track frequency of each irregularity type
3. **Audit Trail**: Regularly review approval logs for compliance

---

## Example Complete Workflow

### Scenario: Monthly Payroll for January 2025

**Day 1 (Jan 31): Automatic Draft Generation**
```bash
# Automated scheduler triggers
POST /payroll-execution/draft/generate-automatic
{
  "entity": "TechCorp Inc",
  "payrollPeriod": "2025-01-31"
}
```

**Day 2 (Feb 1): Payroll Specialist Review**
```bash
# Specialist reviews dashboard
GET /payroll-execution/preview/65f1234567890abcdef12345

# Resolves 2 high-severity irregularities (missing bank accounts)
# Verifies calculations

# Sends for manager approval
POST /payroll-execution/payroll-runs/65f1234567890abcdef12345/send-for-manager-approval
{
  "payrollSpecialistId": "65f111..."
}
```

**Day 3 (Feb 2): Payroll Manager Review**
```bash
# Manager reviews
GET /payroll-execution/preview/65f1234567890abcdef12345

# Approves and sends to finance
POST /payroll-execution/payroll-runs/65f1234567890abcdef12345/send-for-finance-approval
{
  "payrollManagerId": "65f222..."
}
```

**Day 4 (Feb 3): Finance Approval**
```bash
# Finance reviews and approves
POST /payroll-execution/payroll-runs/65f1234567890abcdef12345/final-approval
{
  "financeStaffId": "65f333..."
}

# Payroll now APPROVED, payment status: PAID
# Ready for payment processing
```

---

## Conclusion

The draft generation, irregularity detection, preview dashboard, and multi-step approval workflow provide a comprehensive payroll review and approval system that:

✅ Automates draft generation at cycle end
✅ Detects and flags data quality issues
✅ Provides comprehensive review dashboard
✅ Enforces multi-level approval workflow
✅ Creates complete audit trail
✅ Prevents payment errors
✅ Ensures compliance with financial controls

All user stories have been fully implemented with proper validation, error handling, and documentation.
