# E-Commerce Web App

A modern full-stack e-commerce web application built with NextJS (frontend & Backend). This platform enables users to browse products, add them to a shopping cart, and complete orders securely.

## Features

- Product Browsing and Searching
- Shopping Cart and Checkout
- User Authentication and Authorization (JWT)
- Order Management
- Payment Integration (e.g., Stripe/PayPal)
- Admin Dashboard (Product/Order/User management)

## Tech Stack

### Frontend

- NextJS
- Context API
- TailwindCSS
- Axios

### Backend

- MySQL
- JWT Authentication
- Docker & Docker Compose
- Cloudflare Tunnel (optional for public access)

## Getting Started

Node.js

Docker & Docker Compose

(Optional) Cloudflare Tunnel

### 1. Clone the Repository bash Copy Edit
   ``` bash
   git clone https://github.com/Porto-Yospunya/ecommerce-webapp.git
   cd ecommerce-webapp
   ```
### 2. Setup Environment Variables

   Create the following .env files:

   /.env.local

   ```bash
   # From Database
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=<your_password>
   DB_DATABASE=<your_database>
   DB_PORT=3307

   # From App
   BASE_API_URL=http://localhost:3000/api
   ```

   /.env.docker

   ```bash
   # From Database
   DB_HOST=<your_docker_container>
   DB_USER=root
   DB_PASSWORD=<your_password>
   DB_DATABASE=<your_database>
   DB_PORT=3306

   # From App
   BASE_API_URL=http://localhost:3000/api
   ```

### 3. Run with Docker Compose
   ```bash
   docker-compose up --build
   ```

## Project Structure

```
ecommerce-webapp

```

## TODO

- Basic product listing & cart
- User registration with email verification
- Admin panel for managing inventory
- Payment gateway integration

## Authors

Porto @Porto-Yospunya
