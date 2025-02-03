from flask import Flask, request, jsonify, session, make_response
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_socketio import SocketIO, emit, join_room
from flask_cors import CORS
from flask_migrate import Migrate
from threading import Thread
import redis
import sys
import json

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
migrate = Migrate(app, db)
socketio = SocketIO(app, cors_allowed_origins="*",manage_session=True,message_queue='redis://localhost:6379/0')
CORS(app, resources={r"/*": {"origins": "*"}})
r = redis.Redis(host='localhost', port=6379, db=0)

user_locations = {}

# User Model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

# Alert Model
class Alert(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(200), nullable=False)
    type = db.Column(db.String(50), nullable=False)
    severity = db.Column(db.String(50), nullable=False)
    region = db.Column(db.String(50), nullable=False)

    def __init__(self, data):
        self.title = data.get('title')
        self.description = data.get('description')
        self.type = data.get('type')
        self.severity = data.get('severity')
        self.region = data.get('region')

class Marker(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(200), nullable=False)
    status = db.Column(db.String(50), nullable=False)

    def __init__(self, data):
        self.latitude = data.get('latitude')
        self.longitude = data.get('longitude')
        self.description = data.get('description')
        self.status = data.get('status')

def haversine(lat1, lon1, lat2, lon2):
    """
    Calculate the great-circle distance between two points on the Earth 
    using the Haversine formula.
    
    Parameters:
    lat1, lon1 -- Latitude and Longitude of the first point in decimal degrees
    lat2, lon2 -- Latitude and Longitude of the second point in decimal degrees

    Returns:
    Distance between the two points in kilometers.
    """
    from math import radians, sin, cos, sqrt, atan2
    R  = 6371.0

    lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, lat2, lon2])
    dlat = lat2 - lat1
    dlon = lon2 - lon1

    a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    return R * c

@app.route('/')
def index():
    print("Hello, World!")
    return jsonify({'message': 'Hello, World!'})

# API Route: Signup
@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if User.query.filter_by(username=username).first():
        return jsonify({'message': 'User already exists'}), 400

    hashed_password = generate_password_hash(password, method='pbkdf2:sha256')
    new_user = User(username=username, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'Signup successful','user_id':new_user.id}), 201

# API Route: Login
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()
    if user and check_password_hash(user.password, password):
        session['user_id'] = user.id
        return jsonify({'message': 'Login successful', 'user_id': user.id}), 200
    return jsonify({'message': 'Invalid credentials'}), 401

# API Route: Get Notifications
@app.route('/notifications', methods=['GET'])
def get_notifications():
    alerts = Alert.query.all()

    alerts_data = [
        {
            'id': alert.id,
            'title': alert.title,
            'description': alert.description,
            'type': alert.type,
            'severity': alert.severity,
            'region': alert.region
        } 
        for alert in alerts
    ]

    return jsonify(alerts_data), 200

@app.route('/markers', methods=['GET'])
def get_markers():
    markers = Marker.query.all()

    markers_data = [
        {
            'id': marker.id,
            'latitude': marker.latitude,
            'longitude': marker.longitude,
            'description': marker.description,
            'status': marker.status
        } 
        for marker in markers
    ]

    return jsonify(markers_data), 200

# WebSocket: Handle Connection
@socketio.on('connect')
def handle_connect():
    print("A client has connected.")
    user_id = request.args.get('user_id')
    print(f"User ID: {user_id}")
    if user_id:
        print(f"User {user_id} has connected.") 
        join_room(user_id)

# WebSocket: Send Notifications
@socketio.on('send_notification')
def handle_notification(data):
    """
    Handles incoming notification data, determines recipients within a 50km radius, 
    and emits alerts to them while storing relevant information in the database.

    Parameters:
    data (dict) -- Contains notification details such as 'user', 'description', and 'severity'
    
    """
    print("Received notification data: ", data)
    latitude = user_locations.get(data.get('user'))[0]
    longitude = user_locations.get(data.get('user'))[1]
    description = data.get('description')
    severity = data.get('severity')
    if not (latitude and longitude and description):
        emit('error', {'message': 'Invalid data'}, broadcast=False)
        return
    
    recipients = []
    print(f"User Locations: {user_locations}")
    print("Start recipients", recipients)
    for user_id, (user_lat,user_lon) in user_locations.items():
        distance =  haversine(latitude, longitude, user_lat, user_lon)
        print(f"Distance between users: {distance}")
        if distance <= 50:
            recipients.append(user_id)
    print(f"Recipients: {recipients}")
    new_alert = Alert(data)

    alert_data = {
        'position': [latitude, longitude],
        'popup': description,
        'status': severity
    }

    serialized_data = json.dumps(alert_data)

    r.publish('alerts', serialized_data)

    for user_id in recipients:
        emit('alert', {'position': [latitude, longitude], 'popup': description, 'status': severity}, room=user_id)
        #add this to marker table
        new_marker = Marker({
            'latitude': latitude,
            'longitude': longitude,
            'description': description,
            'status': severity
        })
        db.session.add(new_marker)
        db.session.add(new_alert)
    db.session.commit()

@socketio.on('location')
def handle_location(data):
    user_id = data.get('user')
    latitude = data.get('latitude')
    longitude = data.get('longitude')
    # print("User ID: new ", latitude, longitude)

    if user_id and latitude and longitude:
        user_locations[user_id] = (latitude, longitude)
        print(f"Updated location for user {user_id}: {latitude}, {longitude}")

@socketio.on('message')
def handle_message(data):
    print("Received message: ", data)

def listen_for_messages():
    pubsub = r.pubsub()
    pubsub.subscribe('alerts')

    for message in pubsub.listen():
        if message['type'] == 'message':
            alert_data = json.loads(message['data'])
            print(f"Received alert: {alert_data}")
            socketio.emit('alert', alert_data)

def start_redis_listener():
    listen_for_messages()

# API Route: Logout
@app.route('/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)
    return jsonify({'message': 'Logged out successfully'}), 200

if __name__ == '__main__':
    # Create database tables within the app context
    with app.app_context():
        db.create_all()
        print("Database initialized.")

    # Get port from command line argument (default to 5000)
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 5000

    # Run the app on the specified port
    redis_thread = Thread(target=start_redis_listener)
    redis_thread.daemon = True
    redis_thread.start()
    socketio.run(app, debug=True, use_reloader=False, port=port)
