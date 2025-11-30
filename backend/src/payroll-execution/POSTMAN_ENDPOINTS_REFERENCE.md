# Payroll Execution API - Endpoints Quick Reference

## Base URL
```
http://localhost:3000/payroll-execution
```

## All Endpoints Summary

| Method | Endpoint | Description | Required Parameters |
|--------|----------|------------|-------------------|
| **SIGNING BONUSES** |
| GET | `/signing-bonuses/processed` | Get processed signing bonuses | Query: `employeeId?`, `status?` |
| POST | `/signing-bonuses/:id/approve` | Approve signing bonus | Path: `id`, Body: `approverId?`, `comment?`, `paymentDate?` |
| PATCH | `/signing-bonuses/:id/manual-override` | Manually override signing bonus | Path: `id`, Body: `authorizedBy`, `comment?`, `paymentDate?`, `status?` |
| **TERMINATION BENEFITS** |
| GET | `/termination-benefits/processed` | Get processed termination benefits | Query: `employeeId?`, `status?` |
| POST | `/termination-benefits/:id/approve` | Approve termination benefit | Path: `id`, Body: `approverId?`, `comment?` |
| PATCH | `/termination-benefits/:id/manual-override` | Manually override termination benefit | Path: `id`, Body: `authorizedBy`, `comment?`, `status?` |
| **PAYROLL RUNS - CORE** |
| GET | `/payroll-runs/review` | Get payroll runs for review | Query: `status?`, `payrollPeriod?` |
| POST | `/payroll-runs/:id/review` | Review payroll run | Path: `id`, Body: `action`, `reviewerId?`, `comment?`, `rejectionReason?` |
| PATCH | `/payroll-runs/:id/edit` | Edit payroll run | Path: `id`, Body: `authorizedBy`, `comment?`, `payrollPeriod?`, `entity?`, `employees?`, `exceptions?`, `totalnetpay?` |
| POST | `/payroll-runs/process-automatic` | Process payroll run automatically | Body: `payrollPeriod`, `entity`, `payrollSpecialistId?` |
| POST | `/payroll-runs/calculate-automatic` | Calculate payroll automatically | Body: `payrollPeriod`, `entity`, `employeeIds?`, `payrollRunId?`, `payrollSpecialistId?`, `includeAllowances?`, `includeInsurance?`, `includeTaxes?` |
| GET | `/preview/:payrollRunId` | Get payroll preview dashboard | Path: `payrollRunId` |
| **PAYROLL RUNS - APPROVAL WORKFLOW** |
| POST | `/payroll-runs/:id/send-for-manager-approval` | Send for manager approval | Path: `id`, Body: `payrollSpecialistId?` |
| POST | `/payroll-runs/:id/send-for-finance-approval` | Send for finance approval | Path: `id`, Body: `payrollManagerId?` |
| POST | `/payroll-runs/:id/final-approval` | Final approval by finance | Path: `id`, Body: `financeStaffId?` |
| POST | `/payroll-runs/:id/manager-review-approve` | Manager review and approve | Path: `id`, Body: `payrollManagerId`, `comment?` |
| **PAYROLL RUNS - LOCK/UNLOCK** |
| POST | `/payroll-runs/:id/lock` | Lock payroll run | Path: `id`, Body: `payrollManagerId`, `comment?` |
| POST | `/payroll-runs/:id/unlock` | Unlock payroll run | Path: `id`, Body: `payrollManagerId`, `unlockReason`, `comment?` |
| GET | `/payroll-runs/:id/payslip-distribution-status` | Get payslip distribution status | Path: `id` |
| GET | `/payroll-runs/:id/escalated-irregularities` | Get escalated irregularities | Path: `id` |
| **PAYSLIPS** |
| POST | `/payslips/generate` | Generate payslip | Body: `employeeId`, `payrollRunId` |
| POST | `/payslips/generate-batch/:payrollRunId` | Generate payslips for payroll run | Path: `payrollRunId` |
| GET | `/payslips` | Get payslip | Query: `employeeId`, `payrollRunId` |
| GET | `/payslips/payroll-run/:payrollRunId` | Get payslips for payroll run | Path: `payrollRunId` |
| GET | `/payslips/:id/download` | Download payslip PDF | Path: `id` |
| POST | `/payslips/:id/resend` | Resend payslip | Path: `id`, Body: `distributionMethod` |
| **DRAFT GENERATION** |
| POST | `/draft/generate-automatic` | Generate draft payroll automatically | Body: `entity`, `payrollSpecialistId?`, `payrollPeriod?` |
| **IRREGULARITIES** |
| POST | `/irregularities/resolve` | Resolve escalated irregularity | Body: `irregularityId`, `resolution`, `resolvedBy`, `action` |

