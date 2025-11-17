# Testing CRUD Operations

## Start the Server

```bash
npm run start:dev
```

The server will start on `http://localhost:3000`

## Test Endpoints

### 1. Create a Payslip (POST)

```bash
POST http://localhost:3000/payslips
Content-Type: application/json

{
  "payrollRunId": "507f1f77bcf86cd799439011",
  "employeeId": "507f1f77bcf86cd799439012",
  "breakdown": {
    "grossSalary": 5000,
    "taxes": 500,
    "insurance": 200,
    "netSalary": 4300
  },
  "fileUrl": "https://example.com/payslip.pdf"
}
```

**Using cURL:**
```bash
curl -X POST http://localhost:3000/payslips \
  -H "Content-Type: application/json" \
  -d "{\"payrollRunId\":\"507f1f77bcf86cd799439011\",\"employeeId\":\"507f1f77bcf86cd799439012\",\"breakdown\":{\"grossSalary\":5000,\"taxes\":500,\"insurance\":200,\"netSalary\":4300},\"fileUrl\":\"https://example.com/payslip.pdf\"}"
```

### 2. Get All Payslips (GET)

```bash
GET http://localhost:3000/payslips
```

**Using cURL:**
```bash
curl http://localhost:3000/payslips
```

### 3. Get Payslips by Payroll Run ID (GET with query)

```bash
GET http://localhost:3000/payslips?payrollRunId=507f1f77bcf86cd799439011
```

**Using cURL:**
```bash
curl "http://localhost:3000/payslips?payrollRunId=507f1f77bcf86cd799439011"
```

### 4. Get Payslips by Employee ID (GET with query)

```bash
GET http://localhost:3000/payslips?employeeId=507f1f77bcf86cd799439012
```

**Using cURL:**
```bash
curl "http://localhost:3000/payslips?employeeId=507f1f77bcf86cd799439012"
```

### 5. Get Single Payslip by ID (GET)

```bash
GET http://localhost:3000/payslips/{id}
```

Replace `{id}` with the actual payslip ID returned from the create operation.

**Using cURL:**
```bash
curl http://localhost:3000/payslips/507f1f77bcf86cd799439013
```

### 6. Update a Payslip (PUT)

```bash
PUT http://localhost:3000/payslips/{id}
Content-Type: application/json

{
  "fileUrl": "https://example.com/updated-payslip.pdf",
  "breakdown": {
    "grossSalary": 5500,
    "taxes": 550,
    "insurance": 220,
    "netSalary": 4730
  }
}
```

**Using cURL:**
```bash
curl -X PUT http://localhost:3000/payslips/507f1f77bcf86cd799439013 \
  -H "Content-Type: application/json" \
  -d "{\"fileUrl\":\"https://example.com/updated-payslip.pdf\"}"
```

### 7. Delete a Payslip (DELETE)

```bash
DELETE http://localhost:3000/payslips/{id}
```

**Using cURL:**
```bash
curl -X DELETE http://localhost:3000/payslips/507f1f77bcf86cd799439013
```

## Using Postman or Thunder Client

1. Import the endpoints above
2. Make sure to use the correct HTTP methods (POST, GET, PUT, DELETE)
3. For POST and PUT, include the JSON body in the request body
4. Replace `{id}` with actual IDs returned from create operations

## Notes

- The MongoDB connection string is configured in `.env` file
- ObjectIds should be valid MongoDB ObjectId format (24 hex characters)
- The server must be running before testing
- All timestamps are automatically added by Mongoose (`timestamps: true`)


