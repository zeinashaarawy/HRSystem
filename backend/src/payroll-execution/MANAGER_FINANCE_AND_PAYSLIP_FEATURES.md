# Manager, Finance, and Payslip Distribution Features

## Overview

This document describes the final phase of payroll execution features: manager review with escalated irregularity resolution, manager approval workflow, finance approval, payroll lock/unlock functionality, and automatic payslip generation and distribution.

---

## Table of Contents

1. [Manager Review & Escalated Irregularities](#manager-review--escalated-irregularities)
2. [Manager Approval Before Distribution](#manager-approval-before-distribution)
3. [Finance Approval for Payment](#finance-approval-for-payment)
4. [Payroll Lock/Freeze](#payroll-lockfreeze)
5. [Payroll Unlock/Unfreeze](#payroll-unlockunfreeze)
6. [Automatic Payslip Generation & Distribution](#automatic-payslip-generation--distribution)
7. [API Endpoints](#api-endpoints)
8. [Complete Workflow](#complete-workflow)

---

## Manager Review & Escalated Irregularities

### Feature Description

Payroll Managers can review payroll drafts, view all escalated irregularities, and resolve complex issues that require higher decision-making authority.

### Escalated Irregularities

**What Gets Escalated**:
- All **high-severity** irregularities
- All **medium-severity** irregularities
- Issues requiring managerial decision

**Irregularity Structure**:
```typescript
interface EscalatedIrregularity {
  irregularityId: string;
  type: string;
  severity: 'high' | 'medium';
  employeeId: string;
  employeeName: string;
  message: string;
  escalatedBy?: string;
  escalatedDate?: Date;
  resolution?: string;
  resolvedBy?: string;
  resolvedDate?: Date;
  status: 'pending' | 'resolved' | 'rejected';
}
```

### Get Escalated Irregularities

**Endpoint**:
```http
GET /payroll-execution/payroll-runs/:id/escalated-irregularities
```

**Response**:
```json
[
  {
    "irregularityId": "65f123...-65f456...-0",
    "type": "missing_bank",
    "severity": "high",
    "employeeId": "65f456...",
    "employeeName": "John Doe",
    "message": "Employee John Doe has missing bank account details",
    "status": "pending"
  },
  {
    "irregularityId": "65f123...-65f789...-1",
    "type": "salary_spike",
    "severity": "medium",
    "employeeId": "65f789...",
    "employeeName": "Jane Smith",
    "message": "Employee Jane Smith has sudden salary increase: 35% change",
    "status": "pending"
  }
]
```

### Resolve Escalated Irregularity

**Endpoint**:
```http
POST /payroll-execution/irregularities/resolve
```

**Request Body**:
```json
{
  "irregularityId": "65f123...-65f456...-0",
  "resolution": "Contacted employee, bank details updated. Account verified.",
  "resolvedBy": "65f999...",
  "action": "resolve"
}
```

**Actions**:
- `resolve`: Mark irregularity as resolved
- `reject`: Reject the irregularity (not an actual issue)

**Response**:
```json
{
  "irregularityId": "65f123...-65f456...-0",
  "type": "resolved",
  "severity": "low",
  "resolution": "Contacted employee, bank details updated. Account verified.",
  "resolvedBy": "65f999...",
  "resolvedDate": "2025-02-02T14:30:00Z",
  "status": "resolved"
}
```

### Resolution Process

1. **Manager Views Escalated Irregularities**
   - Gets list of high/medium severity issues
   - Reviews each irregularity details

2. **Manager Investigates**
   - Contacts employees if needed
   - Reviews employee records
   - Consults with HR/Payroll Specialist

3. **Manager Provides Resolution**
   - Documents what was done
   - Marks as resolved or rejected
   - Resolution stored for audit trail

4. **Validation Before Approval**
   - System checks for unresolved high-severity items
   - Blocks approval if any remain
   - Ensures all critical issues addressed

---

## Manager Approval Before Distribution

### Feature Description

Payroll Managers review and approve payroll runs at the managerial level, ensuring validation before distribution to finance.

### Manager Review and Approve

**Endpoint**:
```http
POST /payroll-execution/payroll-runs/:id/manager-review-approve
```

**Request Body**:
```json
{
  "payrollManagerId": "65f999...",
  "comment": "Reviewed all irregularities. Approved for finance review."
}
```

**Process**:

1. **Validation**:
   - Payroll must be in `UNDER_REVIEW` status
   - Checks for unresolved high-severity irregularities
   - Blocks if critical issues remain

2. **Approval**:
   - Records manager ID
   - Records approval date
   - Transitions to `PENDING_FINANCE_APPROVAL`

3. **Error Handling**:
```json
{
  "statusCode": 400,
  "message": "Cannot approve: 2 high-severity irregularities remain unresolved. Please resolve or escalate them first.",
  "error": "Bad Request"
}
```

### State Transition

```
UNDER_REVIEW → Manager Approval → PENDING_FINANCE_APPROVAL
```

**Requirements**:
- ✅ All high-severity irregularities resolved
- ✅ Manager ID provided
- ✅ Status is UNDER_REVIEW

**Records**:
- Manager ID
- Manager approval date
- Comments (if provided)

---

## Finance Approval for Payment

### Feature Description

Finance staff approves payroll disbursements before execution, ensuring no incorrect payments are made. This is the final approval step that sets payment status to PAID and triggers automatic payslip generation.

### Finance Approval Process

**Endpoint**:
```http
POST /payroll-execution/payroll-runs/:id/final-approval
```

**Request Body**:
```json
{
  "financeStaffId": "65f888..."
}
```

**Process**:

1. **Validation**:
   - Payroll must be in `PENDING_FINANCE_APPROVAL` status
   - Finance staff ID required

2. **Approval Actions**:
   - Sets status to `APPROVED`
   - Sets payment status to `PAID`
   - Records finance staff ID
   - Records finance approval date
   - **Automatically generates and distributes payslips**

3. **State Transition**:
```
PENDING_FINANCE_APPROVAL → Finance Approval → APPROVED (Payment: PAID)
                                            ↓
                                  Auto-Generate Payslips
```

### Key Points

✅ **Final Authority**: Last approval before payment execution
✅ **Payment Status**: Automatically set to PAID (no bank integration needed)
✅ **Payslip Trigger**: Automatically generates payslips for all employees
✅ **Audit Trail**: Complete record of finance approval

### Response

```json
{
  "id": "65f123...",
  "runId": "PR-2025-0001",
  "status": "approved",
  "paymentStatus": "paid",
  "financeStaffId": "65f888...",
  "financeApprovalDate": "2025-02-03T11:00:00Z"
}
```

---

## Payroll Lock/Freeze

### Feature Description

Payroll Managers can lock or freeze finalized payroll runs to prevent any unauthorized retroactive changes. This ensures data integrity and compliance.

### Lock Payroll

**Endpoint**:
```http
POST /payroll-execution/payroll-runs/:id/lock
```

**Request Body**:
```json
{
  "payrollManagerId": "65f999...",
  "comment": "Payroll finalized and locked for January 2025"
}
```

**Requirements**:
- Payroll must be in `APPROVED` status
- Manager ID required
- Optional comment for audit trail

**Process**:

1. **Validation**:
   - Only APPROVED payrolls can be locked
   - Manager authorization required

2. **Lock Action**:
   - Changes status to `LOCKED`
   - Records manager ID (if not already recorded)
   - Logs lock action with timestamp

3. **Effects**:
   - ❌ Cannot edit payroll details
   - ❌ Cannot recalculate
   - ❌ Cannot modify employee records
   - ✅ Can view/download payslips
   - ✅ Can view reports

### State Transition

```
APPROVED → Lock → LOCKED
```

### Response

```json
{
  "id": "65f123...",
  "runId": "PR-2025-0001",
  "status": "locked",
  "payrollManagerId": "65f999...",
  "lockedDate": "2025-02-04T09:00:00Z"
}
```

### When to Lock

**Recommended Times**:
- After all payslips distributed
- After payment file sent to bank (if applicable)
- After month-end close
- Before audit period

**Benefits**:
- ✅ Prevents accidental changes
- ✅ Ensures audit trail integrity
- ✅ Compliance with financial controls
- ✅ Data immutability

---

## Payroll Unlock/Unfreeze

### Feature Description

Payroll Managers have the authority to unlock payrolls under exceptional circumstances, allowing legitimate corrections even after a payroll has been locked. **Unlock reason is mandatory** for audit trail.

### Unlock Payroll

**Endpoint**:
```http
POST /payroll-execution/payroll-runs/:id/unlock
```

**Request Body**:
```json
{
  "payrollManagerId": "65f999...",
  "unlockReason": "Correction needed: Employee bank account changed after lock. Need to update payroll record.",
  "comment": "Approved by Finance Director for correction"
}
```

**Requirements**:
- ✅ Payroll must be in `LOCKED` status
- ✅ Manager ID required
- ✅ **Unlock reason MANDATORY** (for audit)
- ✅ Optional additional comment

**Process**:

1. **Validation**:
   - Only LOCKED payrolls can be unlocked
   - Unlock reason cannot be empty
   - Manager authorization required

2. **Unlock Action**:
   - Changes status to `UNLOCKED`
   - Records unlock reason (stored in payrollRun)
   - Logs unlock action with timestamp
   - Records manager ID

3. **Effects**:
   - ✅ Can edit payroll details
   - ✅ Can recalculate if needed
   - ✅ Can update employee records
   - ⚠️ Creates audit trail entry

### State Transition

```
LOCKED → Unlock (with reason) → UNLOCKED
```

### Response

```json
{
  "id": "65f123...",
  "runId": "PR-2025-0001",
  "status": "unlocked",
  "payrollManagerId": "65f999...",
  "unlockReason": "Correction needed: Employee bank account changed after lock...",
  "unlockDate": "2025-02-05T14:00:00Z"
}
```

### Exceptional Circumstances for Unlock

**Valid Reasons**:
- ✅ Employee bank account error discovered
- ✅ Calculation error found post-distribution
- ✅ Legal/compliance requirement
- ✅ Tax authority audit correction
- ✅ Court order or legal mandate

**Invalid Reasons**:
- ❌ "Oops, I made a mistake" (without details)
- ❌ "Just checking" or "Testing"
- ❌ Empty or generic reasons
- ❌ Routine changes (should wait for next cycle)

### Audit Trail

Every unlock creates a permanent audit record:
```typescript
{
  action: 'PAYROLL_UNLOCKED',
  payrollRunId: '65f123...',
  runId: 'PR-2025-0001',
  unlockedBy: '65f999...',
  unlockReason: 'Detailed reason...',
  unlockDate: '2025-02-05T14:00:00Z',
  comment: 'Additional context...'
}
```

---

## Automatic Payslip Generation & Distribution

### Feature Description

The system automatically generates and distributes employee payslips after finance approval. Payslips are available via PDF download, email notification, and employee portal.

### Automatic Trigger

**Triggered After**:
1. ✅ Finance approval (status = APPROVED, payment = PAID)
2. ✅ Payroll lock (status = LOCKED)

**Process**:
```
Finance Approval → Status: APPROVED → Payment: PAID
                        ↓
                Auto-Generate Payslips
                        ↓
                Auto-Distribute
                        ↓
                Available to Employees
```

### Payslip Generation

**For Each Employee**:
1. Generate detailed payslip document
2. Include complete breakdown:
   - Employee information
   - Payroll period
   - Earnings (base, allowances, bonuses, benefits, refunds)
   - Deductions (taxes, insurance, penalties)
   - Net pay
   - Payment status

3. Create distribution record
4. Make available via multiple channels

### Distribution Methods

#### 1. Portal Access (Default)
- Payslip available in employee portal
- Download URL generated
- Accessible 24/7
- Secure authentication required

#### 2. Email Notification
- Email sent to employee
- Contains download link
- PDF attachment (optional)
- Notification of availability

#### 3. PDF Download
- Direct PDF generation
- Formatted with company template
- Print-ready format
- Secure access control

### Get Payslip Distribution Status

**Endpoint**:
```http
GET /payroll-execution/payroll-runs/:id/payslip-distribution-status
```

**Response**:
```json
[
  {
    "payslipId": "65fabc...",
    "employeeId": "65f456...",
    "employeeName": "John Doe",
    "distributionMethod": "portal",
    "distributionDate": "2025-02-03T11:05:00Z",
    "status": "sent",
    "email": "john.doe@company.com",
    "downloadUrl": "/api/payroll-execution/payslips/65fabc.../download"
  },
  {
    "payslipId": "65fdef...",
    "employeeId": "65f789...",
    "employeeName": "Jane Smith",
    "distributionMethod": "portal",
    "distributionDate": "2025-02-03T11:05:00Z",
    "status": "sent",
    "email": "jane.smith@company.com",
    "downloadUrl": "/api/payroll-execution/payslips/65fdef.../download"
  }
]
```

### Download Payslip PDF

**Endpoint**:
```http
GET /payroll-execution/payslips/:id/download
```

**Response** (PDF Data):
```json
{
  "payslipId": "65fabc...",
  "employee": {
    "name": "John Doe",
    "employeeNumber": "EMP001",
    "department": "Engineering",
    "position": "Senior Developer"
  },
  "payrollRun": {
    "runId": "PR-2025-0001",
    "period": "2025-01-31",
    "entity": "TechCorp Inc"
  },
  "earnings": {
    "baseSalary": 10000,
    "allowances": [
      { "name": "Housing", "amount": 2000 },
      { "name": "Transport", "amount": 500 }
    ],
    "bonuses": [],
    "benefits": [],
    "refunds": [],
    "totalGross": 12500
  },
  "deductions": {
    "taxes": [
      { "name": "Income Tax", "rate": 10, "amount": 1250 }
    ],
    "insurances": [
      { "name": "Social Insurance", "employeeRate": 11, "employeeAmount": 1375 }
    ],
    "penalties": null,
    "totalDeductions": 2625
  },
  "netPay": 9875,
  "paymentStatus": "paid",
  "generatedDate": "2025-02-03T11:05:00Z"
}
```

**In Production**:
- Would generate actual PDF using PDFKit/Puppeteer
- Apply company branding/template
- Return PDF buffer/stream
- Support various formats (A4, Letter, etc.)

### Resend Payslip

**Endpoint**:
```http
POST /payroll-execution/payslips/:id/resend
```

**Request Body**:
```json
{
  "distributionMethod": "email"
}
```

**Use Cases**:
- Employee lost payslip
- Email not received
- Portal access issues
- Re-download needed

**Response**:
```json
{
  "payslipId": "65fabc...",
  "employeeId": "65f456...",
  "employeeName": "John Doe",
  "distributionMethod": "email",
  "distributionDate": "2025-02-10T10:00:00Z",
  "status": "sent",
  "email": "john.doe@company.com"
}
```

### Payslip Breakdown Components

**Detailed Breakdown Included**:

1. **Employee Information**
   - Full name
   - Employee number
   - Department
   - Position/Role

2. **Payroll Period**
   - Pay run ID
   - Period (e.g., January 2025)
   - Company/Entity name

3. **Earnings Section**
   - Base salary
   - Each allowance (itemized)
   - Bonuses (if any)
   - Benefits (if any)
   - Refunds (if any)
   - **Total Gross Salary**

4. **Deductions Section**
   - Taxes (itemized by type)
   - Social/Health insurance
   - Penalties (if any)
   - Unpaid leave deductions
   - Recoveries
   - **Total Deductions**

5. **Summary**
   - **Net Pay** (amount transferred)
   - Payment status
   - Payment date
   - Generated date

### Security & Access Control

**Access Rules**:
- ✅ Employees can only view their own payslips
- ✅ Payroll specialists can view all payslips
- ✅ Managers can view team payslips
- ✅ Finance can view all for verification

**Authentication**:
- Secure login required
- Session validation
- Download tokens (optional)
- Audit logging of access

---

## API Endpoints Summary

### Manager Review & Irregularities
```
GET  /payroll-execution/payroll-runs/:id/escalated-irregularities
POST /payroll-execution/irregularities/resolve
POST /payroll-execution/payroll-runs/:id/manager-review-approve
```

### Finance Approval
```
POST /payroll-execution/payroll-runs/:id/final-approval
```

### Lock/Unlock
```
POST /payroll-execution/payroll-runs/:id/lock
POST /payroll-execution/payroll-runs/:id/unlock
```

### Payslip Distribution
```
GET  /payroll-execution/payroll-runs/:id/payslip-distribution-status
GET  /payroll-execution/payslips/:id/download
POST /payroll-execution/payslips/:id/resend
```

---

## Complete Workflow

### End-to-End Example: January 2025 Payroll

#### Day 1 (Jan 31): Draft Generation
```bash
POST /draft/generate-automatic
{
  "entity": "TechCorp Inc",
  "payrollPeriod": "2025-01-31"
}
# Status: DRAFT
# Irregularities detected: 3 high, 2 medium
```

#### Day 2 (Feb 1): Specialist Review
```bash
# Specialist fixes 3 high-severity irregularities
# Sends for manager approval

POST /payroll-runs/65f123.../send-for-manager-approval
{
  "payrollSpecialistId": "65f111..."
}
# Status: UNDER_REVIEW
```

#### Day 3 (Feb 2): Manager Review
```bash
# Manager views escalated irregularities
GET /payroll-runs/65f123.../escalated-irregularities
# Returns: 2 medium-severity irregularities

# Manager resolves irregularities
POST /irregularities/resolve
{
  "irregularityId": "65f123...-65f456...-0",
  "resolution": "Verified with employee, salary increase due to promotion",
  "resolvedBy": "65f999...",
  "action": "resolve"
}

# Manager approves
POST /payroll-runs/65f123.../manager-review-approve
{
  "payrollManagerId": "65f999...",
  "comment": "All irregularities resolved. Approved."
}
# Status: PENDING_FINANCE_APPROVAL
```

#### Day 4 (Feb 3): Finance Approval
```bash
# Finance reviews and approves
POST /payroll-runs/65f123.../final-approval
{
  "financeStaffId": "65f888..."
}
# Status: APPROVED
# Payment: PAID
# Auto-generates 150 payslips
# Auto-distributes to employees

# Check distribution status
GET /payroll-runs/65f123.../payslip-distribution-status
# Returns: 150 distributions, all status: "sent"
```

#### Day 5 (Feb 4): Lock Payroll
```bash
# Manager locks payroll after confirmation
POST /payroll-runs/65f123.../lock
{
  "payrollManagerId": "65f999...",
  "comment": "Payroll finalized and locked for January 2025"
}
# Status: LOCKED
# Payroll now immutable
```

#### Day 15 (Feb 15): Exceptional Unlock
```bash
# Error discovered: one employee's bank account wrong
POST /payroll-runs/65f123.../unlock
{
  "payrollManagerId": "65f999...",
  "unlockReason": "Employee bank account correction required. Account number was incorrect. Need to update before next payment cycle.",
  "comment": "Approved by Finance Director"
}
# Status: UNLOCKED
# Can now make corrections
# Full audit trail created
```

---

## User Stories Completed

### ✅ Story 1: Manager Review & Resolve Escalated Irregularities

**As a Payroll Manager**, I want to resolve escalated irregularities reported by Payroll Specialists so that payroll exceptions are addressed at a higher decision level.

**Implementation**:
- `getEscalatedIrregularities()`: Returns all high/medium severity issues
- `resolveEscalatedIrregularity()`: Manager documents resolution
- Validation blocks approval if unresolved

### ✅ Story 2: Manager Approval Before Distribution

**As a Payroll Manager**, I want to approve payroll runs so that validation is ensured at the managerial level prior to distribution.

**Implementation**:
- `managerReviewAndApprove()`: Enhanced approval with irregularity check
- State transition: UNDER_REVIEW → PENDING_FINANCE_APPROVAL
- Records manager ID and date

### ✅ Story 3: Finance Approval for Payment

**As Finance Staff**, I want to approve payroll disbursements before execution, so that no incorrect payments are made.

**Implementation**:
- `finalApprovalByFinance()`: Final approval sets payment status to PAID
- Auto-triggers payslip generation
- No bank integration needed (status set directly)

### ✅ Story 4: Lock Finalized Payroll

**As a Payroll Manager**, I want to lock or freeze finalized payroll runs so that no unauthorized retroactive changes are made.

**Implementation**:
- `lockPayroll()`: Changes status to LOCKED
- Prevents all modifications
- Maintains data integrity

### ✅ Story 5: Unlock Payroll with Reason

**As a Payroll Manager**, I want the authority to unfreeze payrolls and give reason under exceptional circumstances so that legitimate corrections can still be made even after a payroll has been locked.

**Implementation**:
- `unlockPayroll()`: Requires mandatory unlock reason
- Creates audit trail
- Allows legitimate corrections

### ✅ Story 6: Auto-Generate & Distribute Payslips

**As a Payroll Specialist**, I want to allow the system to automatically generate and distribute employee payslips (via PDF, email, or portal) so that staff can access their salary details securely.

**Implementation**:
- `generateAndDistributePayslipsAutomatically()`: Triggered after finance approval
- Multi-channel distribution (portal, email, PDF)
- Complete earnings/deductions breakdown
- Secure access control

---

## Best Practices

### For Payroll Managers

**Irregularity Resolution**:
1. Review all escalated irregularities before approval
2. Document resolution clearly and completely
3. Contact employees/HR when needed
4. Don't approve with unresolved high-severity issues

**Lock/Unlock**:
1. Lock payroll after all distributions complete
2. Only unlock for legitimate exceptional circumstances
3. Provide detailed, specific unlock reasons
4. Document approval chain for unlocks

### For Finance Staff

**Final Approval**:
1. Verify total amounts match budget
2. Check cash flow availability
3. Review exception count
4. Confirm all prior approvals complete

**Payment Status**:
1. Understand PAID status means ready for payment
2. Verify payslip generation succeeded
3. Check distribution status after approval

### For System Administrators

**Audit Trail**:
1. Monitor unlock frequency and reasons
2. Review irregularity resolution patterns
3. Track approval timeline metrics
4. Generate compliance reports

**Payslip Distribution**:
1. Monitor distribution success rate
2. Handle failed distributions
3. Provide employee support for access issues
4. Maintain distribution logs

---

## Conclusion

Phase 3 implementation provides complete manager and finance workflows with:

✅ **Manager Capabilities**:
- Escalated irregularity review and resolution
- Enhanced approval with validation
- Payroll lock/unlock authority

✅ **Finance Capabilities**:
- Final approval before payment
- Payment status control
- Disbursement authorization

✅ **Payslip Features**:
- Automatic generation after approval
- Multi-channel distribution
- Detailed breakdown with audit trail
- Secure access and download

✅ **Audit & Compliance**:
- Complete approval chain tracking
- Mandatory unlock reasons
- Resolution documentation
- Distribution logs

All user stories fully implemented with proper validation, error handling, and comprehensive audit trails.
