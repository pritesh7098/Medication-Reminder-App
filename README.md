````markdown
# MediFor7 - Medication Reminder Application 

MediFor7 is a full-stack web application designed to help users manage their medication schedules effectively. 
The application provides timely reminders and tracking capabilities to improve medication adherence.

## 🏗️ Architecture

The application follows a modern full-stack architecture:

### Frontend

- Built with React + Ionic Framework
- Responsive design for both web and mobile interfaces
- JWT-based authentication
- Real-time medication reminders
- User-friendly dashboard for medication management

### Backend

- Node.js/Express.js REST API
- PostgreSQL database (hosted on Neon)
- JWT authentication
- Role-based access control (Admin/Patient)
- Secure password hashing
- Logging system for medication adherence

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm/yarn
- PostgreSQL
- Git

### Installation

1. Clone the repository

```bash
git clone https://github.com/pritesh7098/Medication-Reminder-App.git
cd Medication-Reminder-App
```
````

2. Backend Setup

```bash
# Navigate to backend directory
cd Backend

# Install dependencies
npm install

# Create .env file and configure environment variables
# Example .env configuration:
PORT=3000
DATABASE_URL=your_neon_database_url
JWT_SECRET=your_jwt_secret
ADMIN_SECRET=your_admin_secret

# Start the server
npm run dev
```

3. Frontend Setup

```bash
# Navigate to frontend directory
cd Frontend/medifor7-frontend

# Install dependencies
npm install

# Start the application
npm start
```

The application will be available at `http://localhost:3000`

## 🔑 Features

- **User Authentication**

  - Secure registration and login
  - Role-based access (Admin/Patient)

- **Medication Management**

  - Add, edit, and delete medications
  - Set medication schedules
  - Track medication adherence

- **Admin Features**

  - View user logs
  - Monitor medication adherence
  - System-wide analytics

- **Security**
  - JWT authentication
  - Encrypted password storage
  - Protected API endpoints

## 🛠️ Tech Stack

### Frontend

- React.js
- Ionic Framework
- Axios for API calls
- JWT for authentication

### Backend

- Node.js
- Express.js
- PostgreSQL (Neon)
- JWT
- Bcrypt for password hashing

## 📱 API Documentation

Comprehensive API documentation is available through Postman in API_DOCS.README File Itself In This Repository For Easy Access Which Has  :

- Authentication endpoints
- Medication management endpoints
- User management endpoints
- Admin-specific endpoints

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! 

## 📝 License

This project is [MIT](LICENSE) licensed.

## 👤 Contact

Pritesh Dhanad - priteshdhanad2001@gmail.com

```
