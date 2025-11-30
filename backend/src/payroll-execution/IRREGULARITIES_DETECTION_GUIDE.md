# Payroll Irregularities Detection Guide

## Quick Reference

This guide provides detailed information about each type of payroll irregularity detected by the system, including causes, impacts, and recommended actions.

---

## Irregularity Types Summary

| Type | Severity | Blocks Approval | Common Cause |
|------|----------|-----------------|--------------|
| Missing Bank Account | High | ✅ Yes | Employee onboarding incomplete |
| Negative Net Pay | High | ✅ Yes | Excessive deductions |
| Salary Spike (>50%) | High | ✅ Yes | Promotion, data error |
| Salary Spike (30-50%) | Medium | ❌ No | Allowance changes, proration |
| Unusual Deductions (>60%) | High | ✅ Yes | High penalties, calculation error |
| Unusual Deductions (40-60%) | Medium | ❌ No | Multiple deductions combined |
| Zero Salary | Medium | ❌ No | All salary deducted |
| Processing Exceptions | Low | ❌ No | Validation errors |

---

## Detailed Irregularities

### 1. Missing Bank Account

**Type**: `missing_bank`
**Severity**: High ⚠️
**Blocks Approval**: Yes

#### Description
Employee has no bank account details on file, preventing payment processing.

#### Detection Logic
```typescript
if (currentDetail.bankStatus === BankStatus.MISSING) {
  // Flag as irregularity
}
```

#### Example Message
```
"Employee John Doe has missing bank account details"
```

#### Impact
- ❌ Payment cannot be processed
- ❌ Employee will not receive salary
- ❌ Manual intervention required

#### Root Causes
1. **New employee** - Bank details not collected during onboarding
2. **Bank change** - Employee changed banks but didn't update HR
3. **Data migration issue** - Details lost during system migration
4. **Incomplete profile** - Profile created without required fields

#### Recommended Actions

**For Payroll Specialists**:
1. Contact employee immediately to collect bank details
2. Update employee profile with bank account information
3. Verify account details (account number, bank code, branch)
4. Re-run payroll calculation after update

**Prevention**:
- Make bank details mandatory in employee onboarding
- Add validation to employee profile forms
- Send reminder to employees to keep details updated
- Include bank status check in pre-payroll validation

---

### 2. Negative Net Pay

**Type**: `negative_net_pay`
**Severity**: High ⚠️
**Blocks Approval**: Yes

#### Description
Employee's net pay is negative, meaning deductions exceed gross salary.

#### Detection Logic
```typescript
if (currentDetail.netPay < 0) {
  // Flag as irregularity
}
```

#### Example Message
```
"Employee Jane Smith has negative net pay: -500 EGP"
```

#### Impact
- ❌ Cannot pay employee (mathematically impossible)
- ❌ Indicates serious data issue
- ❌ May indicate fraud or system error

#### Root Causes
1. **Excessive penalties** - Misconduct penalties too high
2. **Large recovery amount** - Loan repayment exceeds salary
3. **Multiple deductions** - Combination of penalties, recoveries, unpaid leave
4. **Calculation error** - Bug in deduction logic
5. **Proration issue** - Mid-month termination with full deductions

#### Recommended Actions

**Immediate Actions**:
1. Review employee's deduction breakdown
2. Check penalties - may exceed allowed limit
3. Verify recoveries - spread large amounts over multiple months
4. Check unpaid leave days - verify accuracy
5. Review minimum wage protection logic

**Resolution Options**:
- **Reduce penalties**: Apply only what's allowed by law
- **Defer recoveries**: Spread over 3-6 months
- **Manual adjustment**: Create special payment plan
- **Investigation**: If suspected fraud or error

**Prevention**:
- Implement maximum deduction rules (e.g., max 40% of gross)
- Add validation before applying large deductions
- Review penalty policies
- Set up recovery payment plans automatically

---

### 3. Salary Spike

**Type**: `salary_spike`
**Severity**: High (>50% change) or Medium (30-50% change)
**Blocks Approval**: High severity only

#### Description
Sudden significant change in employee's net pay compared to previous month.

#### Detection Logic
```typescript
const threshold = 0.3; // 30%
const percentageChange = Math.abs(
  (currentNetPay - previousNetPay) / previousNetPay
);

if (percentageChange > threshold && previousNetPay > 0) {
  const severity = percentageChange > 0.5 ? 'high' : 'medium';
  // Flag as irregularity
}
```

#### Example Messages
```
"Employee Ahmed Hassan has sudden salary increase: 55% change"
currentValue: 15500 EGP
previousValue: 10000 EGP
threshold: 30%

"Employee Sarah Mohamed has sudden salary decrease: 35% change"
currentValue: 6500 EGP
previousValue: 10000 EGP
threshold: 30%
```

#### Impact
- ⚠️ May indicate data entry error
- ⚠️ Could be valid (promotion, demotion)
- ⚠️ Budget impact if not anticipated

#### Root Causes

