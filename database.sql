
-- -- USER is a reserved keyword with Postgres
-- -- You must use double quotes in every query that user is in:
-- -- ex. SELECT * FROM "user";
-- -- Otherwise you will have errors!


-- Create a database with the name "intersection" then create the following tables

--  You should be able to run the whole table when making changes. If DROP TABLE commands yell
--  At you about tables not existing, simply highlight everything below


-- -- USER is a reserved keyword with Postgres
-- -- You must use double quotes in every query that user is in:
-- -- ex. SELECT * FROM "user";
-- -- Otherwise you will have errors!


-- Create a database with the name "intersection" then create the following tables

--  You should be able to run the whole table when making changes. If DROP TABLE commands yell
--  At you about tables not existing, simply highlight everything below

-- -- USER is a reserved keyword with Postgres
-- -- You must use double quotes in every query that user is in:
-- -- ex. SELECT * FROM "user";
-- -- Otherwise you will have errors!


-- Create a database with the name "intersection" then create the following tables

--  You should be able to run the whole table when making changes. If DROP TABLE commands yell
--  At you about tables not existing, simply highlight everything below
DROP TABLE "media";
DROP TABLE "team_user";
DROP TABLE "item";
DROP TABLE "messages";
DROP TABLE "client";
DROP TABLE "team";
DROP TABLE "user";

CREATE TABLE "user" (
	"id" SERIAL PRIMARY KEY,
	"username" VARCHAR (80) UNIQUE NOT NULL,
	"password" VARCHAR (1000) NOT NULL,
	"first_name" VARCHAR(255),
	"last_name" VARCHAR(255),
	"email" VARCHAR(255),
	"phone" VARCHAR(15),
	"street_address" VARCHAR(255),
	"city" VARCHAR(255),
	"state" VARCHAR(255),
	"zip" INT,
	"access_level" INT,
	"date_registered" TIMESTAMP with time zone,
	"active_team" INT
);

CREATE TABLE "team" (
	"id" SERIAL PRIMARY KEY,
	"captain_name" VARCHAR(255),
	"is_archived" BOOLEAN,
	"date" TIMESTAMP with time zone
);

CREATE TABLE "client" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(255),
	"bio" TEXT,
	"media_release" TEXT,
	"location" VARCHAR(255),
	"date" TIMESTAMP with time zone,
	"team_id" INT REFERENCES "team",
	"comment" VARCHAR(2000)
);

CREATE TABLE "team_user" (
	"id" SERIAL PRIMARY KEY,
	"team_id" INT REFERENCES "team",
	"user_id" INT REFERENCES "user"
);

CREATE TABLE "item" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(255),
	"client_id" INT REFERENCES "client",
	"team_id" INT REFERENCES "team",
	"purchased" BOOLEAN
);

CREATE TABLE "media" (
	"id" SERIAL PRIMARY KEY,
	"client_id" INT,
	"link" VARCHAR(255),
	"type" VARCHAR(255),
	"metadata" VARCHAR(255),
	"date" TIMESTAMP with time zone,
	"user_id" INT REFERENCES "user"
);

CREATE TABLE "messages" (
	"id" SERIAL PRIMARY KEY,
	"client_id" INT REFERENCES "client",
	"user_id" INT REFERENCES "user",
	"team_id" INT REFERENCES "team",
	"message" TEXT,
	"date" TIMESTAMP with time zone
);

-- Dummy Data

INSERT INTO "user" ("username", "password", "first_name", "last_name", "email", "phone", "street_address", "city", "state", "zip", "access_level", "date_registered", "active_team")
VALUES ('Gabe', '$2a$10$FMWf/Zx934b0QbqoiCSuoO0PJ5M273f/10pffwxo8GpvQN6Usx0gm', 'Gabriel', 'Hawk', 'ghawk@gmail.com', '474-751-1642', '5642 Main St', 'Redwood', 'MN', '55415', 1, NOW(), 1),
('Meghan', '$2a$10$cghoHshxw31jgKsRAYt02OUmthPdlMdaFIRosVaCXaZGLYWcc.v.C', 'Meghan', 'Gunderson', 'mgunderson@gmail.com', '474-973-4260', '3246 Broadway Ave', 'Minneapolis', 'MN', '55415', 1, NOW(), 2),
('Jessica', '$2a$10$.xLq2xwq9MS9EYRFI/h0vOkyFL277eTASomppCYonYXVcASBMZqPC', 'Jessica', 'Heggem', 'jheggem@gmail.com', '785-424-9078', '7890 63rd St N', 'Bloomington', 'MN', '55457', 2, NOW(), 1),
('Tou', '$2a$10$x4GLDwPSqx3dLw8qHzlHzeFX4nxTN4GN7i5z5phjpPe3jdPe4iB.G', 'Tou', 'Xiong', 'txiiong@gmail.com', '890-257-5631', '560 Lake St', 'Edina', 'MN', '55424', 2, NOW(), 2),
('Amber', '$2a$10$sfTE8trmDX6RH3Whr3KTdeyWqx4JT2cS5RFyGc0tW9JhYkG5e.NwG', 'Amber', 'Volkmann', 'avolkmann@gmail.com', '423-746-8952', '2683 Cherrywood Ln', 'Austin', 'TX', '55672', 1, NOW(), 1),
('Andrea', '$2a$10$sfTE8trmDX6RH3Whr3KTdeyWqx4JT2cS5RFyGc0tW9JhYkG5e.NwG', 'Andrea', 'Bert', 'abert@gmail.com', '907-363-1568', '6340 Stonebroke Rd', 'Appleton', 'WI', '55678', 3, NOW(), 0),
('Billy', '$2a$10$sfTE8trmDX6RH3Whr3KTdeyWqx4JT2cS5RFyGc0tW9JhYkG5e.NwG', 'Billy', 'Johnson', 'bjohnson@gmail.com', '774-236-5076', '230 Oakwood Blvd', 'Roseville', 'MN', '55498', 1, NOW(), 0);

INSERT INTO "team" ("captain_name", "is_archived", "date")
VALUES ('Jessica', FALSE, NOW()),
('Tou', FALSE, NOW());

INSERT INTO "team_user" ("team_id", "user_id")
VALUES (1, 3),
(2, 4),
(1, 5),
(2, 2), 
(1, 1);

INSERT INTO "client" ("name", "bio", "media_release", "location", "date", "team_id")
VALUES ('Caleb', 'Has been homeless for 2 years', NULL, 'St. Paul', NOW(), 1),
	('Georgie', 'Single Mother. Lost job last year. Evicted 6 months ago.', NULL, 'Minneapolis', NOW(), 1);


INSERT INTO "media" ("client_id", "link", "type", "metadata", "date", "user_id")
VALUES (2, 'image.png', 'img', NULL, NOW(), 3), 
(2, 'download.jpeg', 'img', NULL, NOW(), 3), 
(2, 'Untitled.png', 'img', NULL, NOW(), 3);
	
	
INSERT INTO "item" ("name", "client_id", "team_id", "purchased")
VALUES
 ('Kid size winter coat', '2', '1', 'false'),
 ('School backpack', '2', '1', 'false'),
 ('Tent', '2', '1', 'false'),
 ('2 sleeping bags', '2', '1', 'false');
 
INSERT INTO "messages" ("client_id", "user_id", "team_id", "message", "date")
VALUES (1, 1, 1, 'First chat message, should be Gabe', NOW()),
(1, 3, 1, 'Second chat message, should be Jessica', NOW()),
(1, 5, 1, 'Second chat message, should be Amber', NOW());