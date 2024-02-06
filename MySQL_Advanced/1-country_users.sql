-- Task 1 creates a table users following these requirements:
-- id, integer, not null, autoincrement, primary key
-- email, string, not null, unique
-- name, string
-- country, enum, US, CO, TN, not null, default US
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255),
    country ENUM('US', 'CO', 'TN') NOT NULL DEFAULT 'US'
);
