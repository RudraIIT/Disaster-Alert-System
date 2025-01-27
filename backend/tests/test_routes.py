import pytest
from flask import session

def test_index_route(client):
    response = client.get('/')
    assert response.status_code == 200
    assert response.get_json() == {'message': 'Hello, World!'}

def test_signup_route(client):
    response = client.post('/signup' ,json={"username": "test_user", "password": "test_password"})
    assert response.status_code == 201
    assert response.get_json() == {'message': 'Signup successful'}

    # Test if user already exists

    response = client.post('/signup' ,json={"username": "test_user", "password": "test_password"})
    assert response.status_code == 400
    assert response.get_json() == {'message': 'User already exists'}

def test_login_route(client):
    client.post('/signup' ,json={"username": "test_user", "password": "test_password"})
    response = client.post('/login' ,json={"username": "test_user", "password": "test_password"})
    assert response.status_code == 200
    assert response.get_json() == {'message': 'Login successful'}

    # Test if invalid credentials
    response = client.post('/login' ,json={"username": "test_user", "password": "wrong_password"})
    assert response.status_code == 401
    assert response.get_json() == {'message': 'Invalid credentials'}