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
cd Disaster-Alert-System

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

## ⚙️ Configuration
1. Create .env file:
```bash
SECRET_KEY=your_secret_key
DATABASE_URI=sqlite:///disaster_alert.db
SOCKETIO_MESSAGE_QUEUE=redis://localhost:6379
```

2. Configure settings.yaml:
```yaml
location:
  latitude: 18.5204
  longitude: 73.8567
  radius: 100  # km

alert_preferences:
  severity: [High, Severe]
  disasters: [Earthquake, Flood]
```

## 🚀 Usage
### Basic Command
```bash
python app.py
```

### Testing
Run tests using pytest:
```bash
pytest
```

### Scheduled Execution
```bash
# Run every 5 minutes
*/5 * * * * cd /path/to/project && venv/bin/python app.py
```
