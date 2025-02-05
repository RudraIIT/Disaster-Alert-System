# Disaster Alert System 🌍🚨  
**College:** Indian Institute of Technology (IIT) Mandi <br>
**Academic Year:** 2025-2026 <br>
**Mentor:** Prof. Varun Datt

![Python](https://img.shields.io/badge/Python-3.8%2B-blue)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen)

## System Architecture
![System Architecture](public/architect-1.png)
<br><br>
![System Architecture](public/architect-2.png)
---

## 👥 Team Members
| Name                | Role                |
|---------------------|---------------------|
| Rudra Pratap Singh  | Documentation Specialist       |
| Sushant Wayal       | Frontend Developer  |
| Rudra Pratap        | Backend Developer & Tester   |
| Shivam Jaiswal      | Project Manager          |
| Ritam Dutta         | Quality Assurance Engineer   |
| Badal Mandal         | Requirements Engineer  |


## 📁 Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Screenshots](#screenshots)
4. [Workflow](#system-workflow)
5. [Installation](#installation)
6. [Configuration](#configuration)
7. [Usage](#usage)

## 📌 Project Overview
The Disaster Alert System is a Flask-based application designed to provide real-time alerts and notifications for disaster management. It supports user authentication, alert creation, and broadcasting notifications to connected clients via WebSocket communication.

---

**Key Objectives:**
- Real-time alerts for natural disasters
- Configurable alert thresholds
- Location-based filtering
- Reliable notification system

## ✨ Features
- **Core Functionality**
  - 24/7 disaster monitoring
  - Alerts (WebSocket)
  - Geographic filtering (Lat/Long)
  - Support for 5+ disaster types

- **Technical Components**
  - REST API integration
  - Environment-based configuration
  - Automated cron scheduling
  - Detailed logging system

## 📸 Screenshots
| Component          | Preview             |
|--------------------|---------------------|
| API Response       | ![API Response](public/api_response.png) |
| Testing            | ![Testing 1](public/test1.jpeg) ![Testing 2](public/test2.jpeg) ![Testing 3](public/test3.jpeg) |
| System Dashboard   | ![Dashboard 1](public/dashboard1.jpeg) ![Dashboard 2](public/dashboard2.jpeg) ![Dashboard 3](public/dashboard3.jpeg) |

## 🔄 System Workflow
```mermaid
graph TD
    A([Start]) --> B[Poll Alerts API]
    B --> C{New Disaster Alert?}
    C -->|No| B
    C -->|Yes| D[Apply Location Filter]
    D --> E[Check Severity Level]
    E --> F{Meets Criteria?}
    F -->|No| B
    F -->|Yes| G[Broadcast Alert via WebSocket]
    G --> H[Log Transaction]
    H --> B
    click B "https://developers.google.com/public-alerts" "Google Alerts API Docs"
    click G "https://flask-socketio.readthedocs.io" "Flask-SocketIO Docs"
```

## 💻 Installation
### Prerequisites
- Python 3.8+
- Flask
- Flask-SocketIO

```bash
# Clone repository
git clone https://github.com/sushant-wayal/Disaster-Alert-System.git
#For running frontend
cd Disaster-Alert-System
npm install && npm run dev

#For running the backend
cd Disaster-Alert-System/backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

## ⚙️ Configuration

### 🏗️ Configure Nginx for Load Balancing

Nginx can be used as a load balancer to distribute traffic among multiple servers. Follow the steps below to set it up:

1. **Update and Install Nginx:**
   ```bash
   sudo apt update && sudo apt upgrade -y
   sudo apt install nginx -y
   sudo systemctl start nginx
   sudo systemctl enable nginx
   ```

2. **Edit the Nginx Configuration File:**
   Open the Nginx configuration file to define a load-balancing setup.
   Add the contents of nginx.conf in backend directory to the file opened above.
   ```bash
   sudo nano /etc/nginx/nginx.conf

3. **Restart Nginx to Apply Changes:**
   ```bash
   sudo systemctl restart nginx
   ```

![Nginx Logo](https://upload.wikimedia.org/wikipedia/commons/c/c5/Nginx_logo.svg)

---

### 🐳 Configure Docker and Redis for Pub-Sub Architecture

Redis can be used for a **publish-subscribe (pub-sub) messaging architecture**, where messages are broadcasted to multiple subscribers in real-time.

1. **Install Required Dependencies:**
   ```bash
   sudo apt install -y ca-certificates curl gnupg
   ```

2. **Add Docker’s Official GPG Key:**
   ```bash
   sudo install -m 0755 -d /etc/apt/keyrings
   curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo tee /etc/apt/keyrings/docker.asc > /dev/null
   sudo chmod a+r /etc/apt/keyrings/docker.asc
   ```

3. **Add Docker Repository:**
   ```bash
   echo \ 
   "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \ 
   $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
   ```

4. **Install Docker and Start the Service:**
   ```bash
   sudo apt update
   sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
   sudo systemctl start docker
   sudo systemctl enable docker
   ```

5. **Run Redis in a Docker Container:**
   ```bash
   sudo docker run -d --name redis-container -p 6379:6379 redis
   ```

6. **Verify Redis is Running:**
   ```bash
   sudo docker ps
   ```

   Connect to the Redis CLI inside the container:
   ```bash
   sudo docker exec -it redis-container redis-cli
   ```
   Run a test command:
   ```bash
   PING
   ```
   Expected output: `PONG`

![Redis Logo](https://upload.wikimedia.org/wikipedia/en/6/6b/Redis_Logo.svg)

🚀 Now, your **Nginx load balancer** and **Redis pub-sub system** are configured and running!

alert_preferences:
  severity: [High, Severe]
  disasters: [Earthquake, Flood]
```

### 🚀 Usage
### Basic Command
```bash
  python app.py PORT_NO # PORT_NO can be 5000,5001,5002
```

### Testing
Run tests using pytest:
```bash
cd backend/tests
pytest test_models.py
pytest test_routes.py
pytest test_websocket.py
```

### Scheduled Execution
```bash
source venv/bin/python app.py PORT_NO # PORT_NO can be 5000,5001,5002
```
