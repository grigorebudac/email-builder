npm run build:api

docker build -f ./apps/api/Dockerfile . -t bachelor-api --platform=linux/amd64

aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 948216083442.dkr.ecr.us-east-1.amazonaws.com/bachelor_api
docker tag bachelor-api:latest 948216083442.dkr.ecr.us-east-1.amazonaws.com/bachelor_api
docker push 948216083442.dkr.ecr.us-east-1.amazonaws.com/bachelor_api