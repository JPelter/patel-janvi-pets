CREATE TABLE APPOINTMENT_REQUEST (
    uuid CHAR(36) PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_uuid CHAR(36) NOT NULL REFERENCES ACCOUNT(uuid),
    creation_timestamp TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,

    target_time TIMESTAMPTZ NOT NULL,
    service_requested VARCHAR(100) NOT NULL,
    recurring_weekly BOOLEAN DEFAULT FALSE,
    recurring_enddate TIMESTAMPTZ,

    request_accepted BOOLEAN,
    admin_uuid CHAR(36) REFERENCES ACCOUNT(uuid)
);

CREATE TABLE APPOINTMENT (
    uuid CHAR(36) PRIMARY KEY DEFAULT gen_random_uuid(),
    request_uuid CHAR(36) REFERENCES APPOINTMENT_REQUEST(uuid),
    customer_uuid CHAR(36) NOT NULL REFERENCES ACCOUNT(uuid),
    admin_uuid CHAR(36) NOT NULL REFERENCES ACCOUNT(uuid),

    appointment_time TIMESTAMPTZ,
    service_requested VARCHAR(100) NOT NULL,
    
    appointment_completed BOOLEAN,
    appointment_note VARCHAR(1000)
);