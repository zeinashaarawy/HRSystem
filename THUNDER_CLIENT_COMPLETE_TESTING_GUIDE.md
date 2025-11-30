# Complete Thunder Client Testing Guide - All 29 Endpoints

## 🚀 Setup

- **Base URL**: `http://localhost:3000`
- **Headers**: `Content-Type: application/json` (for POST/PUT)
- **Authentication**: Currently not required (placeholder guard)

---

## 📊 All 29 Endpoints Checklist

### Root (1 endpoint)
- [ ] 1. GET `/` - API Information

### Job Templates (5 endpoints)
- [ ] 2. POST `/templates` - Create template
- [ ] 3. GET `/templates` - List all templates
- [ ] 4. GET `/templates/:id` - Get template by ID
- [ ] 5. PUT `/templates/:id` - Update template
- [ ] 6. DELETE `/templates/:id` - Delete template

### Job Requisitions (5 endpoints)
- [ ] 7. POST `/jobs` - Create requisition
- [ ] 8. GET `/jobs` - List all requisitions
- [ ] 9. GET `/jobs/:id` - Get requisition by ID
- [ ] 10. POST `/jobs/:id/publish` - Publish job
- [ ] 11. PUT `/jobs/:id` - Update requisition

### Applications (6 endpoints)
- [ ] 12. POST `/applications` - Create application
- [ ] 13. GET `/applications` - List all applications
- [ ] 14. GET `/applications/:id` - Get application by ID
- [ ] 15. GET `/applications/:id/status` - Get status & history
- [ ] 16. POST `/applications/:id/status` - Update status
- [ ] 17. POST `/applications/:id/reject` - Send rejection

### Interviews (4 endpoints)
- [ ] 18. POST `/interviews` - Schedule interview
- [ ] 19. GET `/interviews?applicationId=xxx` - Get interviews
- [ ] 20. GET `/interviews/:id` - Get interview by ID
- [ ] 21. POST `/interviews/:id/feedback` - Submit feedback

### Referrals (2 endpoints)
- [ ] 22. POST `/referrals` - Create referral
- [ ] 23. GET `/referrals?candidateId=xxx` - Get referrals

### Offers (4 endpoints)
- [ ] 24. POST `/offers` - Create offer
- [ ] 25. GET `/offers/:id` - Get offer by ID
- [ ] 26. POST `/offers/:id/approve` - Approve offer
- [ ] 27. POST `/offers/:id/accept` - Accept offer

### Analytics (1 endpoint)
- [ ] 28. GET `/analytics/recruitment` - Get analytics

### Consent (1 endpoint)
- [ ] 29. POST `/consent` - Save consent

---

## 📝 Detailed Endpoint Tests

### 1. GET `/` - API Information

**Request:**
```
GET http://localhost:3000/
```

**Expected Response:**
```json
{
  "message": "HR Recruitment, Onboarding & Offboarding API",
  "version": "1.0",
  "documentation": "/api",
  "endpoints": { ... }
}
```

---

### 2. POST `/templates` - Create Job Template

**Request:**
```
POST http://localhost:3000/templates
Content-Type: application/json
```

**Body:**
```json
{
  "title": "Senior Software Engineer",
  "department": "Engineering",
  "qualifications": [
    "Bachelor's degree in Computer Science",
    "5+ years of experience"
  ],
  "skills": [
    "TypeScript",
    "NestJS",
    "MongoDB",
    "Node.js"
  ],
  "description": "We are looking for an experienced software engineer."
}
```

**Save the `_id` from response!**

---

### 3. GET `/templates` - List All Templates

**Request:**
```
GET http://localhost:3000/templates
```

---

### 4. GET `/templates/:id` - Get Template by ID

**Request:**
```
GET http://localhost:3000/templates/PASTE_TEMPLATE_ID_HERE
```

**Replace `PASTE_TEMPLATE_ID_HERE` with ID from step 2**

---

### 5. PUT `/templates/:id` - Update Template

**Request:**
```
PUT http://localhost:3000/templates/PASTE_TEMPLATE_ID_HERE
Content-Type: application/json
```

