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
	event_author_id INTEGER REFERENCES project2.users(user_id),
     event_status integer DEFAULT 2
);

	
CREATE TABLE project2.user_has_invitations (
  invitation_id SERIAL PRIMARY KEY NOT NULL,
  event_id INTEGER NOT NULL REFERENCES project2.event(event_id),
  user_id INTEGER NOT NULL REFERENCES project2.users(user_id),
  status_id INTEGER DEFAULT 1
);

CREATE TABLE project2.user_has_friend_requests (
  request_id SERIAL PRIMARY KEY NOT NULL,
  friend_id INTEGER NOT NULL REFERENCES project2.users(user_id),
  user_id INTEGER NOT NULL REFERENCES project2.users(user_id),
  status_id INTEGER DEFAULT 1
);