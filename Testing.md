# Testing Report

**Date**: 28 Jan 2025 <br>
**Framework**: pytest  

---

## Summary
This report outlines the results of the functional and model tests for a Flask-based application. The tests covered API endpoints, database model functionalities, and real-time socket communication using Flask-SocketIO.

---

## Test Cases

### **1. Index Route**
- **Test File**: `test_index_route`
- **Objective**: Validate the default response of the root route.
- **Input and Output**:
  
  | Input                | Expected Output                      | Actual Output                        |
  |----------------------|---------------------------------------|---------------------------------------|
  | `client.get('/')`    | Status code: `200`, `{'message': 'Hello, World!'}` | Status code: `200`, `{'message': 'Hello, World!'}` |

---

### **2. Signup Route**
- **Test File**: `test_signup_route`
- **Objective**: Verify user signup functionality.
- **Input and Output**:

  | Scenario            | Input                                               | Expected Output                                   | Actual Output                                     |
  |---------------------|-----------------------------------------------------|--------------------------------------------------|--------------------------------------------------|
  | Successful Signup   | `client.post('/signup', json={"username": "test_user", "password": "test_password"})` | Status code: `201`, `{'message': 'Signup successful'}` | Status code: `201`, `{'message': 'Signup successful'}` |
  | Existing User       | `client.post('/signup', json={"username": "test_user", "password": "test_password"})` | Status code: `400`, `{'message': 'User already exists'}` | Status code: `400`, `{'message': 'User already exists'}` |

---

### **3. Login Route**
- **Test File**: `test_login_route`
- **Objective**: Validate login functionality.
- **Input and Output**:

  | Scenario         | Input                                                                                         | Expected Output                                    | Actual Output                                      |
  |------------------|-----------------------------------------------------------------------------------------------|---------------------------------------------------|---------------------------------------------------|
  | Valid Login      | `client.post('/signup', json={"username": "test_user", "password": "test_password"}); client.post('/login', json={"username": "test_user", "password": "test_password"})` | Status code: `200`, `{'message': 'Login successful'}` | Status code: `200`, `{'message': 'Login successful'}` |
  | Invalid Login    | `client.post('/login', json={"username": "test_user", "password": "wrong_password"})`   | Status code: `401`, `{'message': 'Invalid credentials'}` | Status code: `401`, `{'message': 'Invalid credentials'}` |

---

### **4. User Model**
- **Test File**: `test_user_model`
- **Objective**: Verify user creation and deletion functionality in the database.
- **Input and Output**:

  | Operation            | Input                                              | Expected Output                     | Actual Output                       |
  |----------------------|----------------------------------------------------|--------------------------------------|--------------------------------------|
  | Create User          | `User(username="test_user", password="test_password")` | User created successfully           | User created successfully           |
  | Query User           | `User.query.filter_by(username="test_user").first()` | User retrieved successfully         | User retrieved successfully         |
  | Delete User          | `db.session.delete(queried_user)`                  | User deleted successfully           | User deleted successfully           |

---

### **5. Alert Model**
- **Test File**: `test_alert_model`
- **Objective**: Validate the Alert model's functionality in CRUD operations.
- **Input and Output**:

  | Operation            | Input                                              | Expected Output                     | Actual Output                       |
  |----------------------|----------------------------------------------------|--------------------------------------|--------------------------------------|
  | Create Alert         | `{ 'title': 'Test Alert', 'description': 'This is a test alert', 'type': 'Test', 'severity': 'High', 'region': 'Test Region' }` | Alert created successfully          | Alert created successfully          |
  | Query Alert          | `Alert.query.filter_by(title='Test Alert').first()` | Alert retrieved successfully         | Alert retrieved successfully         |
  | Delete Alert         | `db.session.delete(queried_alert)`                  | Alert deleted successfully          | Alert deleted successfully          |

---

### **6. Socket Connection**
- **Test File**: `test_socket_connection`
- **Objective**: Ensure the WebSocket connection can be established and disconnected.
- **Input and Output**:

  | Operation            | Input                                              | Expected Output                     | Actual Output                       |
  |----------------------|----------------------------------------------------|--------------------------------------|--------------------------------------|
  | Connect              | `SocketIOTestClient(app, socketio)`                | Connection established successfully  | Connection established successfully  |
  | Disconnect           | `socketio_client.disconnect()`                    | Disconnection successful            | Disconnection successful            |

---

### **7. Real-Time Notification**
- **Test File**: `test_send_notification`
- **Objective**: Verify the notification sending functionality via WebSocket and database logging.
- **Input and Output**:

  | Operation            | Input                                              | Expected Output                     | Actual Output                       |
  |----------------------|----------------------------------------------------|--------------------------------------|--------------------------------------|
  | Send Notification    | `{ "title": "Test Title", "description": "Test Notification", "type": "Test Type", "severity": "High", "region": "Test Region" }` | Notification sent successfully      | Notification sent successfully      |
  | Query Notification   | `Alert.query.filter_by(title="Test Title").first()` | Notification exists in database      | Notification exists in database      |

---

## Overall Test Results
- **Total Tests**: [Count All Tests]  
- **Passed**: [Count Passed]  
- **Failed**: [Count Failed, if any]

---

## Recommendations
- Ensure coverage for additional edge cases (e.g., malformed requests, concurrent updates).
- Add performance tests for high-volume notifications and database queries.

---

