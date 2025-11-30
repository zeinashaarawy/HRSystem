# Postman Testing Guide - Payroll Execution API

This guide provides comprehensive instructions for testing all endpoints in the Payroll Execution subsystem using Postman.

## Setup Instructions

1. **Import the Collection**
   - Open Postman
   - Click "Import" button
   - Select `POSTMAN_COLLECTION.json` file
   - The collection will be imported with all endpoints organized by category

2. **Configure Environment Variables**
   - Create a new environment in Postman (or use the default)
   - Set `baseUrl` variable to your backend URL (default: `http://localhost:3000`)
   - Make sure your NestJS backend is running on the configured port

3. **Verify Backend is Running**
   - Ensure MongoDB is connected
   - Start the backend: `npm run start:dev`
   - Verify the server is listening on the configured port

## Testing Workflow

### Phase 1: Signing Bonuses

#### 1. Get Processed Signing Bonuses
- **Endpoint**: `GET /payroll-execution/signing-bonuses/processed`
- **Query Parameters** (optional):
  - `employeeId`: Filter by specific employee
  - `status`: Filter by status (PENDING, APPROVED, REJECTED, PAID, OVERRIDDEN)
- **Expected Response**: Array of signing bonus review items
- **Test Cases**:
  - Test without filters (should return all)
  - Test with employeeId filter
  - Test with status filter
  - Test with both filters

#### 2. Approve Signing Bonus
- **Endpoint**: `POST /payroll-execution/signing-bonuses/:id/approve`
- **Path Parameter**: `id` - Signing bonus ID
- **Body**:
  ```json
  {
    "approverId": "approver123",
    "comment": "Approved for payment",
    "paymentDate": "2025-02-15"
  }
  ```
- **Expected Response**: Updated signing bonus object with APPROVED status
- **Test Cases**:
  - Approve a pending signing bonus
  - Verify status changes to APPROVED
  - Verify approverId and comment are saved

#### 3. Manual Override Signing Bonus
- **Endpoint**: `PATCH /payroll-execution/signing-bonuses/:id/manual-override`
- **Path Parameter**: `id` - Signing bonus ID
- **Body**:
  ```json
  {
    "authorizedBy": "manager123",
    "comment": "Manual override due to special circumstances",
    "paymentDate": "2025-02-20",
    "status": "OVERRIDDEN"
  }
  ```
- **Expected Response**: Updated signing bonus with OVERRIDDEN status
- **Test Cases**:
  - Override a rejected signing bonus
  - Verify status changes to OVERRIDDEN
  - Verify authorization details are saved

### Phase 2: Termination Benefits

#### 1. Get Processed Termination Benefits
- **Endpoint**: `GET /payroll-execution/termination-benefits/processed`
- **Query Parameters** (optional):
  - `employeeId`: Filter by specific employee
  - `status`: Filter by status (PENDING, APPROVED, REJECTED, PAID, OVERRIDDEN)
- **Expected Response**: Array of termination benefit review items
- **Test Cases**: Similar to signing bonuses

#### 2. Approve Termination Benefit
- **Endpoint**: `POST /payroll-execution/termination-benefits/:id/approve`
- **Path Parameter**: `id` - Termination benefit ID
- **Body**:
  ```json
  {
    "approverId": "approver123",
    "comment": "Approved for payment"
  }
  ```
- **Expected Response**: Updated termination benefit with APPROVED status

#### 3. Manual Override Termination Benefit
- **Endpoint**: `PATCH /payroll-execution/termination-benefits/:id/manual-override`
- **Path Parameter**: `id` - Termination benefit ID
- **Body**:
  ```json
  {
    "authorizedBy": "manager123",
    "comment": "Manual override due to special circumstances",
    "status": "OVERRIDDEN"
  }
  ```
- **Expected Response**: Updated termination benefit with OVERRIDDEN status

### Phase 3: Payroll Runs - Core Operations

#### 1. Generate Draft Payroll Automatically
- **Endpoint**: `POST /payroll-execution/draft/generate-automatic`
- **Body**:
  ```json
  {
    "entity": "Main Office",
    "payrollSpecialistId": "specialist123",
    "payrollPeriod": "2025-02-01"
  }
  ```
