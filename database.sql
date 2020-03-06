
-- -- USER is a reserved keyword with Postgres
-- -- You must use double quotes in every query that user is in:
-- -- ex. SELECT * FROM "user";
-- -- Otherwise you will have errors!


-- Create a database with the name "intersection" then create the following tables

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
	"date_registered" TIMESTAMP with time zone
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
	"team_id" INT REFERENCES "team"
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
	"message" TEXT,
	"date" TIMESTAMP with time zone
);