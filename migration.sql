DROP TABLE IF EXISTS yarn;

CREATE TABLE yarn (
    id serial PRIMARY KEY,
    size varchar(2),
    name_ varchar(255),
    fiber_type varchar(100),
    color varchar(100),
    length_in_yards integer,
    brand varchar(100)
)
