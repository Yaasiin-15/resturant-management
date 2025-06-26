-- Create database and user for Restaurant Management System
-- Run this as PostgreSQL superuser (postgres)

-- Create database
CREATE DATABASE restaurant_db;

-- Create user
CREATE USER restaurant_user WITH PASSWORD 'restaurant_password';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE restaurant_db TO restaurant_user;

-- Connect to the database
\c restaurant_db;

-- Grant schema permissions
GRANT ALL ON SCHEMA public TO restaurant_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO restaurant_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO restaurant_user;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO restaurant_user;

-- Set default privileges for future objects
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO restaurant_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO restaurant_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON FUNCTIONS TO restaurant_user;