**Increases (>30%)**:
1. **Promotion** - New role with higher pay grade
2. **Allowance added** - New housing or transport allowance
3. **Bonus/Retroactive pay** - One-time payment included
4. **Data error** - Incorrect salary entered
5. **Proration correction** - Previous month was prorated

**Decreases (>30%)**:
1. **Unpaid leave** - Many unpaid days this month
2. **High penalties** - Misconduct penalties applied
3. **Allowance removed** - Lost eligibility for allowances
4. **Demotion** - Lower pay grade
5. **Recovery** - Loan/advance repayment
6. **Proration** - Mid-month termination/reduced hours

#### Recommended Actions

**For Increases**:
1. Verify if promotion occurred this month
2. Check if new allowances were added
3. Review payroll configuration changes
4. Confirm with HR if legitimate

**For Decreases**:
1. Check unpaid leave days - verify attendance
2. Review penalties - confirm validity
3. Verify allowance eligibility
4. Check for unusual deductions

**When to Override**:
- ✅ Documented promotion effective this month
- ✅ Contractual allowance changes
- ✅ Known retroactive payment
- ❌ No documentation or explanation

---

### 4. Unusual Deductions

**Type**: `unusual_deduction`
**Severity**: High (>60% of gross) or Medium (40-60% of gross)
**Blocks Approval**: High severity only

#### Description
Total deductions represent an unusually high percentage of gross salary.

#### Detection Logic
```typescript
const grossSalary = baseSalary + allowances;
const deductionPercentage = (deductions / grossSalary) * 100;

if (deductionPercentage > 40 && grossSalary > 0) {
  const severity = deductionPercentage > 60 ? 'high' : 'medium';
  // Flag as irregularity
}
```

#### Example Message
```
"Employee Omar Ali has unusually high deductions: 65% of gross salary"
currentValue: 8125 EGP (deductions)
threshold: 40%
grossSalary: 12500 EGP
```

#### Impact
- ⚠️ Employee receives very low net pay
- ⚠️ May violate minimum wage laws
- ⚠️ Could affect employee morale

#### Breakdown Example
```
Gross Salary: 12,500 EGP
- Taxes (10%):           -1,250 EGP
- Insurance (11%):       -1,375 EGP
- Unpaid Leave (10 days): -4,167 EGP
- Penalties:               -800 EGP
- Recovery:                -533 EGP
────────────────────────────────────
Total Deductions:        -8,125 EGP (65%)
Net Pay:                  4,375 EGP
```

#### Root Causes
1. **High taxes** - Progressive tax bracket
2. **Excessive unpaid leave** - Many days absent
3. **Multiple penalties** - Several misconduct incidents
4. **Large recovery** - Loan repayment
5. **Calculation error** - Deductions applied multiple times

#### Recommended Actions

1. **Review Deduction Breakdown**:
   ```typescript
   - Check tax calculation accuracy
   - Verify insurance rates
   - Validate unpaid leave days
   - Review penalty amounts
   - Check recovery schedules
   ```

2. **Validate Minimum Wage**:
   - Ensure net pay ≥ statutory minimum (6000 EGP)
   - System should auto-protect this

3. **Spread Deductions**:
   - Split large recoveries over multiple months
   - Schedule penalties across pay periods

4. **Employee Communication**:
   - Notify employee of high deduction month
   - Explain breakdown clearly
   - Provide repayment schedule

---

### 5. Zero Salary

**Type**: `zero_salary`
**Severity**: Medium ⚠️
**Blocks Approval**: No

#### Description
Employee's net pay is zero despite having a base salary.

#### Detection Logic
```typescript
if (currentDetail.netPay === 0 && currentDetail.baseSalary > 0) {
  // Flag as irregularity
}
```

#### Example Message
```
"Employee Fatma Khalil has zero net pay despite having base salary"
currentValue: 0 EGP (net pay)
baseSalary: 10000 EGP
```

#### Impact
- ⚠️ Employee receives no payment
- ⚠️ May indicate unpaid leave or suspension
- ⚠️ Could be legitimate (full month unpaid leave)

#### Root Causes
1. **Full month unpaid leave** - All 30 days unpaid
2. **Suspension** - Employee suspended without pay
3. **Deductions equal salary** - Unlikely but possible
4. **Data error** - Base salary set but not processed

#### Recommended Actions

1. **Verify Employment Status**:
   - Check if employee is suspended
   - Verify unpaid leave records
   - Confirm still actively employed

2. **Review Deductions**:
   - Check if deductions exactly equal gross
   - Verify legitimacy of each deduction

3. **Confirm with HR**:
   - Validate employment status
   - Check disciplinary actions
   - Review leave records

**When Legitimate**:
- ✅ Employee on unpaid leave (entire month)
- ✅ Suspended pending investigation
- ✅ Voluntary unpaid leave (e.g., sabbatical)

---

### 6. Processing Exceptions

**Type**: `zero_salary` (reused type for exceptions)
**Severity**: Low ℹ️
**Blocks Approval**: No

#### Description
Employee has processing exception message indicating validation or calculation issue.

