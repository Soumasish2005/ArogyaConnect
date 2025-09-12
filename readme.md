# Medicine Backend API Documentation

This document outlines the available endpoints for the Medicine backend API.

## Base URL
`http://localhost:3000`

## Authentication
Most endpoints require authentication via a JWT token. The token should be included in either:
- Cookie named `token`
- Authorization header: `Bearer <token>`

## Health Check

### Health Status
Check if the API is running.

**Endpoint:** `GET /health`

**Authentication Required:** No

**Success Response:**
```
API is healthy, running on port 3000
```
Status Code: 200

---

## User Endpoints

### 1. Register User
Create a new user account.

**Endpoint:** `POST /user/register`

**Request Body:**
```json
{
  "email": "user@example.com",
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "password": "password123"
}
```

**Validation Rules:**
- Email must be valid
- First Name must be at least 3 characters long
- Password must be at least 6 characters long

**Success Response:** (Status: 201)
```json
{
  "token": "jwt_token_here",
  "createdUser": {
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "user@example.com"
  }
}
```

**Error Responses:**
- **User Already Exists** (Status: 400)
```json
{
  "message": "User already exists"
}
```
- **Validation Errors** (Status: 400)
```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "First Name must be atleast 3 characters long",
      "param": "fullName.firstName",
      "location": "body"
    },
    {
      "msg": "Password must be 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

### 2. Login User
Login with existing credentials.

**Endpoint:** `POST /user/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Validation Rules:**
- Email must be valid
- Password must be at least 6 characters long

**Success Response:** (Status: 201)
```json
{
  "token": "jwt_token_here",
  "user": {
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "user@example.com"
  }
}
```

**Error Responses:**
- **Invalid Credentials** (Status: 401)
```json
{
  "message": "Invalid email or password"
}
```
- **Validation Errors** (Status: 400)
```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Password must be 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

### 3. Get User Profile
Get the profile of the logged-in user.

**Endpoint:** `GET /user/profile`

**Authentication Required:** Yes

**Success Response:** (Status: 200)
```json
{
  "user": {
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "user@example.com"
  }
}
```

**Error Response:**
```json
{
  "message": "Authentication required"
}
```
Status Code: 401

### 4. Logout User
Logout the current user and invalidate the token.

**Endpoint:** `GET /user/logout`

**Authentication Required:** Yes

**Success Response:** (Status: 200)
```json
{
  "message": "Logged out successfully"
}
```

**Error Response:**
```json
{
  "message": "Authentication required"
}
```
Status Code: 401

---

## Doctor Endpoints

### 1. Register Doctor
Create a new doctor account.

**Endpoint:** `POST /doctor/register`

**Request Body:**
```json
{
  "email": "doctor@example.com",
  "name": "Dr. John Smith",
  "password": "password123",
  "specialization": ["Cardiology", "Internal Medicine"],
  "phone": "1234567890",
  "feesPerConsultation": 500,
}
```

**Validation Rules:**
- Email must be valid
- Name must be at least 3 characters long
- Password must be at least 6 characters long
- Specialization must be an array with at least one item
- Phone must be exactly 10 digits
- Fees per consultation must be a positive number

**Success Response:** (Status: 201)
```json
{
  "token": "jwt_token_here",
  "createdDoctor": {
    "name": "Dr. John Smith",
    "email": "doctor@example.com",
    "specialization": ["Cardiology", "Internal Medicine"],
    "phone": 1234567890,
    "feesPerConsultation": 500
  }
}
```

**Error Responses:**
- **Doctor Already Exists** (Status: 400)
```json
{
  "message": "Doctor already exists"
}
```
- **Validation Errors** (Status: 400)
```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Name must be atleast 3 characters long",
      "param": "name",
      "location": "body"
    },
    {
      "msg": "Password must be 6 characters long",
      "param": "password",
      "location": "body"
    },
    {
      "msg": "Atleast one specialization is required",
      "param": "specialization",
      "location": "body"
    },
    {
      "msg": "Invalid Phone Number",
      "param": "phone",
      "location": "body"
    },
    {
      "msg": "Fees per consultation must be a positive number",
      "param": "feesPerConsultation",
      "location": "body"
    },
    {
      "msg": "Timings must be an array of two strings",
      "param": "timings",
      "location": "body"
    }
  ]
}
```

### 2. Login Doctor
Login with existing doctor credentials.

**Endpoint:** `POST /doctor/login`

**Request Body:**
```json
{
  "email": "doctor@example.com",
  "password": "password123"
}
```

**Validation Rules:**
- Email must be valid
- Password must be at least 6 characters long

**Success Response:** (Status: 201)
```json
{
  "token": "jwt_token_here",
  "doctor": {
    "name": "Dr. John Smith",
    "email": "doctor@example.com",
    "specialization": ["Cardiology", "Internal Medicine"],
    "phone": 1234567890,
    "feesPerConsultation": 500
  }
}
```

**Error Responses:**
- **Invalid Credentials** (Status: 401)
```json
{
  "message": "Invalid email or password"
}
```
- **Validation Errors** (Status: 400)
```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Password must be 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

