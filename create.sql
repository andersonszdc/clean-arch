DROP TABLE IF EXISTS transactions;

DROP TABLE IF EXISTS installments;

CREATE TABLE IF NOT EXISTS transactions (
    code TEXT PRIMARY KEY,
    amount NUMERIC,
    number_installments INTEGER,
    payment_method TEXT,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS installments (
    code TEXT REFERENCES transactions (code),
    number INTEGER,
    amount NUMERIC,
    PRIMARY KEY (code, number)
);