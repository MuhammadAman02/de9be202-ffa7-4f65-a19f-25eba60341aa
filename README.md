# Shoe Store API

A complete ecommerce backend API for selling shoes with authentication and CRUD operations.

## Features

- User authentication (signup/login) with JWT
- Shoe management (CRUD operations)
- Protected routes for admin operations
- Input validation with Zod
- Swagger documentation
- PostgreSQL database with Drizzle ORM

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user

### Shoes
- `GET /api/shoes` - Get all shoes (with pagination and filters)
- `GET /api/shoes/:id` - Get shoe by ID
- `POST /api/shoes` - Create new shoe (protected)
- `PUT /api/shoes/:id` - Update shoe (protected)
- `DELETE /api/shoes/:id` - Delete shoe (protected)

## Getting Started

1. Set up your environment variables in `.env`:
   ```
   DATABASE_URL=your_postgres_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

2. Start the server:
   ```bash
   npm run dev
   ```

3. Visit `http://localhost:3000/docs` for Swagger documentation

## Authentication

Protected routes require a Bearer token in the Authorization header:
```
Authorization: Bearer your_jwt_token
```

## Example Usage

### Signup
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

### Create Shoe (requires authentication)
```bash
curl -X POST http://localhost:3000/api/shoes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_token" \
  -d '{
    "name": "Air Max 90",
    "brand": "Nike",
    "description": "Classic running shoe",
    "price": 120.00,
    "size": "10",
    "color": "White",
    "category": "sneakers",
    "inStock": true
  }'
```

### Get Shoes with Filters
```bash
curl "http://localhost:3000/api/shoes?page=1&limit=10&brand=Nike&category=sneakers&inStock=true"
```