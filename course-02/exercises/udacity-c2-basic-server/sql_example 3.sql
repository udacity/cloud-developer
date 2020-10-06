DROP VIEW IF EXISTS joined;
DROP VIEW IF EXISTS toyotas;
DROP TABLE IF EXISTS "public"."make";
DROP TABLE IF EXISTS "public"."cars";

CREATE TABLE "public"."cars" (
  id SERIAL PRIMARY KEY,
  type TEXT,
  model TEXT,
  cost INT,
  make_id INT
);

INSERT INTO "public"."cars" ("type", "model", "cost", "make_id") VALUES 
	('sedan', 'roadster', '33', '2'),
	('sedan', 'prius', '22', '1'),
	('sedan', 'focus', '18', '3'),
	('suv', 'highlander', '40', '1');
  
CREATE TABLE "public"."make" (
  id SERIAL PRIMARY KEY,
  name TEXT
);

INSERT INTO "public"."make" ("name") VALUES ('toyota'), ('tesla'), ('ford');

CREATE VIEW joined AS
SELECT cars.type, cars.cost, cars.model, make.name
  FROM cars
  INNER JOIN make ON (cars.make_id = make.id)
  ORDER BY cost DESC  LIMIT 30;
  
CREATE VIEW toyotas AS
SELECT cars.type, cars.cost, cars.model, make.name
  FROM cars
  INNER JOIN make ON (cars.make_id = make.id)
  WHERE make.name = 'toyota'
  ORDER BY cost DESC  LIMIT 30;