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

### 5. Get All Doctors
Get a list of all doctors in the system.

**Endpoint:** `GET /user/getDoctors`

**Authentication Required:** Yes (User Token)

**Success Response:** (Status: 200)
```json
{
  "doctors": [
    {
      "_id": "60d5f484f1b2c8b1f8e4e1a1",
      "name": "Dr. John Smith",
      "email": "doctor@example.com",
      "specialization": ["Cardiology", "Internal Medicine"],
      "phone": 1234567890,
      "feesPerConsultation": 500,
      "rating": 4.5,
      "experience": ["5 years at City Hospital"]
    },
    {
      "_id": "60d5f484f1b2c8b1f8e4e1a2",
      "name": "Dr. Sarah Johnson",
      "email": "sarah@example.com",
      "specialization": ["Dermatology"],
      "phone": 9876543210,
      "feesPerConsultation": 400,
      "rating": 4.8
    }
  ]
}
```

**No Doctors Response:** (Status: 200)
```json
{
  "message": "No doctors found.",
  "doctors": []
}
```

**Error Response:**
```json
{
  "message": "Authentication required"
}
```
Status Code: 401

### 6. Get All Hospitals
Get a list of all hospitals in the system.

**Endpoint:** `GET /user/getHospitals`

**Authentication Required:** Yes (User Token)

**Success Response:** (Status: 200)
```json
{
  "hospitals": [
    {
      "_id": "60d5f484f1b2c8b1f8e4e1a3",
      "name": "City General Hospital",
      "email": "hospital@example.com",
      "address": {
        "location": "456 Hospital Street",
        "city": "New York",
        "state": "NY",
        "zipCode": "10002",
        "country": "USA"
      },
      "phoneNumber": "1234567890",
      "beds": {
        "totalBeds": 500,
        "availableBeds": 150
      },
      "specialities": ["Emergency", "Cardiology", "Neurology"],
      "rating": 4.7
    }
  ]
}
```

**No Hospitals Response:** (Status: 200)
```json
{
  "message": "No hospitals found.",
  "hospitals": []
}
```

**Error Response:**
```json
{
  "message": "Authentication required"
}
```
Status Code: 401

### 7. Get Doctors by Category
Get doctors filtered by specialization category.

**Endpoint:** `GET /user/getDoctorByCategory/:category`

**Authentication Required:** Yes (User Token)

**URL Parameters:**
- `category`: The specialization category to filter by (e.g., "Cardiology", "Dermatology", "Neurology")

**Success Response:** (Status: 200)
```json
{
  "doctors": [
    {
      "_id": "60d5f484f1b2c8b1f8e4e1a1",
      "name": "Dr. John Smith",
      "email": "doctor@example.com",
      "specialization": ["Cardiology", "Internal Medicine"],
      "phone": 1234567890,
      "feesPerConsultation": 500,
      "rating": 4.5,
      "experience": ["5 years at City Hospital"]
    }
  ]
}
```

**No Doctors in Category Response:** (Status: 200)
```json
{
  "message": "No doctors found in the category: Cardiology.",
  "doctors": []
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
  "feesPerConsultation": 500
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
      "name": "Paracetamol",
      "manufacturer": "ABC Pharma",
      "price": 50,
      "stock": 100
    },
    { 
      "name": "Aspirin",
      "manufacturer": "XYZ Pharma",
      "price": 25,
      "stock": 200
    }         
  ]
}
```

**Validation Rules:**
- Email must be valid
- Name must be at least 3 characters long
- Password must be at least 6 characters long
- Address location, city, state, zipCode, and country are required
- Phone number must be exactly 10 digits
- Medicines available must be an array with at least one medicine


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

## Hospital Endpoints

### 1. Register Hospital
Create a new hospital account.

**Endpoint:** `POST /hospital/register`