- **Expected Response**: Created payroll run with DRAFT status
- **Test Cases**:
  - Generate draft for current period
  - Generate draft for past period
  - Verify all employees are included
  - Verify calculations are performed

#### 2. Calculate Payroll Automatically
- **Endpoint**: `POST /payroll-execution/payroll-runs/calculate-automatic`
- **Body**:
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
- **Expected Response**: Payroll calculations completed
- **Test Cases**:
  - Calculate for specific employees
  - Calculate for all employees (omit employeeIds)
  - Test with different calculation flags
  - Verify gross pay, deductions, net pay calculations

#### 3. Process Payroll Run Automatically
- **Endpoint**: `POST /payroll-execution/payroll-runs/process-automatic`
- **Body**:
  ```json
  {
    "payrollSpecialistId": "specialist123",
    "payrollPeriod": "2025-02-01",
    "entity": "Main Office"
  }
  ```
- **Expected Response**: Processed payroll run
- **Test Cases**:
  - Process a new payroll run
  - Verify status progression
  - Verify all employees processed

### Phase 4: Payroll Runs - Review and Approval

#### 1. Get Payroll Runs for Review
- **Endpoint**: `GET /payroll-execution/payroll-runs/review`
- **Query Parameters** (optional):
  - `status`: Filter by status
  - `payrollPeriod`: Filter by period (YYYY-MM-DD)
- **Expected Response**: Array of payroll runs available for review
- **Test Cases**:
  - Get all runs for review
  - Filter by status
  - Filter by period
  - Combine filters

#### 2. Get Payroll Preview Dashboard
- **Endpoint**: `GET /payroll-execution/preview/:payrollRunId`
- **Path Parameter**: `payrollRunId` - Payroll run ID
- **Expected Response**: Dashboard object with:
  - Summary (totals, counts)
  - Irregularities list
  - Employee breakdown
  - Approval workflow status
- **Test Cases**:
  - View dashboard for draft run
  - View dashboard for approved run
  - Verify all summary calculations
  - Verify irregularities are detected

#### 3. Review Payroll Run
- **Endpoint**: `POST /payroll-execution/payroll-runs/:id/review`
- **Path Parameter**: `id` - Payroll run ID
- **Body** (Approve):
  ```json
  {
    "action": "approve",
    "reviewerId": "reviewer123",
    "comment": "Reviewed and approved"
  }
  ```
- **Body** (Reject):
  ```json
  {
    "action": "reject",
    "reviewerId": "reviewer123",
    "comment": "Rejected due to errors",
    "rejectionReason": "Calculation errors found"
  }
  ```
- **Expected Response**: Updated payroll run
- **Test Cases**:
  - Approve a draft run
  - Reject a draft run with reason
  - Verify status changes appropriately

#### 4. Edit Payroll Run
- **Endpoint**: `PATCH /payroll-execution/payroll-runs/:id/edit`
- **Path Parameter**: `id` - Payroll run ID
- **Body**:
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
- **Expected Response**: Updated payroll run
- **Test Cases**:
  - Edit unlocked payroll run
  - Attempt to edit locked run (should fail)
  - Verify changes are saved

### Phase 5: Approval Workflow

#### 1. Send for Manager Approval
- **Endpoint**: `POST /payroll-execution/payroll-runs/:id/send-for-manager-approval`
- **Path Parameter**: `id` - Payroll run ID
- **Body**:
  ```json
  {
    "payrollSpecialistId": "specialist123"
  }
  ```
- **Expected Response**: Payroll run status updated to pending manager approval
- **Test Cases**:
  - Send draft run for manager approval
  - Verify workflow status updates

#### 2. Manager Review and Approve
- **Endpoint**: `POST /payroll-execution/payroll-runs/:id/manager-review-approve`
- **Path Parameter**: `id` - Payroll run ID
- **Body**:
  ```json
  {
    "payrollManagerId": "manager123",
    "comment": "Reviewed and approved by manager"
  }
  ```
- **Expected Response**: Payroll run approved by manager
- **Test Cases**:
  - Approve as manager
  - Verify manager approval date is set
  - Verify status progression

