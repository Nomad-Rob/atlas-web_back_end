# Use official Ubuntu 18.04 LTS base image
FROM ubuntu:18.04

# Avoid prompts from apt
ENV DEBIAN_FRONTEND=noninteractive

# Set the timezone environment variable
ENV TZ=America/Los_Angeles
RUN apt-get update && \
    apt-get install -y tzdata

# Install Python 3.7 and other necessary packages
RUN apt-get update && \
    apt-get install -y software-properties-common && \
    add-apt-repository ppa:deadsnakes/ppa && \
    apt-get update && \
    apt-get install -y python3.7 python3-pip wget && \
    update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.7 1

# Upgrade pip
RUN python3 -m pip install --upgrade pip

# Add MongoDB official GPG key
RUN wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | apt-key add -

# Add MongoDB to the list of repositories
RUN echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" > /etc/apt/sources.list.d/mongodb-org-4.2.list

# Update apt-get and install MongoDB
RUN apt-get update && \
    apt-get install -y mongodb-org

# Install pymongo
RUN pip3 install pymongo

# Create directory for MongoDB data
RUN mkdir -p /data/db

# Add your custom MongoDB init script
ADD init.d-mongod /etc/init.d/mongod
RUN chmod u+x /etc/init.d/mongod

# Run indefinitely
CMD ["tail", "-f", "/dev/null"]
