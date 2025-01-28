# Disaster Alert System 🚨

A comprehensive solution designed to provide real-time disaster alerts and facilitate effective communication during emergencies. This system is tailored to help authorities and individuals respond promptly to potential disasters, minimizing harm and enhancing disaster preparedness.

## 📋 Features

* **Real-time alerts:** Uses Socket.IO to push notifications to users in real-time.
* **Alert creation:**  Authorized users can create new alerts with details such as title, description, type, severity, and region.
* **Alert feed:** Displays active alerts with relevant information.
* **Map visualization:** Includes a map component (placeholder) for displaying alert locations.
* **Emergency contacts:** Provides a list of essential emergency contact numbers.
* **User authentication:**  Supports user signup and login for secure access to alert creation features.

## 🚀 Tech Stack

* **Backend:** Flask (Python), SQLAlchemy, Flask-SocketIO, Flask-CORS
* **Frontend:** Next.js (React), Tailwind CSS, Sonner (Toast notifications), Lucide React (Icons)
* **Real-time communication:** Socket.IO

## 📂 Project Structure

```plaintext
Disaster-Alert-System/
├── /       # React.js frontend code
├── backend/        # Backend code
└── README.md       # Project documentation
```

## 🛠️ Setup and Installation

1. Clone the repository.
    ```bash
        git clone https://github.com/sushant-wayal/Disaster-Alert-System.git
        cd Disaster-Alert-System
    ```
2. Backend Setup
    - Navigate to the backend folder:
        ```bash
        cd backend
        ```
    - Install dependencies:
        ```bash
        pip install -r requirements.txt
        ```
    - Start the server:
        ```bash
        python app.py
        ```
3. Frontend Setup:
    - Install dependencies:
        ```bash
        npm install
        ```
    - Start the development server:
        ```bash
        npm run dev
        ```

## Future Improvements

* Integrate a real-time map service (e.g., Google Maps, Mapbox) to display alert locations.
* Implement more robust user roles and permissions.
* Add support for multiple notification channels (e.g., SMS, email).
* Enhance the UI/UX for better user experience.


This project is a work in progress and contributions are welcome!