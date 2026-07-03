# 🖥 Full Stack Features

Secure Ledger is a complete full-stack banking application that combines a modern React frontend with a secure Node.js backend, providing a seamless digital banking experience while following production-level software engineering practices.

---

# 🎨 Frontend Features

The frontend is built using **React**, delivering a modern, responsive, and intuitive banking interface while securely communicating with the Secure Ledger REST API.

## 🏠 Landing Page

- Modern Fintech-Inspired Hero Section
- Responsive Navigation Bar
- Project Overview
- Banking Feature Highlights
- Technology Stack Showcase
- Call-to-Action Buttons
- Professional Footer

---

## 🔐 Authentication

- User Registration
- Secure Login
- JWT Authentication
- Client-side Form Validation
- Protected Routes
- Automatic Session Handling
- Secure Logout

---

## 📊 Dashboard

- Personalized Welcome Screen
- Current Balance Overview
- Total Accounts Summary
- Latest Transactions
- Banking Statistics
- Quick Banking Actions
- Interactive Information Cards

---

## 💳 Account Management

- Create New Bank Accounts
- View User Accounts
- Check Account Balance
- Account Status

---

## 💰 Deposit Money

- Deposit Funds
- Live Balance Updates
- Success & Error Notifications

---

## 💸 Money Transfer

- Secure Fund Transfers
- Idempotency Key Support
- Transaction Confirmation
- Real-Time Status Updates

---

## 📜 Transaction History

- Complete Transaction History
- Search Transactions
- Sort by Date & Amount
- Responsive Bootstrap Table
- Color-coded Debit & Credit Records

---

## 👤 User Profile

- User Information
- Secure Logout
- JWT Session Management

---

# ⚙ Backend Features

The backend powers the complete banking system through secure REST APIs while ensuring consistency, security, and reliability.

## 🔐 Authentication & Authorization

- User Registration
- Secure Login
- JWT Authentication
- Password Hashing using bcrypt
- Protected APIs
- Logout with Token Blacklisting
- Cookie Parser Integration

---

## 💳 Banking System

- Create Multiple Accounts
- Deposit Money
- Check Account Balance
- Multi-Account Support
- Account Status Validation

---

## 💸 Transaction Engine

- Secure Money Transfer
- MongoDB ACID Transactions
- MongoDB Session Management
- Automatic Rollback on Failure
- Pending Transaction Workflow
- Sender Balance Verification

---

## 📒 Financial Ledger

- Dual Entry Accounting
- Immutable Ledger Records
- Credit & Debit Tracking
- Transaction History
- Aggregation Pipeline for Balance Calculation

---

## 🛡 Backend Security

- JWT Authorization
- Password Encryption
- Authentication Middleware
- Idempotency Validation
- Duplicate Transaction Prevention
- TTL Index for Automatic Token Cleanup

---

## 📧 Email Service

- Registration Emails
- Transaction Notifications
- Background Email Processing
- Nodemailer Integration

---

# 🏗 Tech Stack

| Category | Technology |
|------------|------------|
| Frontend | React 19 |
| Routing | React Router DOM |
| Styling | Bootstrap 5, CSS3 |
| HTTP Client | Axios |
| Notifications | React Toastify |
| Icons | React Icons |
| Backend Runtime | Node.js |
| Backend Framework | Express.js |
| Database | MongoDB Atlas |
| ODM | Mongoose |
| Authentication | JWT |
| Password Security | bcrypt |
| Email Service | Nodemailer |
| Environment | dotenv |

---

# 📁 Project Structure

```text
Secure-Ledger
│
├── banking-app-frontend
│
│   ├── public
│   │
│   ├── src
│   │
│   ├── assets
│   │   ├── icons
│   │   └── images
│   │
│   ├── components
│   │   ├── Navbar
│   │   ├── Footer
│   │   ├── Sidebar
│   │   ├── Loader
│   │   └── ProtectedRoute
│   │
│   ├── pages
│   │   ├── Home
│   │   ├── Login
│   │   ├── Register
│   │   ├── Dashboard
│   │   ├── Accounts
│   │   ├── Deposit
│   │   ├── Transfer
│   │   ├── Transactions
│   │   └── Profile
│   │
│   ├── context
│   ├── services
│   ├── styles
│   ├── App.jsx
│   └── main.jsx
│
│   ├── package.json
│   └── vite.config.js
│
└── banking-app-backend
    │
    ├── src
    │
    ├── config
    │   └── db.js
    │
    ├── controllers
    │   ├── auth.controller.js
    │   ├── account.controller.js
    │   └── transaction.controller.js
    │
    ├── middleware
    │   └── auth.middleware.js
    │
    ├── models
    │   ├── user.model.js
    │   ├── account.model.js
    │   ├── transaction.model.js
    │   ├── ledger.model.js
    │   └── blacklist.model.js
    │
    ├── routes
    │   ├── auth.routes.js
    │   ├── account.routes.js
    │   └── transaction.routes.js
    │
    ├── services
    │   └── email.service.js
    │
    ├── app.js
    ├── server.js
    ├── package.json
    └── README.md
```

