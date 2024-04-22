# Chat Application Setup Guide

This README provides instructions on how to set up and run the chat application locally. It includes setting up MongoDB, installing the correct version of Node.js, and running the server and client applications.


## Installation Steps

### 1. Set Up MongoDB

To install MongoDB on Ubuntu, follow these steps to use the official MongoDB repository:

#### Import the MongoDB public GPG Key:

```bash
sudo apt-get install gnupg curl

curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor

echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

sudo apt-get update

sudo apt-get install -y mongodb-org
```


### 2. Install Node.js

Install Node.js using NodeSource. This provides the latest versions directly suitable for development:

```bash
# Using Ubuntu
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Verify the Node.js installation:

```bash
node -v
```

### 3. Install Dependencies

Navigate to both the frontend and backend directories in separate terminal windows and install the necessary packages:

```bash
# For backend
cd ./chat-app-backend
npm install

# For frontend
cd ./chat-app-frontend
npm install
```

### 5. Configure Environment Variables

Set up the necessary environment variables. Create a `.env` file in your backend directory and add the following:

```plaintext
MONGO_URI=mongodb://localhost:27017/chatApp
PORT=3000
```

### 6. Run the Application

Start both the backend and frontend services:

```bash
# Start the backend server
cd chat-app/readme.txt
npm start

# In another terminal, start the frontend application
cd ./chat-app-frontend
npm start
```

## Accessing the Application

Open your web browser and navigate to `http://localhost:3000` (or whichever port the frontend is set to use) to view and interact with the chat application.



## Deployment Using Docker and Kubernetes

This section provides a step-by-step guide on how to deploy the chat application using Docker containers and manage it through Kubernetes with Minikube.

### Prerequisites

Ensure you have the following installed:
- **Docker**: For creating and managing your application containers.
- **Minikube**: A tool that allows you to run Kubernetes locally.
- **kubectl**: A command-line tool for interacting with your Kubernetes cluster.

### Step 1: Dockerize the Application

1. **Navigate to the Backend Directory**:
   - Build the Docker image for the backend.
   ```bash
   cd ./chat-app-backend
   docker build -t chat-app-backend .
   ```

2. **Navigate to the Frontend Directory**:
   - Build the Docker image for the frontend.
   ```bash
   cd ./chat-app-frontend
   docker build -t chat-app-frontend .
   ```

### Step 2: Start Minikube

- Start your local Kubernetes cluster with Minikube.
  ```bash
  minikube start
  ```

### Step 3: Enable Ingress in Minikube

- This allows you to access your services via an external IP.
  ```bash
  minikube addons enable ingress
  ```

### Step 4: Deploy to Kubernetes

1. **Navigate to the Kubernetes Configuration Directory**:
   ```bash
   cd ./k8s
   ```

2. **Apply the Kubernetes Configurations**:
   - Deploy the backend and frontend services.
   ```bash
   kubectl apply -f backend-deployment.yaml
   kubectl apply -f frontend-deployment.yaml
   ```

### Step 5: Access the Application

- Use Minikube to open the frontend service in your default web browser.
  ```bash
  minikube service frontend-service
  ```

### Step 7: Stop and Cleanup

- When you're done, you can stop Minikube and optionally delete all resources.
  ```bash
  minikube stop
  minikube delete
  ```

### Additional Notes

- **Configuration Changes**: If you update your Docker images, make sure to rebuild them and apply the changes to Kubernetes.
