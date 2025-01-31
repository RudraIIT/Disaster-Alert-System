#!/usr/bin/env bash

# Exit immediately if a command fails
set -e

# Detect the operating system
OS=$(uname -s)

# Function to install Python 3.10 and venv on Ubuntu
install_python_venv_ubuntu() {
    if ! command -v python3.10 &>/dev/null; then
        echo "Python 3.10 not found. Installing..."
        sudo apt update
        sudo apt install -y software-properties-common
        sudo add-apt-repository -y ppa:deadsnakes/ppa
        sudo apt update
        sudo apt install -y python3.10 python3.10-venv
    else
        echo "Python 3.10 is already installed."
    fi
}

# Set Python version and install dependencies if on Linux
if [ "$OS" = "Linux" ]; then
    PYTHON=python3.10
    install_python_venv_ubuntu
elif [[ "$OS" =~ CYGWIN|MINGW|MSYS ]]; then
    PYTHON=python  # Use default python on Windows
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
    pip install --upgrade pip
    pip install -r requirements.txt
else
    echo "Error: requirements.txt not found. Exiting."
    exit 1
fi

if ! command -v pytest &>/dev/null; then
    echo "Installing pytest..."
    pip install pytest
fi
