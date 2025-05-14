# QIMA Demo Project

Welcome to the QIMA Demo Project! This repository contains a **fullstack application** built as a technical challenge, featuring a modern Angular frontend and a robust Spring Boot backend. The project demonstrates best practices in authentication, authorization, CRUD operations, and user experience, all secured with JWT and designed for extensibility.

---

## Table of Contents

- [QIMA Demo Project](#qima-demo-project)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [Architecture](#architecture)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Setup](#setup)
    - [Running the Application](#running-the-application)
  - [Documentation](#documentation)
    - [Frontend](#frontend)
    - [Backend](#backend)
  - [Project Structure](#project-structure)
  - [Conclusion](#conclusion)

---

## Project Overview

This project is a demonstration of a complete product management system, including:

- **User authentication and registration**
- **Role-based access control**
- **Product and category CRUD operations**
- **JWT-secured REST API**
- **Modern, responsive UI with Angular Material**
- **Dialog modals and feedback for user actions**
- **Route protection and error handling**

---

## Architecture

- **Frontend:** [Angular 19+](https://angular.io/) with Standalone Components and Angular Material, communicating via HTTP with the backend and handling JWT authentication.
- **Backend:** [Spring Boot 3+](https://spring.io/projects/spring-boot) REST API, using H2 database, Spring Security with JWT, and role-based authorization.

---

## Features

- User registration and login with JWT authentication
- Role-based access (Admin/User)
- Product management (create, read, update, delete)
- Category management (create, read, delete)
- Dialog modals for CRUD operations
- Route guards and error pages
- Responsive UI with Angular Material
- HTTP Interceptor for automatic JWT inclusion
- Swagger API documentation
- H2 in-memory database for development
- Environment-based configuration

---

## Getting Started

### Prerequisites

- **Node.js** (v18+)
- **Angular CLI** (`npm install -g @angular/cli`)
- **Java 17+**
- **Maven**

### Setup

1. **Clone the repository:**

   ```sh
   git clone https://github.com/yamatoguro/qima-demo.git
   cd qima-demo
   ```

2. **Frontend Setup:**

   ```sh
   cd front
   npm install
   ```

3. **Backend Setup:**

   ```sh
   cd ../back
   ./mvnw clean install
   ```

### Running the Application

- **Start the backend:**

  ```sh
  ./mvnw spring-boot:run
  ```

  The backend will be available at [http://localhost:8080](http://localhost:8080).

- **Start the frontend:**

  ```sh
  cd ../front
  ng serve
  ```

  The frontend will be available at [http://localhost:4200](http://localhost:4200).

---

## Documentation

### Frontend

For detailed information about the frontend, see [`front/README.md`](front/README.md).

### Backend

For detailed information about the backend, see [`back/README.MD`](back/README.MD).

---

## Project Structure

```plaintext
qima-demo/
│
├── front/   # Angular frontend application
│   └── [README.md](front/README.md)
│
├── back/    # Spring Boot backend application
│   └── [README.MD](back/README.MD)
│
└── README.md  # (This file)
```

---

## Conclusion

My name is **Iago**, a fullstack developer with a decade of experience. In this project, I had the opportunity to implement a wide range of functionalities, including:

- User authentication and registration with JWT
- Role-based access control
- Secure RESTful APIs
- Product and category CRUD operations
- Responsive and modern UI with Angular Material
- Dialog modals for user interactions
- Route guards and error handling
- Integration of frontend and backend with secure communication

One of the main challenges I faced was implementing the security layer, especially ensuring robust JWT authentication and role-based authorization. However, this was quickly overcome, and the result is a secure, extensible, and user-friendly application.

There is a problem on UI that I had not enough time to fix, if you face an endless loading you can just click on any input and out, so it will work as intended after that.

Feel free to explore the code and reach out to me on [GitHub](https://github.com/yamatoguro) for any questions or collaboration opportunities!

---
