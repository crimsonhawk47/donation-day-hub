
-- -- USER is a reserved keyword with Postgres
-- -- You must use double quotes in every query that user is in:
-- -- ex. SELECT * FROM "user";
-- -- Otherwise you will have errors!
-- CREATE TABLE "user" (
--     "id" SERIAL PRIMARY KEY,
--     "username" VARCHAR (80) UNIQUE NOT NULL,
--     "password" VARCHAR (1000) NOT NULL
-- );

CREATE TABLE "user" (
	"id" serial NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(15) NOT NULL,
	"street_address" varchar(255) NOT NULL,
	"city" varchar(255) NOT NULL,
	"state" varchar(255) NOT NULL,
	"zip" varchar(255) NOT NULL,
	"access_level" int NOT NULL,
	"date_registered" timestamp with time zone NOT NULL,
	CONSTRAINT "user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "team" (
	"id" serial NOT NULL,
	"captain_name" varchar(255) NOT NULL,
	"is_archived" bool NOT NULL,
	"date" timestamp with time zone NOT NULL,
	CONSTRAINT "team_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "client" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"bio" varchar(2000) NOT NULL,
	"media_release" varchar(2000) NOT NULL,
	"location" varchar(255) NOT NULL,
	"date" timestamp with time zone NOT NULL,
	"team_id" int(255) NOT NULL,
	CONSTRAINT "client_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "team_user" (
	"id" serial NOT NULL,
	"team_id" int NOT NULL,
	"user_id" int NOT NULL,
	CONSTRAINT "team_user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "item" (
	"id" serial NOT NULL,
	"name" serial(255) NOT NULL,
	"client_id" int NOT NULL,
	"team_id" int NOT NULL,
	"purchased" bool NOT NULL,
	CONSTRAINT "item_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "media" (
	"id" serial NOT NULL,
	"client_id" int NOT NULL,
	"link" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"metadata" varchar(255) NOT NULL,
	"date" timestamp with time zone NOT NULL,
	"user_id" int NOT NULL,
	CONSTRAINT "media_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "messages" (
	"id" serial NOT NULL,
	"client_id" int NOT NULL,
	"user_id" int NOT NULL,
	"message" varchar(2000) NOT NULL,
	"date" timestamp with time zone NOT NULL,
	CONSTRAINT "messages_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);





ALTER TABLE "client" ADD CONSTRAINT "client_fk0" FOREIGN KEY ("team_id") REFERENCES "team"("id");

ALTER TABLE "team_user" ADD CONSTRAINT "team_user_fk0" FOREIGN KEY ("team_id") REFERENCES "team"("id");
ALTER TABLE "team_user" ADD CONSTRAINT "team_user_fk1" FOREIGN KEY ("user_id") REFERENCES "user"("id");

ALTER TABLE "item" ADD CONSTRAINT "item_fk0" FOREIGN KEY ("client_id") REFERENCES "client"("id");
ALTER TABLE "item" ADD CONSTRAINT "item_fk1" FOREIGN KEY ("team_id") REFERENCES "team"("id");

ALTER TABLE "media" ADD CONSTRAINT "media_fk0" FOREIGN KEY ("client_id") REFERENCES "client"("id");
ALTER TABLE "media" ADD CONSTRAINT "media_fk1" FOREIGN KEY ("user_id") REFERENCES "user"("id");

ALTER TABLE "messages" ADD CONSTRAINT "messages_fk0" FOREIGN KEY ("client_id") REFERENCES "client"("id");
ALTER TABLE "messages" ADD CONSTRAINT "messages_fk1" FOREIGN KEY ("user_id") REFERENCES "user"("id");
ALTER TABLE "messages" ADD CONSTRAINT "messages_fk2" FOREIGN KEY ("message") REFERENCES "client"("id");


