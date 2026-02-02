
# backend-mini-api

Minimal production-style REST API built with Node.js, Express and SQLite.  
Demonstrates layered architecture, JWT authentication, SQL relations, and transaction-safe order processing.

---

## Features
- Layered architecture: routes → controllers → services → repositories
- SQLite database with init script
- JWT authentication (register/login) + auth middleware
- Users & Orders domain
- SQL joins + nested JSON responses (orders with items/products)
- Transactions for order creation

---

## Why this project

This project demonstrates how to design a small but well-structured backend service:

- Clean separation of layers
- Real relational SQL database usage
- Authentication & authorization
- Transactional business logic

---

## Architecture

Client  
↓  
Routes  
↓  
Controllers  
↓  
Services  
↓  
Repositories  
↓  
SQLite  

---

## Database schema

users
- id
- name
- email
- password_hash

products
- id
- name
- price

orders
- id
- user_id
- created_at

order_items
- order_id
- product_id
- qty

---

## Tech stack
- Node.js
- Express
- SQLite (sqlite3)
- JSON Web Token (jsonwebtoken)
- bcrypt
- dotenv
- nodemon

---

## Setup

### 1) Install dependencies
```bash
npm install
```

### 2) Create env file
```bash
cp .env.example .env
```

Set inside `.env`:

```
PORT=3000
JWT_SECRET=any_long_random_string
```

### 3) Init database
```bash
node src/db/init_db.js
```

### 4) Run server
```bash
npm run dev
```

Server will start on:

```
http://localhost:3000
```

---

## API

### Auth
- POST /auth/register  
- POST /auth/login  

### Users
- GET /users  
- GET /users/:id  
- GET /users/by-name/:name  
- GET /users/:id/orders  

### Orders
- GET /orders/:id  
- POST /orders (protected)

---

## Example requests

### Login
```bash
curl -X POST http://localhost:3000/auth/login   -H "Content-Type: application/json"   -d '{"email":"bob@mail.com","password":"123456"}'
```

### Create order
```bash
curl -X POST http://localhost:3000/orders   -H "Content-Type: application/json"   -H "Authorization: Bearer TOKEN"   -d '{"items":[{"product_id":1,"qty":1}]}'
```

---

## Error handling

- 400 — validation errors  
- 401 — unauthorized  
- 404 — not found  
- 500 — server error  

All errors returned as JSON:

```
{ "error": "message" }
```

---

## Security

- Passwords hashed with bcrypt
- JWT-based authentication
- Protected routes via middleware

---

## Roadmap

- Pagination
- Input validation with schema library
- Refresh tokens
- Tests
- Docker support

---

## Notes

This project was created as a backend practice project to demonstrate REST API design, database access, authentication, and layered architecture.

---

## License
MIT
