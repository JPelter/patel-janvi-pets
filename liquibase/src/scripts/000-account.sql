CREATE TABLE ACCOUNT (
    uuid CHAR(36) PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(100) UNIQUE,
    creation_timestamp TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,

    login_token VARCHAR(6) NOT NULL,
    request_time TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
    last_successful_login TIMESTAMPTZ,
    recent_request_counter INT NOT NULL DEFAULT 0,

    first_name VARCHAR(30),
    last_name VARCHAR(30),
    phone_number VARCHAR(16),
    phone_number_verified BOOLEAN DEFAULT FALSE,

    admin_account BOOLEAN DEFAULT FALSE
);