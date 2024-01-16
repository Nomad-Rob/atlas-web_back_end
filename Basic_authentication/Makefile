# .PHONY is used to tell make that these commands are not files
.PHONY: 
	install run clean

# All commands start with make

NAME="Rob Farley"
IMAGE=nomadrob/basic_auth
CONTAINER=project_container
TAG=latest

# Builds a docker image for a development box with a image name, can change dev to project name
build:
		docker build . -t "${IMAGE}:${TAG}"

# Runs the image name in a container
# This will run the image in the background and map port 2022 to the ssh port on the dev box
# Feel free to add more ports as needed, (ex: docker run -d -p 2022:22 -p 9000:80 image name)
run:
	docker run -d --name ${CONTAINER} -p 5000:5000 -e API_HOST=0.0.0.0 -e API_PORT=5000 ${IMAGE}

start:
	docker start ${IMAGE}

# SSH into the running dev-box
ssh:
	ssh -p 2022 root@localhost
	
# Publishes the image to docker hub
publish: build
	docker push ${IMAGE}:${TAG}
  
# Install dependencies for the project
install: requirements.txt
	pip3 install -r $<
	
# Stop all running docker containers
stop:
	docker stop ${IMAGE}

# Remove all pycache files
clean:
	find . -name \*.pyc -delete
  
# Remove container and image
#remove:
  #docker rm ${IMAGE}

# Logs container
#logs:
  #docker logs ${IMAGE}

# Remove all docker images, containers, and volumes
nuke:
	docker system prune -af

# Reset known hosts on local machine for port 2022
# This may need to be run if you make a new dev-box and aren't able to ssh into it
reset-known-hosts:
	ssh-keygen -R [localhost]:2022
  
