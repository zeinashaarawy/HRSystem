# Payroll Calculation Flow

## Overview

This document describes the payroll calculation process implemented in the HRSystem, which complies with Egyptian Labor Law 2025 and includes automatic deductions, statutory rules, and salary calculations.

## Calculation Steps

### Step 1: Determine Base Salary
- Source: Employee contract or Pay Grade
- Validation: Must have active employment contract with defined role and salary
- Compliance: Contract must have valid start/end dates

### Step 2: Calculate Proration (Mid-Month Hires/Terminations)
- Formula: `Proration Factor = Worked Days / Total Days in Period`
- Used for: New hires starting mid-month, terminations, or partial work periods
- Example: Employee hired on Jan 15th works 17 days in 31-day month = 17/31 = 0.548 proration

### Step 3: Calculate Allowances
- Applied to: All approved allowances from payroll configuration
- Proration: Allowances are prorated based on worked days
- Examples: Housing allowance, transportation allowance, meal allowance

### Step 4: Calculate Gross Salary
```
Gross Salary = Base Salary + Total Allowances
```

### Step 5: Deduction Phase 1 - Taxes
- Applied to: Gross Salary
- Source: Tax rules from payroll configuration
- Calculation: `Tax Amount = Gross Salary × Tax Rate / 100`
- Compliance: Based on Egyptian income tax law 2025

### Step 6: Deduction Phase 2 - Social/Health Insurance
- Applied to: Gross Salary
- Source: Insurance brackets from payroll configuration
- Components:
  - Employee contribution (deducted from salary)
  - Employer contribution (company cost, not deducted)
- Calculation: `Insurance Amount = Gross Salary × Employee Rate / 100`
- Compliance: Egyptian social insurance law 2025

### Step 7: Calculate Net Salary
```
Net Salary = Gross Salary - Taxes - Social Insurance
```

### Step 8: Deduction Phase 3 - Unpaid Leave Days
- Formula: `Daily Rate = Gross Salary / 30` (Egyptian Labor Law)
- Calculation: `Unpaid Leave Deduction = Unpaid Leave Days × Daily Rate`
- Applied after: Net salary calculation

### Step 9: Deduction Phase 4 - Penalties
- Source: Employee penalties from misconduct records
- Constraint: **Must not reduce salary below statutory minimum wage**
- Calculation:
  ```
  Max Penalty = Net Salary - Statutory Minimum Wage
  Applied Penalty = Min(Actual Penalty, Max Penalty)
  ```
- Compliance: Egyptian Labor Law minimum wage protection

### Step 10: Apply Recoveries and Refunds
- Recoveries: Amounts company needs to recover from employee (loans, advances)
- Refunds: Amounts to be refunded to employee
- Applied to: Net pay after penalties

### Step 11: Calculate Final Net Pay
```
Net Pay = Net Salary - Unpaid Leave - Penalties - Recoveries + Refunds
```

**Final Protection**: Net pay cannot go below statutory minimum wage

## Deductions Sequencing

The system ensures deductions are applied in the correct order:

1. **Gross Salary Calculation** (Base + Allowances)
2. **Statutory Deductions** (Taxes + Insurance) → Net Salary
3. **Operational Deductions** (Unpaid Leave + Penalties + Recoveries) → Net Pay
4. **Additions** (Refunds)
5. **Minimum Wage Protection** (Final safety check)

## Egyptian Labor Law 2025 Compliance

### Key Requirements Implemented:

1. **Active Employment Contract Required**
   - Must have defined role, type, start/end dates, and salary basis

2. **Payroll Cycles**
   - Supports monthly payroll cycles
   - Period-based processing

3. **Salary Structure**
   - Base pay + Allowances + Variable pay elements
   - All components properly tracked

4. **Local Tax Law Customization**
   - Tax rules configurable per Egyptian law
   - Insurance brackets configurable

5. **Penalty Constraints**
   - Misconduct penalties must not reduce salary below statutory minimum wage
   - Default minimum: 6000 EGP (configurable via contract/pay grade)

6. **Net Salary Calculation**
   - Formula: `Net Salary = Gross Salary - Taxes - Social Insurance`
   - Transparent breakdown provided

7. **Unpaid Leave Deductions**
   - Daily rate calculation: Gross Salary / 30 days
   - Applied after gross salary calculation

