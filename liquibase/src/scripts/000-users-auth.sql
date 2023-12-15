CREATE TABLE USER (
    email VARCHAR(100) PRIMARY KEY,
    creation_timestamp TIMESTAMPTZ DEFAULT current_timestamp,
);