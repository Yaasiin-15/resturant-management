# Restaurant Management System

A comprehensive restaurant management system built with React frontend and Spring Boot backend, connected to PostgreSQL database.

## Project Structure

```
restaurant-management-system/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── Auth/        # Authentication components
│   │   │   ├── Dashboard/   # Dashboard components
│   │   │   └── Layout/      # Layout components
│   │   ├── contexts/        # React contexts
│   │   ├── lib/            # Utility libraries
│   │   ├── App.jsx         # Main App component
│   │   └── main.jsx        # Entry point
│   ├── package.json
│   ├── vite.config.js
│   └── Dockerfile
├── backend/                 # Spring Boot backend
│   ├── src/main/java/com/restaurant/management/
│   │   ├── config/         # Configuration classes
│   │   ├── controller/     # REST controllers
│   │   ├── model/          # Entity models
│   │   ├── payload/        # Request/Response DTOs
│   │   ├── repository/     # Data repositories
│   │   └── security/       # Security configuration
│   ├── pom.xml
│   └── Dockerfile
├── database/               # Database scripts
│   ├── setup.sql          # Database setup
│   ├── schema.sql         # Database schema
│   └── seed_data.sql      # Sample data
├── docker-compose.yml     # Docker orchestration
└── README.md
```

## Features

- **Role-based Authentication** (Admin, Manager, Staff)
- **Menu Management** - CRUD operations for menu items
- **Table Management** - Track table status and availability
- **Order Management** - Handle customer orders and status updates
- **Reservation System** - Manage table reservations
- **User Management** - Admin can manage staff accounts

## Tech Stack

### Frontend
- React 18 with JSX
- Tailwind CSS for styling
- React Router for navigation
- Lucide React for icons
- Vite for build tooling

### Backend
- Spring Boot 3.2.1
- Spring Security with JWT authentication
- Spring Data JPA
- PostgreSQL database
- Maven for dependency management

### Database
- PostgreSQL 15
- Comprehensive schema with proper relationships
- Indexes for performance optimization
- Triggers for automatic timestamp updates

## Getting Started

### Prerequisites
- Java 17+
- Node.js 18+
- PostgreSQL 15+
- Maven 3.6+
- pgAdmin (optional, for database management)

### Database Setup with pgAdmin

1. **Install PostgreSQL and pgAdmin**
   - Download and install PostgreSQL from https://www.postgresql.org/download/
   - Download and install pgAdmin from https://www.pgadmin.org/download/

2. **Setup Database using pgAdmin:**
   - Open pgAdmin and connect to your PostgreSQL server
   - Right-click on "Databases" and select "Create" > "Database..."
   - Name: `restaurant_db`
   - Owner: `postgres` (or create a new user)
   
3. **Create User (Optional):**
   - Right-click on "Login/Group Roles" and select "Create" > "Login/Group Role..."
   - Name: `restaurant_user`
   - Password: `restaurant_password`
   - Privileges: Can login, Create databases

4. **Run Database Scripts:**
   - Open Query Tool in pgAdmin
   - Run the scripts in this order:
     1. `database/setup.sql`
     2. `database/schema.sql`
     3. `database/seed_data.sql`

### Manual Database Setup (Command Line)

```bash
# Connect to PostgreSQL as superuser
sudo -u postgres psql

# Run setup script
\i database/setup.sql

# Connect to the new database
\c restaurant_db

# Run schema and seed data
\i database/schema.sql
\i database/seed_data.sql
```

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
npm run dev
```

The frontend will start on `http://localhost:5173`

### Docker Setup (Full Stack)
```bash
docker-compose up --build
```

This will start all services:
- PostgreSQL on port 5432
- Backend on port 8080
- Frontend on port 3000

## Demo Credentials

The system comes with pre-configured demo accounts:

- **Admin:** admin@restaurant.com / password123
- **Manager:** manager@restaurant.com / password123
- **Staff:** staff@restaurant.com / password123

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

## Database Schema

### Core Tables
- **users** - System users with authentication
- **roles** - User roles (Admin, Manager, Staff)
- **user_roles** - Many-to-many relationship between users and roles
- **restaurant_tables** - Physical tables in the restaurant
- **menu_items** - Restaurant menu with categories and pricing
- **orders** - Customer orders with status tracking
- **order_items** - Individual items within orders
- **reservations** - Table reservations with customer details

### Key Features
- Foreign key constraints for data integrity
- Check constraints for data validation
- Indexes for query performance
- Automatic timestamp updates via triggers
- Proper normalization to reduce redundancy

## pgAdmin Configuration

### Connection Settings
- **Host:** localhost
- **Port:** 5432
- **Database:** restaurant_db
- **Username:** restaurant_user
- **Password:** restaurant_password

### Useful Queries for Testing
```sql
-- Check all users
SELECT u.*, r.name as role FROM users u 
JOIN user_roles ur ON u.id = ur.user_id 
JOIN roles r ON ur.role_id = r.id;

-- Check table status
SELECT * FROM restaurant_tables ORDER BY table_number;

-- Check menu items by category
SELECT * FROM menu_items ORDER BY category, name;

-- Check recent orders
SELECT o.*, rt.table_number, u.full_name as staff_name 
FROM orders o 
LEFT JOIN restaurant_tables rt ON o.table_id = rt.id 
LEFT JOIN users u ON o.staff_id = u.id 
ORDER BY o.created_at DESC;
```

## Troubleshooting

### Connection Issues
1. Ensure PostgreSQL is running on port 5432
2. Check database credentials in `application.properties`
3. Verify CORS settings allow frontend origin
4. Check firewall settings for ports 5173, 8080, 5432

### Authentication Issues
1. Verify JWT secret is properly configured
2. Check if demo users exist in database
3. Ensure roles are properly seeded
4. Check browser network tab for API errors

### Database Issues
1. Verify database exists and user has proper permissions
2. Check if all tables are created properly
3. Ensure seed data is inserted
4. Use pgAdmin to inspect database structure

## Development

### Adding New Features
1. **Backend:** Create model → repository → controller → service
2. **Frontend:** Create component → add to routing → integrate with API
3. **Database:** Create migration script if schema changes needed

### Code Organization
- **Frontend:** Components organized by feature (Auth, Dashboard, Layout)
- **Backend:** Standard Spring Boot structure with clear separation of concerns
- **Database:** Migration-based schema management

## Security

- JWT-based authentication with role-based access control
- Password encryption with BCrypt
- CORS configuration for frontend integration
- SQL injection prevention through JPA
- Input validation on both frontend and backend

## Performance Considerations

- Database indexes on frequently queried columns
- Lazy loading for JPA relationships
- Connection pooling for database connections
- Optimized bundle size with Vite
- Component-based architecture for better rendering

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.