### 3. Get Doctor Profile
Get the profile of the logged-in doctor.

**Endpoint:** `GET /doctor/profile`

**Authentication Required:** Yes (Doctor Token)

**Success Response:** (Status: 200)
```json
{
  "doctor": {
    "name": "Dr. John Smith",
    "email": "doctor@example.com",
    "specialization": ["Cardiology", "Internal Medicine"],
    "phone": 1234567890,
    "feesPerConsultation": 500,
    "rating": 4.5,
    "experience": ["5 years at City Hospital"]
  }
}
```

**Error Response:**
```json
{
  "message": "Authentication required"
}
```
Status Code: 401

### 4. Logout Doctor
Logout the current doctor and invalidate the token.

**Endpoint:** `GET /doctor/logout`

**Authentication Required:** Yes (Doctor Token)

**Success Response:** (Status: 200)
```json
{
  "message": "Logged out successfully"
}
```

**Error Response:**
```json
{
  "message": "Authentication required"
}
```
Status Code: 401

---

## Medicine Shop Endpoints

### 1. Register Medicine Shop
Create a new medicine shop account.

**Endpoint:** `POST /medicineShop/register`

**Request Body:**
```json
{
  "email": "shop@example.com",
  "ownerName": "meowCow",
  "name": "HealthCare Pharmacy",
  "password": "password123",
  "address": {
    "location": "123 Main Street",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "phone": "1234567890",
  "medicinesAvailable": [
    { 
      name: "paracetemol"
      manufacturer: "ABC"
      price: 69
      stock: 32
    },
    { 
      name: "Mohak-Thong-fixer"
      manufacturer: ""
      price: 69
      stock: 69
    }         
  ]
}
```

**Validation Rules:**
- Email must be valid
- Name must be at least 3 characters long
- Owner name is required
- Password must be at least 6 characters long
- Address location, city, state, zipCode, and country are required
- Phone number must be exactly 10 digits


**Success Response:** (Status: 201)
```json
{
  "token": "jwt_token_here",
  "createdMedicineShop": {
    "name": "HealthCare Pharmacy",
    "email": "shop@example.com",
    "address": {
      "location": "123 Main Street",
      "city": "New York",
      "state": "NY",
      "zipCode": "10001",
      "country": "USA"
    },
    "phone": "1234567890",
    "medicinesAvailable": ["Paracetamol", "Aspirin", "Insulin"]
  }
}
```

