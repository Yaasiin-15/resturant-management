-- Create database and user (run this first as postgres superuser)
CREATE DATABASE restaurant_db;
CREATE USER restaurant_user WITH PASSWORD 'restaurant_password';
GRANT ALL PRIVILEGES ON DATABASE restaurant_db TO restaurant_user;

-- Connect to the database
\c restaurant_db;

-- Grant schema permissions
GRANT ALL ON SCHEMA public TO restaurant_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO restaurant_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO restaurant_user;