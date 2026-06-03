# Woliba Registration Flow Project Documentation

## 1. App Overview

The Woliba Registration Flow application is a React-based frontend project developed for handling user onboarding and registration.

The application includes:

* Company verification
* User details submission
* OTP verification
* Complete registration flow
* Password setup
* Terms and conditions acceptance
* Redux-based state management
* Responsive authentication layout

The application communicates with Woliba APIs for authentication and user registration.

---

# 2. Setup Instructions

## Clone the Project

```bash
git clone https://github.com/iamprathod1995/woliba.git
```

---

## Navigate to Project Folder

```bash
cd woliba
```

---

## Install Dependencies

```bash
npm install
```

---

## Run Development Server

```bash
npm start
```

Application will run on:

```bash
http://localhost:3000
```

---

## Build for Production

```bash
npm run build
```

---

# 3. Libraries / Tools Used

| Library              | Purpose                      |
| -------------------- | ---------------------------- |
| React                | Frontend UI development      |
| Redux Toolkit        | Global state management      |
| React Redux          | Redux integration with React |
| React Router DOM     | Routing and navigation       |
| Axios                | API handling                 |
| React Toastify       | Toast notifications          |
| Bootstrap            | UI styling                   |
| React Bootstrap      | Bootstrap React components   |
| React Datepicker     | Date selection               |
| Date-fns             | Date utilities               |
| React Error Boundary | Error handling               |

---

# 4. Folder Structure

```txt
src/
│
├── api/
│   ├── api.js
│   ├── authApi.js
│   └── userApi.js
│
├── components/
│   ├── common/
│   ├── layout/
│   └── registration/
│
├── context/
│   └── AuthContext.jsx
│
├── pages/
│   └── Registration.jsx
│
├── redux/
│   ├── store.js
│   └── slices/
│       └── registrationSlice.js
│
├── routes/
│
├── services/
│
├── styles/
│
├── utils/
│
├── App.js
└── App.css
```

---

# 5. Registration Flow

## Step 1: Company Verification

User enters:

* Company Name
* Company Password

API Used:

```txt
POST /verify-by-company-name-and-password
```

Features:

* Required validation
* Password visibility toggle
* Disabled button until valid inputs
* Toast success/error messages

---

## Step 2: User Details Form

User enters:

* Work Email
* First Name
* Last Name
* Company Name (Auto-filled & Disabled)

API Used:

```txt
POST /save-user-details-and-send-otp
```

Features:

* Email validation
* Name validation
* Real-time error messages
* OTP sending
* Redux state storage

---

## Step 3: OTP Verification

User enters:

* 6 Digit OTP

API Used:

```txt
POST /verify-otp-for-user-registration
```

Features:

* OTP timer
* Resend OTP
* Back button
* Submit validation
* Auto screen transition after verification

---

## Step 4: Complete Registration

User enters:

* Password
* Confirm Password
* Date of Birth
* Contact Number
* Work Anniversary (Optional)
* Terms Acceptance

API Used:

```txt
POST /user-registration
```

Features:

* Password validation
* Confirm password validation
* Phone number validation
* Date picker
* Terms acceptance validation
* Disabled button until form valid

---

# 6. Redux State Management

Redux Toolkit is used to manage registration flow globally.

## registrationSlice State

```js
{
  company: null,
  token: "",
  otpVerified: false,
  user: {}
}
```

---

## Stored Data

* Company Details
* Registration Token
* OTP Verification Status
* User Information

---

# 7. API Integration

## Base URL

```txt
https://dev.woliba.io/v1/
```

---

## APIs Used

| API                                 | Method |
| ----------------------------------- | ------ |
| verify-by-company-name-and-password | POST   |
| save-user-details-and-send-otp      | POST   |
| verify-otp-for-user-registration    | POST   |
| user-registration                   | POST   |
| get-wellbeing-pillars               | GET    |
| viewWellnessInterest                | GET    |

---

# 8. Validation Features

The application includes:

* Required field validation
* Email format validation
* Password strength validation
* Confirm password matching
* Phone number validation
* Terms acceptance validation
* Button disable logic
* Inline error messages

---

# 9. UI Features

* Responsive layout
* Custom dropdown
* Password eye toggle
* OTP input boxes
* Toast notifications
* Clean authentication UI
* Disabled state buttons
* Background illustrations

---

# 10. Deployment Instructions

## Create Production Build

```bash
npm run build
```

---

## Deploy on Hosting Platforms

You can deploy using:

* Netlify
* Vercel
* AWS S3
* Firebase Hosting

---

## Example Vercel Deployment

### Install Vercel

```bash
npm install -g vercel
```

---

### Deploy

```bash
vercel
```

---

# 11. Assumptions

* API endpoints are accessible publicly.
* OTP expiry is handled by backend.
* User session is maintained using Redux state.
* Work Anniversary field is optional.
* Company verification is required before registration.
* Browser supports modern ES6 JavaScript.

---

# 12. Screenshots

Add screenshots for the following screens:

1. Company Verification Screen
2. User Details Screen
3. OTP Verification Screen
4. Complete Registration Screen
5. Success Screen

---

# 13. Future Improvements

* JWT authentication persistence
* Refresh token handling
* Protected routes
* Multi-language support
* Unit testing
* Better error handling
* Mobile responsiveness improvements
* Form reusable validation hooks

---

# 14. Conclusion

The Woliba Registration Flow project provides a structured and scalable authentication and onboarding system using React and Redux Toolkit. The application focuses on clean UI, API integration, validation, and user experience.