**Request Body:**
```json
{
  "name": "City General Hospital",
  "email": "hospital@example.com",
  "password": "password123",
  "address": {
    "location": "456 Hospital Street",
    "city": "New York",
    "state": "NY",
    "zipCode": "10002",
    "country": "USA"
  },
  "phoneNumber": "1234567890",
  "beds": {
    "totalBeds": 500,
    "availableBeds": 150
  },
  "description": "Leading healthcare provider in the city",
  "website": "https://cityhospital.com",
  "specialities": ["Emergency", "Cardiology", "Neurology"],
  "servicesOffered": ["Emergency Care", "Surgery", "ICU"],
  "emergencyServices": true,
  "ambulanceAvailable": true,
  "pharmacyAvailable": true,
  "labServicesAvailable": true
}
```

**Validation Rules:**
- Name is required
- Email must be valid
- Password must be at least 6 characters long
- Address location, city, state, zipCode, and country are required
- Phone number must be exactly 10 digits
- Available beds and total beds are required

**Success Response:** (Status: 201)
```json
{
  "token": "jwt_token_here",
  "createdHospital": {
    "name": "City General Hospital",
    "email": "hospital@example.com",
    "address": {
      "location": "456 Hospital Street",
      "city": "New York",
      "state": "NY",
      "zipCode": "10002",
      "country": "USA"
    },
    "phoneNumber": "1234567890",
    "beds": {
      "totalBeds": 500,
      "availableBeds": 150
    },
    "specialities": ["Emergency", "Cardiology", "Neurology"]
  }
}
```

**Error Responses:**
- **Hospital Already Exists** (Status: 409)
```json
{
  "message": "Hospital with this email already exists"
}
```
- **Validation Errors** (Status: 400)
```json
{
  "errors": [
    {
      "msg": "Name is required",
      "param": "name",
      "location": "body"
    },
    {
      "msg": "Valid email is required",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Password must be at least 6 characters long",
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
      "param": "phoneNumber",
      "location": "body"
    },
    {
      "msg": "Available beds is required",
      "param": "beds.availableBeds",
      "location": "body"
    },
    {
      "msg": "Total beds is required",
      "param": "beds.totalBeds",
      "location": "body"
    }
  ]
}
```

### 2. Login Hospital
Login with existing hospital credentials.

**Endpoint:** `POST /hospital/login`

**Request Body:**
```json
{
  "email": "hospital@example.com",
  "password": "password123"
}
```

**Validation Rules:**
- Email must be valid
- Password is required

**Success Response:** (Status: 201)
```json
{
  "token": "jwt_token_here",
  "hospital": {
    "name": "City General Hospital",
    "email": "hospital@example.com",
    "address": {
      "location": "456 Hospital Street",
      "city": "New York",
      "state": "NY",
      "zipCode": "10002",
      "country": "USA"
    },
    "phoneNumber": "1234567890",
    "beds": {
      "totalBeds": 500,
      "availableBeds": 150
    },
    "specialities": ["Emergency", "Cardiology", "Neurology"]
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
      "msg": "Valid email is required",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Password is required",
      "param": "password",
      "location": "body"
    }
  ]
}
```

### 3. Get Hospital Profile
Get the profile of the logged-in hospital.

**Endpoint:** `GET /hospital/profile`

**Authentication Required:** Yes (Hospital Token)

