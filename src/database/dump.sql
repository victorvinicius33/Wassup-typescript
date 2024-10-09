CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password text NOT NULL
)

CREATE TABLE contacts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  user_id INT REFERENCES users (id) NOT NULL
)

CREATE TABLE conversation_room (
  id SERIAL PRIMARY KEY,
  first_user_email VARCHAR(100) NOT NULL,
  second_user_email VARCHAR(100) NOT NULL
)

CREATE TABLE message_data (
  id SERIAL PRIMARY KEY,
  sent_by VARCHAR(100),
  received_by VARCHAR(100),
  message_data text,
  time_sent timestamptz NOT NULL,
  room_id INT REFERENCES conversation_room (id) NOT NULL
)
