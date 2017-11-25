CREATE TABLE "public"."hashtag" (
    "id" serial,
    "lowercaseText" text,
    "realText" text,
    PRIMARY KEY ("id"),
    UNIQUE ("realText")
);
ALTER TABLE "public"."hashtag" ADD COLUMN "createdAt" timestamp DEFAULT now();



CREATE TABLE "public"."actor" (
    "id" serial,
    "name" varchar(255) NOT NULL,
    "email" varchar(255),
    "fbUserId" text,
    "isActive" boolean DEFAULT 'TRUE',
    "createdAt" timestamp DEFAULT now(),
    PRIMARY KEY ("id")
);
ALTER TABLE "public"."actor"
  ADD UNIQUE ("email"),
  ADD UNIQUE ("fbUserId");
ALTER TABLE "public"."actor" ADD COLUMN "hashtag" text NOT NULL;
ALTER TABLE "public"."actor"
  ADD COLUMN "googleUserId" text,
  ADD UNIQUE ("googleUserId");


CREATE TABLE "public"."actorAuth" (
    "id" serial,
    "actor" integer,
    "token" text NOT NULL,
    PRIMARY KEY ("id"),
    CONSTRAINT "actor_auth_id" FOREIGN KEY ("actor") REFERENCES "public"."actor"("id")
);
CREATE EXTENSION "uuid-ossp";
ALTER TABLE "public"."actorAuth" ADD COLUMN "createdAt" timestamp DEFAULT now();



CREATE TABLE "public"."action" (
    "id" serial,
    "actor" integer,
    "hashtag" integer,
    "isGood" boolean DEFAULT 'false',
    "karma" integer NOT NULL,
    "recordedForDate" date,
    "createdAt" timestamp DEFAULT now(),
    PRIMARY KEY ("id"),
    CONSTRAINT "action_actor" FOREIGN KEY ("actor") REFERENCES "public"."actor"("id"),
    CONSTRAINT "action_hashtag" FOREIGN KEY ("hashtag") REFERENCES "public"."hashtag"("id")
);
