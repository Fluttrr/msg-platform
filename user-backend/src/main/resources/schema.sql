
CREATE TABLE IF NOT EXISTS "users" (
    "username" VARCHAR(20) NOT NULL UNIQUE,
    "id" SERIAL PRIMARY KEY,
    "descr" TEXT,
    "banned" BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS "usergroups" (
    "name" VARCHAR(20) NOT NULL UNIQUE,
    "id" SERIAL PRIMARY KEY,
    "descr" TEXT
);

CREATE TABLE IF NOT EXISTS "subscribers" (
    "gid" INT NOT NULL,
    "uid" INT NOT NULL,
    CONSTRAINT fk_subscriber_user FOREIGN KEY ("uid") REFERENCES "users" ("id") ON DELETE CASCADE,
    CONSTRAINT fk_subscriber_group FOREIGN KEY ("gid") REFERENCES "usergroups" ("id") ON DELETE CASCADE,
    CONSTRAINT unique_subscription UNIQUE (uid, gid)
);


CREATE TABLE IF NOT EXISTS "blocked" (
    "blocker" INT NOT NULL,
    "blockee" INT NOT NULL,

    CONSTRAINT fk_blocker FOREIGN KEY ("blockee") REFERENCES "users" ("id") ON DELETE CASCADE,
    CONSTRAINT fk_blockee FOREIGN KEY ("blocker") REFERENCES "users" ("id") ON DELETE CASCADE
);



