# Qima Demo Application

This is a Spring Boot application developed as a demo project for Qima. It includes features such as user authentication, product and category management, and JWT-based security.

---

## Table of Contents

- [Qima Demo Application](#qima-demo-application)
  - [Table of Contents](#table-of-contents)
  - [Requirements](#requirements)
  - [Setup](#setup)
  - [Running the Application](#running-the-application)
  - [Endpoints](#endpoints)
    - [Authentication Endpoints](#authentication-endpoints)
    - [Category Endpoints](#category-endpoints)
    - [Product Endpoints](#product-endpoints)
  - [Swagger Documentation](#swagger-documentation)
  - [Notes](#notes)

---

## Requirements

To run this application, you need the following installed on your system:

- Java 17 or higher
- Maven
- An IDE or text editor (e.g., IntelliJ IDEA, VS Code)

---

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yamatoguro/qima-demo.git
   cd back
   ```

2. Configure environment variables (optional):
   - `PORT`: The port on which the application will run (default: `8080`).
   - `FRONTEND_URL`: The URL of the frontend application (default: `http://localhost:4200`).
   - `DB_USERNAME`: The username for the H2 database (default: `admin`).
   - `DB_PASSWORD`: The password for the H2 database (default: `password`).
   - `JWT_SECRET`: The secret key for JWT (default: `QIMA`).

3. Build the application:

   ```bash
   ./mvnw clean install
   ```

---

## Running the Application

1. Start the application:

   ```bash
   ./mvnw spring-boot:run
   ```

2. Access the application:
   - Swagger UI: [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)
   - H2 Console: [http://localhost:8080/h2-console](http://localhost:8080/h2-console)

---

## Endpoints

### Authentication Endpoints

```plaintext
/auth
├── POST /register
│   ├── Request Body: { "name": "string", "username": "string", "password": "string", "roles": ["string"] }
│   └── Response: "User Registered Successfully"
/auth
├── POST /login
    ├── Request Body: { "username": "string", "password": "string" }
    └── Response: { "message": "string", "token": "string" }
```

### Category Endpoints

```plaintext
/category
├── GET /
│   └── Response: List of categories
├── POST /
│   ├── Query Param: name (string)
│   └── Response: 201 Created
└── DELETE /{id}
    └── Response: 204 No Content
```

### Product Endpoints

```plaintext
/product
├── GET /
│   └── Response: List of products
├── GET /{id}
│   └── Response: Product details
├── GET /search
│   ├── Query Param: term (string)
│   └── Response: Filtered list of products
├── POST /
│   ├── Query Params: name, price, available, description, category
│   └── Response: 201 Created
├── PUT /{id}
│   ├── Query Params: name, price, available, description, category
│   └── Response: Updated product
└── DELETE /{id}
    └── Response: 204 No Content
```

---

## Swagger Documentation

The application provides Swagger documentation for all endpoints. You can access it at:

[http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)

---

## Notes

- The application uses an H2 in-memory database for development purposes.
- JWT is used for securing the endpoints. Include the token in the `Authorization` header as `Bearer <token>` for secured endpoints.

---
