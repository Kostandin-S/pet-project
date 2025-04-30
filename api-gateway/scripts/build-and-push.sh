#!/bin/bash

# ========================
# Build and Push Docker Image for a Service
# ========================

# Usage: ./build-and-push.sh service-name dockerhub-username

SERVICE_NAME=$1
DOCKER_USERNAME=$2
IMAGE_TAG=latest

if [ -z "$SERVICE_NAME" ] || [ -z "$DOCKER_USERNAME" ]; then
  echo "Usage: ./build-and-push.sh <service-name> <dockerhub-username>"
  exit 1
fi

echo "🔨 Building Docker image for $SERVICE_NAME..."
docker build -t $SERVICE_NAME:$IMAGE_TAG ./$SERVICE_NAME

echo "🏷️  Tagging image..."
docker tag $SERVICE_NAME:$IMAGE_TAG docker.io/$DOCKER_USERNAME/book-tracker-microservices-$SERVICE_NAME:$IMAGE_TAG

echo "🚀 Pushing image to Docker Hub..."
docker push docker.io/$DOCKER_USERNAME/book-tracker-microservices-$SERVICE_NAME:$IMAGE_TAG

echo "✅ Done! Image pushed: docker.io/$DOCKER_USERNAME/book-tracker-microservices-$SERVICE_NAME:$IMAGE_TAG"
