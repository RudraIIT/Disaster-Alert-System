#!/usr/bin/env bash

# Exit immediately if a command fails
set -e

# Detect the operating system
OS=$(uname -s)

# Function to install Python venv on Ubuntu
install_python_venv_ubuntu() {
    if ! dpkg -s python3.10-venv &>/dev/null; then
        echo "Installing python3.10-venv on Ubuntu..."
        sudo apt update && sudo apt install -y python3.10-venv
    else
        echo "python3.10-venv is already installed."
    fi
}

# Set Python version
if [ "$OS" = "Linux" ]; then
    PYTHON=python3.10
    install_python_venv_ubuntu
elif [[ "$OS" =~ CYGWIN|MINGW|MSYS ]]; then
    PYTHON=python
else
    echo "Unsupported operating system: $OS"
    exit 1
fi

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "Creating Python virtual environment..."
    $PYTHON -m venv venv
fi

# Activate virtual environment
echo "Activating virtual environment..."
if [ "$OS" = "Linux" ]; then
    source venv/bin/activate
elif [[ "$OS" =~ CYGWIN|MINGW|MSYS ]]; then
    source venv/Scripts/activate
else
    echo "Unsupported operating system: $OS"
    exit 1
fi

# Install dependencies
if [ -f "requirements.txt" ]; then
    echo "Installing Python dependencies..."
    pip install -r requirements.txt
else
    echo "Error: requirements.txt not found. Exiting."
    exit 1
fi