## Request Body Examples

### Approve Signing Bonus
```json
{
  "approverId": "approver123",
  "comment": "Approved for payment",
  "paymentDate": "2025-02-15"
}
```

### Manual Override Signing Bonus
```json
{
  "authorizedBy": "manager123",
  "comment": "Manual override due to special circumstances",
  "paymentDate": "2025-02-20",
  "status": "OVERRIDDEN"
}
```

### Review Payroll Run (Approve)
```json
{
  "action": "approve",
  "reviewerId": "reviewer123",
  "comment": "Reviewed and approved"
}
```

### Review Payroll Run (Reject)
```json
{
  "action": "reject",
  "reviewerId": "reviewer123",
  "comment": "Rejected due to errors",
  "rejectionReason": "Calculation errors found"
}
```

### Edit Payroll Run
```json
{
  "authorizedBy": "manager123",
  "comment": "Editing payroll run details",
  "payrollPeriod": "2025-02-01",
  "entity": "Main Office",
  "employees": 150,
  "exceptions": 5,
  "totalnetpay": 500000
}
```

### Process Payroll Run Automatically
```json
{
  "payrollSpecialistId": "specialist123",
  "payrollPeriod": "2025-02-01",
  "entity": "Main Office"
}
```

### Calculate Payroll Automatically
```json
{
  "employeeIds": ["emp123", "emp456"],
  "payrollPeriod": "2025-02-01",
  "payrollRunId": "run123",
  "payrollSpecialistId": "specialist123",
  "entity": "Main Office",
  "includeAllowances": true,
  "includeInsurance": true,
  "includeTaxes": true
}
```

### Generate Draft Payroll
```json
{
  "entity": "Main Office",
  "payrollSpecialistId": "specialist123",
  "payrollPeriod": "2025-02-01"
}
```

### Generate Payslip
```json
{
  "employeeId": "emp123",
  "payrollRunId": "run123"
}
```

### Resolve Irregularity
```json
{
  "irregularityId": "irregularity123",
  "resolution": "Issue resolved after verification",
  "resolvedBy": "manager123",
  "action": "resolve"
}
```

### Lock Payroll
```json
{
  "payrollManagerId": "manager123",
  "comment": "Locked for final processing"
}
```

### Unlock Payroll
```json
{
  "payrollManagerId": "manager123",
  "unlockReason": "Need to make corrections",
  "comment": "Unlocking for corrections"
}
```

### Resend Payslip
```json
{
  "distributionMethod": "email"
}
```

## Status Values

### Signing Bonus Status
- `PENDING`
- `APPROVED`
- `REJECTED`
- `PAID`
- `OVERRIDDEN`

### Termination Benefit Status
- `PENDING`
- `APPROVED`
- `REJECTED`
- `PAID`
- `OVERRIDDEN`

### Payroll Run Status
- `DRAFT`
- `PENDING_REVIEW`
- `PENDING_MANAGER_APPROVAL`
- `PENDING_FINANCE_APPROVAL`
- `APPROVED`
- `REJECTED`
- `LOCKED`
- `COMPLETED`

### Distribution Method
- `email`
- `portal`
- `pdf`

### Irregularity Action
- `resolve`
- `reject`

## Testing Checklist

- [ ] Signing Bonuses - Get processed
- [ ] Signing Bonuses - Approve
- [ ] Signing Bonuses - Manual override
- [ ] Termination Benefits - Get processed
- [ ] Termination Benefits - Approve
- [ ] Termination Benefits - Manual override
- [ ] Draft Generation - Generate automatic
- [ ] Payroll Runs - Calculate automatic
- [ ] Payroll Runs - Process automatic
- [ ] Payroll Runs - Get for review
- [ ] Payroll Runs - Preview dashboard
- [ ] Payroll Runs - Review (approve/reject)
- [ ] Payroll Runs - Edit
- [ ] Payroll Runs - Send for manager approval
- [ ] Payroll Runs - Manager review and approve
- [ ] Payroll Runs - Send for finance approval
- [ ] Payroll Runs - Final approval
- [ ] Payroll Runs - Lock
- [ ] Payroll Runs - Unlock
- [ ] Irregularities - Get escalated
- [ ] Irregularities - Resolve
- [ ] Payslips - Generate single
- [ ] Payslips - Generate batch
- [ ] Payslips - Get single
- [ ] Payslips - Get for payroll run
- [ ] Payslips - Download PDF
- [ ] Payslips - Resend
- [ ] Payslips - Distribution status

