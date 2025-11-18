# CRUD Operations Auto-Test

## Overview

The application now includes an automatic CRUD test service that runs when the application starts. This service tests all CRUD operations (Create, Read, Update, Delete) for the `PayrollRunEmployee` model.

## How It Works

The `PayrollRunEmployeeCrudTestService` implements the `OnApplicationBootstrap` lifecycle hook, which means it automatically runs after the NestJS application has fully initialized and the MongoDB connection is established.

## What Gets Tested

1. **CREATE** - Creates a new PayrollRunEmployee record
2. **READ (All)** - Retrieves all PayrollRunEmployee records
3. **READ (By ID)** - Retrieves a specific record by ID
4. **READ (By PayrollRun ID)** - Retrieves records filtered by PayrollRun ID
5. **READ (By Employee ID)** - Retrieves records filtered by Employee ID
6. **UPDATE** - Updates the created record
7. **DELETE** - Deletes the created record
8. **VERIFY** - Verifies the record was successfully deleted

## Configuration

### Enable/Disable CRUD Tests

You can control whether the CRUD tests run by setting an environment variable in your `.env` file:

```env
# Enable CRUD tests (default: true)
RUN_CRUD_TESTS=true

# Disable CRUD tests
RUN_CRUD_TESTS=false
```

**Note:** If the variable is not set, tests will run by default (useful for development).

## Running the Application

When you start the application:

```bash
npm run start:dev
```

You will see output like this in the console:

```
[Nest] 12345  - 01/01/2025, 10:00:00 AM     LOG [PayrollRunEmployeeCrudTestService] =========================================
[Nest] 12345  - 01/01/2025, 10:00:00 AM     LOG [PayrollRunEmployeeCrudTestService] Starting CRUD Operations Test
[Nest] 12345  - 01/01/2025, 10:00:00 AM     LOG [PayrollRunEmployeeCrudTestService] =========================================
[Nest] 12345  - 01/01/2025, 10:00:00 AM     LOG [PayrollRunEmployeeCrudTestService] 1. CREATE - Creating a new PayrollRunEmployee...
[Nest] 12345  - 01/01/2025, 10:00:00 AM     LOG [PayrollRunEmployeeCrudTestService] ✓ Created successfully! ID: 507f1f77bcf86cd799439013
...
```

## Production Usage

For production environments, it's recommended to disable the CRUD tests:

```env
RUN_CRUD_TESTS=false
```

This prevents test data from being created in your production database.

## Test Data

The test uses the following sample data:
- **PayrollRun ID**: `507f1f77bcf86cd799439011`
- **Employee ID**: `507f1f77bcf86cd799439012`
- **Employee Status**: `Normal`
- **Gross Salary**: `5000`
- **Calculation Status**: `Draft` (updated to `Finalized` during update test)

The test record is created, tested, and then deleted, so it won't persist in your database after the test completes.

## Files

- **Service**: `src/payroll-run-employee/payroll-run-employee-crud-test.service.ts`
- **Module**: Registered in `src/payroll-run-employee/payroll-run-employee.module.ts`

## Troubleshooting

If you see errors:
1. Make sure MongoDB is connected and accessible
2. Check that the connection string in `.env` is correct
3. Verify that the MongoDB cluster allows connections from your IP address
4. Check the logs for specific error messages

