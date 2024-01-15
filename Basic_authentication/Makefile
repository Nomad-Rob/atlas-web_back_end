# All commands start with make

# Builds a docker image for a development box with a image name, can change dev to project name
build:
	docker build -t basic_auth .

# Runs the image name in a container
# This will run the image in the background and map port 2022 to the ssh port on the dev box
# Feel free to add more ports as needed, (ex: docker run -d -p 2022:22 -p 9000:80 image name)
run:
	docker run --name Project -p API_HOST=0.0.0.0 -e API_PORT=5000 basic_auth

start:
	docker start Project

# SSH into the running dev-box
ssh:
	ssh -p 2022 root@localhost
  
# Install dependencies for the project
install:
  pip3 install -r requirements.txt

# Stop all running docker containers
stop:
	docker stop Project

# Remove all pycache files
clean:
	find . -name \*.pyc -delete
  
# Remove container and image
remove:
  docker rm Project
  docker rmi basic_auth

# Logs container
logs:
  docker logs Project

# Remove all docker images, containers, and volumes
nuke:
	docker system prune -af

# Reset known hosts on local machine for port 2022
# This may need to be run if you make a new dev-box and aren't able to ssh into it
reset-known-hosts:
	ssh-keygen -R [localhost]:2022
  
