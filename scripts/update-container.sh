docker container stop $(docker container list -q)
docker pull 948216083442.dkr.ecr.us-east-1.amazonaws.com/bachelor_api:latest
docker run -d -p 80:3333 948216083442.dkr.ecr.us-east-1.amazonaws.com/bachelor_api:latest