**Success Response:** (Status: 200)
```json
{
  "hospital": {
    "name": "City General Hospital",
    "email": "hospital@example.com",
    "address": {
      "location": "456 Hospital Street",
      "city": "New York",
      "state": "NY",
      "zipCode": "10002",
      "country": "USA"
    },
    "phoneNumber": "1234567890",
    "beds": {
      "totalBeds": 500,
      "availableBeds": 150
    },
    "specialities": ["Emergency", "Cardiology", "Neurology"],
    "rating": 4.7,
    "description": "Leading healthcare provider in the city"
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

### 4. Logout Hospital
Logout the current hospital and invalidate the token.

**Endpoint:** `POST /hospital/logout`

**Authentication Required:** Yes (Hospital Token)

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

## Connection Endpoints

These endpoints manage connections between hospitals and doctors.

### 1. Create Connection Request (Hospital to Doctor)
Hospitals can send connection requests to doctors.

**Endpoint:** `POST /hospital/request`

**Authentication Required:** Yes (Hospital Token)

**Request Body:**
```json
{
  "doctorId": "60d5f484f1b2c8b1f8e4e1a1"
}
```

**Validation Rules:**
- Doctor ID is required and must be a valid ObjectId

**Success Response:** (Status: 201)
```json
{
  "message": "Connection request sent successfully.",
  "request": {
    "_id": "60d5f484f1b2c8b1f8e4e1a2",
    "hospital": "60d5f484f1b2c8b1f8e4e1a3",
    "doctor": "60d5f484f1b2c8b1f8e4e1a1",
    "status": "pending",
    "createdAt": "2025-09-12T10:30:00.000Z"
  }
}
```

**Error Responses:**
- **Doctor Not Found** (Status: 404)
```json
{
  "message": "Doctor not found."
}
```
- **Already Connected** (Status: 400)
```json
{
  "message": "This doctor is already connected to your hospital."
}
```
- **Request Already Exists** (Status: 400)
```json
{
  "message": "A connection request for this doctor is already pending."
}
```

### 2. Get Pending Requests (Doctor)
Doctors can view all pending connection requests from hospitals.

**Endpoint:** `GET /doctor/request/pending/:doctorId`

**Authentication Required:** Yes (Doctor Token)

**URL Parameters:**
- `doctorId`: The ID of the doctor to get pending requests for

**Success Response:** (Status: 200)
```json
{
  "requests": [
    {
      "_id": "60d5f484f1b2c8b1f8e4e1a2",
      "hospital": {
        "_id": "60d5f484f1b2c8b1f8e4e1a3",
        "name": "City General Hospital",
        "address": {
          "city": "New York",
          "state": "NY"
        },
        "specialities": ["Emergency", "Cardiology"]
      },
      "doctor": "60d5f484f1b2c8b1f8e4e1a1",
      "status": "pending",
      "createdAt": "2025-09-12T10:30:00.000Z"
    }
  ]
}
```

**No Requests Response:** (Status: 200)
```json
{
  "message": "No pending requests found.",
  "requests": []
}
```

**Error Response:**
```json
{
  "message": "Authentication required"
}
```
Status Code: 401

### 3. Respond to Connection Request (Doctor)
Doctors can approve or decline connection requests from hospitals.

**Endpoint:** `PATCH /doctor/request/respond/:reqId`

**Authentication Required:** Yes (Doctor Token)

**URL Parameters:**
- `reqId`: The ID of the connection request

**Request Body:**
```json
{
  "decision": "approve"
}
```

**Validation Rules:**
- Decision must be either "approve" or "decline"

**Success Response - Approved:** (Status: 200)
```json
{
  "message": "Request approved. You are now connected to the hospital."
}
```

**Success Response - Declined:** (Status: 200)
```json
{
  "message": "Request declined successfully."
}
```

**Error Responses:**
- **Invalid Decision** (Status: 400)
```json
{
  "message": "Invalid decision. Must be \"approve\" or \"decline\"."
}
```
- **Request Not Found** (Status: 404)
```json
{
  "message": "Request not found."
}
```
- **Unauthorized** (Status: 403)
```json
{
  "message": "Forbidden: You are not authorized to respond to this request."
}
```
- **Already Processed** (Status: 400)
```json
{
  "message": "This request has already been approved."
}
```

## Connection Flow

1. **Hospital** sends a connection request to a **Doctor** using `POST /hospital/request`
2. **Doctor** views pending requests using `GET /doctor/request/pending/:doctorId`
3. **Doctor** responds to a specific request using `PATCH /doctor/request/respond/:reqId`
4. If approved, the doctor and hospital are now connected and can collaborate
5. Processed requests (approved/declined) are automatically removed from the system

## Connection Rules

- A hospital can only send one request per doctor (prevents spam)
- Only the target doctor can respond to their own requests
- Once a request is approved/declined, it is automatically deleted from the system
- Approved connections automatically update both hospital and doctor records
- Declined requests are simply removed without creating a connection

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
