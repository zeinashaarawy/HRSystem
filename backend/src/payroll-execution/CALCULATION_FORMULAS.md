# Payroll Calculation Formulas - Quick Reference

## Core Formulas (Egyptian Labor Law 2025)

### 1. Base Salary Proration
```
Proration Factor = Worked Days / Total Days in Period

Prorated Base Salary = Base Salary × Proration Factor
```

**Example:**
- Employee hired on Jan 15, 2025
- January has 31 days
- Employee worked 17 days
- Proration = 17 / 31 = 0.548
- If Base Salary = 10,000 EGP
- Prorated Base = 10,000 × 0.548 = 5,480 EGP

### 2. Gross Salary Calculation
```
Gross Salary = Prorated Base Salary + Prorated Allowances

Where:
Prorated Allowances = Σ(Allowance Amount × Proration Factor)
```

**Example:**
- Prorated Base Salary = 10,000 EGP
- Housing Allowance = 2,000 EGP (full month)
- Transport Allowance = 500 EGP (full month)
- Proration Factor = 1.0 (full month)
- Total Allowances = (2,000 + 500) × 1.0 = 2,500 EGP
- **Gross Salary = 10,000 + 2,500 = 12,500 EGP**

### 3. Tax Deduction
```
Tax Amount = Gross Salary × Tax Rate / 100
```

**Example:**
- Gross Salary = 12,500 EGP
- Tax Rate = 10%
- **Tax Amount = 12,500 × 10 / 100 = 1,250 EGP**

### 4. Social Insurance Deduction
```
Insurance Amount = Gross Salary × Employee Insurance Rate / 100
```

**Example:**
- Gross Salary = 12,500 EGP
- Employee Insurance Rate = 11%
- **Insurance Amount = 12,500 × 11 / 100 = 1,375 EGP**

### 5. Net Salary Calculation
```
Net Salary = Gross Salary - Total Taxes - Total Insurance
```

**Example:**
- Gross Salary = 12,500 EGP
- Total Taxes = 1,250 EGP
- Total Insurance = 1,375 EGP
- **Net Salary = 12,500 - 1,250 - 1,375 = 9,875 EGP**

### 6. Unpaid Leave Deduction (Egyptian Labor Law)
```
Daily Rate = Gross Salary / 30

Unpaid Leave Deduction = Unpaid Leave Days × Daily Rate
```

**Example:**
- Gross Salary = 12,500 EGP
- Daily Rate = 12,500 / 30 = 416.67 EGP
- Unpaid Leave Days = 3
- **Unpaid Leave Deduction = 3 × 416.67 = 1,250 EGP**

### 7. Penalty Application with Minimum Wage Protection
```
Statutory Minimum Wage = 6,000 EGP (default, configurable)

Net After Unpaid Leave = Net Salary - Unpaid Leave Deduction

Max Penalty Allowed = Net After Unpaid Leave - Statutory Minimum Wage

Applied Penalty = Min(Actual Penalty, Max Penalty Allowed)
```

**Example:**
- Net Salary = 9,875 EGP
- Unpaid Leave Deduction = 1,250 EGP
- Net After Unpaid Leave = 9,875 - 1,250 = 8,625 EGP
- Statutory Minimum = 6,000 EGP
- Actual Penalty = 3,000 EGP
- Max Penalty Allowed = 8,625 - 6,000 = 2,625 EGP
- **Applied Penalty = Min(3,000, 2,625) = 2,625 EGP**

### 8. Final Net Pay Calculation
```
Net Pay = Net Salary - Unpaid Leave - Applied Penalties - Recoveries + Refunds

Final Check: If Net Pay < Statutory Minimum Wage, then Net Pay = Statutory Minimum Wage
```

**Example:**
- Net Salary = 9,875 EGP
- Unpaid Leave Deduction = 1,250 EGP
- Applied Penalties = 2,625 EGP
- Recoveries = 0 EGP
- Refunds = 200 EGP
- Net Pay = 9,875 - 1,250 - 2,625 - 0 + 200 = 6,200 EGP
- Statutory Minimum = 6,000 EGP
- 6,200 ≥ 6,000 ✓
- **Final Net Pay = 6,200 EGP**

## Overtime Formulas (Egyptian Labor Law 2025)

### 9. Hourly Rate Calculation
```
Hourly Rate = Gross Salary / Working Days per Month / Working Hours per Day

Default: Working Days = 30, Working Hours per Day = 8

Hourly Rate = Gross Salary / 30 / 8
```

**Example:**
- Gross Salary = 12,000 EGP
- **Hourly Rate = 12,000 / 30 / 8 = 50 EGP/hour**

### 10. Overtime Pay (Progressive Rates)
```
First 2 hours: Overtime Rate = 1.25 × Hourly Rate
Additional hours: Overtime Rate = 1.5 × Hourly Rate

If Overtime Hours ≤ 2:
    Overtime Pay = Overtime Hours × Hourly Rate × 1.25

If Overtime Hours > 2:
    Overtime Pay = (2 × Hourly Rate × 1.25) +
                   ((Overtime Hours - 2) × Hourly Rate × 1.5)
```

**Example 1: 1.5 hours overtime**
- Hourly Rate = 50 EGP
- Overtime Hours = 1.5
- **Overtime Pay = 1.5 × 50 × 1.25 = 93.75 EGP**

**Example 2: 5 hours overtime**
- Hourly Rate = 50 EGP
- Overtime Hours = 5
- First 2 hours = 2 × 50 × 1.25 = 125 EGP
- Additional 3 hours = 3 × 50 × 1.5 = 225 EGP
- **Overtime Pay = 125 + 225 = 350 EGP**

