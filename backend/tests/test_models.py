import pytest 
from app import db, User,Alert


def test_user_model(client):
    """
    Test case for the User model.

    Steps:
    1. Create a new user instance.
    2. Add and commit the user to the database.
    3. Query the user from the database.
    4. Verify that the user exists and has the expected attributes.
    5. Delete the user from the database to clean up.
    """

    # Create a new user instance
    user = User(username="test_user", password="test_password")

    # Add the user to the database session and commit
    db.session.add(user)
    db.session.commit()

    # Query the user from the database
    queried_user = User.query.filter_by(username="test_user").first()

    # Assert that the user exists
    assert queried_user is not None

    # Assert that the username matches the expected value
    assert queried_user.username == "test_user"

    # Clean up: Delete the test user from the database
    db.session.delete(queried_user)
    db.session.commit()


def test_alert_model(client):
    """
    Test case for the Alert model.

    Steps:
    1. Create a new alert instance with test data.
    2. Add and commit the alert to the database.
    3. Query the alert from the database.
    4. Verify that the alert exists and has the expected attributes.
    5. Delete the alert from the database to clean up.
    """

    # Define test alert data
    alert_data = {
        'title': 'Test Alert',
        'description': 'This is a test alert',
        'type': 'Test',
        'severity': 'High',
        'region': 'Test Region'
    }

    # Create a new Alert instance
    alert = Alert(alert_data)

    # Add the alert to the database session and commit
    db.session.add(alert)
    db.session.commit()

    # Query the alert from the database
    queried_alert = Alert.query.filter_by(title='Test Alert').first()

    # Assert that the alert exists
    assert queried_alert is not None

    # Assert that the alert attributes match the expected values
    assert queried_alert.title == 'Test Alert'
    assert queried_alert.description == 'This is a test alert'
    assert queried_alert.type == 'Test'
    assert queried_alert.severity == 'High'
    assert queried_alert.region == 'Test Region'

    # Clean up: Delete the test alert from the database
    db.session.delete(queried_alert)
    db.session.commit()

