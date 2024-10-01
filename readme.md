# Backend Authentication API

This backend API template is built with Node.js and Express.js for handling authentication functionalities. The project supports user signup, signin, email verification, password recovery, and profile updates. It includes input validation, authentication middleware, and integration with MongoDB for data storage.

## Features

- **User Signup**: Register a new user with email and password.
- **User Signin**: Authenticate an existing user.
- **Email Verification**: Send and verify email verification codes.
- **Forgot Password**: Send password recovery codes and reset password.
- **Profile Management**: Update user profile and change password.
- **JWT Authentication**: Secured routes with JSON Web Tokens (JWT).
- **Input Validation**: Validates user inputs before processing.

## Endpoints

### Authentication Routes

- **POST `/signup`**: Register a new user.  
  Validators: `SignUpValidator`

- **POST `/signin`**: Log in an existing user.  
  Validators: `SignInValidator`

- **GET `/get-verification-code`**: Get email verification code.  
  Validators: `EmailValidator`

- **POST `/verify-email`**: Verify the email using a verification code.  
  Validators: `EmailCodeValidator`

- **POST `/send-forgot-password-code`**: Send a password recovery code to the user’s email.  
  Validators: `EmailValidator`

- **POST `/recover-password`**: Recover the password using the recovery code.  
  Validators: `RecoverPasswordValidator`

- **PUT `/change-password`**: Change the current password (Authenticated).  
  Validators: `changePasswordValidator`, Authentication: `isAuth`

- **PUT `/update-profile`**: Update user profile details (Authenticated).  
  Validators: `updateProfileValidator`, Authentication: `isAuth`

## Environment Variables

The following environment variables must be set in the `.env` file to configure the application:

| Variable Name               | Description                                   |
|-----------------------------|-----------------------------------------------|
| `PORT`                      | The port number the application runs on.      |
| `MONGODB_CONNECTION_STRING`  | MongoDB connection string.                    |
| `JWT_SECRET`                 | Secret key for signing JWT tokens.            |
| `GMAIL`                      | Gmail address for sending verification emails.|
| `GMAIL_PASS`                 | Gmail app password for authentication.        |

## User Model

The MongoDB `User` schema contains the following fields:

```javascript
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true, trim: true},
    password: {type: String, required: true, minlength: 6},
    role: {type: Number, required: true, default: 3},
    verificationCode: {type: String},
    forgotPasswordCode: {type: String},
    isVerified: {type: Boolean, default: false}
}, {timestamps: true});

module.exports = mongoose.model('user', UserSchema);
```

## Field Descriptions

- **name**: User's full name.
- **email**: User's email (unique).
- **password**: User's hashed password.
- **role**: Role-based access control (default is 3 for regular users).
- **verificationCode**: Email verification code.
- **forgotPasswordCode**: Code for password recovery.
- **isVerified**: Boolean flag indicating if the user's email is verified.

## Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/your-repository-url.git
    cd backend-authentication-api
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add the required environment variables:

    ```bash
    PORT=5000
    MONGODB_CONNECTION_STRING=mongodb://localhost:27017/dbname
    JWT_SECRET=your_jwt_secret_key
    GMAIL=your_gmail_address
    GMAIL_PASS=your_gmail_app_password
    ```

4. Start the server:

    ```bash
    npm start
    ```

## Dependencies

- **express**: Fast, unopinionated, minimalist web framework.
- **mongoose**: MongoDB object modeling for Node.js.
- **jsonwebtoken**: For generating and verifying JWT tokens.
- **bcryptjs**: To hash and compare passwords.
- **nodemailer**: For sending emails (Gmail SMTP used).
- **express-validator**: For input validation.

## License

This project is licensed under the MIT License.
