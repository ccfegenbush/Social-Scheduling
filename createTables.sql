

CREATE SCHEMA project2;

CREATE TABLE project2.users(
	user_id SERIAL PRIMARY KEY NOT NULL,
	username VARCHAR(50) UNIQUE NOT NULL,
	password VARCHAR(50) NOT NULL,
	user_first_name VARCHAR(50) NOT NULL,
	user_last_name VARCHAR(50) NOT NULL,
	user_age INTEGER,
	user_email VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE project2.interests(
	interest_id SERIAL PRIMARY KEY NOT NULL,
	interest_name VARCHAR(50) NOT NULL
);

CREATE TABLE project2.user_has_interest(
	user_id INTEGER REFERENCES project2.users(user_id) NOT NULL,
	interest_id INTEGER REFERENCES project2.interests(interest_id) NOT NULL,
    PRIMARY KEY (user_id, interest_id)
);

CREATE TABLE project2.schedule(
	schedule_id SERIAL PRIMARY KEY NOT NULL,
	schedule_author_id INTEGER REFERENCES project2.users(user_id)
);

CREATE TABLE project2.availability(
	availability_id SERIAL PRIMARY KEY NOT NULL,
	schedule_id INTEGER REFERENCES project2.schedule(schedule_id)
);

CREATE TABLE project2.routine(
	routine_id SERIAL PRIMARY KEY NOT NULL,
	schedule_id INTEGER REFERENCES project2.schedule(schedule_id)
);

CREATE TABLE project2.event(
	event_id SERIAL PRIMARY KEY NOT NULL,
	event_name VARCHAR(100) NOT NULL,
	event_type VARCHAR (15) NOT NULL,
	event_description VARCHAR(15) NOT NULL,
	event_start_date VARCHAR(250) NOT NULL,
	event_end_date VARCHAR(250) NOT NULL,
	event_start_time TIMESTAMP NOT NULL,
	event_end_time TIMESTAMP NOT NULL,
	event_location VARCHAR(100) NOT NULL,
	event_author_id INTEGER REFERENCES project2.users(user_id)
);

CREATE TABLE project2.user_has_friends (
  user_id INTEGER NOT NULL REFERENCES project2.users(user_id),
  friend_id INTEGER NOT NULL REFERENCES project2.users(user_id),
  PRIMARY KEY (user_id, friend_id)
);

CREATE TABLE project2.user_has_friends (
  user_id INTEGER NOT NULL REFERENCES project2.users(user_id),
  friend_id INTEGER NOT NULL REFERENCES project2.users(user_id),
  PRIMARY KEY (user_id, friend_id)
);

-- Table: project2.friend_request

-- DROP TABLE project2.friend_request;

CREATE TABLE project2.friend_request
(
    user_id integer NOT NULL,
    request_id integer NOT NULL,
    CONSTRAINT request_table_pkey PRIMARY KEY (user_id, request_id),
    CONSTRAINT request_request_id_fkey FOREIGN KEY (request_id)
        REFERENCES project2.users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT request_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES project2.users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE project2.friend_request
    OWNER to postgres;
	

	
CREATE TABLE project2.user_has_invitations (
  event_id INTEGER NOT NULL UNIQUE REFERENCES project2.event(event_id),
  user_id INTEGER NOT NULL UNIQUE REFERENCES project2.users(user_id),
  PRIMARY KEY (event_id, user_id)
);

CREATE TABLE project2.attendees(
	attendees_id SERIAL PRIMARY KEY NOT NULL,
	event_id INTEGER REFERENCES project2.user_has_invitations(event_id) NOT NULL,  
	user_id INTEGER REFERENCES project2.user_has_invitations(user_id) NOT NULL,
	status_id INTEGER DEFAULT 1
);