**Body:**
```json
{
  "title": "Senior Software Engineer - Updated",
  "department": "Engineering",
  "qualifications": [
    "Bachelor's degree in Computer Science",
    "5+ years of experience",
    "Master's degree preferred"
  ],
  "skills": [
    "TypeScript",
    "NestJS",
    "MongoDB",
    "Node.js",
    "Docker"
  ]
}
```

---

### 6. DELETE `/templates/:id` - Delete Template

**Request:**
```
DELETE http://localhost:3000/templates/PASTE_TEMPLATE_ID_HERE
```

**Expected Response:** 204 No Content

---

### 7. POST `/jobs` - Create Job Requisition

**Request:**
```
POST http://localhost:3000/jobs
Content-Type: application/json
```

**Body:**
```json
{
  "templateId": "PASTE_TEMPLATE_ID_FROM_STEP_2",
  "openings": 2,
  "location": "Remote",
  "hiringManagerId": "507f1f77bcf86cd799439011"
}
```

**Save the `_id` from response!**

---

### 8. GET `/jobs` - List All Requisitions

**Request:**
```
GET http://localhost:3000/jobs
```

---

### 9. GET `/jobs/:id` - Get Requisition by ID

**Request:**
```
GET http://localhost:3000/jobs/PASTE_REQUISITION_ID_HERE
```

---

### 10. POST `/jobs/:id/publish` - Publish Job

**Request:**
```
POST http://localhost:3000/jobs/PASTE_REQUISITION_ID_HERE/publish
```

**Expected Response:**
```json
{
  "message": "Job requisition published successfully",
  "requisitionId": "...",
  "publishStatus": "published"
}
```

---

### 11. PUT `/jobs/:id` - Update Requisition

**Request:**
```
PUT http://localhost:3000/jobs/PASTE_REQUISITION_ID_HERE
Content-Type: application/json
```

**Body:**
```json
{
  "openings": 3,
  "location": "Hybrid",
  "hiringManagerId": "507f1f77bcf86cd799439011"
}
```

---

### 12. POST `/applications` - Create Application

**Request:**
```
POST http://localhost:3000/applications
Content-Type: application/json
```

**Body:**
```json
{
  "candidateId": "507f1f77bcf86cd799439012",
  "requisitionId": "PASTE_REQUISITION_ID_FROM_STEP_7",
  "consentGiven": true,
  "consentDate": "2024-11-30T00:00:00.000Z"
}
```

**Save the `_id` from response!**

---

### 13. GET `/applications` - List All Applications

**Request:**
```
GET http://localhost:3000/applications
```

---

### 14. GET `/applications/:id` - Get Application by ID

**Request:**
```
GET http://localhost:3000/applications/PASTE_APPLICATION_ID_HERE
```

---

### 15. GET `/applications/:id/status` - Get Status & History

**Request:**
```
GET http://localhost:3000/applications/PASTE_APPLICATION_ID_HERE/status
```

**Expected Response:**
```json
{
  "application": { ... },
  "history": [ ... ]
}
```

---

### 16. POST `/applications/:id/status` - Update Status

**Request:**
```
POST http://localhost:3000/applications/PASTE_APPLICATION_ID_HERE/status
Content-Type: application/json
```

**Body:**
```json
{
  "status": "screening",
  "stage": "screening"
}
```

**Status values:** `submitted`, `screening`, `interview`, `offer`, `hired`, `rejected`  
**Stage values:** `screening`, `interview`, `offer`, `onboarding`

---

### 17. POST `/applications/:id/reject` - Send Rejection

**Request:**
```
POST http://localhost:3000/applications/PASTE_APPLICATION_ID_HERE/reject
Content-Type: application/json
```

**Body:**
```json
{
  "template": "Thank you for your interest. Unfortunately...",
  "reason": "Does not meet qualifications"
}
```

---

### 18. POST `/interviews` - Schedule Interview

**Request:**
```
POST http://localhost:3000/interviews
Content-Type: application/json
```

**Body:**
```json
{
  "applicationId": "PASTE_APPLICATION_ID_FROM_STEP_12",
  "scheduledDate": "2024-12-05T10:00:00.000Z",
  "method": "video",
  "location": "Zoom Meeting Room A",
  "interviewerIds": ["507f1f77bcf86cd799439013"],
  "notes": "Technical interview focusing on system design"
}
```

**Method values:** `in_person`, `video`, `phone`  
**Save the `_id` from response!**

