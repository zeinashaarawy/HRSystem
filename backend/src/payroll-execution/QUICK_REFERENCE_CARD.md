# Payroll Execution System - Quick Reference Card

## 🚀 Quick Start Workflow

### Monthly Payroll Process (3-4 Days)

```
Day 1: Auto-Generate → Day 2: Specialist Fix → Day 3: Manager Approve → Day 4: Finance Approve → DONE!
```

---

## 📋 For Payroll Specialists

### Monthly Tasks

1. **View Draft** (auto-generated on Day 1)
   ```bash
   GET /preview/:payrollRunId
   ```

2. **Fix High-Severity Irregularities**
   - Missing bank accounts → Update employee profiles
   - Negative net pay → Adjust deductions
   - Salary spikes → Verify and document

3. **Send for Manager Approval**
   ```bash
   POST /payroll-runs/:id/send-for-manager-approval
   ```

### Key Points
- ⚠️ High-severity irregularities **block approval**
- ✅ Must resolve all high-severity before sending
- 📊 Use preview dashboard for complete view

---

## 👔 For Payroll Managers

### Review Process

1. **View Escalated Irregularities**
   ```bash
   GET /payroll-runs/:id/escalated-irregularities
   ```

2. **Resolve Complex Issues**
   ```bash
   POST /irregularities/resolve
   {
     "irregularityId": "...",
     "resolution": "Detailed resolution...",
     "resolvedBy": "managerId",
     "action": "resolve"
   }
   ```

3. **Approve for Finance**
   ```bash
   POST /payroll-runs/:id/manager-review-approve
   {
     "payrollManagerId": "...",
     "comment": "All issues resolved"
   }
   ```

4. **Lock After Distribution** (Optional)
   ```bash
   POST /payroll-runs/:id/lock
   {
     "payrollManagerId": "...",
     "comment": "Finalized for Jan 2025"
   }
   ```

5. **Unlock if Needed** (Exceptional Only)
   ```bash
   POST /payroll-runs/:id/unlock
   {
     "payrollManagerId": "...",
     "unlockReason": "REQUIRED: Specific reason for audit",
     "comment": "Additional context"
   }
   ```

### Key Points
- ⚠️ Cannot approve if high-severity irregularities remain
- 📝 Document all resolutions clearly
- 🔒 Lock after confirmation
- 🔓 Unlock only for exceptions (with reason!)

---

## 💰 For Finance Staff

### Approval Process

1. **Review Payroll Totals**
   ```bash
   GET /preview/:payrollRunId
   ```
   - Check total net pay vs budget
   - Verify exception count acceptable
   - Confirm prior approvals complete

2. **Final Approval**
   ```bash
   POST /payroll-runs/:id/final-approval
   {
     "financeStaffId": "..."
   }
   ```

3. **Verify Payslip Distribution**
   ```bash
   GET /payroll-runs/:id/payslip-distribution-status
   ```

### Key Points
- ✅ Final authority before payment
- 💰 Sets payment status to PAID
- 📧 Auto-generates & distributes payslips
- 📊 Review budget alignment

---

## 🔑 Key Endpoints by Role

### Specialist
```
POST /draft/generate-automatic           # Generate draft
GET  /preview/:id                        # View dashboard
POST /payroll-runs/:id/send-for-manager-approval
```

### Manager
```
GET  /payroll-runs/:id/escalated-irregularities
POST /irregularities/resolve
POST /payroll-runs/:id/manager-review-approve
POST /payroll-runs/:id/lock
POST /payroll-runs/:id/unlock
```

### Finance
```
GET  /preview/:id
POST /payroll-runs/:id/final-approval
GET  /payroll-runs/:id/payslip-distribution-status
```

### Employees
```
GET /payslips/:id/download               # Download payslip
```

---

## ⚠️ Irregularity Types Reference

| Type | Severity | Action Required |
|------|----------|-----------------|
| Missing Bank | 🔴 High | Update bank details immediately |
| Negative Net Pay | 🔴 High | Review/adjust deductions |
| Salary Spike >50% | 🔴 High | Verify and document reason |
| Salary Spike 30-50% | 🟡 Medium | Review for accuracy |
| Deductions >60% | 🔴 High | Review deduction breakdown |
| Deductions 40-60% | 🟡 Medium | Verify legitimacy |
| Zero Salary | 🟡 Medium | Check employment status |
| Exceptions | 🔵 Low | Review error message |

🔴 High = Blocks approval
🟡 Medium = Warning only
🔵 Low = Information only

---

## 🔄 Status Flow

```
DRAFT → UNDER_REVIEW → PENDING_FINANCE_APPROVAL → APPROVED → LOCKED
  ↓         ↓                    ↓                   ↓
  └─────────┴────────────────────┴───────────────────┴→ REJECTED/UNLOCKED
```

### What You Can Do at Each Status

| Status | Can Edit | Can Approve | Can Lock | Can Unlock |
|--------|----------|-------------|----------|------------|
| DRAFT | ✅ Yes | ✅ Yes (Specialist) | ❌ No | ❌ No |
| UNDER_REVIEW | ❌ No | ✅ Yes (Manager) | ❌ No | ❌ No |
| PENDING_FINANCE | ❌ No | ✅ Yes (Finance) | ❌ No | ❌ No |
| APPROVED | ❌ No | ❌ No | ✅ Yes | ❌ No |
| LOCKED | ❌ No | ❌ No | ❌ No | ✅ Yes |
| UNLOCKED | ✅ Yes | ✅ Yes | ❌ No | ❌ No |
| REJECTED | ✅ Yes | ✅ Yes | ❌ No | ❌ No |

