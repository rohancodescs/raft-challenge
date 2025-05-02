CREATE TABLE IF NOT EXISTS guests (
  id           SERIAL PRIMARY KEY,
  first_name   VARCHAR(50) NOT NULL,
  last_name    VARCHAR(50) NOT NULL,
  phone_number VARCHAR(25),
  message      TEXT,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);
