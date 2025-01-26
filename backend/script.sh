#!/bin/bash

# This script is used to run the backend server

sudo apt install python3.10-venv
python3.10 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python3 app.py
