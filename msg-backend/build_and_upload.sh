#!/bin/bash

# Configuration variables
DOCKER_USERNAME="fluttr"   
REPOSITORY_NAME="movs-msg"      
IMAGE_NAME="movs-msg"          
TAG="latest"                             

# Full image name
FULL_IMAGE_NAME="$DOCKER_USERNAME/$REPOSITORY_NAME:$TAG"

# Function to check for errors
check_error() {
  if [ $? -ne 0 ]; then
    echo "Error occurred: $1"
    exit 1
  fi
}

echo "Starting Docker image build and upload process..."

# Step 1: Build the Docker image
echo "Building Docker image..."
docker build -t "$IMAGE_NAME:$TAG" .
check_error "Failed to build Docker image."

# Step 2: Tag the image for Docker Hub
echo "Tagging Docker image as $FULL_IMAGE_NAME..."
docker tag "$IMAGE_NAME:$TAG" "$FULL_IMAGE_NAME"
check_error "Failed to tag Docker image."

# Step 3: Log in to Docker Hub
echo "Logging in to Docker Hub..."
docker login
check_error "Failed to log in to Docker Hub."

# Step 4: Push the image to Docker Hub
echo "Pushing Docker image to Docker Hub..."
docker push "$FULL_IMAGE_NAME"
check_error "Failed to push Docker image."

echo "Docker image successfully built and uploaded: $FULL_IMAGE_NAME"