**Error Responses:**
- **Medicine Shop Already Exists** (Status: 400)
```json
{
  "message": "Medicine Shop already exists"
}
```
- **Validation Errors** (Status: 400)
```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Name must be atleast 3 characters long",
      "param": "name",
      "location": "body"
    },
    {
      "msg": "Password must be 6 characters long",
      "param": "password",
      "location": "body"
    },
    {
      "msg": "Address is required",
      "param": "address.location",
      "location": "body"
    },
    {
      "msg": "city is required",
      "param": "address.city",
      "location": "body"
    },
    {
      "msg": "state is required",
      "param": "address.state",
      "location": "body"
    },
    {
      "msg": "zipcode is required",
      "param": "address.zipCode",
      "location": "body"
    },
    {
      "msg": "country is required",
      "param": "address.country",
      "location": "body"
    },
    {
      "msg": "Invalid Phone Number",
      "param": "phone",
      "location": "body"
    },
    {
      "msg": "Atleast one medicine is required",
      "param": "medicinesAvailable",
      "location": "body"
    }
  ]
}
```

### 2. Login Medicine Shop
Login with existing medicine shop credentials.

**Endpoint:** `POST /medicineShop/login`

**Request Body:**
```json
{
  "email": "shop@example.com",
  "password": "password123"
}
```

**Validation Rules:**
- Email must be valid
- Password must be at least 6 characters long

**Success Response:** (Status: 201)
```json
{
  "token": "jwt_token_here",
  "medicineShop": {
    "name": "HealthCare Pharmacy",
    "email": "shop@example.com",
    "address": {
      "location": "123 Main Street",
      "city": "New York",
      "state": "NY",
      "zipCode": "10001",
      "country": "USA"
    },
    "phone": "1234567890",
    "medicinesAvailable": ["Paracetamol", "Aspirin", "Insulin"]
  }
}
```

**Error Responses:**
- **Invalid Credentials** (Status: 401)
```json
{
  "message": "Invalid email or password"
}
```
- **Validation Errors** (Status: 400)
```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Password must be 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

### 3. Get Medicine Shop Profile
Get the profile of the logged-in medicine shop.

**Endpoint:** `GET /medicineShop/profile`

**Authentication Required:** Yes (Medicine Shop Token)

**Success Response:** (Status: 200)
```json
{
  "medicineShop": {
    "name": "HealthCare Pharmacy",
    "email": "shop@example.com",
    "address": {
      "location": "123 Main Street",
      "city": "New York",
      "state": "NY",
      "zipCode": "10001",
      "country": "USA"
    },
    "phone": "1234567890",
    "medicinesAvailable": ["Paracetamol", "Aspirin", "Insulin"],
    "openingHours": "9:00 AM - 9:00 PM",
    "rating": 4.2
  }
}
```

**Error Response:**
```json
{
  "message": "Authentication required"
}
```
Status Code: 401

### 4. Logout Medicine Shop
Logout the current medicine shop and invalidate the token.

**Endpoint:** `GET /medicineShop/logout`

**Authentication Required:** Yes (Medicine Shop Token)

**Success Response:** (Status: 200)
```json
{
  "message": "Logged out successfully"
}
```

**Error Response:**
```json
{
  "message": "Authentication required"
}
```
Status Code: 401

---

## Common Error Responses

### Validation Errors
All endpoints with validation return errors in this format when validation fails:

```json
{
  "errors": [
    {
      "msg": "Error message",
      "param": "field_name",
      "location": "body"
    }
  ]
}
```
Status Code: 400

### Authentication Errors
Protected endpoints return this when authentication fails:

```json
{
  "message": "Authentication required"
}
```
Status Code: 401

### Server Errors
Internal server errors return:

```json
{
  "message": "Internal server error"
}
```
Status Code: 500

## Notes
- All POST requests should include `Content-Type: application/json` header
- Tokens are automatically set as httpOnly cookies on successful login/registration
- Tokens should be included in Authorization header as `Bearer <token>` for manual authentication
- All password fields are automatically hashed before storage
- Phone numbers should be provided as strings of exactly 10 digits