---

## 📊 Salary Calculation Formula

```
1. Base Salary (prorated if mid-month)
2. + Allowances (prorated)
   = GROSS SALARY

3. - Taxes (% of gross)
4. - Social Insurance (% of gross)
   = NET SALARY

5. - Unpaid Leave (gross/30 × days)
6. - Penalties (≤ net salary - minimum wage)
7. - Recoveries
8. + Refunds
   = FINAL NET PAY

Final Check: Net Pay ≥ 6000 EGP (minimum wage)
```

---

## 🎯 Common Tasks

### Generate Monthly Payroll
```bash
POST /draft/generate-automatic
{
  "entity": "Your Company Name",
  "payrollPeriod": "2025-01-31"
}
```

### Fix Missing Bank Account
```bash
# Update employee profile first (via employee-profile API)
# Then re-check preview
GET /preview/:payrollRunId
# Irregularity should be cleared
```

### Download Employee Payslip
```bash
GET /payslips/:payslipId/download
# Returns detailed breakdown as JSON
# In production: returns PDF
```

### Check Distribution Status
```bash
GET /payroll-runs/:payrollRunId/payslip-distribution-status
# Returns array of all employee distribution statuses
```

---

## 🚨 Error Messages

### "Cannot send for approval: X high-severity irregularities detected"
**Solution**: Fix all high-severity irregularities first
```bash
GET /preview/:id  # See full list
# Fix issues, then retry approval
```

### "Only APPROVED payroll runs can be locked"
**Solution**: Complete approval workflow first
```
Current: DRAFT/UNDER_REVIEW/PENDING_FINANCE
Required: APPROVED
```

### "Unlock reason is required for audit trail"
**Solution**: Provide specific, detailed unlock reason
```json
{
  "unlockReason": "❌ Bad: 'Need to fix'"
  "unlockReason": "✅ Good: 'Employee bank account was incorrect. Need to update payroll record before payment.'"
}
```

---

## 📈 Performance Tips

### For Large Organizations (>1000 employees)

1. **Use Preview Dashboard Wisely**
   - Load summary first
   - Paginate employee breakdown if implemented

2. **Schedule Draft Generation**
   - Run overnight at cycle end
   - Use cron job or scheduler

3. **Monitor Irregularities**
   - Track patterns over time
   - Proactive data quality

---

## 🆘 Troubleshooting

### Payslips Not Generated
**Check**:
1. Payroll status = APPROVED or LOCKED?
2. Finance approval completed?
3. Check system logs for errors

**Solution**:
```bash
# Manual trigger if needed
POST /payslips/generate-batch/:payrollRunId
```

### High Irregularity Count
**Prevention**:
1. Regular employee data audits
2. Bank detail collection at onboarding
3. Monitor salary changes
4. Validate leave records

### Approval Blocked
**Common Causes**:
1. High-severity irregularities remain
2. Wrong status for approval step
3. Missing required fields

**Solution**: Check preview dashboard for details

---

## 📞 Support & Documentation

### Full Documentation
- `PAYROLL_CALCULATION_FLOW.md` - Calculation details
- `IRREGULARITIES_DETECTION_GUIDE.md` - Irregularity help
- `DRAFT_GENERATION_AND_APPROVAL_WORKFLOW.md` - Workflow guide
- `MANAGER_FINANCE_AND_PAYSLIP_FEATURES.md` - Manager/Finance guide
- `COMPLETE_IMPLEMENTATION_SUMMARY.md` - Complete reference

### Quick Links
- API Base: `/payroll-execution`
- Preview Dashboard: `GET /preview/:id`
- Escalated Issues: `GET /payroll-runs/:id/escalated-irregularities`

---

## ✅ Monthly Checklist

### Payroll Specialist
- [ ] Review auto-generated draft (Day 1)
- [ ] Fix all high-severity irregularities
- [ ] Verify calculations spot-check
- [ ] Send for manager approval

### Payroll Manager
- [ ] Review escalated irregularities
- [ ] Resolve complex issues
- [ ] Approve for finance
- [ ] Lock after distribution complete

### Finance Staff
- [ ] Review total amounts vs budget
- [ ] Check exception count
- [ ] Final approval
- [ ] Verify payslip distribution

### Post-Payment
- [ ] Confirm payslips distributed
- [ ] Lock payroll
- [ ] Archive for records
- [ ] Month-end reporting

---

## 🎓 Best Practices

### DO ✅
- Review preview dashboard before approval
- Document all irregularity resolutions
- Provide detailed unlock reasons
- Lock payroll after finalization
- Monitor irregularity trends
- Keep audit trail complete

### DON'T ❌
- Approve with unresolved high-severity issues
- Unlock without specific reason
- Skip validation steps
- Ignore medium-severity warnings
- Bypass approval workflow
- Modify locked payrolls unnecessarily

---

## 📱 Mobile Access (If Implemented)

```
Dashboard: Mobile-responsive
Approval: Can approve on mobile
Payslips: Employee portal access
Notifications: Email alerts
```

---

**Version**: 1.0
**Last Updated**: February 2025
**Status**: Production Ready ✅

For detailed technical documentation, refer to the complete implementation guides in the same directory.
