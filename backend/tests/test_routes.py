import pytest
from flask import session

def test_index_route(client):
    response = client.get('/')
    assert response.status_code == 200
    assert response.get_json() == {'message': 'Hello, World!'}

def test_signup_route(client):
    response = client.post('/signup', json={"username": "test_user", "password": "test_password"})
    assert response.status_code == 201
    data = response.get_json()
    
    assert 'message' in data and data['message'] == 'Signup successful'
    assert 'user_id' in data  # Ensure user_id is present

    # Test if user already exists
    response = client.post('/signup', json={"username": "test_user", "password": "test_password"})
    assert response.status_code == 400
    assert response.get_json() == {'message': 'User already exists'}

def test_login_route(client):
    client.post('/signup', json={"username": "test_user", "password": "test_password"})
    
    response = client.post('/login', json={"username": "test_user", "password": "test_password"})
    assert response.status_code == 200
    data = response.get_json()
    
    assert 'message' in data and data['message'] == 'Login successful'
    assert 'user_id' in data  # Ensure user_id is present

    # Test if invalid credentials
    response = client.post('/login', json={"username": "test_user", "password": "wrong_password"})
    assert response.status_code == 401
    assert response.get_json() == {'message': 'Invalid credentials'}
