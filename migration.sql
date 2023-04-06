DROP TABLE IF EXISTS yarn;

CREATE TABLE yarn (
    id serial PRIMARY KEY,
    size varchar(2),
    name_ varchar(255),
    fiber varchar(100),
    brand varchar(100)
)