#### 3. Send for Finance Approval
- **Endpoint**: `POST /payroll-execution/payroll-runs/:id/send-for-finance-approval`
- **Path Parameter**: `id` - Payroll run ID
- **Body**:
  ```json
  {
    "payrollManagerId": "manager123"
  }
  ```
- **Expected Response**: Payroll run sent for finance approval
- **Test Cases**:
  - Send manager-approved run to finance
  - Verify workflow status updates

#### 4. Final Approval by Finance
- **Endpoint**: `POST /payroll-execution/payroll-runs/:id/final-approval`
- **Path Parameter**: `id` - Payroll run ID
- **Body**:
  ```json
  {
    "financeStaffId": "finance123"
  }
  ```
- **Expected Response**: Payroll run finally approved
- **Test Cases**:
  - Final approval by finance
  - Verify finance approval date is set
  - Verify status is COMPLETED

### Phase 6: Lock/Unlock Operations

#### 1. Lock Payroll
- **Endpoint**: `POST /payroll-execution/payroll-runs/:id/lock`
- **Path Parameter**: `id` - Payroll run ID
- **Body**:
  ```json
  {
    "payrollManagerId": "manager123",
    "comment": "Locked for final processing"
  }
  ```
- **Expected Response**: Payroll run locked
- **Test Cases**:
  - Lock a payroll run
  - Attempt to edit locked run (should fail)
  - Verify lock status

#### 2. Unlock Payroll
- **Endpoint**: `POST /payroll-execution/payroll-runs/:id/unlock`
- **Path Parameter**: `id` - Payroll run ID
- **Body**:
  ```json
  {
    "payrollManagerId": "manager123",
    "unlockReason": "Need to make corrections",
    "comment": "Unlocking for corrections"
  }
  ```
- **Expected Response**: Payroll run unlocked
- **Test Cases**:
  - Unlock a locked run
  - Verify unlock allows edits
  - Verify unlock reason is saved

### Phase 7: Irregularities

#### 1. Get Escalated Irregularities
- **Endpoint**: `GET /payroll-execution/payroll-runs/:id/escalated-irregularities`
- **Path Parameter**: `id` - Payroll run ID
- **Expected Response**: Array of escalated irregularities
- **Test Cases**:
  - Get irregularities for run with issues
  - Verify all irregularity types are detected
  - Verify severity levels are correct

#### 2. Resolve Escalated Irregularity
- **Endpoint**: `POST /payroll-execution/irregularities/resolve`
- **Body**:
  ```json
  {
    "irregularityId": "irregularity123",
    "resolution": "Issue resolved after verification",
    "resolvedBy": "manager123",
    "action": "resolve"
  }
  ```
- **Expected Response**: Irregularity resolved
- **Test Cases**:
  - Resolve an irregularity
  - Reject an irregularity (action: "reject")
  - Verify resolution is saved
  - Verify status updates

### Phase 8: Payslips

#### 1. Generate Payslip
- **Endpoint**: `POST /payroll-execution/payslips/generate`
- **Body**:
  ```json
  {
    "employeeId": "emp123",
    "payrollRunId": "run123"
  }
  ```
- **Expected Response**: Generated payslip
- **Test Cases**:
  - Generate payslip for employee
  - Verify all payslip details are correct
  - Verify calculations match payroll run

#### 2. Generate Payslips for Payroll Run (Batch)
- **Endpoint**: `POST /payroll-execution/payslips/generate-batch/:payrollRunId`
- **Path Parameter**: `payrollRunId` - Payroll run ID
- **Expected Response**: Batch generation result
- **Test Cases**:
  - Generate payslips for all employees
  - Verify all payslips are created
  - Verify generation status

#### 3. Get Payslip
- **Endpoint**: `GET /payroll-execution/payslips?employeeId=emp123&payrollRunId=run123`
- **Query Parameters**:
  - `employeeId`: Employee ID (required)
  - `payrollRunId`: Payroll run ID (required)
- **Expected Response**: Payslip object
- **Test Cases**:
  - Get existing payslip
  - Verify all payslip fields
  - Test with non-existent payslip (should return 404)

#### 4. Get Payslips for Payroll Run
- **Endpoint**: `GET /payroll-execution/payslips/payroll-run/:payrollRunId`
- **Path Parameter**: `payrollRunId` - Payroll run ID
- **Expected Response**: Array of payslips
- **Test Cases**:
  - Get all payslips for a run
  - Verify count matches employee count
  - Verify all payslips are returned

