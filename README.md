🖥 Frontend Features
The frontend is designed to deliver a modern, secure, and intuitive banking experience while seamlessly integrating with the Secure Ledger REST API.

🏠 Landing Page
Modern fintech-inspired hero section
Responsive navigation bar
Project overview and feature highlights
Technology stack showcase
Call-to-action buttons
Professional footer
🔐 Authentication
User Registration
Secure Login
JWT-based Authentication
Client-side Form Validation
Protected Routes
Automatic Session Handling
📊 Dashboard
Personalized Welcome Screen
Current Balance Overview
Total Accounts Summary
Recent Transactions
Quick Banking Actions
Interactive Information Cards
💳 Account Management
Create New Bank Accounts
View All User Accounts
Check Account Balance
Account Status Display
💰 Deposit Money
Deposit Funds into an Account
Real-time Balance Updates
Success & Error Notifications
💸 Money Transfer
Secure Fund Transfer Between Accounts
Idempotency Key Support
Transfer Confirmation
Transaction Status Feedback
📜 Transaction History
Complete Transaction History
Search Transactions
Sort by Date & Amount
Responsive Bootstrap Table
Color-coded Debit & Credit Records
👤 User Profile
View User Information
Secure Logout
JWT Session Management
🏗 Tech Stack
Category	Technology
Frontend	React 19
Routing	React Router DOM
Styling	Bootstrap 5, CSS3
HTTP Client	Axios
Notifications	React Toastify
Icons	React Icons
Backend Runtime	Node.js
Backend Framework	Express.js
Database	MongoDB Atlas
ODM	Mongoose
Authentication	JWT (JSON Web Token)
Password Security	bcrypt
Email Service	Nodemailer
Environment Variables	dotenv
📁 Project Structure
Secure-Ledger
│
├── banking-app-frontend
│   │
│   ├── public
│   │
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   │   ├── Navbar
│   │   │   ├── Footer
│   │   │   ├── Sidebar
│   │   │   ├── Loader
│   │   │   └── ProtectedRoute
│   │   │
│   │   ├── pages
│   │   │   ├── Home
│   │   │   ├── Login
│   │   │   ├── Register
│   │   │   ├── Dashboard
│   │   │   ├── Accounts
│   │   │   ├── Deposit
│   │   │   ├── Transfer
│   │   │   ├── Transactions
│   │   │   └── Profile
│   │   │
│   │   ├── context
│   │   ├── services
│   │   ├── styles
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
└── banking-app-backend
    │
    ├── src
    │   ├── config
    │   ├── controllers
    │   ├── middleware
    │   ├── models
    │   ├── routes
    │   ├── services
    │   └── app.js
    │
    ├── server.js
    ├── package.json
    └── README.md
🎨 Frontend Architecture
The frontend follows a component-driven architecture, promoting modularity, reusability, and maintainability.

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
🎨 Frontend Highlights
🎯 Modern Fintech-Inspired User Interface
📱 Fully Responsive Across Desktop, Tablet & Mobile
🔐 JWT-Based Authentication & Protected Routes
⚡ Fast API Communication Using Axios
🧩 Reusable Component-Based Architecture
🎨 Bootstrap 5 with Custom CSS Styling
🔄 Real-Time Banking Operations
📊 Interactive Banking Dashboard
💳 Account Management Interface
💸 Secure Money Transfer Workflow
📜 Transaction History with Search & Sorting
🔔 Toast Notifications for User Feedback
⏳ Loading Spinners & Better UX
🛡️ Automatic Session Handling & Secure Logout
🚀 Production-Ready Folder Structure
🔗 Seamless Integration with the Secure Ledger REST API
