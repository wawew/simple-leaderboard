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
        '$2b$10$KL4K32VlDQVGY/x9JwRm5eS.vSX3RhvU1/FV/JP/tR0QY/C/j9/S2'
    ),
    (
        (SELECT id FROM users WHERE email = 'player2@email.dummy'),
        '$2b$10$U2ZKZz0/1YtYx0ZfNbXj1eGYQ/qH9F/KZHm27/6bH1jLkLdL77YyK'
    ),
    (
        (SELECT id FROM users WHERE email = 'admin@email.dummy'),
        '$2b$10$lYHgX8YGy39zrXR62ZYy6eJq69Qj33691lRrRnXL7s1Y/F1VNQnK'
    );
