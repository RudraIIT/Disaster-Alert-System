# User Guide: Disaster Alert System

## Overview
The Disaster Alert System is a Flask-based web application designed to provide real-time notifications and manage disaster alerts. It leverages modern technologies such as Flask-SocketIO for real-time communication and integrates robust database functionalities to store and query data efficiently.

### Key Features:
- User Authentication (Signup & Login)
- Real-Time Notification System
- Alert Management
- WebSocket Integration

---

## Setup and Installation
Follow the steps below to set up the Disaster Alert System on your local machine:

### Prerequisites
- Python 3.8+
- pip (Python package manager)
- Node.js (for frontend, if applicable)
- A relational database (e.g., PostgreSQL or SQLite)

### Steps
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/sushant-wayal/Disaster-Alert-System.git
   cd Disaster-Alert-System
   ```

2. **Set Up a Virtual Environment:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # For Linux/Mac
   venv\Scripts\activate    # For Windows
   ```

3. **Install Dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set Up the Database:**
   - Run migrations to create the necessary tables:
     ```bash
     flask db init
     flask db migrate
     flask db upgrade
     ```

5. **Run the Application:**
   ```bash
   flask run
   ```
   Access the application at `http://127.0.0.1:5000`.

---

## API Endpoints

### **1. Index Route**
- **URL:** `/`
- **Method:** `GET`
- **Description:** Returns a welcome message.
- **Response:**
  ```json
  {
      "message": "Hello, World!"
  }
  ```

### **2. Signup**
- **URL:** `/signup`
- **Method:** `POST`
- **Description:** Registers a new user.
- **Payload:**
  ```json
  {
      "username": "test_user",
      "password": "test_password"
  }
  ```
- **Responses:**
  - Success:
    ```json
    {
        "message": "Signup successful"
    }
    ```
  - User Exists:
    ```json
    {
        "message": "User already exists"
    }
    ```

### **3. Login**
- **URL:** `/login`
- **Method:** `POST`
- **Description:** Authenticates a user.
- **Payload:**
  ```json
  {
      "username": "test_user",
      "password": "test_password"
  }
  ```
- **Responses:**
  - Success:
    ```json
    {
        "message": "Login successful"
    }
    ```
  - Invalid Credentials:
    ```json
    {
        "message": "Invalid credentials"
    }
    ```

---

## Real-Time Notifications

### **Socket Events**

#### **1. Connect**
- **Event:** `connect`
- **Description:** Establishes a WebSocket connection.
- **Expected Behavior:** Returns confirmation of the connection.

#### **2. Send Notification**
- **Event:** `send_notification`
- **Payload:**
  ```json
  {
      "title": "Test Title",
      "description": "Test Notification",
      "type": "Test Type",
      "severity": "High",
      "region": "Test Region"
  }
  ```
- **Expected Behavior:** Broadcasts the notification to connected clients and logs it in the database.

---

## Database Models

### **1. User**
- **Fields:**
  - `id`: Primary key
  - `username`: Unique username
  - `password`: Hashed password

### **2. Alert**
- **Fields:**
  - `id`: Primary key
  - `title`: Title of the alert
  - `description`: Detailed information
  - `type`: Type of alert
  - `severity`: Severity level
  - `region`: Region affected

---

## Testing

### **Running Tests**
Execute the following command to run all tests:
```bash
pytest
```

### **Test Coverage**
- **API Routes:** Index, Signup, Login
- **Models:** User, Alert
- **Real-Time Features:** WebSocket connections, Notification broadcast

---


