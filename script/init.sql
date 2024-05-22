CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(50),
    role VARCHAR(50)
);
CREATE TABLE user_credentials (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    password VARCHAR(255)
);
CREATE TABLE leaderboards (
    id SERIAL PRIMARY KEY,
    player_id INTEGER REFERENCES users(id),
    score INTEGER
);

INSERT INTO users (name, email, role) VALUES
    ('Player 1', 'player1@email.dummy', 'PLAYER'),
    ('Player 2', 'player2@email.dummy', 'PLAYER'),
    ('Admin', 'admin@email.dummy', 'ADMIN');
INSERT INTO user_credentials (user_id, password) VALUES
    (
        (SELECT id FROM users WHERE email = 'player1@email.dummy'),
        '$2b$10$QRxGNP0mXezTYx321N5WvOlXegVpMLRCRVSIUj3rNYPq9r2EWoyie'
    ),
    (
        (SELECT id FROM users WHERE email = 'player2@email.dummy'),
        '$2b$10$zHx7fXGqVyeqXSwbONo3cukKbXlViRypriTVITGehiU4lwd0OU9SS'
    ),
    (
        (SELECT id FROM users WHERE email = 'admin@email.dummy'),
        '$2b$10$yZ/dSQDHMXwvoBRBp4di1OfGKIo9X4wH2NBU/Zt.gwwKT/7yO7Flm'
    );
