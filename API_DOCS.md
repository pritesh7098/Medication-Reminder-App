
```markdown
# MediFor7 API Documentation
MediFor7 API Documentation
MediFor7 - Medication Reminder App is a user-friendly web/mobile application designed to help users manage their medication schedules effectively. The application aims to reduce missed doses and improve medication adherence through timely reminders and tracking.


## Base URL
```http
http://localhost:3000/api
```

## Authentication
Most endpoints require JWT authentication. Include the token in the Authorization header:
```http
Authorization: Bearer <your_jwt_token>
```

## API Endpoints

### Authentication APIs

#### 1. Register User
```http
POST /auth/register
```
**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```
**Response (201):**
```json
{
  "message": "User registered successfully",
  "user": {
    "name": "string",
    "role": "patient"
  }
}
```

#### 2. Admin Registration
```http
POST /auth/register-admin
```
**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "adminSecret": "string"  // Must match ADMIN_SECRET_KEY in backend .env
}
```
**Response (201):**
```json
{
  "message": "Admin registered successfully",
  "user": {
    "name": "string",
    "role": "admin"
  }
}
```

#### 3. Login
```http
POST /auth/login
```
**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```
**Response (200):**
```json
{
  "token": "jwt_token_string",
  "user": {
    "name": "string",
    "role": "string"
  }
}
```

#### 4. Get Profile
```http
GET /auth/profile
```
**Headers Required:** Authorization Bearer Token
**Response (200):**
```json
{
  "user": {
    "name": "string",
    "email": "string",
    "role": "string"
  }
}
```

### Medicine Management APIs

#### 1. Create Medicine
```http
POST /createMed
```
**Headers Required:** Authorization Bearer Token
**Request Body:**
```json
{
  "medicineName": "string",
  "dosage": "string",
  "frequency": "string",
  "startDate": "date",
  "endDate": "date",
  "time": ["string"]
}
```
**Response (201):**
```json
{
  "message": "Medicine created successfully",
  "medicine": {
    "id": "string",
    "medicineName": "string",
    "dosage": "string",
    "frequency": "string",
    "startDate": "date",
    "endDate": "date",
    "time": ["string"]
  }
}
```

#### 2. Get All Medicines
```http
GET /getMed
```
**Headers Required:** Authorization Bearer Token
**Response (200):**
```json
{
  "medicines": [
    {
      "id": "string",
      "medicineName": "string",
      "dosage": "string",
      "frequency": "string",
      "startDate": "date",
      "endDate": "date",
      "time": ["string"]
    }
  ]
}
```

#### 3. Get Single Medicine
```http
GET /getSingleMed/:id
```
**Headers Required:** Authorization Bearer Token
**Parameters:** id (medicine ID)
**Response (200):**
```json
{
  "medicine": {
    "id": "string",
    "medicineName": "string",
    "dosage": "string",
    "frequency": "string",
    "startDate": "date",
    "endDate": "date",
    "time": ["string"]
  }
}
```

#### 4. Update Medicine
```http
PUT /updateMed/:id
```
**Headers Required:** Authorization Bearer Token
**Parameters:** id (medicine ID)
**Request Body:**
```json
{
  "medicineName": "string",
  "dosage": "string",
  "frequency": "string",
  "startDate": "date",
  "endDate": "date",
  "time": ["string"]
}
```
**Response (200):**
```json
{
  "message": "Medicine updated successfully",
  "medicine": {
    "id": "string",
    "medicineName": "string",
    "dosage": "string",
    "frequency": "string",
    "startDate": "date",
    "endDate": "date",
    "time": ["string"]
  }
}
```

#### 5. Delete Medicine
```http
DELETE /Delete/:id
```
**Headers Required:** Authorization Bearer Token
**Parameters:** id (medicine ID)
**Response (200):**
```json
{
  "message": "Medicine deleted successfully"
}
```

### Acknowledgment APIs

#### 1. Create Acknowledgment
```http
POST /createAck
```
**Headers Required:** Authorization Bearer Token
**Request Body:**
```json
{
  "medicineId": "string",
  "status": "boolean"
}
```
**Response (201):**
```json
{
  "message": "Acknowledgment created successfully",
  "acknowledgment": {
    "id": "string",
    "medicineId": "string",
    "status": "boolean",
    "timestamp": "date"
  }
}
```

### Admin APIs

#### 1. Get User Logs
```http
GET /getUsersLog
```
**Headers Required:** Authorization Bearer Token (Admin only)
**Response (200):**
```json
{
  "logs": [
    {
      "userId": "string",
      "medicineId": "string",
      "status": "boolean",
      "timestamp": "date"
    }
  ]
}
```

#### 2. Get All Logs (Admin Only)
```http
GET /getAllLogs-AdminOnly
```
**Headers Required:** Authorization Bearer Token (Admin only)
**Response (200):**
```json
{
  "logs": [
    {
      "userId": "string",
      "medicineId": "string",
      "action": "string",
      "timestamp": "date"
    }
  ]
}
```

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "error": "Invalid request parameters"
}
```

### 401 Unauthorized
```json
{
  "error": "Authentication required"
}
```

### 403 Forbidden
```json
{
  "error": "You don't have permission to access this resource"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Server Error
```json
{
  "error": "Internal server error"
}
```
```

