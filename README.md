<h1 align="center">ToDo Management System</h1>

<p align="center">This Todo App was made for the Distributed and Parallel systems Lab Exercise at HS-Esslingen.</p>

## 📌 - Description

With this ToDo App you can create and manage your ToDos. You can see at the top of the site [the number of total and done todos](https://user-images.githubusercontent.com/100692657/205428221-6588f29b-a375-4c5e-a65a-9df3a49b3ecb.png). 
When creating the ToDo you should give the name. If there is already a ToDo with this name and it is still opened, 
you receive an [error alert](https://user-images.githubusercontent.com/100692657/205428282-92d36e06-d668-4bdc-8522-f990256a4f6d.png) and can't create the new todo. It is valid also for edit a name of existing ToDo. You can specify the [priority level](https://user-images.githubusercontent.com/100692657/205428217-cc13532f-c8e0-4492-b61c-67f7109010cb.png)
of the ToDo. Default is 2. You should select the levels within the range 1 - 5. Level 1 has the highest urgency.
You can [edit](https://user-images.githubusercontent.com/100692657/205428219-33a1c28c-6b97-49db-8ca4-a33f621cd5c9.png) or [delete](https://user-images.githubusercontent.com/100692657/205428220-d6302ff9-6948-4945-88ab-564ebf638955.png) a ToDo. You receive an [alert message](https://user-images.githubusercontent.com/100692657/205428218-f2cd0776-83da-4a77-a204-1ceea556d161.png) after all interactions with server.


## 🛠️ - Tech Stack

- Client
  - [Next.js](https://nextjs.org/docs)
  - [Tailwind CSS](https://tailwindcss.com/docs/installation)
- Server
  - [Java Spring with Maven](https://start.spring.io/)
  - [Spring Guides](https://spring.io/guides/gs/rest-service/)
  - [Baeldung Guides](www.baeldung.com/spring-rest-openapi-documentation)
- Documentation
  - [Swagger](https://swagger.io/docs/)


## 📚 - Structure

```
.
│   # Frontend
├── /client
│   ├── /components
│   │   ├── /global     # Global components
│   │   |   ├── Button.tsx
│   │   |   ├── Input.tsx
│   │   |   ├── ...
│   │   ├── /todos     # page specified components
│   │   |   ├── AddButton.tsx
│   │   |   ├── NewForm.tsx
│   │   |   ├── ...
│   ├── /pages
│   │   ├── /todos     # Each folder is corresponding with  router e.g http://localhost:3000/todos
|   |   |   ├── index.tsx
│   │   ├── /_app.tsx
│   │   ├── /index.tsx
│   ├── Dockerfile
│   ├── next.config.js  # All configurations and environment variables for frontend
│   ├── ...

│   # Backend
├── /firstapi
│   ├── /src
│   │   ├── /main
│   │   |   ├── /java
|   │   │   |   └── ApiController.java
|   │   │   |   └── FirstapiApplication.java
|   │   │   |   └── TodoItem.java
|   │   │   |   └── TodoItemRepository.java
│   │   |   ├── /resources
|   │   │   |   └── application.properties      # All configurations and environment variables for backend
│   │   ├── /test
│   ├── Dockerfile
│   ├── pom.xml
│   └── ...
│
│   # Docker compose file
├── docker-compose-yaml
│
│   # Project Description
└── README.md
```

## ⚙️ - Installation

1. Clone the Git-Repository.

```
git clone https://github.com/erseit/ToDoManagement.git
```

2. Install Docker.<br>
   [Docker Desktop](https://www.docker.com/products/docker-desktop/)

3. Build backend

- Go to server folder with command lines
```
cd [path_to_root_folder]/firstapi
```
- Build a docker image for server
```
docker build -t [image_name] .
```

- Create a network 
```
docker network create [network_name]
```
- Start a container and connect it to the network
```
docker run -d --name [container_name] --net [network_name] [image_name]
```

- Start a container with haproxy. This container listens in outside port 80:inside port 80
```
docker run -d --name [container_name] --net [network_name] -v [path_to_root_folder]/firstapi:/usr/local/etc/haproxy:ro -p 80:80 haproxytech/haproxy-alpine:2.4
```

4. Now server is available on `http://localhost:80`.

- To read more about the Todo API, run the Project and visit `http://localhost:80/wiki.html` to see the swagger documentation.

5. Build frontend

- Backend end point is to be defined in [next.config.js](https://github.com/erseit/ToDoManagement/blob/main/client/next.config.js). It should be updated before build, if it has to be changed.
  
  default backend end point : `http://localhost:80`

- Frontend Port Nummer is to be defined in [Dockerfile](https://github.com/erseit/ToDoManagement/blob/main/client/Dockerfile) in client folder. If frontend and backend both are started on the same resource,
  it should match with the URI and Port Nummer which is to be defined in backend build for CORS Policy.
  
  default Port Nummer : 3000

- Go to client folder with command lines
```
cd [path_to_root_folder]/client
```
- Build a docker image for client
```
docker build -t [image_name] .
```

- Start a container. This container listens in outside port 3000:inside port 3000
```
docker run -d --name [container_name] -p 3000:3000 -t [image_name]
```

6. Now client is available on `http://localhost:3000`.