---

### 19. GET `/interviews?applicationId=xxx` - Get Interviews

**Request:**
```
GET http://localhost:3000/interviews?applicationId=PASTE_APPLICATION_ID_HERE
```

**Note:** `applicationId` query parameter is required

---

### 20. GET `/interviews/:id` - Get Interview by ID

**Request:**
```
GET http://localhost:3000/interviews/PASTE_INTERVIEW_ID_FROM_STEP_18
```

---

### 21. POST `/interviews/:id/feedback` - Submit Feedback

**Request:**
```
POST http://localhost:3000/interviews/PASTE_INTERVIEW_ID_HERE/feedback
Content-Type: application/json
```

**Body:**
```json
{
  "interviewId": "PASTE_INTERVIEW_ID_HERE",
  "interviewerId": "507f1f77bcf86cd799439013",
  "technicalScore": 8,
  "communicationScore": 9,
  "cultureFitScore": 8,
  "overallScore": 8.5,
  "comments": "Strong candidate with excellent technical skills and communication",
  "recommendation": "hire"
}
```

**Scores:** Must be between 1-10  
**Recommendation:** `hire`, `reject`, `maybe`

---

### 22. POST `/referrals` - Create Referral

**Request:**
```
POST http://localhost:3000/referrals
Content-Type: application/json
```

**Body:**
```json
{
  "referringEmployeeId": "507f1f77bcf86cd799439016",
  "candidateId": "507f1f77bcf86cd799439012",
  "role": "Senior Software Engineer",
  "level": "Senior"
}
```

---

### 23. GET `/referrals?candidateId=xxx` - Get Referrals

**Request:**
```
GET http://localhost:3000/referrals?candidateId=507f1f77bcf86cd799439012
```

**Note:** `candidateId` query parameter is required

---

### 24. POST `/offers` - Create Offer

**Request:**
```
POST http://localhost:3000/offers
Content-Type: application/json
```

**Body:**
```json
{
  "applicationId": "PASTE_APPLICATION_ID_FROM_STEP_12",
  "candidateId": "507f1f77bcf86cd799439012",
  "hrEmployeeId": "507f1f77bcf86cd799439014",
  "grossSalary": 120000,
  "signingBonus": 5000,
  "benefits": ["Health Insurance", "401k", "Remote Work", "Unlimited PTO"],
  "conditions": "Standard employment terms. 90-day probation period.",
  "insurances": "Full health, dental, and vision coverage",
  "content": "We are pleased to offer you the position of Senior Software Engineer at our company.",
  "role": "Senior Software Engineer",
  "deadline": "2024-12-15T00:00:00.000Z"
}
```

**Save the `_id` from response!**

---

### 25. GET `/offers/:id` - Get Offer by ID

**Request:**
```
GET http://localhost:3000/offers/PASTE_OFFER_ID_FROM_STEP_24
```

---

### 26. POST `/offers/:id/approve` - Approve Offer

**Request:**
```
POST http://localhost:3000/offers/PASTE_OFFER_ID_HERE/approve
Content-Type: application/json
```

**Body:**
```json
{
  "approverId": "507f1f77bcf86cd799439015",
  "role": "Hiring Manager",
  "comment": "Approved - Budget confirmed and role aligned with team needs"
}
```

---

### 27. POST `/offers/:id/accept` - Accept Offer

**Request:**
```
POST http://localhost:3000/offers/PASTE_OFFER_ID_HERE/accept
Content-Type: application/json
```

**Body:**
```json
{
  "response": "accepted"
}
```

**Response values:** `accepted`, `rejected`, `pending`  
**Note:** This triggers onboarding workflow!

---

### 28. GET `/analytics/recruitment` - Get Analytics

**Request:**
```
GET http://localhost:3000/analytics/recruitment?startDate=2024-01-01&endDate=2024-12-31
```

**Query Parameters (all optional):**
- `startDate`: Start date (ISO format)
- `endDate`: End date (ISO format)
- `requisitionId`: Filter by requisition ID
- `status`: Filter by status (`submitted`, `in_process`, `offer`, `hired`, `rejected`)

**Example with all parameters:**
```
GET http://localhost:3000/analytics/recruitment?startDate=2024-01-01&endDate=2024-12-31&requisitionId=507f1f77bcf86cd799439011&status=hired
```

