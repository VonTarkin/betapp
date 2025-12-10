CREATE TABLE bets (
    id BIGSERIAL PRIMARY KEY,

    match_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,

    odds NUMERIC(10, 2) NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,

    created_at TIMESTAMP DEFAULT NOW(),

    CONSTRAINT fk_bet_match
        FOREIGN KEY (match_id)
        REFERENCES matches (id)
        ON DELETE CASCADE,

    CONSTRAINT fk_bet_user
        FOREIGN KEY (user_id)
        REFERENCES users (id)
        ON DELETE CASCADE
);
