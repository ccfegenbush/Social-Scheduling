Possible Project 2 Database

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
	interest_name VARCHAR(50) NOT NULL,
);

CREATE TABLE project2.user_has_interests(
	user_interest_id SERIAL PRIMARY KEY NOT NULL,
	user_id INTEGER REFERENCES project2.users(user_id),
	interest_id INTEGER REFERENCES project2.interest(interest_id)
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
	event_date VARCHAR(250) NOT NULL,
	event_time TIMESTAMP NOT NULL,
	event_location VARCHAR(100) NOT NULL,
	event_author_id INTEGER REFERENCES project2.users(user_id)
);

CREATE TABLE project2.event_attendees(
	attendee_id SERIAL PRIMARY KEY NOT NULL,
	event_id INTEGER REFERENCES project2.event(event_id),
	user_id INTEGER REFERENCES project2.users(user_id)
);

CREATE TABLE project2.friends(
	friends_id SERIAL PRIMARY KEY NOT NULL,
	user_id INTEGER REFERENCES project2.users(user_id),
	other_user_id INTEGER REFERENCES project2.users(user_id)
);


