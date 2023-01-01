<h1 align="center">ToDo Management System</h1>

<p align="center">This Todo App was made for the Distributed and Parallel Systems Lab Exercise at HS-Esslingen.</p>

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

3. Get a jar file from backend

- Go to server folder with command lines
```
cd [path_to_root_folder]/firstapi
```
- Build a jar file
```
mvn clean install
```
4. Build frontend, backend and database

- All environemnt variables defined in [docker-compose.yaml](https://github.com/erseit/ToDoManagement/blob/main/docker-compose.yaml). All changes should be done in this file.

- Go to root folder

- Create a docker volume for data persistency. Default volume name in this projekt is vsvol. If you want to give another volume's name, you should change configurations in [docker-compose.yaml](https://github.com/erseit/ToDoManagement/blob/main/docker-compose.yaml).
```
docker volume create vsvol
```

- Build docker images and then containers.
```
docker-compose up
```
4. Now server is available on `http://localhost:8888` and client is available on `http://localhost:3000`.

- To read more about the Todo API, run the Project and visit `http://localhost:8888/wiki.html` to see the swagger documentation.



