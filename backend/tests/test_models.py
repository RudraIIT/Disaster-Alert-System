import pytest 
from app import db, User,Alert


def test_user_model(client):
    user = User(username="test_user", password="test_password")
    db.session.add(user)
    db.session.commit()

    queried_user = User.query.filter_by(username="test_user").first()
    assert queried_user is not None
    assert queried_user.username == "test_user"

    db.session.delete(queried_user)
    db.session.commit()

def test_alert_model(client):
    alert_data = {
        'title': 'Test Alert',
        'description': 'This is a test alert',
        'type': 'Test',
        'severity': 'High',
        'region': 'Test Region'
    }

    alert = Alert(alert_data)
    db.session.add(alert)
    db.session.commit()

    queried_alert = Alert.query.filter_by(title='Test Alert').first()
    assert queried_alert is not None
    assert queried_alert.title == 'Test Alert'
    assert queried_alert.description == 'This is a test alert'
    assert queried_alert.type == 'Test'
    assert queried_alert.severity == 'High'
    assert queried_alert.region == 'Test Region'

    db.session.delete(queried_alert)
    db.session.commit()
