
INSERT INTO "users" ("username", "descr") 
SELECT 'Anna', '1.0 ist mein Motto Mwahahaha'
WHERE NOT EXISTS (SELECT 1 FROM "users" WHERE "username" = 'Anna');

INSERT INTO "users" ("username", "descr") 
SELECT 'Marc', 'Galigrü und GLG'
WHERE NOT EXISTS (SELECT 1 FROM "users" WHERE "username" = 'Marc');

INSERT INTO "users" ("username", "descr") 
SELECT 'Niklas', 'UwU  nuzzles you >///<'
WHERE NOT EXISTS (SELECT 1 FROM "users" WHERE "username" = 'Niklas');

INSERT INTO "users" ("username", "descr") 
SELECT 'Aquadratron', 'Im under pressure'
WHERE NOT EXISTS (SELECT 1 FROM "users" WHERE "username" = 'Aquadratron');

INSERT INTO "usergroups" ("name", "descr") 
SELECT 'BlaBlubb', 'Its Wine oclock!'
WHERE NOT EXISTS (SELECT 1 FROM "usergroups" WHERE "name" = 'BlaBlubb');
