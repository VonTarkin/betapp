CREATE TABLE IF NOT EXISTS matches (
    id BIGSERIAL PRIMARY KEY,
    country1 VARCHAR(50) NOT NULL,
    country2 VARCHAR(50) NOT NULL,

    score_country1 INTEGER,
    score_country2 INTEGER,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    match_date TIMESTAMP NOT NULL
);