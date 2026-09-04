-- Create database
CREATE DATABASE mumbai96;

-- Create user
CREATE USER mumbai96_user WITH PASSWORD 'strong_password_here';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE mumbai96 TO mumbai96_user;

-- Connect to database
\c mumbai96;

-- Grant schema access
GRANT ALL ON SCHEMA public TO mumbai96_user;