8. **Prorated Salaries**
   - Automatic calculation for mid-month hires/terminations
   - Based on actual days worked

## Payroll Schema Structure

### Payroll Area
- Batch of employees processed together
- Same payroll period
- Same entity/organization

### Payroll Schema
- Set of rules and operations defining payroll logic
- Includes:
  - Tax rules
  - Insurance brackets
  - Allowance configurations
  - Deduction rules

## Integration Points

### Required from Other Subsystems:

1. **Time Management**
   - Working hours/days
   - Overtime hours
   - Missing hours/days
   - Attendance records

2. **Leave Management**
   - Paid leave days
   - Unpaid leave days
   - Accrued leave balance

3. **Employee Profile**
   - Active status (ACTIVE or PROBATION)
   - Contract details
   - Bank account information
   - Pay grade assignment

4. **Recruitment/Contract Management**
   - Active contracts
   - Salary basis
   - Start/end dates
   - Contract type

## API Endpoints

### Payroll Processing

1. **POST** `/payroll-execution/payroll-runs/process-automatic`
   - Initiate new payroll run
   - Requires: payrollPeriod, entity, payrollSpecialistId

2. **POST** `/payroll-execution/payroll-runs/calculate-automatic`
   - Calculate payroll for all or specific employees
   - Applies all deductions and statutory rules
   - Creates employee payroll details

3. **POST** `/payroll-execution/payroll-runs/:id/review`
   - Review and approve/reject payroll run
   - Workflow: DRAFT → UNDER_REVIEW → PENDING_FINANCE_APPROVAL → APPROVED

### Payslip Generation

1. **POST** `/payroll-execution/payslips/generate`
   - Generate payslip for specific employee
   - Requires: employeeId, payrollRunId

2. **POST** `/payroll-execution/payslips/generate-batch/:payrollRunId`
   - Generate payslips for all employees in approved payroll run

3. **GET** `/payroll-execution/payslips`
   - Retrieve specific payslip
   - Query params: employeeId, payrollRunId

4. **GET** `/payroll-execution/payslips/payroll-run/:payrollRunId`
   - Get all payslips for a payroll run

## Payslip Structure

```json
{
  "employeeId": "ObjectId",
  "payrollRunId": "ObjectId",
  "earningsDetails": {
    "baseSalary": 10000,
    "allowances": [
      { "name": "Housing", "amount": 2000 },
      { "name": "Transportation", "amount": 500 }
    ],
    "bonuses": [],
    "benefits": [],
    "refunds": [{ "name": "Refund", "amount": 100 }]
  },
  "deductionsDetails": {
    "taxes": [
      { "name": "Income Tax", "rate": 10, "amount": 1250 }
    ],
    "insurances": [
      { "name": "Social Insurance", "employeeRate": 11, "employeeAmount": 1375 }
    ],
    "penalties": {
      "reason": "Misconduct penalties",
      "amount": 200
    }
  },
  "totalGrossSalary": 12500,
  "totaDeductions": 2825,
  "netPay": 9775,
  "paymentStatus": "pending"
}
```

## Validation Rules

### Employee Eligibility:
- Status must be ACTIVE or PROBATION
- Must not be SUSPENDED
- Must have valid active contract
- Contract must not be expired
- Contract must have valid gross salary > 0

### Payroll Run:
- Must be in DRAFT status for calculation
- Must be APPROVED for payslip generation
- Cannot modify LOCKED or APPROVED runs

## Error Handling

The system tracks exceptions for:
- Employees without contracts
- Invalid contract dates
- Missing salary information
- Suspended employees
- Expired contracts
- Invalid gross salary values

These are logged in the payroll run exceptions count and detailed in the system logs.

## Future Enhancements

1. **Time Management Integration**
   - Real-time working hours tracking
   - Overtime automatic calculation
   - Missing hours penalty application

2. **Leave Management Integration**
   - Automatic unpaid leave day calculation
   - Accrued leave payout on termination
   - Leave balance impact on salary

3. **Bank Integration**
   - Direct payment processing
   - Payment status tracking
   - Bank file generation

4. **Multi-Currency Support**
   - Foreign employee handling
   - Currency conversion
   - Exchange rate management

5. **Advanced Tax Brackets**
   - Progressive tax calculation
   - Tax exemptions
   - Dependent allowances
