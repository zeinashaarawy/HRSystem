# MongoDB CRUD Operations Test Guide

## Connection
The application is configured to connect to:
```
mongodb+srv://user:mdp067QvT0Tnb5WR@hr-system-cluster.xagcoyo.mongodb.net/
```

## Start the Application
```bash
npm run start:dev
```

The server will start on `http://localhost:3000`

## CRUD Endpoints

### 1. Create (POST)
```bash
POST http://localhost:3000/payroll-schemas
Content-Type: application/json

{
  "name": "Test Payroll Schema",
  "description": "This is a test payroll schema",
  "status": "pending"
}
```

### 2. Read All (GET)
```bash
GET http://localhost:3000/payroll-schemas
```

### 3. Read One (GET)
```bash
GET http://localhost:3000/payroll-schemas/{id}
```

### 4. Update (PUT)
```bash
PUT http://localhost:3000/payroll-schemas/{id}
Content-Type: application/json

{
  "name": "Updated Payroll Schema",
  "status": "approved"
}
```

### 5. Delete (DELETE)
```bash
DELETE http://localhost:3000/payroll-schemas/{id}
```

## Using cURL Examples

### Create
```bash
curl -X POST http://localhost:3000/payroll-schemas \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test Schema\",\"description\":\"Test description\",\"status\":\"pending\"}"
```

### Get All
```bash
curl http://localhost:3000/payroll-schemas
```

### Get One
```bash
curl http://localhost:3000/payroll-schemas/{id}
```

### Update
```bash
curl -X PUT http://localhost:3000/payroll-schemas/{id} \
  -H "Content-Type: application/json" \
  -d "{\"status\":\"approved\"}"
```

### Delete
```bash
curl -X DELETE http://localhost:3000/payroll-schemas/{id}
```

