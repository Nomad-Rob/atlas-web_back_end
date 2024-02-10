# Use Ubuntu 18.04 as the base image
FROM ubuntu:18.04

# Set environment variables to avoid user interaction during installation
ENV DEBIAN_FRONTEND=noninteractive

# Install MongoDB
RUN apt-get update && apt-get install -y wget gnupg \
    && wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | apt-key add - \
    && echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-4.2.list \
    && apt-get update \
    && apt-get install -y mongodb-org

# Install Python 3.7 and pip
RUN apt-get install -y software-properties-common \
    && add-apt-repository ppa:deadsnakes/ppa \
    && apt-get update \
    && apt-get install -y python3.7 python3-pip \
    && python3.7 -m pip install --upgrade pip

# Setup the MongoDB data directory
RUN mkdir -p /data/db

# Expose the default MongoDB port
EXPOSE 27017

# Create the /NoSQL directory and set it as the working directory
RUN mkdir -p /NoSQL
WORKDIR /NoSQL

# Copy your application code and requirements.txt to the container
COPY . /NoSQL
RUN chmod -R 777 /NoSQL

# Start MongoDB in the background and keep the container running
CMD mongod --fork --logpath /var/log/mongodb.log && tail -f /dev/null