#### Detection Logic
```typescript
if (currentDetail.exceptions && currentDetail.exceptions.trim() !== '') {
  // Flag as irregularity
}
```

#### Example Messages
```
"Employee Hassan Ahmed has processing exception: Employee contract not found"
"Employee Laila Mohamed has processing exception: Invalid gross salary"
```

#### Impact
- ℹ️ Indicates data quality issue
- ℹ️ May affect calculation accuracy
- ℹ️ Should be resolved but not urgent

#### Common Exceptions
1. **"Employee contract not found"** - Missing contract record
2. **"Invalid gross salary"** - Salary ≤ 0 or null
3. **"Pay grade not found"** - Missing pay grade configuration
4. **"Contract expired"** - Contract end date passed
5. **"Unable to determine base salary"** - No salary source

#### Recommended Actions

1. **Review Exception Message**:
   - Read full exception text
   - Identify root cause

2. **Fix Data Issue**:
   - Update missing records
   - Correct invalid values
   - Refresh configuration

3. **Re-run Calculation**:
   - After fixing data
   - Verify exception cleared

---

## Handling Irregularities Workflow

### Step 1: Review Irregularities List

```bash
GET /payroll-execution/preview/:payrollRunId

# Review response.irregularities array
# Focus on high-severity items first
```

### Step 2: Categorize by Priority

**Priority 1: High Severity (Must Fix)**
- Missing bank accounts
- Negative net pay
- Salary spikes >50%
- Unusual deductions >60%

**Priority 2: Medium Severity (Should Review)**
- Salary spikes 30-50%
- Zero salary
- Unusual deductions 40-60%

**Priority 3: Low Severity (Nice to Fix)**
- Processing exceptions

### Step 3: Resolve High-Severity Items

For each high-severity irregularity:
1. Identify root cause
2. Fix underlying data issue
3. Re-run payroll calculation
4. Verify irregularity cleared

### Step 4: Document Resolutions

Keep audit trail:
```
Irregularity: Missing bank account (Employee: John Doe)
Resolution: Updated bank details (Account: 12345678)
Resolved By: Sarah (Payroll Specialist)
Date: 2025-02-01 10:30 AM
```

### Step 5: Attempt Approval

```bash
POST /payroll-execution/payroll-runs/:id/send-for-manager-approval

# If high-severity irregularities remain:
# Error 400: "Cannot send for approval: 2 high-severity irregularities detected"

# If successful:
# Status transitions to UNDER_REVIEW
```

---

## Reporting and Analytics

### Irregularity Frequency Report

Track most common irregularities:
```
Month: January 2025
Total Irregularities: 47

Type                    | Count | High | Medium | Low
------------------------|-------|------|--------|----
Missing Bank Account    |   8   |  8   |   0    |  0
Salary Spike            |  12   |  3   |   9    |  0
Unusual Deductions      |   9   |  2   |   7    |  0
Zero Salary             |   5   |  0   |   5    |  0
Negative Net Pay        |   3   |  3   |   0    |  0
Processing Exceptions   |  10   |  0   |   0    | 10
```

### Trends Analysis

Monitor irregularities over time:
- **Increasing missing bank accounts** → Improve onboarding
- **High salary spikes** → Better change management
- **Frequent unusual deductions** → Review deduction policies

---

## System Configuration

### Customizable Thresholds

Consider making these configurable:

```typescript
// Current hard-coded values
const SALARY_SPIKE_THRESHOLD = 0.3;  // 30%
const HIGH_SPIKE_THRESHOLD = 0.5;    // 50%
const UNUSUAL_DEDUCTION_THRESHOLD = 40; // 40% of gross
const HIGH_DEDUCTION_THRESHOLD = 60;    // 60% of gross

// Could be moved to configuration table
interface IrregularityThresholds {
  salarySpikeWarning: number;
  salarySpikeError: number;
  deductionWarning: number;
  deductionError: number;
}
```

---

## Best Practices

### For Payroll Specialists

✅ **DO**:
- Review irregularities list before sending for approval
- Fix high-severity items immediately
- Document resolution actions
- Communicate with employees about unusual deductions
- Keep historical context (why spike occurred)

❌ **DON'T**:
- Ignore medium/low severity warnings
- Force approval with unresolved high-severity items
- Skip root cause analysis
- Make assumptions without verification

### For System Administrators

✅ **DO**:
- Monitor irregularity trends
- Adjust thresholds based on organization needs
- Provide training on irregularity types
- Create resolution guides

❌ **DON'T**:
- Disable irregularity detection
- Set thresholds too high (miss real issues)
- Set thresholds too low (too many false positives)

---

## Conclusion

The irregularity detection system provides automated data quality checks that:

✅ Prevent payment errors
✅ Ensure data accuracy
✅ Flag potential fraud
✅ Maintain compliance
✅ Improve payroll reliability

By understanding each irregularity type and following proper resolution procedures, payroll specialists can ensure accurate and timely salary payments while maintaining high data quality standards.
