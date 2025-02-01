import pytest
from unittest.mock import patch, MagicMock
from flask_socketio import SocketIOTestClient
from app import app, socketio


@pytest.fixture
def socketio_client():
    return SocketIOTestClient(app, socketio)


@pytest.fixture(autouse=True)
def mock_redis_and_manager():
    with patch("app.r") as mock_redis, patch("app.socketio.server.manager") as mock_manager:
        
        pubsub_mock = mock_redis.pubsub.return_value
        pubsub_mock.listen.return_value = []
        pubsub_mock.subscribe.return_value = None
        
        mock_manager.is_async = False
        mock_manager.connect = lambda *args, **kwargs: None  
        yield mock_redis


def test_socket_connection(socketio_client):
    assert socketio_client.is_connected()

    socketio_client.disconnect()
    assert not socketio_client.is_connected()
