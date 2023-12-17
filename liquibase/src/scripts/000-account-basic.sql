CREATE TABLE ACCOUNT (
    email VARCHAR(100) PRIMARY KEY,
    creation_timestamp TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,

    login_token VARCHAR(6) NOT NULL,
    request_time TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
    last_successful_login TIMESTAMPTZ,
    recent_request_counter INT NOT NULL DEFAULT 0
);