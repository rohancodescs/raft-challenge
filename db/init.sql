CREATE TABLE IF NOT EXISTS guests(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone_number VARCHAR(25) NOT NULL,
    message TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
)