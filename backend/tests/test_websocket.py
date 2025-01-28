from flask_socketio import SocketIOTestClient
from app import app, socketio, db, Alert

def test_socket_connection(client):
    socketio_client = SocketIOTestClient(app, socketio)
    assert socketio_client.is_connected()
    socketio_client.disconnect()
    assert not socketio_client.is_connected()

def test_send_notification(client):
    socketio_client = SocketIOTestClient(app, socketio)
    notification_data = {
        "title": "Test Title",
        "description": "Test Notification",
        "type": "Test Type",
        "severity": "High",
        "region": "Test Region"
    }
    socketio_client.emit('send_notification', notification_data)

    received = socketio_client.get_received()
    
    notification_events = [
        event for event in received if event['name'] == 'notification'
    ]

    assert len(notification_events) > 0 , "Notification not received"

    assert any(
        event["args"][0]["description"] == "Test Notification"
        for event in notification_events
    ), "Notification description not matching"

    with app.app_context():
        alert = Alert.query.filter_by(title="Test Title").first()
        assert alert is not None
        assert alert.description == "Test Notification"
        
    socketio_client.disconnect()

    