---

### 29. POST `/consent` - Save Consent

**Request:**
```
POST http://localhost:3000/consent
Content-Type: application/json
```

**Body:**
```json
{
  "candidateId": "507f1f77bcf86cd799439012",
  "consentGiven": true
}
```

**Note:** Consent must be `true` (BR28 requirement)

---

## 🎯 Quick Test Flow (Complete Workflow)

Follow this order to test a complete recruitment flow:

1. **GET `/`** - Verify API is running
2. **POST `/templates`** - Create template → Save `templateId`
3. **POST `/jobs`** - Create requisition → Save `requisitionId`
4. **POST `/jobs/:id/publish`** - Publish job
5. **POST `/applications`** - Create application → Save `applicationId`
6. **POST `/applications/:id/status`** - Update to screening
7. **POST `/interviews`** - Schedule interview → Save `interviewId`
8. **POST `/interviews/:id/feedback`** - Submit feedback
9. **POST `/applications/:id/status`** - Update to offer stage
10. **POST `/offers`** - Create offer → Save `offerId`
11. **POST `/offers/:id/approve`** - Approve offer
12. **POST `/offers/:id/accept`** - Accept offer (triggers onboarding!)

---

## 📋 Test Data Reference

### Valid Object IDs (MongoDB format)
Use any 24-character hex string:
- `507f1f77bcf86cd799439011`
- `507f1f77bcf86cd799439012`
- `507f1f77bcf86cd799439013`
- `507f1f77bcf86cd799439014`
- `507f1f77bcf86cd799439015`
- `507f1f77bcf86cd799439016`

### Status Enums

**Application Status:**
- `submitted`
- `screening`
- `interview`
- `offer`
- `hired`
- `rejected`

**Application Stage:**
- `screening`
- `interview`
- `offer`
- `onboarding`

**Interview Method:**
- `in_person`
- `video`
- `phone`

**Offer Response:**
- `accepted`
- `rejected`
- `pending`

**Interview Recommendation:**
- `hire`
- `reject`
- `maybe`

### Date Format
Use ISO 8601: `2024-11-30T10:00:00.000Z`

---

## 🚨 Common Errors & Solutions

### 404 Not Found
- Check URL spelling
- Verify ID exists (use GET first)
- Ensure server is running

### 400 Bad Request
- Check JSON syntax
- Verify required fields
- Check enum values match allowed options
- Ensure scores are 1-10
- Verify dates are valid ISO format

### 500 Server Error
- Check server terminal logs
- Verify MongoDB connection
- Check ObjectId format (24 hex characters)

---

## ✅ Complete Testing Checklist

Copy this to track your progress:

```
Root:
[ ] 1. GET /

Templates:
[ ] 2. POST /templates
[ ] 3. GET /templates
[ ] 4. GET /templates/:id
[ ] 5. PUT /templates/:id
[ ] 6. DELETE /templates/:id

Requisitions:
[ ] 7. POST /jobs
[ ] 8. GET /jobs
[ ] 9. GET /jobs/:id
[ ] 10. POST /jobs/:id/publish
[ ] 11. PUT /jobs/:id

Applications:
[ ] 12. POST /applications
[ ] 13. GET /applications
[ ] 14. GET /applications/:id
[ ] 15. GET /applications/:id/status
[ ] 16. POST /applications/:id/status
[ ] 17. POST /applications/:id/reject

Interviews:
[ ] 18. POST /interviews
[ ] 19. GET /interviews?applicationId=xxx
[ ] 20. GET /interviews/:id
[ ] 21. POST /interviews/:id/feedback

Referrals:
[ ] 22. POST /referrals
[ ] 23. GET /referrals?candidateId=xxx

Offers:
[ ] 24. POST /offers
[ ] 25. GET /offers/:id
[ ] 26. POST /offers/:id/approve
[ ] 27. POST /offers/:id/accept

Analytics:
[ ] 28. GET /analytics/recruitment

Consent:
[ ] 29. POST /consent
```

---

## 🎉 You're All Set!

All 29 endpoints are documented with ready-to-use examples. Copy, paste, and test!

**Pro Tip:** Use Swagger at `http://localhost:3000/api` to see interactive documentation and test endpoints directly in the browser.

