CREATE TABLE APPOINTMENT_REQUEST (
    uuid CHAR(60) PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_uuid CHAR(60) NOT NULL REFERENCES ACCOUNT(uuid),
    creation_timestamp TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,

    window_start TIMESTAMPTZ NOT NULL,
    window_end TIMESTAMPTZ NOT NULL,
    service_requested VARCHAR(100) NOT NULL,
    request_note VARCHAR(1000),

    recurring_weekly BOOLEAN DEFAULT FALSE,
    recurring_enddate TIMESTAMPTZ,

    request_accepted BOOLEAN,
    admin_uuid CHAR(60) REFERENCES ACCOUNT(uuid)
);

CREATE TABLE APPOINTMENT (
    uuid CHAR(60) PRIMARY KEY DEFAULT gen_random_uuid(),
    request_uuid CHAR(60) REFERENCES APPOINTMENT_REQUEST(uuid),
    customer_uuid CHAR(60) NOT NULL REFERENCES ACCOUNT(uuid),

    appointment_start TIMESTAMPTZ NOT NULL,
    appointment_end TIMESTAMPTZ,
    service_requested VARCHAR(100) NOT NULL,
    appointment_note VARCHAR(1000),
    
    admin_uuid CHAR(60) NOT NULL REFERENCES ACCOUNT(uuid)
);