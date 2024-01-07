## Build Image Json_server

### -- docker build -f Dockerfile_json_server -t json_server_rq:v1.2 .

## Create Container Json_server

### -- docker run -d --name my_json_server -p 3000:3000 json_server_rq:v1.2

###----------------------------------------------------------------

## Build Image Todo list

### -- docker build -t todolist:v1.0 .

## Create Container Todo list

### -- docker run -d --name todolist -p 5848:80 todo:v1.0

###----------------------------------------------------------------

## docker compose

### -- docker compose up -d

### --- docker compose down --rmi all