---

# 🏛 Full Stack Architecture

```text
                          User

                            │

                            ▼

                  React Frontend (Vite)

        Home │ Login │ Dashboard │ Transfer │ Profile

                            │

                       Axios API Calls

                            │

                            ▼

                  Express.js REST API

                            │

          ┌─────────────────┼─────────────────┐

          ▼                 ▼                 ▼

 Authentication       Account APIs      Transaction APIs

          │                 │                 │

          └─────────────────┼─────────────────┘

                            ▼

                Authentication Middleware

                            ▼

                     Controller Layer

                            ▼

                    Business Logic Layer

                            ▼

                 MongoDB Transaction Session

          ┌──────────────────────────────────────┐

          │                                      │

     Debit Sender                         Credit Receiver

          │                                      │

          └──────────────────┬───────────────────┘

                             ▼

                  Create Ledger Entries

                             ▼

                   Commit Transaction

                             ▼

               Send Email Notification

                             ▼

                     MongoDB Atlas
```

---

# 🎨 Frontend Architecture

The frontend follows a component-based architecture that improves scalability, maintainability, and code reusability.

```text
src
│
├── assets
│
├── components
│   ├── Navbar
│   ├── Footer
│   ├── Sidebar
│   ├── Loader
│   └── ProtectedRoute
│
├── pages
│   ├── Home
│   ├── Login
│   ├── Register
│   ├── Dashboard
│   ├── Accounts
│   ├── Deposit
│   ├── Transfer
│   ├── Transactions
│   └── Profile
│
├── context
│   └── AuthContext.jsx
│
├── services
│   └── api.js
│
├── styles
│   ├── global.css
│   └── variables.css
│
├── App.jsx
└── main.jsx
```

---

# ⚙ Backend Architecture

```text
Client Request

      │

      ▼

Express Router

      │

      ▼

Authentication Middleware

      │

      ▼

Controller

      │

      ▼

Business Logic

      │

      ▼

MongoDB Transaction

      │

      ▼

Database Update

      │

      ▼

Ledger Entry

      │

      ▼

Commit Transaction

      │

      ▼

Email Notification

      │

      ▼

JSON Response
```

---

# 🚀 Frontend Highlights

- 🎯 Modern Fintech-Inspired User Interface
- 📱 Fully Responsive Design
- 🔐 JWT Authentication & Protected Routes
- ⚡ Fast API Communication using Axios
- 🧩 Component-Based Architecture
- 🎨 Bootstrap 5 + Custom CSS
- 📊 Interactive Banking Dashboard
- 💳 Complete Account Management
- 💸 Secure Money Transfer Workflow
- 📜 Searchable Transaction History
- 🔔 Toast Notifications
- ⏳ Loading Spinners
- 🛡 Automatic Session Handling
- 🔗 Seamless Backend Integration

---

# 🚀 Backend Highlights

- 🔐 JWT Authentication
- 🛡 Protected REST APIs
- 💳 Banking Account Management
- 💸 ACID Money Transfers
- 📒 Dual Entry Ledger
- 🔄 MongoDB Transactions
- 🚫 Idempotency Validation
- 📧 Background Email Notifications
- ⚡ Aggregation Pipeline
- 🔑 Password Hashing with bcrypt
- 🗄 MongoDB Atlas Integration
- 🧹 Automatic Token Cleanup using TTL Indexes
- 🏗 Modular MVC Architecture
- 🚀 Production-Ready Backend Design

---

# 🌐 Live Demo

### 🚀 Frontend

https://secure-banking-app-zd8b.vercel.app/

### ⚙ Backend API

https://banking-app-backend-h2gp.onrender.com/
