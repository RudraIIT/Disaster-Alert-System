from flask_socketio import SocketIOTestClient
from app import app, socketio, db, Alert

def test_socket_connection(client):
    socketio_client = SocketIOTestClient(app, socketio)
    assert socketio_client.is_connected()
    socketio_client.disconnect()
    assert not socketio_client.is_connected()


    
