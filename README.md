# E-Commerce Application

This is a full-stack e-commerce application built using Node.js, Express, MongoDB, and AWS S3 for cloud storage. It provides features such as user authentication, password encryption, and file uploads, making it an ideal starting point for building a secure and scalable e-commerce platform.

## Tech Stack

- **Backend Framework:** [Express.js](https://expressjs.com/)
- **Authentication:** [JWT (JSON Web Tokens)](https://jwt.io/), Custom Middleware
- **Database:** [MongoDB](https://www.mongodb.com/), [Mongoose](https://mongoosejs.com/)
- **Environment Configuration:** [dotenv](https://www.npmjs.com/package/dotenv)
- **Cross-Origin Resource Sharing (CORS):** [CORS](https://www.npmjs.com/package/cors)
- **Cloud Storage:** [AWS S3](https://aws.amazon.com/s3/)
- **Server-Side Runtime:** [Node.js](https://nodejs.org/)

## Features

### 1. **Authentication**
   - **Sign Up**: Users can register an account with the platform.
   - **Sign In**: Registered users can log in securely using their credentials.
   - **JWT Authentication**: Implemented JSON Web Tokens (JWT) for secure user authentication, ensuring only authorized users can access specific routes.
   - **Custom Middleware**: Middleware to validate JWT and protect routes from unauthorized access.

### 2. **Password Management**
   - **Encrypted Passwords**: User passwords are encrypted using the `crypto` package to ensure security during storage and retrieval.
   - **Secure Authentication**: Passwords are never stored in plain text, reducing the risk of data breaches.

### 3. **Password Recovery**
   - **Forgot Password**: Users can request a password reset if they forget their credentials, initiating a secure password recovery process.

### 4. **File Uploads**
   - **AWS S3 Integration**: Users can upload files, such as product images, to an AWS S3 bucket for scalable and secure storage.

## Installation

1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/nikhil6392/Ecom.git