### 11. Missing Hours Deduction
```
Missing Hours Deduction = Missing Hours × Hourly Rate
```

**Example:**
- Missing Hours = 4
- Hourly Rate = 50 EGP
- **Missing Hours Deduction = 4 × 50 = 200 EGP**

## Resignation/Termination Benefit Formulas

### 12. Service Tenure Calculation
```
Tenure in Years = (Termination Date - Hire Date) / 365 days
```

**Example:**
- Hire Date: Jan 1, 2020
- Termination Date: Dec 31, 2024
- **Tenure = 5 years**

### 13. Gratuity Calculation (Placeholder)
```
Gratuity = (Gross Salary × Tenure Years) / 12
```

**Example:**
- Gross Salary = 12,000 EGP
- Tenure = 5 years
- **Gratuity = (12,000 × 5) / 12 = 5,000 EGP**

### 14. Accrued Leave Payout
```
Daily Rate = Gross Salary / 30

Accrued Leave Payout = Accrued Leave Days × Daily Rate
```

**Example:**
- Gross Salary = 12,000 EGP
- Accrued Leave Days = 15
- Daily Rate = 12,000 / 30 = 400 EGP
- **Accrued Leave Payout = 15 × 400 = 6,000 EGP**

### 15. Severance Pay (Termination Only)
```
Severance = Gross Salary × Tenure Years
```

**Example:**
- Gross Salary = 12,000 EGP
- Tenure = 5 years
- **Severance = 12,000 × 5 = 60,000 EGP**

## Complete Example: Full Month Employee

### Employee Profile:
- Base Salary: 10,000 EGP
- Housing Allowance: 2,000 EGP
- Transport Allowance: 500 EGP
- Tax Rate: 10%
- Insurance Rate: 11%
- Unpaid Leave Days: 2
- Penalties: 500 EGP
- Recoveries: 0 EGP
- Refunds: 0 EGP
- Worked Full Month (30/30 days)

### Step-by-Step Calculation:

1. **Proration Factor**
   - Worked Days = 30, Total Days = 30
   - Proration = 30/30 = 1.0

2. **Gross Salary**
   - Base = 10,000 × 1.0 = 10,000
   - Allowances = (2,000 + 500) × 1.0 = 2,500
   - **Gross = 10,000 + 2,500 = 12,500 EGP**

3. **Taxes**
   - **Tax = 12,500 × 10% = 1,250 EGP**

4. **Insurance**
   - **Insurance = 12,500 × 11% = 1,375 EGP**

5. **Net Salary**
   - **Net = 12,500 - 1,250 - 1,375 = 9,875 EGP**

6. **Unpaid Leave Deduction**
   - Daily Rate = 12,500 / 30 = 416.67
   - **Deduction = 2 × 416.67 = 833.34 EGP**

7. **Net After Unpaid Leave**
   - **Net = 9,875 - 833.34 = 9,041.66 EGP**

8. **Penalty Application**
   - Statutory Minimum = 6,000 EGP
   - Max Penalty = 9,041.66 - 6,000 = 3,041.66 EGP
   - Actual Penalty = 500 EGP
   - **Applied Penalty = 500 EGP** (within limit)

9. **Final Net Pay**
   - **Net Pay = 9,041.66 - 500 = 8,541.66 EGP**

### Summary:
```
Gross Salary:              12,500.00 EGP
- Taxes:                   -1,250.00 EGP
- Insurance:               -1,375.00 EGP
= Net Salary:               9,875.00 EGP
- Unpaid Leave (2 days):     -833.34 EGP
- Penalties:                 -500.00 EGP
= Final Net Pay:            8,541.66 EGP
```

## Complete Example: Mid-Month Hire

### Employee Profile:
- Hired: Jan 15, 2025 (17 days worked in 31-day month)
- Base Salary: 10,000 EGP
- Housing Allowance: 2,000 EGP
- Transport Allowance: 500 EGP
- Tax Rate: 10%
- Insurance Rate: 11%
- No unpaid leave, penalties, or deductions

### Step-by-Step Calculation:

1. **Proration Factor**
   - Worked Days = 17, Total Days = 31
   - **Proration = 17/31 = 0.548**

2. **Gross Salary**
   - Base = 10,000 × 0.548 = 5,480
   - Allowances = (2,000 + 500) × 0.548 = 1,370
   - **Gross = 5,480 + 1,370 = 6,850 EGP**

3. **Taxes**
   - **Tax = 6,850 × 10% = 685 EGP**

4. **Insurance**
   - **Insurance = 6,850 × 11% = 753.50 EGP**

5. **Net Salary**
   - **Net = 6,850 - 685 - 753.50 = 5,411.50 EGP**

6. **Final Net Pay** (no other deductions)
   - **Net Pay = 5,411.50 EGP**

### Summary:
```
Worked Days: 17/31 (54.8% of month)
Gross Salary:               6,850.00 EGP
- Taxes:                     -685.00 EGP
- Insurance:                 -753.50 EGP
= Final Net Pay:            5,411.50 EGP
```

---

## Important Notes

1. **All monetary amounts are rounded to 2 decimal places**
2. **Minimum wage protection is the final step - it overrides all calculations if necessary**
3. **Egyptian Labor Law uses 30 days for daily rate calculations, not actual month days**
4. **Proration applies to base salary AND allowances**
5. **Taxes and insurance are always calculated on gross salary (before other deductions)**
6. **Penalties are applied after unpaid leave deductions**
7. **Overtime rates differ between first 2 hours (1.25x) and additional hours (1.5x)**

## References

- Egyptian Labor Law 2025
- Social Insurance Law 2025
- Income Tax Law 2025 (Tax brackets and rates)
- Company Payroll Policies
