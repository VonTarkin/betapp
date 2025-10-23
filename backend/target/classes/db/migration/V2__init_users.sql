-- Creating User Table
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    role_id BIGINT NOT NULL REFERENCES roles(id)
);


--Example admin, for later.
INSERT INTO users (username, email, password, phone, role_id)
VALUES (
    'admin',
    'admin@betapp.local',
    'admin',
    '+48000000000',
    (SELECT id FROM roles WHERE name = 'ROLE_ADMIN')
);
