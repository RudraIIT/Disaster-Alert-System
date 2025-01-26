from flask import Flask, request, jsonify, session, make_response
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_socketio import SocketIO, emit
from flask_cors import CORS
from flask_migrate import Migrate

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
migrate = Migrate(app, db)
socketio = SocketIO(app, cors_allowed_origins="http://localhost:3000")
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})


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
    return jsonify({'message': 'Signup successful'}), 201

# API Route: Login
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()
    if user and check_password_hash(user.password, password):
        session['user_id'] = user.id
        return jsonify({'message': 'Login successful'}), 200
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

# WebSocket: Handle Connection
@socketio.on('connect')
def handle_connect():
    print("A client has connected.")
    emit('connected', {'message': 'Connection successful'})

# WebSocket: Send Notifications
@socketio.on('send_notification')
def handle_notification(data):
    description = data.get('description')
    print(f"Data : {data}")
    if not description:
        emit('error', {'description': 'Notification cannot be empty'}, broadcast=False)
        return

    emit('notification', {'description': description}, broadcast=True)
    new_alert = Alert(data)
    db.session.add(new_alert)
    db.session.commit()

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
    
    # Run the app
    socketio.run(app, debug=True, use_reloader=True, port=5000)