#### 5. Download Payslip PDF
- **Endpoint**: `GET /payroll-execution/payslips/:id/download`
- **Path Parameter**: `id` - Payslip ID
- **Expected Response**: PDF file download
- **Test Cases**:
  - Download payslip PDF
  - Verify PDF is generated correctly
  - Verify PDF contains all required information

#### 6. Resend Payslip
- **Endpoint**: `POST /payroll-execution/payslips/:id/resend`
- **Path Parameter**: `id` - Payslip ID
- **Body**:
  ```json
  {
    "distributionMethod": "email"
  }
  ```
- **Expected Response**: Payslip resent confirmation
- **Test Cases**:
  - Resend via email
  - Resend via portal
  - Verify distribution status updates

#### 7. Get Payslip Distribution Status
- **Endpoint**: `GET /payroll-execution/payroll-runs/:id/payslip-distribution-status`
- **Path Parameter**: `id` - Payroll run ID
- **Expected Response**: Distribution status for all payslips
- **Test Cases**:
  - Get distribution status
  - Verify sent/failed/pending counts
  - Verify individual payslip statuses

## Complete Testing Workflow

### Recommended Testing Order:

1. **Setup Phase**
   - Generate draft payroll
   - Calculate payroll
   - Process payroll run

2. **Review Phase**
   - Get payroll preview dashboard
   - Review payroll run
   - Check for irregularities

3. **Approval Phase**
   - Send for manager approval
   - Manager review and approve
   - Send for finance approval
   - Final approval by finance

4. **Payslip Phase**
   - Generate payslips (batch)
   - Get payslips
   - Download payslip PDF
   - Check distribution status
   - Resend payslip if needed

5. **Bonus/Benefit Phase**
   - Get processed signing bonuses
   - Approve/manually override signing bonuses
   - Get processed termination benefits
   - Approve/manually override termination benefits

## Common Test Scenarios

### Scenario 1: Complete Payroll Cycle
1. Generate draft payroll
2. Calculate payroll
3. Review and approve
4. Send through approval workflow
5. Generate payslips
6. Distribute payslips

### Scenario 2: Error Handling
1. Try to edit locked payroll (should fail)
2. Try to approve without proper permissions (should fail)
3. Try to generate payslip for non-existent run (should fail)
4. Try to resolve non-existent irregularity (should fail)

### Scenario 3: Edge Cases
1. Process payroll with no employees
2. Process payroll with all employees having irregularities
3. Approve payroll with unresolved irregularities
4. Generate payslips for incomplete payroll run

## Expected Response Codes

- **200 OK**: Successful GET, PATCH, or successful operation
- **201 Created**: Successful POST creating new resource
- **400 Bad Request**: Invalid request data
- **404 Not Found**: Resource not found
- **403 Forbidden**: Insufficient permissions
- **500 Internal Server Error**: Server error

## Tips for Testing

1. **Use Variables**: Store IDs from responses in Postman variables for reuse
2. **Test Data**: Ensure you have test data in MongoDB before testing
3. **Sequential Testing**: Some endpoints depend on previous operations
4. **Error Cases**: Test both success and error scenarios
5. **Validation**: Verify response structure matches expected DTOs
6. **State Management**: Be aware of payroll run status when testing

## Troubleshooting

### Common Issues:

1. **Connection Refused**
   - Verify backend is running
   - Check port number matches baseUrl

2. **404 Not Found**
   - Verify endpoint path is correct
   - Check if resource exists in database

3. **400 Bad Request**
   - Verify request body matches DTO structure
   - Check required fields are provided
   - Validate data types

4. **500 Internal Server Error**
   - Check backend logs
   - Verify MongoDB connection
   - Check for missing dependencies

## Notes

- All dates should be in ISO format (YYYY-MM-DD)
- IDs should be valid MongoDB ObjectIds or existing IDs from your database
- Replace placeholder IDs with actual IDs from your test data
- Some endpoints may require specific payroll run statuses to work correctly
- The approval workflow must be followed in order: Specialist → Manager → Finance

