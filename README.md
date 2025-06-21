# Restaurant Management System

A comprehensive restaurant management system built with React frontend and Spring Boot backend.

## Features

- **Role-based Authentication** (Admin, Manager, Staff)
- **Menu Management** - CRUD operations for menu items
- **Table Management** - Track table status and availability
- **Order Management** - Handle customer orders and status updates
- **Reservation System** - Manage table reservations
- **User Management** - Admin can manage staff accounts

## Tech Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- Lucide React for icons

### Backend
- Spring Boot 3.2.1
- Spring Security with JWT authentication
- Spring Data JPA
- PostgreSQL database
- Maven for dependency management

## Getting Started

### Prerequisites
- Java 17+
- Node.js 18+
- PostgreSQL 15+
- Maven 3.6+

### Database Setup
1. Install PostgreSQL
2. Create database: `restaurant_db`
3. Create user: `restaurant_user` with password: `restaurant_password`
4. Grant privileges to the user

### Backend Setup
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

The frontend will start on `http://localhost:3000`

### Docker Setup (Alternative)
```bash
docker-compose up --build
```

This will start all services:
- PostgreSQL on port 5432
- Backend on port 8080
- Frontend on port 3000

## API Endpoints

### Authentication
- `POST /api/auth/signin` - User login
- `POST /api/auth/signup` - User registration

### Menu Management
- `GET /api/menu/items` - Get all menu items
- `POST /api/menu/items` - Create menu item (Admin/Manager)
- `PUT /api/menu/items/{id}` - Update menu item (Admin/Manager)
- `DELETE /api/menu/items/{id}` - Delete menu item (Admin/Manager)

### Table Management
- `GET /api/tables` - Get all tables
- `POST /api/tables` - Create table (Admin/Manager)
- `PUT /api/tables/{id}` - Update table (Admin/Manager)
- `PUT /api/tables/{id}/status` - Update table status

### Order Management
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create order
- `PUT /api/orders/{id}` - Update order
- `PUT /api/orders/{id}/status` - Update order status

### Reservation Management
- `GET /api/reservations` - Get all reservations
- `POST /api/reservations` - Create reservation
- `PUT /api/reservations/{id}` - Update reservation
- `PUT /api/reservations/{id}/status` - Update reservation status

## Default Roles

The system initializes with three roles:
- **ROLE_ADMIN** - Full system access
- **ROLE_MANAGER** - Menu and table management
- **ROLE_STAFF** - Order and reservation handling

## Security

- JWT-based authentication
- Role-based access control
- Password encryption with BCrypt
- CORS configuration for frontend integration

## Development

### Adding New Features
1. Create model classes in `backend/src/main/java/com/restaurant/management/model/`
2. Create repository interfaces in `backend/src/main/java/com/restaurant/management/repository/`
3. Create controller classes in `backend/src/main/java/com/restaurant/management/controller/`
4. Add corresponding React components in `frontend/src/components/`

### Database Migrations
The application uses Hibernate's `ddl-auto=update` for development. For production, consider using Flyway or Liquibase for proper database migrations.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.