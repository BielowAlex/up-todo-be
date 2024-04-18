# NestJs | Mongo | Mongoose Starter pack

This is the backend for a to-do application, utilizing NestJS, Mongoose, and JWT for authentication via cookies. The
project features a robust authorization system and Access Control List (ACL).

## Requirements

This project requires Node.js version 20.0 or higher.

## Installation

First, clone the repository and install the dependencies:

```bash
git clone https://github.com/BielowAlex/nestjs-example.git
cd nestjs-example
npm install
```


<hr> 

## We use

| Feature            | Info                    | Progress    |
|--------------------|-------------------------|-------------|
| Authentication     | JWT Cookie              | Done        |
| Roles Auth         | RBAC (Role based)       | Done        |
| ORM Integration    | Mongoose                | Done        |
| Logging            | winston                 | Done        |
| Request Validation | class-validator         | Done        |
| Pagination         | SQL offset, limit, sort | Done        |
| Docs OpenAPI       | Swagger                 | Done        |
| Validation         | Husky                   | Done        |
| Docker Ready       | Dockerfile              | In progress |

Running the Application
To run the application in development mode, use the following command:

bash
Copy code
npm run dev
This command uses nest start --watch to run the application, automatically restarting whenever file changes are detected.

For production environments, build the application first and then start it:

bash
Copy code
npm run build
npm run prod
## Scripts

```bash
npm run build
```
```bash
npm run format
```
```bash
npm start
```
```bash
npm run dev
```
```bash
npm run debug
```
```bash
npm run prod
```
```bash
npm run lint
```

## Features

* Authentication system implemented using JWT and cookies.
* Access Control List (ACL) for fine-grained permissions.
* Integration with MongoDB through Mongoose.
* Pre-configured Husky for Git hooks to ensure code quality.
