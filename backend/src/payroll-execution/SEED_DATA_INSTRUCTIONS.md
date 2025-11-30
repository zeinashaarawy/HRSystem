# Payroll Execution Test Data Seeding Instructions

## Overview

This guide will help you seed test data into your MongoDB database to test all 28 Payroll Execution API endpoints with Postman.

## Database Connection

**MongoDB URI**: `mongodb+srv://user:mdp067QvT0Tnb5WR@hr-system-cluster.xagcoyo.mongodb.net/hrsystem?retryWrites=true&w=majority`

## Method 1: Using TypeScript Seed Script (Recommended)

### Step 1: Run the Seed Script

```powershell
cd "HRSystem\backend"
npx ts-node src/payroll-execution/seed-payroll-test-data.ts
```

### Step 2: Verify Data

The script will create:
- ✅ 8 Employee profiles (5 regular employees + 3 payroll staff)
- ✅ 3 Payroll runs (DRAFT, UNDER_REVIEW, PENDING_FINANCE_APPROVAL)
- ✅ 5 Employee payroll details
- ✅ 3 Signing bonuses (PENDING, APPROVED, REJECTED)

### Step 3: Use the IDs

The script will output important IDs that you can use in Postman:
- Employee IDs
- Payroll Run IDs
- Payroll Specialist/Manager/Finance Staff IDs

## Method 2: Using MongoDB Compass or MongoDB Shell

If you prefer to insert data directly, you can use the JSON data files provided below.

## Test Data Created

### Employees Created

| Employee Number | Name | Role | Status |
|---------------|------|------|--------|
| EMP001 | John Doe | Regular Employee | ACTIVE |
| EMP002 | Jane Smith | Regular Employee | ACTIVE |
| EMP003 | Mike Johnson | Regular Employee | ACTIVE |
| EMP004 | Sarah Williams | Regular Employee | ACTIVE |
| EMP005 | David Brown | Regular Employee | ACTIVE |
| EMP006 | Payroll Specialist | Payroll Staff | ACTIVE |
| EMP007 | Payroll Manager | Payroll Manager | ACTIVE |
| EMP008 | Finance Staff | Finance Staff | ACTIVE |

### Payroll Runs Created

1. **PR-TEST-2025-001** - Status: DRAFT
2. **PR-TEST-2025-002** - Status: UNDER_REVIEW
3. **PR-TEST-2025-003** - Status: PENDING_FINANCE_APPROVAL

### Signing Bonuses Created

- Employee EMP001: PENDING
- Employee EMP002: APPROVED
- Employee EMP003: REJECTED

## Postman Testing Guide

### 1. Get Processed Signing Bonuses
```
GET http://localhost:3000/payroll-execution/signing-bonuses/processed
```

### 2. Approve Signing Bonus
```
POST http://localhost:3000/payroll-execution/signing-bonuses/{signingBonusId}/approve
Body: {
  "approverId": "{payrollManagerId}",
  "comment": "Approved for payment",
  "paymentDate": "2025-02-15"
}
```

### 3. Get Payroll Runs for Review
```
GET http://localhost:3000/payroll-execution/payroll-runs/review
```

### 4. Get Payroll Preview Dashboard
```
GET http://localhost:3000/payroll-execution/preview/{payrollRunId}
```

### 5. Review Payroll Run
```
POST http://localhost:3000/payroll-execution/payroll-runs/{payrollRunId}/review
Body: {
  "action": "approve",
  "reviewerId": "{payrollManagerId}",
  "comment": "Reviewed and approved"
}
```

### 6. Send for Manager Approval
```
POST http://localhost:3000/payroll-execution/payroll-runs/{payrollRunId}/send-for-manager-approval
Body: {
  "payrollSpecialistId": "{payrollSpecialistId}"
}
```

### 7. Generate Draft Payroll
```
POST http://localhost:3000/payroll-execution/draft/generate-automatic
Body: {
  "entity": "Main Office",
  "payrollSpecialistId": "{payrollSpecialistId}",
  "payrollPeriod": "2025-02-01"
}
```

### 8. Calculate Payroll
```
POST http://localhost:3000/payroll-execution/payroll-runs/calculate-automatic
Body: {
  "payrollPeriod": "2025-02-01",
  "entity": "Main Office",
  "includeAllowances": true,
  "includeInsurance": true,
  "includeTaxes": true
}
```

## Important Notes

1. **Replace Placeholders**: Replace `{payrollRunId}`, `{employeeId}`, etc. with actual IDs from the seed output
2. **MongoDB Connection**: Ensure your MongoDB connection is working
3. **Server Running**: Make sure your NestJS server is running on port 3000
4. **Collection Names**: The data will be inserted into these collections:
   - `employee_profiles`
   - `payrollruns`
   - `employeepayrolldetails`
   - `employeesigningbonuses`

## Troubleshooting

### Error: Cannot find module
```powershell
npm install -g ts-node typescript
```

### Error: MongoDB connection failed
- Verify the MongoDB URI is correct
- Check your internet connection
- Verify MongoDB Atlas allows connections from your IP

### Error: Model not found
- Make sure all modules are properly imported in AppModule
- Verify the model names match exactly

## Next Steps

After seeding:
1. ✅ Start your server: `npm start`
2. ✅ Import `POSTMAN_COLLECTION.json` into Postman
3. ✅ Replace placeholder IDs with actual IDs from seed output
4. ✅ Test all 28 endpoints
5. ✅ Verify responses match expected formats

## Clean Up (Optional)

To remove test data:
```typescript
// Uncomment the cleanup section in the seed script
await employeeSigningBonusModel.deleteMany({});
await employeePayrollDetailsModel.deleteMany({});
await payrollRunModel.deleteMany({ runId: { $regex: /^PR-TEST-/ } });
```

Or manually delete from MongoDB:
```javascript
db.employeesigningbonuses.deleteMany({});
db.employeepayrolldetails.deleteMany({});
db.payrollruns.deleteMany({ runId: /^PR-TEST-/ });
```

